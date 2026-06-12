"use client";

import { useState, useRef, useEffect } from "react";
import type { FileTool } from "@/data/file-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
}

type ZipEntry = { name: string; size: number; blob: Blob };

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ExtractZipTool({ tool }: { tool: FileTool }) {
  const [file, setFile] = useState<File | null>(null);
  const [entries, setEntries] = useState<ZipEntry[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  async function handleFile(f: File) {
    setFile(f); setEntries([]); setStatus("processing"); setErrorMessage("");
    ToolTracking.uploadStarted(tool.slug, PROCESSING_TYPE);
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    try {
      const JSZip = (await import("jszip")).default;
      const buf = await f.arrayBuffer();
      const zip = await JSZip.loadAsync(buf);
      const results: ZipEntry[] = [];
      const names = Object.keys(zip.files).filter((n) => !zip.files[n].dir);
      for (const name of names) {
        const blob = await zip.files[name].async("blob");
        results.push({ name, size: blob.size, blob });
      }
      setEntries(results);
      setStatus("done");
      ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
    } catch {
      setErrorMessage("Failed to read ZIP. Ensure it is a valid .zip file.");
      setStatus("error");
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  function downloadEntry(entry: ZipEntry) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(entry.blob);
    const parts = entry.name.split("/");
    a.download = parts[parts.length - 1];
    a.click();
    ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
  }

  function downloadAll() {
    entries.forEach((e) => downloadEntry(e));
  }

  const isProcessing = status === "processing";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <input ref={inputRef} type="file" accept=".zip" style={{ display: "none" }} onChange={handleInputChange} />
      <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => inputRef.current?.click()}
        style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "28px 20px", background: "#f8faff", textAlign: "center", cursor: "pointer" }}>
        {isProcessing ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}><Spinner /><span style={{ fontSize: "14px", color: "#4b5563" }}>Reading ZIP…</span></div>
        ) : (
          <>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>📦</div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
              {file ? file.name : "Drop a .zip file here"}
            </div>
            <div style={{ fontSize: "12px", color: "#9ca3af" }}>{file ? "Click to change file" : "or click to browse"}</div>
          </>
        )}
      </div>

      {status === "error" && (
        <div style={{ padding: "10px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage}
        </div>
      )}

      {status === "done" && entries.length > 0 && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", color: "#374151", fontWeight: 600 }}>{entries.length} file{entries.length !== 1 ? "s" : ""} found</span>
            <button onClick={downloadAll}
              style={{ padding: "6px 14px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "7px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
              Download All
            </button>
          </div>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
            {entries.map((entry, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 14px", borderBottom: i < entries.length - 1 ? "1px solid #f3f4f6" : "none", background: "#fff" }}>
                <span style={{ fontSize: "13px", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#111", fontFamily: "monospace" }}>{entry.name}</span>
                <span style={{ fontSize: "11px", color: "#9ca3af", flexShrink: 0 }}>{formatBytes(entry.size)}</span>
                <button onClick={() => downloadEntry(entry)}
                  style={{ padding: "4px 10px", background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>
                  ↓
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {status === "done" && entries.length === 0 && (
        <div style={{ padding: "12px 14px", background: "#fefce8", color: "#713f12", border: "1px solid #fde68a", borderRadius: "8px", fontSize: "13px" }}>
          The ZIP archive contains no files.
        </div>
      )}
    </div>
  );
}

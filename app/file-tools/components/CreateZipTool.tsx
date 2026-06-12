"use client";

import { useState, useRef, useEffect } from "react";
import type { FileTool } from "@/data/file-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;
const MAX_TOTAL = 100 * 1024 * 1024;

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
}

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function CreateZipTool({ tool }: { tool: FileTool }) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function addFiles(newFiles: File[]) {
    setFiles((prev) => {
      const merged = [...prev, ...newFiles];
      const total = merged.reduce((s, f) => s + f.size, 0);
      if (total > MAX_TOTAL) { setErrorMessage(`Total size exceeds 100MB.`); setStatus("error"); return prev; }
      setStatus("idle"); setErrorMessage("");
      return merged;
    });
    ToolTracking.uploadStarted(tool.slug, PROCESSING_TYPE);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(Array.from(e.target.files));
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files));
  }

  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
    setStatus("idle"); setErrorMessage("");
  }

  async function handleCreate() {
    if (files.length === 0) { setErrorMessage("Add at least one file."); setStatus("error"); return; }
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    setStatus("processing"); setErrorMessage("");
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (const f of files) {
        const buf = await f.arrayBuffer();
        zip.file(f.name, buf);
      }
      const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "archive.zip"; a.click();
      setStatus("done");
      ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
      ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
    } catch {
      setErrorMessage("Failed to create ZIP. Please try again.");
      setStatus("error");
    }
  }

  const totalSize = files.reduce((s, f) => s + f.size, 0);
  const isProcessing = status === "processing";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <input ref={inputRef} type="file" multiple style={{ display: "none" }} onChange={handleInputChange} />
      <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
        style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "20px", background: "#f8faff", textAlign: "center" }}>
        <div style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>Drag & drop files here or</div>
        <button onClick={() => inputRef.current?.click()}
          style={{ padding: "9px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
          Add Files
        </button>
      </div>

      {files.length > 0 && (
        <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
          <div style={{ padding: "8px 14px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}>
            <span>{files.length} file{files.length !== 1 ? "s" : ""}</span>
            <span>Total: {formatBytes(totalSize)}</span>
          </div>
          {files.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 14px", borderBottom: i < files.length - 1 ? "1px solid #f3f4f6" : "none", background: "#fff" }}>
              <span style={{ fontSize: "13px", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#111" }}>{f.name}</span>
              <span style={{ fontSize: "11px", color: "#9ca3af", flexShrink: 0 }}>{formatBytes(f.size)}</span>
              <button onClick={() => removeFile(i)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "14px", padding: "0 4px", flexShrink: 0 }}>✕</button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button disabled={files.length === 0 || isProcessing} onClick={handleCreate}
          style={{ padding: "10px 22px", background: files.length > 0 && !isProcessing ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: files.length > 0 && !isProcessing ? "pointer" : "not-allowed" }}>
          {isProcessing ? "Creating ZIP..." : "Create ZIP"}
        </button>
        {isProcessing && <Spinner />}
      </div>

      {status === "error" && (
        <div style={{ padding: "10px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage}
        </div>
      )}

      {status === "done" && (
        <div style={{ padding: "12px 14px", background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", borderRadius: "8px", fontSize: "13px" }}>
          ✅ ZIP created and downloaded successfully.
        </div>
      )}
    </div>
  );
}

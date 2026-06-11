"use client";

import { useState, useRef, useEffect } from "react";
import type { EditImageTool } from "@/data/edit-image/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function formatValue(val: unknown): string {
  if (val === null || val === undefined) return "";
  if (val instanceof Date) return val.toLocaleString();
  if (Array.isArray(val)) return val.map(formatValue).join(", ");
  if (typeof val === "object") return JSON.stringify(val);
  return String(val);
}

export default function ExifViewerTool({ tool }: { tool: EditImageTool }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error" | "nodata">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [exifData, setExifData] = useState<Record<string, unknown> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); }, [tool.slug]);

  function handleFileSelect(f: File) {
    if (f.size > MAX_FILE_SIZE) { setErrorMessage("File too large. Maximum size is 100MB."); setStatus("error"); return; }
    setFile(f); setStatus("idle"); setErrorMessage(""); setExifData(null);
    ToolTracking.uploadStarted(tool.slug, PROCESSING_TYPE);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (f) handleFileSelect(f); e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFileSelect(f);
  }

  function handleReset() {
    setFile(null); setStatus("idle"); setErrorMessage(""); setExifData(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleProcess() {
    if (!file) return;
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    setStatus("processing"); setErrorMessage(""); setExifData(null);
    try {
      const exifr = await import("exifr");
      const data = await exifr.parse(file);
      if (!data || Object.keys(data).length === 0) {
        setStatus("nodata");
        return;
      }
      setExifData(data as Record<string, unknown>);
      setStatus("done");
      ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
    } catch {
      setErrorMessage("Failed to read EXIF data. The file may be corrupted or in an unsupported format.");
      setStatus("error");
    }
  }

  const isProcessing = status === "processing";
  const isReady = !!file && !isProcessing;

  return (
    <>
      <input ref={inputRef} type="file" accept={tool.accept} style={{ display: "none" }} onChange={handleFileChange} />
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
          style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "16px", background: "#f8faff" }}>
          {file ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "52px", borderRadius: "6px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "10px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>IMG</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
                <button onClick={() => inputRef.current?.click()} style={{ fontSize: "11px", color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Change file</button>
              </div>
              <button onClick={handleReset} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "6px", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "#6b7280", fontSize: "13px" }}>✕</button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>Drag & drop your image here or</div>
              <button onClick={() => inputRef.current?.click()} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#2563eb", color: "#fff", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px", border: "none" }}>
                {tool.inputLabel}
              </button>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button disabled={!isReady} onClick={handleProcess}
            style={{ padding: "10px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed" }}>
            {isProcessing ? "Reading EXIF..." : "View EXIF Data"}
          </button>
          {isProcessing && <Spinner />}
        </div>

        {status === "error" && (
          <div style={{ padding: "12px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
            {errorMessage || "Something went wrong. Please try again."}
          </div>
        )}

        {status === "nodata" && (
          <div style={{ padding: "12px 14px", background: "#fffbeb", color: "#92400e", border: "1px solid #fde68a", borderRadius: "8px", fontSize: "13px" }}>
            No EXIF data found in this image. Screenshots, web images, and social media photos typically have no EXIF data.
          </div>
        )}

        {status === "done" && exifData && (
          <div style={{ border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: "#eff6ff", padding: "12px 16px" }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>EXIF Data</p>
              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{Object.keys(exifData).length} fields found</p>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <tbody>
                  {Object.entries(exifData).map(([key, val], i) => (
                    <tr key={key} style={{ background: i % 2 === 0 ? "#f9fafb" : "#fff" }}>
                      <td style={{ padding: "7px 14px", fontWeight: 600, color: "#374151", whiteSpace: "nowrap", width: "40%", borderBottom: "1px solid #f3f4f6" }}>{key}</td>
                      <td style={{ padding: "7px 14px", color: "#111827", wordBreak: "break-word", borderBottom: "1px solid #f3f4f6" }}>{formatValue(val)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
              <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "12px", color: "#2563eb", fontWeight: 500 }}>→ View EXIF of another image</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

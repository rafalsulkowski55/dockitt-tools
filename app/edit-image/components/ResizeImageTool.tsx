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

export default function ResizeImageTool({ tool }: { tool: EditImageTool }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockAspect, setLockAspect] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); }, [tool.slug]);

  function handleFileSelect(f: File) {
    if (f.size > MAX_FILE_SIZE) { setErrorMessage("File too large. Maximum size is 100MB."); setStatus("error"); return; }
    setFile(f); setStatus("idle"); setErrorMessage(""); setDownloadUrl(null);
    const img = new Image();
    img.onload = () => {
      setOrigW(img.naturalWidth); setOrigH(img.naturalHeight);
      setWidth(String(img.naturalWidth)); setHeight(String(img.naturalHeight));
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(f);
    ToolTracking.uploadStarted(tool.slug, PROCESSING_TYPE);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (f) handleFileSelect(f); e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFileSelect(f);
  }

  function handleReset() {
    setFile(null); setStatus("idle"); setErrorMessage(""); setDownloadUrl(null);
    setWidth(""); setHeight(""); setOrigW(0); setOrigH(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleWidthChange(val: string) {
    setWidth(val);
    if (lockAspect && origW && origH) {
      const n = parseInt(val);
      if (!isNaN(n) && n > 0) setHeight(String(Math.round(n * origH / origW)));
    }
  }

  function handleHeightChange(val: string) {
    setHeight(val);
    if (lockAspect && origW && origH) {
      const n = parseInt(val);
      if (!isNaN(n) && n > 0) setWidth(String(Math.round(n * origW / origH)));
    }
  }

  async function handleProcess() {
    if (!file) return;
    const w = parseInt(width); const h = parseInt(height);
    if (!w || !h || w <= 0 || h <= 0) { setErrorMessage("Enter valid width and height values."); setStatus("error"); return; }
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    setStatus("processing"); setErrorMessage(""); setDownloadUrl(null);
    try {
      const url = URL.createObjectURL(file);
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image(); i.onload = () => resolve(i); i.onerror = reject; i.src = url;
      });
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      const mime = file.type || "image/jpeg";
      const quality = mime === "image/jpeg" ? 0.92 : undefined;
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => { if (!b) { reject(new Error("toBlob failed")); return; } resolve(b); }, mime, quality);
      });
      setDownloadUrl(URL.createObjectURL(blob));
      setStatus("done");
      ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
    } catch {
      setErrorMessage("Resize failed. Please try a different image.");
      setStatus("error");
    }
  }

  function handleDownload() {
    if (!downloadUrl || !file) return;
    ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
    const ext = file.name.split(".").pop() ?? "jpg";
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a"); a.href = downloadUrl; a.download = `${baseName}-${width}x${height}.${ext}`; a.click();
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
                {origW > 0 && <p style={{ fontSize: "11px", color: "#6b7280", margin: "0 0 2px" }}>{origW} × {origH} px</p>}
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

        {file && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "4px" }}>Width (px)</label>
                <input type="number" min="1" value={width} onChange={(e) => handleWidthChange(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} />
              </div>
              <div style={{ fontSize: "18px", color: "#9ca3af", marginTop: "18px" }}>×</div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "4px" }}>Height (px)</label>
                <input type="number" min="1" value={height} onChange={(e) => handleHeightChange(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} />
              </div>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#374151", cursor: "pointer" }}>
              <input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} />
              Maintain aspect ratio
            </label>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button disabled={!isReady} onClick={handleProcess}
            style={{ padding: "10px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed" }}>
            {isProcessing ? "Resizing..." : "Resize Image"}
          </button>
          {isProcessing && <Spinner />}
        </div>

        {status === "error" && (
          <div style={{ padding: "12px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
            {errorMessage || "Something went wrong. Please try again."}
          </div>
        )}

        {status === "done" && downloadUrl && (
          <div style={{ border: "1px solid #bfdbfe", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: "#eff6ff", padding: "12px 16px" }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ Resize complete</p>
              <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>Output: {width} × {height} px</p>
            </div>
            <div style={{ padding: "12px 16px", background: "#fff" }}>
              <button onClick={handleDownload} style={{ width: "100%", padding: "11px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
                ⬇ Download Resized Image
              </button>
            </div>
            <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
              <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "12px", color: "#2563eb", fontWeight: 500 }}>→ Resize another image</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

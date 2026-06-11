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

export default function CropImageTool({ tool }: { tool: EditImageTool }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [cropX, setCropX] = useState("0");
  const [cropY, setCropY] = useState("0");
  const [cropW, setCropW] = useState("");
  const [cropH, setCropH] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); }, [tool.slug]);

  function handleFileSelect(f: File) {
    if (f.size > MAX_FILE_SIZE) { setErrorMessage("File too large. Maximum size is 100MB."); setStatus("error"); return; }
    setFile(f); setStatus("idle"); setErrorMessage(""); setDownloadUrl(null);
    const img = new Image();
    img.onload = () => {
      setOrigW(img.naturalWidth); setOrigH(img.naturalHeight);
      setCropW(String(img.naturalWidth)); setCropH(String(img.naturalHeight));
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
    setCropX("0"); setCropY("0"); setCropW(""); setCropH(""); setOrigW(0); setOrigH(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleProcess() {
    if (!file) return;
    const x = parseInt(cropX) || 0;
    const y = parseInt(cropY) || 0;
    let w = parseInt(cropW);
    let h = parseInt(cropH);
    if (!w || !h || w <= 0 || h <= 0) { setErrorMessage("Enter valid crop width and height."); setStatus("error"); return; }
    w = Math.min(w, origW - x);
    h = Math.min(h, origH - y);
    if (w <= 0 || h <= 0) { setErrorMessage("Crop area is outside the image bounds."); setStatus("error"); return; }
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
      ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
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
      setErrorMessage("Crop failed. Please try a different image.");
      setStatus("error");
    }
  }

  function handleDownload() {
    if (!downloadUrl || !file) return;
    ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
    const ext = file.name.split(".").pop() ?? "jpg";
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a"); a.href = downloadUrl; a.download = `${baseName}-cropped.${ext}`; a.click();
  }

  const isProcessing = status === "processing";
  const isReady = !!file && !isProcessing;
  const inputStyle = { width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" as const };

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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "4px" }}>Start X (px)</label>
                <input type="number" min="0" max={origW - 1} value={cropX} onChange={(e) => setCropX(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "4px" }}>Start Y (px)</label>
                <input type="number" min="0" max={origH - 1} value={cropY} onChange={(e) => setCropY(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "4px" }}>Crop Width (px)</label>
                <input type="number" min="1" value={cropW} onChange={(e) => setCropW(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "4px" }}>Crop Height (px)</label>
                <input type="number" min="1" value={cropH} onChange={(e) => setCropH(e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button disabled={!isReady} onClick={handleProcess}
            style={{ padding: "10px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed" }}>
            {isProcessing ? "Cropping..." : "Crop Image"}
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
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ Crop complete</p>
              <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>Your cropped image is ready</p>
            </div>
            <div style={{ padding: "12px 16px", background: "#fff" }}>
              <button onClick={handleDownload} style={{ width: "100%", padding: "11px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
                ⬇ Download Cropped Image
              </button>
            </div>
            <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
              <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "12px", color: "#2563eb", fontWeight: 500 }}>→ Crop another image</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

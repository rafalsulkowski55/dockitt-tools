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

const PRESETS = [
  { label: "90° CW", value: 90 },
  { label: "90° CCW", value: -90 },
  { label: "180°", value: 180 },
];

export default function RotateImageTool({ tool }: { tool: EditImageTool }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [angle, setAngle] = useState("90");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); }, [tool.slug]);

  function handleFileSelect(f: File) {
    if (f.size > MAX_FILE_SIZE) { setErrorMessage("File too large. Maximum size is 100MB."); setStatus("error"); return; }
    setFile(f); setStatus("idle"); setErrorMessage(""); setDownloadUrl(null);
    ToolTracking.uploadStarted(tool.slug, PROCESSING_TYPE);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (f) handleFileSelect(f); e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFileSelect(f);
  }

  function handleReset() {
    setFile(null); setStatus("idle"); setErrorMessage(""); setDownloadUrl(null); setAngle("90");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleProcess() {
    if (!file) return;
    const deg = parseFloat(angle);
    if (isNaN(deg)) { setErrorMessage("Enter a valid rotation angle."); setStatus("error"); return; }
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    setStatus("processing"); setErrorMessage(""); setDownloadUrl(null);
    try {
      const url = URL.createObjectURL(file);
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image(); i.onload = () => resolve(i); i.onerror = reject; i.src = url;
      });
      URL.revokeObjectURL(url);
      const rad = (deg * Math.PI) / 180;
      const sin = Math.abs(Math.sin(rad));
      const cos = Math.abs(Math.cos(rad));
      const outW = Math.round(img.naturalWidth * cos + img.naturalHeight * sin);
      const outH = Math.round(img.naturalWidth * sin + img.naturalHeight * cos);
      const canvas = document.createElement("canvas");
      canvas.width = outW; canvas.height = outH;
      const ctx = canvas.getContext("2d")!;
      const mime = file.type || "image/jpeg";
      if (mime === "image/jpeg") { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, outW, outH); }
      ctx.translate(outW / 2, outH / 2);
      ctx.rotate(rad);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      const quality = mime === "image/jpeg" ? 0.92 : undefined;
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => { if (!b) { reject(new Error("toBlob failed")); return; } resolve(b); }, mime, quality);
      });
      setDownloadUrl(URL.createObjectURL(blob));
      setStatus("done");
      ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
    } catch {
      setErrorMessage("Rotation failed. Please try a different image.");
      setStatus("error");
    }
  }

  function handleDownload() {
    if (!downloadUrl || !file) return;
    ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
    const ext = file.name.split(".").pop() ?? "jpg";
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a"); a.href = downloadUrl; a.download = `${baseName}-rotated.${ext}`; a.click();
  }

  const isProcessing = status === "processing";
  const isReady = !!file && !isProcessing;
  const btnStyle = (active: boolean) => ({
    padding: "7px 14px", border: `1px solid ${active ? "#2563eb" : "#d1d5db"}`,
    borderRadius: "6px", background: active ? "#eff6ff" : "#fff",
    color: active ? "#2563eb" : "#374151", fontWeight: active ? 600 : 400,
    fontSize: "13px", cursor: "pointer",
  });

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

        {file && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {PRESETS.map((p) => (
                <button key={p.value} onClick={() => setAngle(String(p.value))} style={btnStyle(angle === String(p.value))}>
                  {p.label}
                </button>
              ))}
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "4px" }}>Custom angle (degrees)</label>
              <input type="number" value={angle} onChange={(e) => setAngle(e.target.value)}
                style={{ width: "140px", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px" }} />
            </div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button disabled={!isReady} onClick={handleProcess}
            style={{ padding: "10px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed" }}>
            {isProcessing ? "Rotating..." : "Rotate Image"}
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
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ Rotation complete</p>
              <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>Your rotated image is ready</p>
            </div>
            <div style={{ padding: "12px 16px", background: "#fff" }}>
              <button onClick={handleDownload} style={{ width: "100%", padding: "11px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
                ⬇ Download Rotated Image
              </button>
            </div>
            <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
              <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "12px", color: "#2563eb", fontWeight: 500 }}>→ Rotate another image</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

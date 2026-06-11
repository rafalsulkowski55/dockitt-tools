"use client";

import { useState, useRef, useEffect } from "react";
import type { ConvertVariant } from "@/data/convert/variants";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

type Props = { variant: ConvertVariant };

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function renderSvgToPngBytes(svgText: string): Promise<{ width: number; height: number; bytes: Uint8Array }> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth || 800;
      const h = img.naturalHeight || 600;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(objectUrl);
      const dataUrl = canvas.toDataURL("image/png");
      const base64 = dataUrl.split(",")[1];
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      resolve({ width: w, height: h, bytes });
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("Failed to render SVG.")); };
    img.src = objectUrl;
  });
}

export default function SvgToPdfTool({ variant }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ToolTracking.viewTool(variant.slug, PROCESSING_TYPE);
  }, [variant.slug]);

  function handleFileSelect(f: File) {
    if (f.size > MAX_FILE_SIZE) {
      setErrorMessage("File too large. Maximum size is 100MB.");
      setStatus("error");
      return;
    }
    setFile(f); setStatus("idle"); setErrorMessage(""); setDownloadUrl(null); setProgress(0);
    ToolTracking.uploadStarted(variant.slug, PROCESSING_TYPE);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFileSelect(f);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFileSelect(f);
  }

  function handleReset() {
    setFile(null); setStatus("idle"); setErrorMessage(""); setDownloadUrl(null); setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleConvert() {
    if (!file) return;
    ToolTracking.processStarted(variant.slug, PROCESSING_TYPE);
    setStatus("processing"); setErrorMessage(""); setDownloadUrl(null); setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p < 60 ? p + Math.random() * 15 : p));
    }, 200);

    try {
      const { PDFDocument } = await import("pdf-lib");

      const svgText = await file.text();
      setProgress(20);

      const { width, height, bytes } = await renderSvgToPngBytes(svgText);
      setProgress(70);

      const pdfDoc = await PDFDocument.create();
      const image = await pdfDoc.embedPng(bytes);
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(image, { x: 0, y: 0, width, height });

      clearInterval(interval);
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
      setProgress(100);
      setStatus("done");
      ToolTracking.processSuccess(variant.slug, PROCESSING_TYPE);
    } catch (err: unknown) {
      clearInterval(interval);
      setErrorMessage(err instanceof Error ? err.message : "Conversion failed. Please try again.");
      setStatus("error"); setProgress(0);
    }
  }

  function handleDownload() {
    if (!downloadUrl) return;
    ToolTracking.downloadClicked(variant.slug, PROCESSING_TYPE);
    const baseName = file?.name.replace(/\.svg$/i, "") ?? "document";
    const a = document.createElement("a"); a.href = downloadUrl; a.download = `${baseName}.pdf`; a.click();
  }

  const isProcessing = status === "processing";
  const isReady = !!file && !isProcessing;

  return (
    <>
      <input ref={inputRef} type="file" accept=".svg" style={{ display: "none" }} onChange={handleFileChange} />
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
          style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "16px", background: "#f8faff" }}>
          {file ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "52px", borderRadius: "6px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "10px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>SVG</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
                <button onClick={() => inputRef.current?.click()} style={{ fontSize: "11px", color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Change file</button>
              </div>
              <button onClick={handleReset} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "6px", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "#6b7280", fontSize: "13px" }}>✕</button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>Drag & drop your SVG file here or</div>
              <button onClick={() => inputRef.current?.click()} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#2563eb", color: "#fff", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px", border: "none" }}>
                {variant.inputLabel}
              </button>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button disabled={!isReady} onClick={handleConvert}
            style={{ padding: "10px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed" }}>
            {isProcessing ? "Converting..." : "Convert to PDF"}
          </button>
          {isProcessing && <Spinner />}
        </div>

        {isProcessing && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}>
              <span>Rendering SVG...</span><span>{Math.round(progress)}%</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "5px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#2563eb", borderRadius: "99px", transition: "width 0.3s ease" }} />
            </div>
          </div>
        )}

        {status === "error" && (
          <div style={{ padding: "12px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
            {errorMessage || "Something went wrong. Please try again."}
          </div>
        )}

        {status === "done" && downloadUrl && (
          <div style={{ border: "1px solid #bfdbfe", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: "#eff6ff", padding: "12px 16px" }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ Conversion complete</p>
              <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>Your PDF is ready to download</p>
            </div>
            <div style={{ padding: "12px 16px", background: "#fff" }}>
              <button onClick={handleDownload} style={{ width: "100%", padding: "11px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
                ⬇ Download PDF
              </button>
            </div>
            <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
              <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "12px", color: "#2563eb", fontWeight: 500 }}>→ Convert another file</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

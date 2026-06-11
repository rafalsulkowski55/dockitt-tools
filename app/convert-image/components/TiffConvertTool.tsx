"use client";

import { useState, useRef, useEffect } from "react";
import type { ConvertImageVariant } from "@/data/convert-image/variants";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

type SlugConfig = { mime: string; whiteBg: boolean };
const SLUG_CONFIG: Record<string, SlugConfig> = {
  "tiff-to-jpg": { mime: "image/jpeg", whiteBg: true  },
  "tiff-to-png": { mime: "image/png",  whiteBg: false },
};

type Props = { variant: ConvertImageVariant };

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function TiffConvertTool({ variant }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cfg = SLUG_CONFIG[variant.slug] ?? { mime: "image/png", whiteBg: false };

  useEffect(() => { ToolTracking.viewTool(variant.slug, PROCESSING_TYPE); }, [variant.slug]);

  function handleFileSelect(f: File) {
    if (f.size > MAX_FILE_SIZE) { setErrorMessage("File too large. Maximum size is 100MB."); setStatus("error"); return; }
    setFile(f); setStatus("idle"); setErrorMessage(""); setDownloadUrl(null);
    ToolTracking.uploadStarted(variant.slug, PROCESSING_TYPE);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (f) handleFileSelect(f); e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFileSelect(f);
  }

  function handleReset() {
    setFile(null); setStatus("idle"); setErrorMessage(""); setDownloadUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleConvert() {
    if (!file) return;
    ToolTracking.processStarted(variant.slug, PROCESSING_TYPE);
    setStatus("processing"); setErrorMessage(""); setDownloadUrl(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const { decode } = await import("tiff");
      const ifds = decode(arrayBuffer);
      if (!ifds || ifds.length === 0) throw new Error("Could not decode TIFF file. The file may be corrupt or use an unsupported encoding.");

      const ifd = ifds[0];
      const width: number = ifd.width;
      const height: number = ifd.height;
      const components: number = ifd.components;
      const bitsPerSample: number = ifd.bitsPerSample;
      const rawData = ifd.data;

      if (!width || !height || !rawData) throw new Error("Invalid or empty TIFF image data.");

      let maxVal: number;
      if (bitsPerSample <= 8) maxVal = 255;
      else if (bitsPerSample <= 16) maxVal = 65535;
      else maxVal = 1;

      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      const imageData = ctx.createImageData(width, height);
      const pixelCount = width * height;

      for (let i = 0; i < pixelCount; i++) {
        const src = i * components;
        const dst = i * 4;
        if (components === 1) {
          const v = Math.min(255, Math.round((rawData[src] / maxVal) * 255));
          imageData.data[dst] = v;
          imageData.data[dst + 1] = v;
          imageData.data[dst + 2] = v;
          imageData.data[dst + 3] = 255;
        } else if (components >= 3) {
          imageData.data[dst]     = Math.min(255, Math.round((rawData[src]     / maxVal) * 255));
          imageData.data[dst + 1] = Math.min(255, Math.round((rawData[src + 1] / maxVal) * 255));
          imageData.data[dst + 2] = Math.min(255, Math.round((rawData[src + 2] / maxVal) * 255));
          imageData.data[dst + 3] = components >= 4
            ? Math.min(255, Math.round((rawData[src + 3] / maxVal) * 255))
            : 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      let finalCanvas = canvas;
      if (cfg.whiteBg) {
        finalCanvas = document.createElement("canvas");
        finalCanvas.width = width; finalCanvas.height = height;
        const ctx2 = finalCanvas.getContext("2d")!;
        ctx2.fillStyle = "#ffffff";
        ctx2.fillRect(0, 0, width, height);
        ctx2.drawImage(canvas, 0, 0);
      }

      const quality = cfg.mime === "image/jpeg" ? 0.92 : undefined;
      const dataUrl = finalCanvas.toDataURL(cfg.mime, quality);
      const parts = dataUrl.split(",");
      const bstr = atob(parts[1]);
      const u8arr = new Uint8Array(bstr.length);
      for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
      setDownloadUrl(URL.createObjectURL(new Blob([u8arr], { type: cfg.mime })));
      setStatus("done");
      ToolTracking.processSuccess(variant.slug, PROCESSING_TYPE);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Could not decode TIFF file. Please try again.");
      setStatus("error");
    }
  }

  function handleDownload() {
    if (!downloadUrl) return;
    ToolTracking.downloadClicked(variant.slug, PROCESSING_TYPE);
    const baseName = file?.name.replace(/\.[^.]+$/, "") ?? "converted";
    const a = document.createElement("a"); a.href = downloadUrl; a.download = `${baseName}.${variant.outputFormat}`; a.click();
  }

  const isProcessing = status === "processing";
  const isReady = !!file && !isProcessing;
  const inputExt = variant.inputFormat.toUpperCase();

  return (
    <>
      <input ref={inputRef} type="file" accept={variant.accept} style={{ display: "none" }} onChange={handleFileChange} />
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
          style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "16px", background: "#f8faff" }}>
          {file ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "52px", borderRadius: "6px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "10px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>{inputExt}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
                <button onClick={() => inputRef.current?.click()} style={{ fontSize: "11px", color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Change file</button>
              </div>
              <button onClick={handleReset} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "6px", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "#6b7280", fontSize: "13px" }}>✕</button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>Drag & drop your {inputExt} file here or</div>
              <button onClick={() => inputRef.current?.click()} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#2563eb", color: "#fff", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px", border: "none" }}>
                {variant.inputLabel}
              </button>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button disabled={!isReady} onClick={handleConvert}
            style={{ padding: "10px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed" }}>
            {isProcessing ? "Converting..." : `Convert to ${variant.outputFormat.toUpperCase()}`}
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
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ Conversion complete</p>
              <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>Your {variant.outputFormat.toUpperCase()} file is ready to download</p>
            </div>
            <div style={{ padding: "12px 16px", background: "#fff" }}>
              <button onClick={handleDownload} style={{ width: "100%", padding: "11px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
                ⬇ Download {variant.outputFormat.toUpperCase()}
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

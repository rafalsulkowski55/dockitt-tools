"use client";

import { useState, useRef, useEffect } from "react";
import type { ConvertVariant } from "@/data/convert/variants";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;
const MAX_FILE_SIZE = 50 * 1024 * 1024;

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

// Creates a 24-bit BMP ArrayBuffer from a canvas.
// BMP stores rows bottom-to-top in BGR order, padded to 4-byte row boundaries.
// This manual encoder ensures cross-browser compatibility since Firefox does not
// support 'image/bmp' in canvas.toDataURL().
function canvasToBmpBuffer(canvas: HTMLCanvasElement): ArrayBuffer {
  const ctx = canvas.getContext("2d")!;
  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const rowSize = Math.ceil((24 * width) / 32) * 4; // padded to 4-byte boundary
  const pixelDataSize = rowSize * height;
  const fileSize = 54 + pixelDataSize;
  const buf = new ArrayBuffer(fileSize);
  const v = new DataView(buf);

  // File header (14 bytes)
  v.setUint8(0, 0x42); v.setUint8(1, 0x4d); // 'BM'
  v.setUint32(2, fileSize, true);
  v.setUint32(6, 0, true);
  v.setUint32(10, 54, true);

  // DIB header / BITMAPINFOHEADER (40 bytes)
  v.setUint32(14, 40, true);
  v.setInt32(18, width, true);
  v.setInt32(22, height, true); // positive = bottom-up storage
  v.setUint16(26, 1, true);     // color planes
  v.setUint16(28, 24, true);    // bits per pixel
  v.setUint32(30, 0, true);     // BI_RGB, no compression
  v.setUint32(34, pixelDataSize, true);
  v.setInt32(38, 2835, true);   // ~72 DPI horizontal
  v.setInt32(42, 2835, true);   // ~72 DPI vertical
  v.setUint32(46, 0, true);
  v.setUint32(50, 0, true);

  // Pixel data — bottom-to-top, BGR order
  for (let y = height - 1; y >= 0; y--) {
    const rowOffset = 54 + (height - 1 - y) * rowSize;
    for (let x = 0; x < width; x++) {
      const src = (y * width + x) * 4; // RGBA
      const dst = rowOffset + x * 3;   // BGR
      v.setUint8(dst,     data[src + 2]); // B
      v.setUint8(dst + 1, data[src + 1]); // G
      v.setUint8(dst + 2, data[src]);     // R
    }
  }
  return buf;
}

async function canvasToBmpDataUrl(canvas: HTMLCanvasElement): Promise<string> {
  // Try native first (Chrome supports it; Firefox does not)
  const native = canvas.toDataURL("image/bmp");
  if (native.startsWith("data:image/bmp")) return native;

  // Manual fallback
  const buf = canvasToBmpBuffer(canvas);
  const blob = new Blob([buf], { type: "image/bmp" });
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function PdfToBmpTool({ variant }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resultUrls, setResultUrls] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ToolTracking.viewTool(variant.slug, PROCESSING_TYPE);
  }, [variant.slug]);

  function handleFileSelect(f: File) {
    if (f.size > MAX_FILE_SIZE) {
      setErrorMessage("File too large. Maximum size is 50MB.");
      setStatus("error");
      return;
    }
    setFile(f); setStatus("idle"); setErrorMessage(""); setResultUrls([]); setProgress(0);
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
    setFile(null); setStatus("idle"); setErrorMessage(""); setResultUrls([]); setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleConvert() {
    if (!file) return;
    ToolTracking.processStarted(variant.slug, PROCESSING_TYPE);
    setStatus("processing"); setErrorMessage(""); setResultUrls([]); setProgress(0);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      const urls: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx as unknown as CanvasRenderingContext2D, viewport }).promise;
        urls.push(await canvasToBmpDataUrl(canvas));
        setProgress(Math.round((i / pdf.numPages) * 100));
      }
      setResultUrls(urls);
      setStatus("done");
      ToolTracking.processSuccess(variant.slug, PROCESSING_TYPE);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Conversion failed. Please try again.");
      setStatus("error"); setProgress(0);
    }
  }

  function downloadPage(url: string, index: number) {
    ToolTracking.downloadClicked(variant.slug, PROCESSING_TYPE);
    const a = document.createElement("a"); a.href = url; a.download = `page-${index + 1}.bmp`; a.click();
  }

  function downloadAll() {
    resultUrls.forEach((url, i) => {
      ToolTracking.downloadClicked(variant.slug, PROCESSING_TYPE);
      const a = document.createElement("a"); a.href = url; a.download = `page-${i + 1}.bmp`; a.click();
    });
  }

  const isProcessing = status === "processing";
  const isReady = !!file && !isProcessing;

  return (
    <>
      <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
          style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "16px", background: "#f8faff" }}>
          {file ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "52px", borderRadius: "6px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "10px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>PDF</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
                <button onClick={() => inputRef.current?.click()} style={{ fontSize: "11px", color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Change file</button>
              </div>
              <button onClick={handleReset} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "6px", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "#6b7280", fontSize: "13px" }}>✕</button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>Drag & drop your PDF here or</div>
              <button onClick={() => inputRef.current?.click()} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#2563eb", color: "#fff", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px", border: "none" }}>
                {variant.inputLabel}
              </button>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button disabled={!isReady} onClick={handleConvert}
            style={{ padding: "10px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed" }}>
            {isProcessing ? "Converting..." : "Convert to BMP"}
          </button>
          {isProcessing && <Spinner />}
        </div>

        {isProcessing && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}>
              <span>Converting pages...</span><span>{progress}%</span>
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

        {status === "done" && resultUrls.length > 0 && (
          <div style={{ border: "1px solid #bfdbfe", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: "#eff6ff", padding: "12px 16px" }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ Conversion complete</p>
              <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>{resultUrls.length} page{resultUrls.length > 1 ? "s" : ""} converted</p>
            </div>
            <div style={{ padding: "12px 16px", background: "#fff", display: "flex", flexDirection: "column", gap: "8px" }}>
              {resultUrls.length > 1 && (
                <button onClick={downloadAll} style={{ width: "100%", padding: "11px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
                  ⬇ Download all pages
                </button>
              )}
              {resultUrls.map((url, i) => (
                <button key={i} onClick={() => downloadPage(url, i)} style={{ padding: "9px 14px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", fontWeight: 500, cursor: "pointer", fontSize: "13px", color: "#333", textAlign: "left" }}>
                  ⬇ Page {i + 1}
                </button>
              ))}
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

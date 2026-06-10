"use client";

import { useState, useRef, useEffect } from "react";
import { ConvertVariant } from "@/data/convert/variants";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

type Props = {
  variant: ConvertVariant;
};

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ConvertTool({ variant }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resultUrls, setResultUrls] = useState<string[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ToolTracking.viewTool(variant.slug, PROCESSING_TYPE);
  }, [variant.slug]);

  function handleFiles(selected: File[]) {
    const maxSize = (variant.slug === "pdf-to-jpg" || variant.slug === "pdf-to-png")
      ? 50 * 1024 * 1024
      : 100 * 1024 * 1024;
    if (selected.some(f => f.size > maxSize)) {
      const mb = maxSize / (1024 * 1024);
      setErrorMessage(mb === 50
        ? "File too large. Maximum size is 50MB. Large PDFs with many pages may also be slow to render - consider splitting the PDF into smaller sections first."
        : "File too large. Maximum size for this tool is 100MB. For large files, try splitting the PDF first.");
      setStatus("error");
      return;
    }
    setFiles(selected);
    setStatus("idle");
    setErrorMessage("");
    setResultUrls([]);
    setDownloadUrl(null);
    setProgress(0);
    if (selected.length > 0) ToolTracking.uploadStarted(variant.slug, PROCESSING_TYPE);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length) handleFiles(selected);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const selected = Array.from(e.dataTransfer.files);
    if (selected.length) handleFiles(selected);
  }

  function handleReset() {
    setFiles([]); setStatus("idle"); setErrorMessage(""); setResultUrls([]);
    setDownloadUrl(null); setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function convertPdfToImage(file: File, format: "jpeg" | "png") {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
    const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
    const urls: string[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width; canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext("2d") as unknown as CanvasRenderingContext2D, viewport }).promise;
      urls.push(canvas.toDataURL(format === "jpeg" ? "image/jpeg" : "image/png", 0.92));
      setProgress(Math.round((i / pdf.numPages) * 100));
    }
    setResultUrls(urls); setStatus("done");
    ToolTracking.processSuccess(variant.slug, PROCESSING_TYPE);
  }

  async function convertImagesToPdf(imageFiles: File[]) {
    const { PDFDocument } = await import("pdf-lib");
    const pdfDoc = await PDFDocument.create();
    const isJpg = variant.slug === "jpg-to-pdf";
    for (let i = 0; i < imageFiles.length; i++) {
      const bytes = await imageFiles[i].arrayBuffer();
      const image = isJpg ? await pdfDoc.embedJpg(bytes) : await pdfDoc.embedPng(bytes);
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      setProgress(Math.round(((i + 1) / imageFiles.length) * 100));
    }
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });

    setDownloadUrl(URL.createObjectURL(blob));
    setStatus("done");
    ToolTracking.processSuccess(variant.slug, PROCESSING_TYPE);
  }

  async function handleConvert() {
    if (files.length === 0) return;
    ToolTracking.processStarted(variant.slug, PROCESSING_TYPE);
    setStatus("processing"); setErrorMessage(""); setResultUrls([]); setDownloadUrl(null); setProgress(0);
    const interval = setInterval(() => { setProgress((p) => (p < 80 ? p + Math.random() * 10 : p)); }, 400);
    try {
      if (variant.slug === "pdf-to-jpg" || variant.slug === "pdf-to-png") {
        clearInterval(interval);
        await convertPdfToImage(files[0], variant.slug === "pdf-to-jpg" ? "jpeg" : "png");
      } else {
        clearInterval(interval);
        await convertImagesToPdf(files);
      }
    } catch (err: unknown) {
      clearInterval(interval);
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      setStatus("error"); setProgress(0);
    }
  }

  function downloadImage(url: string, index: number) {
    ToolTracking.downloadClicked(variant.slug, PROCESSING_TYPE);
    const a = document.createElement("a"); a.href = url; a.download = `page-${index + 1}.${variant.outputFormat}`; a.click();
  }

  function downloadAll() {
    resultUrls.forEach((url, i) => {
      ToolTracking.downloadClicked(variant.slug, PROCESSING_TYPE);
      const a = document.createElement("a"); a.href = url; a.download = `page-${i + 1}.${variant.outputFormat}`; a.click();
    });
  }

  function handleDownload() {
    if (!downloadUrl) return;
    ToolTracking.downloadClicked(variant.slug, PROCESSING_TYPE);
    const a = document.createElement("a"); a.href = downloadUrl; a.download = `converted.${variant.outputFormat}`; a.click();
  }

  const isProcessing = status === "processing";
  const isReady = files.length > 0 && !isProcessing;

  return (
    <>
    <input ref={inputRef} type="file" accept={variant.accept}
      multiple={variant.inputFormat !== "pdf"}
      style={{ display: "none" }} onChange={handleFileChange} />
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

      {/* Drop zone */}
      <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
        style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "16px", background: "#f8faff" }}>
        {files.length > 0 ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "52px", borderRadius: "6px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "10px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>
              {variant.inputFormat}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {files.length === 1 ? files[0].name : `${files.length} files selected`}
              </p>
              <button onClick={() => inputRef.current?.click()} style={{ fontSize: "11px", color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Change file
              </button>
            </div>
            <button onClick={handleReset} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "6px", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "#6b7280", fontSize: "13px" }}>✕</button>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>Drag & drop your file here or</div>
            <button onClick={() => inputRef.current?.click()} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#2563eb", color: "#fff", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px", border: "none" }}>
              {variant.inputLabel}
            </button>
          </div>
        )}
      </div>

      {/* Convert button + spinner */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button disabled={!isReady} onClick={handleConvert}
          style={{ padding: "10px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed" }}>
          {isProcessing ? "Converting..." : `Convert to ${variant.outputFormat.toUpperCase()}`}
        </button>
        {isProcessing && <Spinner />}
      </div>

      {/* Progress bar */}
      {isProcessing && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}>
            <span>Converting...</span><span>{Math.round(progress)}%</span>
          </div>
          <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "5px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "#2563eb", borderRadius: "99px", transition: "width 0.3s ease" }} />
          </div>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div style={{ padding: "12px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {/* Result - multiple image pages (PDF→JPG/PNG) */}
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
              <button key={i} onClick={() => downloadImage(url, i)} style={{ padding: "9px 14px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", fontWeight: 500, cursor: "pointer", fontSize: "13px", color: "#333", textAlign: "left" }}>
                ⬇ Page {i + 1}
              </button>
            ))}
          </div>
          <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
            <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "12px", color: "#2563eb", fontWeight: 500 }}>→ Convert another file</button>
          </div>
        </div>
      )}

      {/* Result - single file download (image→PDF) */}
      {status === "done" && downloadUrl && (
        <div style={{ border: "1px solid #bfdbfe", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ background: "#eff6ff", padding: "12px 16px" }}>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ Conversion complete</p>
            <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>Your file is ready to download</p>
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

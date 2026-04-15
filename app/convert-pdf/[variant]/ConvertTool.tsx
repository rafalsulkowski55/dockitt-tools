"use client";

import { useState, useRef, useEffect } from "react";
import { ConvertVariant } from "@/data/convert/variants";
import { ToolTracking } from "@/lib/analytics";
import { useConversionLimit } from "@/lib/use-conversion-limit";
import PricingModal from "@/app/components/PricingModal";

const R2_VARIANTS = new Set(["pdf-to-word", "word-to-pdf"]);

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
  const [status, setStatus] = useState<"idle" | "processing" | "uploading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resultUrls, setResultUrls] = useState<string[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [storageKey, setStorageKey] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { showPricingModal, setShowPricingModal, checkDownloadLimit, onConversionSuccess, setPendingDownload } = useConversionLimit();

  const processingType = R2_VARIANTS.has(variant.slug) ? "server" : "browser";

  useEffect(() => {
    ToolTracking.viewTool(variant.slug, processingType);
  }, [variant.slug, processingType]);

  function handleFiles(selected: File[]) {
    setFiles(selected);
    setStatus("idle");
    setErrorMessage("");
    setResultUrls([]);
    setDownloadUrl(null);
    setStorageKey(null);
    setProgress(0);
    if (selected.length > 0) ToolTracking.uploadStarted(variant.slug, processingType);
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
    setDownloadUrl(null); setStorageKey(null); setProgress(0);
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
    ToolTracking.processSuccess(variant.slug, processingType);
  }

  async function convertViaApi() {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("variant", variant.slug);
    const res = await fetch("/api/convert-pdf", { method: "POST", body: formData });
    if (!res.ok) { const err = await res.json(); throw new Error(err.error ?? "Unknown error"); }
    setProgress(100);
    setDownloadUrl(URL.createObjectURL(await res.blob()));
    setStatus("done");
    ToolTracking.processSuccess(variant.slug, processingType);
  }

  async function convertViaR2() {
    const file = files[0];
    const createRes = await fetch("/api/uploads/create", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, contentType: file.type, sizeBytes: file.size, toolSlug: variant.slug }),
    });
    if (!createRes.ok) { const err = await createRes.json(); throw new Error(err.error ?? "Failed to create upload URL"); }
    const { uploadUrl, storageKey: sk } = await createRes.json();
    setStatus("uploading"); setProgress(10);
    const uploadRes = await fetch(uploadUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
    if (!uploadRes.ok) throw new Error("Upload to storage failed");
    setProgress(50); setStatus("processing");
    const completeRes = await fetch("/api/uploads/complete", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storageKey: sk, toolSlug: variant.slug, processingParams: {} }),
    });
    if (!completeRes.ok) { const err = await completeRes.json(); throw new Error(err.error ?? "Processing failed"); }
    setProgress(100);
    const result = await completeRes.json();
    setDownloadUrl(result.downloadUrl); setStorageKey(sk);
    setPendingDownload({ storageKey: sk, filename: `converted-${file.name}`, toolSlug: variant.slug, toolPath: `/convert-pdf/${variant.slug}`, timestamp: Date.now() });
    setStatus("done");
    ToolTracking.processSuccess(variant.slug, processingType);
  }

  async function handleConvert() {
    if (files.length === 0) return;
    ToolTracking.processStarted(variant.slug, processingType);
    setStatus("processing"); setErrorMessage(""); setResultUrls([]); setDownloadUrl(null); setStorageKey(null); setProgress(0);
    const interval = setInterval(() => { setProgress((p) => (p < 80 ? p + Math.random() * 10 : p)); }, 400);
    try {
      if (variant.slug === "pdf-to-jpg" || variant.slug === "pdf-to-png") {
        clearInterval(interval);
        await convertPdfToImage(files[0], variant.slug === "pdf-to-jpg" ? "jpeg" : "png");
      } else if (R2_VARIANTS.has(variant.slug)) {
        clearInterval(interval);
        await convertViaR2();
      } else {
        await convertViaApi();
        clearInterval(interval);
      }
    } catch (err: unknown) {
      clearInterval(interval);
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      setStatus("error"); setProgress(0);
    }
  }

  async function downloadImage(url: string, index: number) {
    const canDownload = await checkDownloadLimit(); if (!canDownload) return;
    onConversionSuccess(); ToolTracking.downloadClicked(variant.slug, processingType);
    const a = document.createElement("a"); a.href = url; a.download = `page-${index + 1}.${variant.outputFormat}`; a.click();
  }

  async function downloadAll() {
    const canDownload = await checkDownloadLimit(); if (!canDownload) return;
    onConversionSuccess();
    resultUrls.forEach((url, i) => {
      ToolTracking.downloadClicked(variant.slug, processingType);
      const a = document.createElement("a"); a.href = url; a.download = `page-${i + 1}.${variant.outputFormat}`; a.click();
    });
  }

  async function handleDownload() {
    if (!downloadUrl) return;
    const canDownload = await checkDownloadLimit(); if (!canDownload) return;
    onConversionSuccess(); ToolTracking.downloadClicked(variant.slug, processingType);
    const a = document.createElement("a"); a.href = downloadUrl; a.download = `converted.${variant.outputFormat}`; a.click();
  }

  const isProcessing = ["processing", "uploading"].includes(status);
  const isReady = files.length > 0 && !isProcessing;
  const processingLabel = status === "uploading" ? "Uploading to secure storage..." : "Converting...";

  return (
    <>
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
      <input ref={inputRef} type="file" accept={variant.accept}
        multiple={variant.inputFormat !== "pdf" && variant.inputFormat !== "docx"}
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
              <span>{processingLabel}</span><span>{Math.round(progress)}%</span>
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

        {/* Result — image pages */}
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

        {/* Result — single file download */}
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
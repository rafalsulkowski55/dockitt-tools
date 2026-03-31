"use client";

import { useState, useRef, useEffect } from "react";
import { ConvertVariant } from "@/data/convert/variants";
import { ToolTracking } from "@/lib/analytics";

const R2_VARIANTS = new Set(["pdf-to-word", "word-to-pdf"]);

type Props = {
  variant: ConvertVariant;
};

export default function ConvertTool({ variant }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "uploading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resultUrls, setResultUrls] = useState<string[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setDragOver(false);
    const selected = Array.from(e.dataTransfer.files);
    if (selected.length) handleFiles(selected);
  }

  async function convertPdfToImage(file: File, format: "jpeg" | "png") {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const urls: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      await page.render({ canvasContext: ctx as unknown as CanvasRenderingContext2D, viewport }).promise;
      const mimeType = format === "jpeg" ? "image/jpeg" : "image/png";
      urls.push(canvas.toDataURL(mimeType, 0.92));
      setProgress(Math.round((i / pdf.numPages) * 100));
    }

    setResultUrls(urls);
    setStatus("done");
    ToolTracking.processSuccess(variant.slug, processingType);
  }

  async function convertViaApi() {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("variant", variant.slug);

    const res = await fetch("/api/convert-pdf", { method: "POST", body: formData });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error ?? "Unknown error");
    }

    setProgress(100);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${variant.outputFormat}`;
    a.click();
    setStatus("done");
    ToolTracking.processSuccess(variant.slug, processingType);
    ToolTracking.downloadClicked(variant.slug, processingType);
  }

  async function convertViaR2() {
    const file = files[0];

    // Krok 1 — pobierz signed upload URL
    const createRes = await fetch("/api/uploads/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
        toolSlug: variant.slug,
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.json();
      throw new Error(err.error ?? "Failed to create upload URL");
    }

    const { uploadUrl, storageKey } = await createRes.json();

    // Krok 2 — upload bezpośrednio do R2
    setStatus("uploading");
    setProgress(10);

    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    if (!uploadRes.ok) throw new Error("Upload to storage failed");

    setProgress(50);

    // Krok 3 — wywołaj Railway worker
    setStatus("processing");
    const completeRes = await fetch("/api/uploads/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storageKey,
        toolSlug: variant.slug,
        processingParams: {},
      }),
    });

    if (!completeRes.ok) {
      const err = await completeRes.json();
      throw new Error(err.error ?? "Processing failed");
    }

    setProgress(100);
    const result = await completeRes.json();
    setDownloadUrl(result.downloadUrl);
    setStatus("done");
    ToolTracking.processSuccess(variant.slug, processingType);
  }

  async function handleConvert() {
    if (files.length === 0) return;
    ToolTracking.processStarted(variant.slug, processingType);
    setStatus("processing");
    setErrorMessage("");
    setResultUrls([]);
    setDownloadUrl(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p < 80 ? p + Math.random() * 10 : p));
    }, 400);

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
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMessage(message);
      setStatus("error");
      setProgress(0);
    }
  }

  function downloadImage(url: string, index: number) {
    ToolTracking.downloadClicked(variant.slug, processingType);
    const a = document.createElement("a");
    a.href = url;
    a.download = `page-${index + 1}.${variant.outputFormat}`;
    a.click();
  }

  function downloadAll() {
    resultUrls.forEach((url, i) => downloadImage(url, i));
  }

  function handleDownloadR2() {
    if (!downloadUrl) return;
    ToolTracking.downloadClicked(variant.slug, processingType);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `converted.${variant.outputFormat}`;
    a.click();
  }

  const isProcessing = ["processing", "uploading"].includes(status);
  const isReady = files.length > 0 && !isProcessing;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{ border: `2px dashed ${dragOver ? "#2563eb" : "#bfdbfe"}`, background: dragOver ? "#e0eeff" : "#f8faff", borderRadius: "12px", padding: "32px 24px", textAlign: "center", cursor: "pointer", transition: "all 0.15s" }}
      >
        <div style={{ fontSize: "28px", marginBottom: "8px" }}>📄</div>
        {files.length > 0 ? (
          <p style={{ fontSize: "14px", color: "#111", fontWeight: 500, margin: 0 }}>
            {files.map((f) => f.name).join(", ")}
          </p>
        ) : (
          <>
            <p style={{ fontSize: "14px", color: "#374151", fontWeight: 500, margin: "0 0 4px" }}>Drag & drop your file here</p>
            <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>or click to browse</p>
          </>
        )}
        <input ref={inputRef} id="convert-upload" type="file" accept={variant.accept} multiple={variant.inputFormat !== "pdf" && variant.inputFormat !== "docx"} style={{ display: "none" }} onChange={handleFileChange} />
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
        style={{ padding: "11px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 500, fontSize: "14px", cursor: "pointer", width: "fit-content" }}
      >
        {variant.inputLabel}
      </button>

      <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
        {processingType === "server"
          ? "🔐 Processed securely on our server. Files are automatically deleted after 30 minutes."
          : "🔒 Processed entirely in your browser. Files never leave your device."}
      </p>

      <button
        disabled={!isReady}
        onClick={handleConvert}
        style={{ padding: "12px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 500, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed", width: "fit-content" }}
      >
        {status === "uploading" ? "Uploading..." : status === "processing" ? "Converting..." : `Convert to ${variant.outputFormat.toUpperCase()}`}
      </button>

      {isProcessing && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#666", marginBottom: "2px" }}>
            <span>{status === "uploading" ? "Uploading to secure storage..." : "Converting..."}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ background: "#e5e7eb", borderRadius: "100px", height: "6px", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: "100px", background: "#2563eb", width: `${progress}%`, transition: "width 0.3s ease" }} />
          </div>
        </div>
      )}

      {status === "error" && (
        <div style={{ padding: "14px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px" }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {status === "done" && resultUrls.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ padding: "14px 16px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px" }}>
            ✅ Conversion complete — {resultUrls.length} page{resultUrls.length > 1 ? "s" : ""} converted.
          </div>
          {resultUrls.length > 1 && (
            <button onClick={downloadAll} style={{ padding: "12px 20px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 500, cursor: "pointer", width: "fit-content", fontSize: "14px" }}>
              ⬇ Download All
            </button>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {resultUrls.map((url, i) => (
              <button key={i} onClick={() => downloadImage(url, i)} style={{ padding: "10px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", fontWeight: 500, cursor: "pointer", width: "fit-content", fontSize: "14px", color: "#333" }}>
                ⬇ Download page {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {status === "done" && downloadUrl && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ padding: "20px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px" }}>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "#2563eb", margin: "0 0 6px" }}>✅ Conversion complete</p>
            <p style={{ fontSize: "13px", color: "#4b5563", margin: 0 }}>Your file is ready to download.</p>
          </div>
          <button onClick={handleDownloadR2} style={{ padding: "14px 28px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "15px", cursor: "pointer", width: "fit-content" }}>
            ⬇ Download {variant.outputFormat.toUpperCase()}
          </button>
        </div>
      )}

      {status === "done" && resultUrls.length === 0 && !downloadUrl && (
        <div style={{ padding: "14px 16px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px" }}>
          ✅ Conversion complete. Your file has been downloaded.
        </div>
      )}

    </div>
  );
}
"use client";

import { useState, useRef } from "react";
import { ConvertVariant } from "@/data/convert/variants";

type Props = {
  variant: ConvertVariant;
};

export default function ConvertTool({ variant }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resultUrls, setResultUrls] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(selected: File[]) {
    setFiles(selected);
    setStatus("idle");
    setErrorMessage("");
    setResultUrls([]);
    setProgress(0);
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
  }

  async function handleConvert() {
    if (files.length === 0) return;
    setStatus("processing");
    setErrorMessage("");
    setResultUrls([]);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p < 80 ? p + Math.random() * 10 : p));
    }, 400);

    try {
      if (variant.slug === "pdf-to-jpg" || variant.slug === "pdf-to-png") {
        clearInterval(interval);
        await convertPdfToImage(files[0], variant.slug === "pdf-to-jpg" ? "jpeg" : "png");
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
    const a = document.createElement("a");
    a.href = url;
    a.download = `page-${index + 1}.${variant.outputFormat}`;
    a.click();
  }

  function downloadAll() {
    resultUrls.forEach((url, i) => downloadImage(url, i));
  }

  const isReady = files.length > 0 && status !== "processing";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Drag & drop zona */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragOver ? "#2563eb" : "#bfdbfe"}`,
          background: dragOver ? "#e0eeff" : "#f8faff",
          borderRadius: "12px", padding: "32px 24px",
          textAlign: "center", cursor: "pointer", transition: "all 0.15s",
        }}
      >
        <div style={{ fontSize: "28px", marginBottom: "8px" }}>📄</div>
        {files.length > 0 ? (
          <p style={{ fontSize: "14px", color: "#111", fontWeight: 500, margin: 0 }}>
            {files.map((f) => f.name).join(", ")}
          </p>
        ) : (
          <>
            <p style={{ fontSize: "14px", color: "#374151", fontWeight: 500, margin: "0 0 4px" }}>
              Drag & drop your file here
            </p>
            <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>or click to browse</p>
          </>
        )}
        <input
          ref={inputRef}
          id="convert-upload"
          type="file"
          accept={variant.accept}
          multiple={variant.inputFormat !== "pdf"}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {/* Choose file button */}
      <button
        onClick={() => inputRef.current?.click()}
        style={{
          padding: "11px 20px", background: "#2563eb", color: "#fff",
          border: "none", borderRadius: "8px", fontWeight: 500,
          fontSize: "14px", cursor: "pointer", width: "fit-content",
        }}
      >
        {variant.inputLabel}
      </button>

      {/* Privacy note */}
      <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
        🔒 Processed securely and deleted immediately
      </p>

      {/* Convert button */}
      <button
        disabled={!isReady}
        onClick={handleConvert}
        style={{
          padding: "12px 20px",
          background: isReady ? "#2563eb" : "#d1d5db",
          color: "#fff", border: "none", borderRadius: "8px",
          fontWeight: 500, fontSize: "14px",
          cursor: isReady ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        {status === "processing" ? "Converting..." : `Convert to ${variant.outputFormat.toUpperCase()}`}
      </button>

      {/* Progress bar */}
      {status === "processing" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ background: "#e5e7eb", borderRadius: "100px", height: "6px", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: "100px", background: "#2563eb",
              width: `${progress}%`, transition: "width 0.3s ease",
            }} />
          </div>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{Math.round(progress)}%</p>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div style={{ padding: "14px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px" }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {/* Success — image results */}
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

      {/* Success — file download */}
      {status === "done" && resultUrls.length === 0 && (
        <div style={{ padding: "14px 16px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px" }}>
          ✅ Conversion complete. Your file has been downloaded.
        </div>
      )}

    </div>
  );
}
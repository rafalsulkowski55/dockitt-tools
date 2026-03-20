"use client";

import { useState } from "react";
import { ConvertVariant } from "@/data/convert/variants";

type Props = {
  variant: ConvertVariant;
};

export default function ConvertTool({ variant }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resultUrls, setResultUrls] = useState<string[]>([]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    setFiles(selected);
    setStatus("idle");
    setErrorMessage("");
    setResultUrls([]);
    e.target.value = "";
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
      const url = canvas.toDataURL(mimeType, 0.92);
      urls.push(url);
    }

    setResultUrls(urls);
    setStatus("done");
  }

  async function convertViaApi() {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("variant", variant.slug);

    const res = await fetch("/api/convert-pdf", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error ?? "Unknown error");
    }

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

    try {
      if (variant.slug === "pdf-to-jpg" || variant.slug === "pdf-to-png") {
        await convertPdfToImage(files[0], variant.slug === "pdf-to-jpg" ? "jpeg" : "png");
      } else {
        await convertViaApi();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMessage(message);
      setStatus("error");
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <label
          htmlFor="convert-upload"
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            padding: "12px 18px", background: "#111111", color: "#ffffff",
            borderRadius: "10px", fontWeight: 600, cursor: "pointer",
          }}
        >
          {variant.inputLabel}
        </label>
        <span style={{ color: "#666666", fontSize: "15px" }}>
          {files.length === 0 ? "No file selected" : files.map((f) => f.name).join(", ")}
        </span>
        <input
          id="convert-upload"
          type="file"
          accept={variant.accept}
          multiple={variant.inputFormat !== "pdf"}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      <button
        disabled={files.length === 0 || status === "processing"}
        onClick={handleConvert}
        style={{
          padding: "12px 18px",
          background: files.length > 0 && status !== "processing" ? "#2563eb" : "#d1d5db",
          color: "#ffffff", border: "none", borderRadius: "10px",
          fontWeight: 600,
          cursor: files.length > 0 && status !== "processing" ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        {status === "processing" ? "Converting..." : `Convert to ${variant.outputFormat.toUpperCase()}`}
      </button>

      {status === "error" && (
        <div style={{
          padding: "14px 16px", background: "#fef2f2", color: "#dc2626",
          border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px",
        }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {status === "done" && resultUrls.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{
            padding: "14px 16px", background: "#eff6ff", color: "#1d4ed8",
            border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px",
          }}>
            Conversion complete — {resultUrls.length} page{resultUrls.length > 1 ? "s" : ""} converted.
          </div>

          {resultUrls.length > 1 && (
            <button
              onClick={downloadAll}
              style={{
                padding: "12px 18px", background: "#16a34a", color: "#ffffff",
                border: "none", borderRadius: "10px", fontWeight: 600,
                cursor: "pointer", width: "fit-content",
              }}
            >
              Download All
            </button>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {resultUrls.map((url, i) => (
              <button
                key={i}
                onClick={() => downloadImage(url, i)}
                style={{
                  padding: "10px 16px", background: "#f9fafb",
                  border: "1px solid #e5e7eb", borderRadius: "10px",
                  fontWeight: 500, cursor: "pointer", width: "fit-content",
                  fontSize: "14px", color: "#333",
                }}
              >
                Download page {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {status === "done" && resultUrls.length === 0 && (
        <div style={{
          padding: "14px 16px", background: "#eff6ff", color: "#1d4ed8",
          border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px",
        }}>
          Conversion complete. Your file has been downloaded.
        </div>
      )}

    </div>
  );
}
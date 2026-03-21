"use client";

import { useState } from "react";

export default function OcrUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null);
    setStatus("idle");
    setErrorMessage("");
  }

  async function handleOcr() {
    if (!file) return;
    setStatus("processing");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/ocr-pdf", {
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
      a.download = `ocr-${file.name}`;
      a.click();
      setStatus("done");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMessage(message);
      setStatus("error");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <label htmlFor="ocr-upload" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          padding: "12px 18px", background: "#111111", color: "#ffffff",
          borderRadius: "10px", fontWeight: 600, cursor: "pointer",
        }}>
          Choose PDF
        </label>
        <span style={{ color: "#666666", fontSize: "15px" }}>
          {file ? file.name : "No file selected"}
        </span>
        <input id="ocr-upload" type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />
      </div>

      <button
        disabled={!file || status === "processing"}
        onClick={handleOcr}
        style={{
          padding: "12px 18px",
          background: file && status !== "processing" ? "#2563eb" : "#d1d5db",
          color: "#ffffff", border: "none", borderRadius: "10px",
          fontWeight: 600,
          cursor: file && status !== "processing" ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        {status === "processing" ? "Processing..." : "OCR PDF"}
      </button>

      {status === "error" && (
        <div style={{
          padding: "14px 16px", background: "#fef2f2", color: "#dc2626",
          border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px",
        }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {status === "done" && (
        <div style={{
          padding: "14px 16px", background: "#f0fdf4", color: "#16a34a",
          border: "1px solid #bbf7d0", borderRadius: "10px", fontSize: "14px",
        }}>
          OCR complete. Your searchable PDF has been downloaded.
        </div>
      )}
    </div>
  );
}
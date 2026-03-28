"use client";

import { useState, useRef } from "react";

export default function OcrUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    setFile(f);
    setStatus("idle");
    setErrorMessage("");
    setProgress(0);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type === "application/pdf") handleFile(f);
  }

  async function handleOcr() {
    if (!file) return;
    setStatus("processing");
    setErrorMessage("");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p < 85 ? p + Math.random() * 8 : p));
    }, 400);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/ocr-pdf", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Unknown error");
      }

      setProgress(100);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ocr-${file.name}`;
      a.click();
      setStatus("done");
    } catch (err: unknown) {
      clearInterval(interval);
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMessage(message);
      setStatus("error");
      setProgress(0);
    }
  }

  const isReady = file && status !== "processing";

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
        {file ? (
          <p style={{ fontSize: "14px", color: "#111", fontWeight: 500, margin: 0 }}>{file.name}</p>
        ) : (
          <>
            <p style={{ fontSize: "14px", color: "#374151", fontWeight: 500, margin: "0 0 4px" }}>
              Drag & drop your PDF here
            </p>
            <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>or click to browse</p>
          </>
        )}
        <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />
      </div>

      {/* Choose PDF button */}
      <button
        onClick={() => inputRef.current?.click()}
        style={{
          padding: "11px 20px", background: "#2563eb", color: "#fff",
          border: "none", borderRadius: "8px", fontWeight: 500,
          fontSize: "14px", cursor: "pointer", width: "fit-content",
        }}
      >
        Choose PDF
      </button>

      {/* Privacy note */}
      <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
        🔒 Processed securely and deleted immediately
      </p>

      {/* OCR info */}
      <div style={{ background: "#f8faff", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "12px 14px" }}>
        <p style={{ fontSize: "13px", color: "#4b5563", margin: 0, lineHeight: 1.5 }}>
          ℹ️ OCR makes scanned PDFs searchable and selectable. Processing may take 30–60 seconds depending on file size.
        </p>
      </div>

      {/* Action button */}
      <button
        disabled={!isReady}
        onClick={handleOcr}
        style={{
          padding: "12px 20px",
          background: isReady ? "#2563eb" : "#d1d5db",
          color: "#fff", border: "none", borderRadius: "8px",
          fontWeight: 500, fontSize: "14px",
          cursor: isReady ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        {status === "processing" ? "Running OCR..." : "Run OCR"}
      </button>

      {/* Progress bar */}
      {status === "processing" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ background: "#e5e7eb", borderRadius: "100px", height: "6px", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: "100px", background: "#2563eb",
              width: `${progress}%`, transition: "width 0.4s ease",
            }} />
          </div>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
            {Math.round(progress)}% — OCR can take up to 60 seconds for large files
          </p>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div style={{ padding: "14px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px" }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {/* Success */}
      {status === "done" && (
        <div style={{ padding: "14px 16px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px" }}>
          ✅ OCR complete. Your searchable PDF has been downloaded.
        </div>
      )}

    </div>
  );
}
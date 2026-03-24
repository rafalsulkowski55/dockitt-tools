"use client";

import { useState, useRef } from "react";

export default function ToolUpload() {
  const [fileName, setFileName] = useState("No file selected");
  const [fileSize, setFileSize] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [resultInfo, setResultInfo] = useState<{
    originalSize: number;
    compressedSize: number;
    reduction: number;
    url: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setFileName(f ? f.name : "No file selected");
    setFileSize(f ? formatSize(f.size) : "");
    setStatus("idle");
    setResultInfo(null);
    setProgress(0);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    if (f && f.type === "application/pdf") {
      setFile(f);
      setFileName(f.name);
      setFileSize(formatSize(f.size));
      setStatus("idle");
      setResultInfo(null);
      setProgress(0);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function handleProcess() {
    if (!file) return;
    setStatus("processing");
    setResultInfo(null);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => (p < 85 ? p + 5 : p));
    }, 300);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/compress-pdf", { method: "POST", body: formData });
      clearInterval(interval);
      setProgress(100);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Unknown error");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const originalSize = parseInt(res.headers.get("X-Original-Size") ?? "0");
      const compressedSize = parseInt(res.headers.get("X-Compressed-Size") ?? "0");
      const reduction = parseInt(res.headers.get("X-Reduction-Percent") ?? "0");
      setResultInfo({ originalSize, compressedSize, reduction, url });
      setStatus("done");
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      setStatus("error");
    }
  }

  function handleDownload() {
    if (!resultInfo) return;
    const a = document.createElement("a");
    a.href = resultInfo.url;
    a.download = `compressed-${file?.name ?? "file.pdf"}`;
    a.click();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #bfdbfe",
          borderRadius: "12px",
          padding: "24px",
          textAlign: "center",
          background: "#f8faff",
          cursor: "pointer",
        }}
        onClick={() => inputRef.current?.click()}
      >
        <div style={{ fontSize: "13px", color: "#666", marginBottom: "12px" }}>
          Drag & drop your PDF here or
        </div>
        <label
          htmlFor="pdf-upload"
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            padding: "10px 20px", background: "#2563eb", color: "#ffffff",
            borderRadius: "10px", fontWeight: 600, cursor: "pointer",
            fontSize: "14px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          Choose PDF
        </label>
        <input
          id="pdf-upload"
          ref={inputRef}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {fileName !== "No file selected" && (
          <div style={{ marginTop: "12px", fontSize: "14px", color: "#444" }}>
            📄 {fileName} {fileSize && `(${fileSize})`}
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#555" }}>
        <span>🔒</span>
        Files never leave your device — processed entirely in your browser.
      </div>

      <button
        disabled={!file || status === "processing"}
        onClick={handleProcess}
        style={{
          padding: "12px 24px",
          background: file && status !== "processing" ? "#2563eb" : "#d1d5db",
          color: "#ffffff", border: "none", borderRadius: "10px",
          fontWeight: 600, fontSize: "15px",
          cursor: file && status !== "processing" ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        {status === "processing" ? "Processing..." : "Compress PDF"}
      </button>

      {status === "processing" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#666", marginBottom: "6px" }}>
            <span>Processing...</span>
            <span>{progress}%</span>
          </div>
          <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "6px", overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${progress}%`, background: "#2563eb",
              borderRadius: "99px", transition: "width 0.3s ease",
            }} />
          </div>
        </div>
      )}

      {status === "error" && (
        <div style={{
          padding: "14px 16px", background: "#fef2f2", color: "#dc2626",
          border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px",
        }}>
          Something went wrong. Please try again.
        </div>
      )}

      {status === "done" && resultInfo && (
        <div style={{
          padding: "14px 16px", background: "#eff6ff", color: "#1d4ed8",
          border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px",
        }}>
          {resultInfo.reduction > 0
            ? `Compression complete. File size reduced by ${resultInfo.reduction}% (${formatSize(resultInfo.originalSize)} → ${formatSize(resultInfo.compressedSize)})`
            : `File processed. Original size: ${formatSize(resultInfo.originalSize)}`
          }
        </div>
      )}

      {status === "done" && resultInfo && (
        <button
          onClick={handleDownload}
          style={{
            padding: "12px 24px", background: "#16a34a", color: "#ffffff",
            border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "15px",
            cursor: "pointer", width: "fit-content",
          }}
        >
          Download PDF
        </button>
      )}
    </div>
  );
}
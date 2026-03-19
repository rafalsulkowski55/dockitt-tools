"use client";

import { useState, useRef } from "react";

export default function ToolUpload() {
  const [fileName, setFileName] = useState("No file selected");
  const [fileSize, setFileSize] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
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
  }

  async function handleProcess() {
    if (!file) return;

    setStatus("processing");
    setResultInfo(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/compress-pdf", {
        method: "POST",
        body: formData,
      });

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
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <label
          htmlFor="pdf-upload"
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            padding: "12px 18px", background: "#111111", color: "#ffffff",
            borderRadius: "10px", fontWeight: 600, cursor: "pointer",
          }}
        >
          Choose PDF
        </label>
        <span style={{ color: "#666666", fontSize: "15px" }}>{fileName}</span>
        <input
          id="pdf-upload"
          ref={inputRef}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {fileSize && (
        <div style={{ fontSize: "14px", color: "#666666" }}>
          File size: {fileSize}
        </div>
      )}

      <button
        disabled={!file || status === "processing"}
        onClick={handleProcess}
        style={{
          padding: "12px 18px",
          background: file && status !== "processing" ? "#2563eb" : "#d1d5db",
          color: "#ffffff", border: "none", borderRadius: "10px",
          fontWeight: 600,
          cursor: file && status !== "processing" ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        {status === "processing" ? "Processing..." : "Process PDF"}
      </button>

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
            padding: "12px 18px", background: "#16a34a", color: "#ffffff",
            border: "none", borderRadius: "10px", fontWeight: 600,
            cursor: "pointer", width: "fit-content",
          }}
        >
          Download PDF
        </button>
      )}
    </div>
  );
}
"use client";

import { useState, useRef } from "react";

export default function MergeUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...selected]);
    setStatus("idle");
    setDownloadUrl(null);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...dropped]);
    setStatus("idle");
    setDownloadUrl(null);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setStatus("idle");
    setDownloadUrl(null);
  }

  async function handleProcess() {
    if (files.length < 2) return;
    setStatus("processing");
    setDownloadUrl(null);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => (p < 85 ? p + 5 : p));
    }, 300);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const res = await fetch("/api/merge-pdf", { method: "POST", body: formData });
      clearInterval(interval);
      setProgress(100);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Unknown error");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStatus("done");
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      setStatus("error");
    }
  }

  function handleDownload() {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "merged.pdf";
    a.click();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current?.click()}
        style={{
          border: "2px dashed #bfdbfe", borderRadius: "12px",
          padding: "24px", textAlign: "center",
          background: "#f8faff", cursor: "pointer",
        }}
      >
        <div style={{ fontSize: "13px", color: "#666", marginBottom: "12px" }}>
          Drag & drop your PDFs here or
        </div>
        <label
          htmlFor="merge-upload"
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            padding: "10px 20px", background: "#2563eb", color: "#ffffff",
            borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          Choose PDFs
        </label>
        <input
          id="merge-upload"
          ref={inputRef}
          type="file"
          accept=".pdf"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {files.length > 0 && (
          <div style={{ marginTop: "12px", fontSize: "14px", color: "#444" }}>
            📄 {files.length} file(s) selected
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#555" }}>
        <span>🔒</span>
        Processed entirely in your browser.
      </div>

      {files.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {files.map((file, index) => (
            <div
              key={index}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", background: "#f9fafb",
                border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px",
              }}
            >
              <span style={{ color: "#333" }}>
                {index + 1}. {file.name} <span style={{ color: "#999" }}>({formatSize(file.size)})</span>
              </span>
              <button
                onClick={() => removeFile(index)}
                style={{
                  background: "none", border: "none", color: "#999",
                  cursor: "pointer", fontSize: "16px", padding: "0 4px",
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        disabled={files.length < 2 || status === "processing"}
        onClick={handleProcess}
        style={{
          padding: "12px 24px",
          background: files.length >= 2 && status !== "processing" ? "#2563eb" : "#d1d5db",
          color: "#ffffff", border: "none", borderRadius: "10px",
          fontWeight: 600, fontSize: "15px",
          cursor: files.length >= 2 && status !== "processing" ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        {status === "processing" ? "Processing..." : "Merge PDFs"}
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

      {status === "done" && (
        <div style={{
          padding: "14px 16px", background: "#eff6ff", color: "#1d4ed8",
          border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px",
        }}>
          Merge complete. Your files have been combined into one PDF.
        </div>
      )}

      {status === "done" && downloadUrl && (
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
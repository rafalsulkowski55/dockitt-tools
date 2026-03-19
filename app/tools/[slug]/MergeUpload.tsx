"use client";

import { useState } from "react";

export default function MergeUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

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

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setStatus("idle");
    setDownloadUrl(null);
  }

  async function handleProcess() {
    if (files.length < 2) return;

    setStatus("processing");
    setDownloadUrl(null);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const res = await fetch("/api/merge-pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Unknown error");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStatus("done");
    } catch (err) {
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
      {/* File picker */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <label
          htmlFor="merge-upload"
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            padding: "12px 18px", background: "#111111", color: "#ffffff",
            borderRadius: "10px", fontWeight: 600, cursor: "pointer",
          }}
        >
          Choose PDFs
        </label>
        <span style={{ color: "#666666", fontSize: "15px" }}>
          {files.length === 0 ? "No files selected" : `${files.length} file(s) selected`}
        </span>
        <input
          id="merge-upload"
          type="file"
          accept=".pdf"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {/* File list */}
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

      {/* Process button */}
      <button
        disabled={files.length < 2 || status === "processing"}
        onClick={handleProcess}
        style={{
          padding: "12px 18px",
          background: files.length >= 2 && status !== "processing" ? "#2563eb" : "#d1d5db",
          color: "#ffffff", border: "none", borderRadius: "10px",
          fontWeight: 600,
          cursor: files.length >= 2 && status !== "processing" ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        {status === "processing" ? "Processing..." : "Merge PDFs"}
      </button>

      {/* Error */}
      {status === "error" && (
        <div style={{
          padding: "14px 16px", background: "#fef2f2", color: "#dc2626",
          border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px",
        }}>
          Something went wrong. Please try again.
        </div>
      )}

      {/* Success */}
      {status === "done" && (
        <div style={{
          padding: "14px 16px", background: "#eff6ff", color: "#1d4ed8",
          border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px",
        }}>
          Merge complete. Your files have been combined into one PDF.
        </div>
      )}

      {/* Download */}
      {status === "done" && downloadUrl && (
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
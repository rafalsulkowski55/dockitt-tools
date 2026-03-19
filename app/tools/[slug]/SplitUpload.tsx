"use client";

import { useState } from "react";

export default function SplitUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [fromPage, setFromPage] = useState("1");
  const [toPage, setToPage] = useState("1");
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setStatus("idle");
    setDownloadUrl(null);
    setErrorMessage("");
    setTotalPages(null);
    setFromPage("1");
    setToPage("1");
  }

  async function handleProcess() {
    if (!file) return;

    setStatus("processing");
    setDownloadUrl(null);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fromPage", fromPage);
      formData.append("toPage", toPage);

      const res = await fetch("/api/split-pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Unknown error");
      }

      const total = parseInt(res.headers.get("X-Total-Pages") ?? "0");
      if (total > 0) setTotalPages(total);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStatus("done");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMessage(message);
      setStatus("error");
    }
  }

  function handleDownload() {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `split-pages-${fromPage}-${toPage}.pdf`;
    a.click();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* File picker */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <label
          htmlFor="split-upload"
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            padding: "12px 18px", background: "#111111", color: "#ffffff",
            borderRadius: "10px", fontWeight: 600, cursor: "pointer",
          }}
        >
          Choose PDF
        </label>
        <span style={{ color: "#666666", fontSize: "15px" }}>
          {file ? file.name : "No file selected"}
        </span>
        <input
          id="split-upload"
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {/* Page range */}
      {file && (
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "14px", color: "#444" }}>Pages from</span>
          <input
            type="number"
            min="1"
            value={fromPage}
            onChange={(e) => setFromPage(e.target.value)}
            style={{
              width: "70px", padding: "8px 12px", border: "1px solid #d1d5db",
              borderRadius: "8px", fontSize: "14px",
            }}
          />
          <span style={{ fontSize: "14px", color: "#444" }}>to</span>
          <input
            type="number"
            min="1"
            value={toPage}
            onChange={(e) => setToPage(e.target.value)}
            style={{
              width: "70px", padding: "8px 12px", border: "1px solid #d1d5db",
              borderRadius: "8px", fontSize: "14px",
            }}
          />
          {totalPages && (
            <span style={{ fontSize: "13px", color: "#999" }}>
              (PDF has {totalPages} pages)
            </span>
          )}
        </div>
      )}

      {/* Process button */}
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
        {status === "processing" ? "Processing..." : "Split PDF"}
      </button>

      {/* Error */}
      {status === "error" && (
        <div style={{
          padding: "14px 16px", background: "#fef2f2", color: "#dc2626",
          border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px",
        }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {/* Success */}
      {status === "done" && (
        <div style={{
          padding: "14px 16px", background: "#eff6ff", color: "#1d4ed8",
          border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px",
        }}>
          Done. Pages {fromPage}–{toPage} extracted successfully.
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
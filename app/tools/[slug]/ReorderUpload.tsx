"use client";

import { useState } from "react";

export default function ReorderUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [pages, setPages] = useState<number[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setStatus("idle");
    setErrorMessage("");
    setPages([]);
    setTotalPages(null);

    if (!f) return;

    const { PDFDocument } = await import("pdf-lib");
    const arrayBuffer = await f.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const total = pdfDoc.getPageCount();
    setTotalPages(total);
    setPages(Array.from({ length: total }, (_, i) => i + 1));
  }

  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const newPages = [...pages];
    const dragged = newPages.splice(dragIndex, 1)[0];
    newPages.splice(index, 0, dragged);
    setPages(newPages);
    setDragIndex(index);
  }

  function handleDragEnd() {
    setDragIndex(null);
  }

  async function handleProcess() {
    if (!file || pages.length === 0) return;
    setStatus("processing");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("order", pages.join(","));

      const res = await fetch("/api/reorder-pdf-pages", {
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
      a.download = `reordered-${file.name}`;
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
        <label
          htmlFor="reorder-upload"
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
          id="reorder-upload"
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {totalPages && pages.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "14px", color: "#444" }}>
            Drag pages to reorder:
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {pages.map((pageNum, index) => (
              <div
                key={`${pageNum}-${index}`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                style={{
                  padding: "10px 16px",
                  background: dragIndex === index ? "#dbeafe" : "#f9fafb",
                  border: "1px solid",
                  borderColor: dragIndex === index ? "#2563eb" : "#e5e7eb",
                  borderRadius: "8px",
                  cursor: "grab",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#333",
                  userSelect: "none",
                }}
              >
                Page {pageNum}
              </div>
            ))}
          </div>
          <span style={{ fontSize: "13px", color: "#999" }}>
            Current order: {pages.join(" → ")}
          </span>
        </div>
      )}

      <button
        disabled={!file || pages.length === 0 || status === "processing"}
        onClick={handleProcess}
        style={{
          padding: "12px 18px",
          background: file && pages.length > 0 && status !== "processing" ? "#2563eb" : "#d1d5db",
          color: "#ffffff", border: "none", borderRadius: "10px",
          fontWeight: 600,
          cursor: file && pages.length > 0 && status !== "processing" ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        {status === "processing" ? "Processing..." : "Reorder Pages"}
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
          padding: "14px 16px", background: "#eff6ff", color: "#1d4ed8",
          border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px",
        }}>
          Done. Your reordered PDF has been downloaded.
        </div>
      )}

    </div>
  );
}
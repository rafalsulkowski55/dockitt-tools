"use client";

import { useState, useRef, useEffect } from "react";
import { ToolTracking } from "@/lib/analytics";
import { useConversionLimit } from "@/lib/use-conversion-limit";
import PricingModal from "@/app/components/PricingModal";

const TOOL_NAME = "reorder-pdf-pages";
const PROCESSING_TYPE = "browser" as const;

export default function ReorderUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [pages, setPages] = useState<number[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { showPricingModal, setShowPricingModal, checkLimit, checkDownloadLimit, onConversionSuccess } = useConversionLimit();

  useEffect(() => {
    ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE);
  }, []);

  async function handleFile(f: File) {
    setFile(f);
    setStatus("idle");
    setErrorMessage("");
    setPages([]);
    setTotalPages(null);
    setProgress(0);
    ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
    const { PDFDocument } = await import("pdf-lib");
    const arrayBuffer = await f.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const total = pdfDoc.getPageCount();
    setTotalPages(total);
    setPages(Array.from({ length: total }, (_, i) => i + 1));
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

  function handleDragStart(index: number) { setDragIndex(index); }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const newPages = [...pages];
    const dragged = newPages.splice(dragIndex, 1)[0];
    newPages.splice(index, 0, dragged);
    setPages(newPages);
    setDragIndex(index);
  }

  function handleDragEnd() { setDragIndex(null); }

  async function handleProcess() {
    if (!file || pages.length === 0) return;
    if (!checkLimit()) return;

    ToolTracking.processStarted(TOOL_NAME, PROCESSING_TYPE);
    setStatus("processing");
    setErrorMessage("");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p < 85 ? p + Math.random() * 12 : p));
    }, 300);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const arrayBuffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const newDoc = await PDFDocument.create();
      const pageIndices = pages.map(n => n - 1);
      const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
      copiedPages.forEach(page => newDoc.addPage(page));
      clearInterval(interval);
      setProgress(100);
      const newBytes = await newDoc.save();
      const blob = new Blob([new Uint8Array(newBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reordered-${file.name}`;
      a.click();
      setStatus("done");
      onConversionSuccess();
      ToolTracking.processSuccess(TOOL_NAME, PROCESSING_TYPE);
      ToolTracking.downloadClicked(TOOL_NAME, PROCESSING_TYPE);
    } catch (err: unknown) {
      clearInterval(interval);
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMessage(message);
      setStatus("error");
      setProgress(0);
    }
  }

  const isReady = file && pages.length > 0 && status !== "processing";

  return (
    <>
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      <div onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop} style={{ border: `2px dashed ${dragOver ? "#2563eb" : "#bfdbfe"}`, background: dragOver ? "#e0eeff" : "#f8faff", borderRadius: "12px", padding: "32px 24px", textAlign: "center", cursor: "pointer", transition: "all 0.15s" }}>
        <div style={{ fontSize: "28px", marginBottom: "8px" }}>📄</div>
        {file ? (
          <p style={{ fontSize: "14px", color: "#111", fontWeight: 500, margin: 0 }}>{file.name}</p>
        ) : (
          <>
            <p style={{ fontSize: "14px", color: "#374151", fontWeight: 500, margin: "0 0 4px" }}>Drag & drop your PDF here</p>
            <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>or click to browse</p>
          </>
        )}
        <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />
      </div>

      <button onClick={() => inputRef.current?.click()} style={{ padding: "11px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 500, fontSize: "14px", cursor: "pointer", width: "fit-content" }}>
        Choose PDF
      </button>

      <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>🔒 Processed entirely in your browser. Files never leave your device.</p>

      {totalPages && pages.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={{ fontSize: "14px", color: "#111", fontWeight: 500 }}>Drag pages to reorder:</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {pages.map((pageNum, index) => (
              <div key={`${pageNum}-${index}`} draggable onDragStart={() => handleDragStart(index)} onDragOver={(e) => handleDragOver(e, index)} onDragEnd={handleDragEnd} style={{ padding: "10px 16px", background: dragIndex === index ? "#dbeafe" : "#f9fafb", border: "1px solid", borderColor: dragIndex === index ? "#2563eb" : "#e5e7eb", borderRadius: "8px", cursor: "grab", fontSize: "14px", fontWeight: 500, color: "#333", userSelect: "none" }}>
                Page {pageNum}
              </div>
            ))}
          </div>
          <span style={{ fontSize: "13px", color: "#9ca3af" }}>Current order: {pages.join(" → ")}</span>
        </div>
      )}

      <button disabled={!isReady} onClick={handleProcess} style={{ padding: "12px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 500, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed", width: "fit-content" }}>
        {status === "processing" ? "Reordering..." : "Reorder Pages"}
      </button>

      {status === "processing" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ background: "#e5e7eb", borderRadius: "100px", height: "6px", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: "100px", background: "#2563eb", width: `${progress}%`, transition: "width 0.3s ease" }} />
          </div>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{Math.round(progress)}%</p>
        </div>
      )}

      {status === "error" && (
        <div style={{ padding: "14px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px" }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {status === "done" && (
        <div style={{ padding: "14px 16px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px" }}>
          ✅ Pages reordered and PDF downloaded successfully.
        </div>
      )}
      </div>
    </>
  );
}
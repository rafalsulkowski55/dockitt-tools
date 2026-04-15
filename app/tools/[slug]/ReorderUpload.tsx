"use client";

import { useState, useRef, useEffect } from "react";
import { ToolTracking } from "@/lib/analytics";
import { useConversionLimit } from "@/lib/use-conversion-limit";
import { usePendingFile } from "@/lib/use-pending-file";
import PricingModal from "@/app/components/PricingModal";

const TOOL_NAME = "reorder-pdf-pages";
const PROCESSING_TYPE = "browser" as const;

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ReorderUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [pages, setPages] = useState<number[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { showPricingModal, setShowPricingModal, onConversionSuccess } = useConversionLimit();

  useEffect(() => { ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE); }, []);
  usePendingFile((f) => { handleFile(f); });

  async function handleFile(f: File) {
    setFile(f); setStatus("idle"); setErrorMessage(""); setPages([]); setTotalPages(null); setProgress(0);
    ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
    const { PDFDocument } = await import("pdf-lib");
    const pdfDoc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
    const total = pdfDoc.getPageCount();
    setTotalPages(total);
    setPages(Array.from({ length: total }, (_, i) => i + 1));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }
  function handleDrop(e: React.DragEvent) { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f && f.type === "application/pdf") handleFile(f); }

  function handleReset() {
    setFile(null); setStatus("idle"); setErrorMessage(""); setPages([]); setTotalPages(null); setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleDragStart(index: number) { setDragIndex(index); }
  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const newPages = [...pages]; const dragged = newPages.splice(dragIndex, 1)[0];
    newPages.splice(index, 0, dragged); setPages(newPages); setDragIndex(index);
  }
  function handleDragEnd() { setDragIndex(null); }

  async function handleProcess() {
    if (!file || pages.length === 0) return;
    ToolTracking.processStarted(TOOL_NAME, PROCESSING_TYPE);
    setStatus("processing"); setErrorMessage(""); setProgress(0);
    const interval = setInterval(() => { setProgress((p) => (p < 85 ? p + Math.random() * 12 : p)); }, 300);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const srcDoc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const newDoc = await PDFDocument.create();
      const copiedPages = await newDoc.copyPages(srcDoc, pages.map(n => n - 1));
      copiedPages.forEach(page => newDoc.addPage(page));
      clearInterval(interval); setProgress(100);
      const saved = await newDoc.save();
      const blob = new Blob([saved.buffer as ArrayBuffer], { type: "application/pdf" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `reordered-${file.name}`; a.click();
      setStatus("done"); onConversionSuccess();
      ToolTracking.processSuccess(TOOL_NAME, PROCESSING_TYPE);
      ToolTracking.downloadClicked(TOOL_NAME, PROCESSING_TYPE);
    } catch (err: unknown) {
      clearInterval(interval);
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      setStatus("error"); setProgress(0);
    }
  }

  const isReady = file && pages.length > 0 && status !== "processing";

  return (
    <>
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
      <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
          style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "16px", background: "#f8faff" }}>
          {file ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "52px", borderRadius: "6px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "10px", fontWeight: 700, color: "#2563eb" }}>PDF</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
                {totalPages && <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{totalPages} pages</p>}
                <button onClick={() => inputRef.current?.click()} style={{ fontSize: "11px", color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Change file</button>
              </div>
              <button onClick={handleReset} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "6px", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "#6b7280", fontSize: "13px" }}>✕</button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>Drag & drop your PDF here or</div>
              <button onClick={() => inputRef.current?.click()} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#2563eb", color: "#fff", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px", border: "none" }}>
                Choose PDF
              </button>
            </div>
          )}
        </div>

        {totalPages && pages.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p style={{ fontSize: "13px", fontWeight: 500, color: "#374151", margin: 0 }}>Drag pages to reorder:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {pages.map((pageNum, index) => (
                <div key={`${pageNum}-${index}`} draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  style={{ padding: "8px 14px", background: dragIndex === index ? "#dbeafe" : "#f9fafb", border: "1px solid", borderColor: dragIndex === index ? "#2563eb" : "#e5e7eb", borderRadius: "8px", cursor: "grab", fontSize: "13px", fontWeight: 500, color: "#333", userSelect: "none" }}>
                  Page {pageNum}
                </div>
              ))}
            </div>
            <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>Order: {pages.join(" → ")}</p>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button disabled={!isReady} onClick={handleProcess}
            style={{ padding: "10px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed" }}>
            {status === "processing" ? "Reordering..." : "Reorder Pages"}
          </button>
          {status === "processing" && <Spinner />}
        </div>

        {status === "processing" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}>
              <span>Reordering pages...</span><span>{Math.round(progress)}%</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "5px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#2563eb", borderRadius: "99px", transition: "width 0.3s ease" }} />
            </div>
          </div>
        )}

        {status === "error" && (
          <div style={{ padding: "12px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
            {errorMessage || "Something went wrong. Please try again."}
          </div>
        )}

        {status === "done" && (
          <div style={{ border: "1px solid #bfdbfe", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: "#eff6ff", padding: "12px 16px" }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ Pages reordered successfully</p>
              <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>Your file has been downloaded</p>
            </div>
            <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
              <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "12px", color: "#2563eb", fontWeight: 500 }}>→ Reorder another PDF</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
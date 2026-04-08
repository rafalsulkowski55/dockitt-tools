"use client";

import { useState, useRef, useEffect } from "react";
import { ToolTracking } from "@/lib/analytics";
import { useConversionLimit } from "@/lib/use-conversion-limit";
import PricingModal from "@/app/components/PricingModal";

const TOOL_NAME = "delete-pdf-pages";
const PROCESSING_TYPE = "browser" as const;

export default function DeletePagesUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState("");
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { showPricingModal, setShowPricingModal, checkLimit, checkDownloadLimit, onConversionSuccess } = useConversionLimit();

  useEffect(() => {
    ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE);
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setStatus("idle");
    setErrorMessage("");
    setTotalPages(null);
    setPages("");
    setProgress(0);
    if (f) ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    if (f && f.type === "application/pdf") {
      setFile(f);
      setStatus("idle");
      setErrorMessage("");
      setTotalPages(null);
      setPages("");
      setProgress(0);
      ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function parsePageNumbers(input: string, total: number): number[] {
    return input.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n >= 1 && n <= total);
  }

  async function handleProcess() {
    if (!file) return;
    if (!checkLimit()) return;

    ToolTracking.processStarted(TOOL_NAME, PROCESSING_TYPE);
    setStatus("processing");
    setErrorMessage("");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => (p < 85 ? p + 5 : p));
    }, 300);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const arrayBuffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const total = srcDoc.getPageCount();
      setTotalPages(total);
      const toDelete = new Set(parsePageNumbers(pages, total));
      const newDoc = await PDFDocument.create();
      const keepIndices = Array.from({ length: total }, (_, i) => i).filter(i => !toDelete.has(i + 1));
      const copiedPages = await newDoc.copyPages(srcDoc, keepIndices);
      copiedPages.forEach(page => newDoc.addPage(page));
      clearInterval(interval);
      setProgress(100);
      const newBytes = await newDoc.save();
      const blob = new Blob([new Uint8Array(newBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `deleted-pages-${file.name}`;
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
    }
  }

  return (
    <>
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      <div onDrop={handleDrop} onDragOver={handleDragOver} onClick={() => inputRef.current?.click()} style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "24px", textAlign: "center", background: "#f8faff", cursor: "pointer" }}>
        <div style={{ fontSize: "13px", color: "#666", marginBottom: "12px" }}>Drag & drop your PDF here or</div>
        <label htmlFor="delete-pages-upload" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#2563eb", color: "#ffffff", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px" }} onClick={(e) => e.stopPropagation()}>
          Choose PDF
        </label>
        <input id="delete-pages-upload" ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />
        {file && <div style={{ marginTop: "12px", fontSize: "14px", color: "#444" }}>📄 {file.name}</div>}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#555" }}>
        <span>🔒</span>Processed entirely in your browser. Files never leave your device.
      </div>

      {file && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "14px", color: "#444" }}>
            Pages to delete (e.g. 1, 3, 5):
            {totalPages && <span style={{ color: "#999", marginLeft: "8px" }}>(PDF has {totalPages} pages)</span>}
          </label>
          <input type="text" value={pages} onChange={(e) => setPages(e.target.value)} placeholder="1, 3, 5" style={{ padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", width: "200px" }} />
        </div>
      )}

      <button disabled={!file || !pages.trim() || status === "processing"} onClick={handleProcess} style={{ padding: "12px 24px", background: file && pages.trim() && status !== "processing" ? "#2563eb" : "#d1d5db", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "15px", cursor: file && pages.trim() && status !== "processing" ? "pointer" : "not-allowed", width: "fit-content" }}>
        {status === "processing" ? "Processing..." : "Delete Pages"}
      </button>

      {status === "processing" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#666", marginBottom: "6px" }}>
            <span>Processing...</span><span>{progress}%</span>
          </div>
          <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "6px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "#2563eb", borderRadius: "99px", transition: "width 0.3s ease" }} />
          </div>
        </div>
      )}

      {status === "error" && (
        <div style={{ padding: "14px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px" }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {status === "done" && (
        <div style={{ padding: "14px 16px", background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px" }}>
          ✅ Done. The selected pages have been removed.
        </div>
      )}
      </div>
    </>
  );
}
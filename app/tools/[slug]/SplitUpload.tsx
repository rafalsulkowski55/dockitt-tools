"use client";

import { useState, useRef, useEffect } from "react";
import { ToolTracking } from "@/lib/analytics";
import { useConversionLimit } from "@/lib/use-conversion-limit";
import { usePendingFile } from "@/lib/use-pending-file";
import PricingModal from "@/app/components/PricingModal";

const TOOL_NAME = "split-pdf";
const PROCESSING_TYPE = "browser" as const;

export default function SplitUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [fromPage, setFromPage] = useState("1");
  const [toPage, setToPage] = useState("1");
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { showPricingModal, setShowPricingModal, checkDownloadLimit, onConversionSuccess } = useConversionLimit();

  useEffect(() => { ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE); }, []);

  usePendingFile((f) => {
    setFile(f); setStatus("idle"); setDownloadUrl(null); setErrorMessage("");
    setTotalPages(null); setFromPage("1"); setToPage("1"); setProgress(0);
    ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f); setStatus("idle"); setDownloadUrl(null); setErrorMessage("");
    setTotalPages(null); setFromPage("1"); setToPage("1"); setProgress(0);
    if (f) ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    if (f && f.type === "application/pdf") {
      setFile(f); setStatus("idle"); setDownloadUrl(null); setErrorMessage("");
      setTotalPages(null); setFromPage("1"); setToPage("1"); setProgress(0);
      ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
    }
  }

  async function handleProcess() {
    if (!file) return;
    ToolTracking.processStarted(TOOL_NAME, PROCESSING_TYPE);
    setStatus("processing"); setDownloadUrl(null); setErrorMessage(""); setProgress(0);
    const interval = setInterval(() => { setProgress((p) => (p < 85 ? p + 5 : p)); }, 300);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const arrayBuffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const total = srcDoc.getPageCount();
      setTotalPages(total);
      const from = Math.max(1, parseInt(fromPage)) - 1;
      const to = Math.min(total, parseInt(toPage)) - 1;
      const newDoc = await PDFDocument.create();
      const pageIndices = Array.from({ length: to - from + 1 }, (_, i) => from + i);
      const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
      copiedPages.forEach(page => newDoc.addPage(page));
      clearInterval(interval); setProgress(100);
      const newBytes = await newDoc.save();
      const blob = new Blob([new Uint8Array(newBytes)], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
      setStatus("done"); onConversionSuccess();
      ToolTracking.processSuccess(TOOL_NAME, PROCESSING_TYPE);
    } catch (err: unknown) {
      clearInterval(interval);
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  }

  async function handleDownload() {
    if (!downloadUrl) return;
    const canDownload = await checkDownloadLimit();
    if (!canDownload) return;
    onConversionSuccess();
    ToolTracking.downloadClicked(TOOL_NAME, PROCESSING_TYPE);
    const a = document.createElement("a"); a.href = downloadUrl; a.download = `split-${file?.name ?? "output.pdf"}`; a.click();
  }

  return (
    <>
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => inputRef.current?.click()} style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "24px", textAlign: "center", background: "#f8faff", cursor: "pointer" }}>
          <div style={{ fontSize: "13px", color: "#666", marginBottom: "12px" }}>Drag & drop your PDF here or</div>
          <label htmlFor="split-upload" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#2563eb", color: "#ffffff", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px" }} onClick={(e) => e.stopPropagation()}>Choose PDF</label>
          <input id="split-upload" ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />
          {file && <div style={{ marginTop: "12px", fontSize: "14px", color: "#444" }}>📄 {file.name}</div>}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#555" }}>
          <span>🔒</span>Processed entirely in your browser. Files never leave your device.
        </div>

        {file && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "14px", color: "#444" }}>Pages from</span>
            <input type="number" min="1" value={fromPage} onChange={(e) => setFromPage(e.target.value)} style={{ width: "70px", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px" }} />
            <span style={{ fontSize: "14px", color: "#444" }}>to</span>
            <input type="number" min="1" value={toPage} onChange={(e) => setToPage(e.target.value)} style={{ width: "70px", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px" }} />
            {totalPages && <span style={{ fontSize: "13px", color: "#999" }}>(PDF has {totalPages} pages)</span>}
          </div>
        )}

        <button disabled={!file || status === "processing"} onClick={handleProcess} style={{ padding: "12px 24px", background: file && status !== "processing" ? "#2563eb" : "#d1d5db", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "15px", cursor: file && status !== "processing" ? "pointer" : "not-allowed", width: "fit-content" }}>
          {status === "processing" ? "Processing..." : "Split PDF"}
        </button>

        {status === "processing" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#666", marginBottom: "6px" }}><span>Processing...</span><span>{progress}%</span></div>
            <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "6px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#2563eb", borderRadius: "99px", transition: "width 0.3s ease" }} />
            </div>
          </div>
        )}

        {status === "error" && <div style={{ padding: "14px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px" }}>{errorMessage || "Something went wrong. Please try again."}</div>}
        {status === "done" && <div style={{ padding: "14px 16px", background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px" }}>Done. Pages {fromPage}–{toPage} extracted successfully.</div>}
        {status === "done" && downloadUrl && (
          <button onClick={handleDownload} style={{ padding: "12px 24px", background: "#16a34a", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "15px", cursor: "pointer", width: "fit-content" }}>Download PDF</button>
        )}
      </div>
    </>
  );
}
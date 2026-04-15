"use client";

import { useState, useRef, useEffect } from "react";
import { ToolTracking } from "@/lib/analytics";
import { useConversionLimit } from "@/lib/use-conversion-limit";
import { usePendingFile } from "@/lib/use-pending-file";
import PricingModal from "@/app/components/PricingModal";

const TOOL_NAME = "merge-pdf";
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

export default function MergeUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { showPricingModal, setShowPricingModal, checkDownloadLimit, onConversionSuccess } = useConversionLimit();

  useEffect(() => { ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE); }, []);

  usePendingFile((f) => {
    setFiles((prev) => [...prev, f]);
    setStatus("idle"); setDownloadUrl(null);
    ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
  });

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...selected]);
    setStatus("idle"); setDownloadUrl(null);
    if (selected.length > 0) ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...dropped]);
    setStatus("idle"); setDownloadUrl(null);
    if (dropped.length > 0) ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setStatus("idle"); setDownloadUrl(null);
  }

  function handleReset() {
    setFiles([]); setStatus("idle"); setDownloadUrl(null); setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleProcess() {
    if (files.length < 2) return;
    ToolTracking.processStarted(TOOL_NAME, PROCESSING_TYPE);
    setStatus("processing"); setDownloadUrl(null); setProgress(0);
    const interval = setInterval(() => { setProgress((p) => (p < 85 ? p + 5 : p)); }, 300);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const mergedDoc = await PDFDocument.create();
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const pages = await mergedDoc.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedDoc.addPage(page));
      }
      clearInterval(interval); setProgress(100);
      const newBytes = await mergedDoc.save();
      const blob = new Blob([new Uint8Array(newBytes)], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
      setStatus("done");
      ToolTracking.processSuccess(TOOL_NAME, PROCESSING_TYPE);
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      setStatus("error");
    }
  }

  async function handleDownload() {
    if (!downloadUrl) return;
    const canDownload = await checkDownloadLimit();
    if (!canDownload) return;
    onConversionSuccess();
    ToolTracking.downloadClicked(TOOL_NAME, PROCESSING_TYPE);
    const a = document.createElement("a");
    a.href = downloadUrl; a.download = "merged.pdf"; a.click();
  }

  const isReady = files.length >= 2 && status !== "processing";

  return (
    <>
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
      <input ref={inputRef} type="file" accept=".pdf" multiple style={{ display: "none" }} onChange={handleFileChange} />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
          style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "16px", background: "#f8faff" }}>
          {files.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {files.map((file, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                  <div style={{ width: "32px", height: "40px", borderRadius: "4px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "9px", fontWeight: 700, color: "#2563eb" }}>PDF</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: "#111", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{index + 1}. {file.name}</p>
                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{formatSize(file.size)}</p>
                  </div>
                  <button onClick={() => removeFile(index)} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "4px", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "#6b7280", fontSize: "12px" }}>✕</button>
                </div>
              ))}
              <button onClick={() => inputRef.current?.click()}
                style={{ marginTop: "4px", padding: "7px 14px", background: "#eff6ff", color: "#2563eb", border: "1px dashed #bfdbfe", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
                + Add more PDFs
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>Drag & drop your PDFs here or</div>
              <button onClick={() => inputRef.current?.click()}
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#2563eb", color: "#fff", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px", border: "none" }}>
                Choose PDFs
              </button>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: "8px 0 0" }}>Select 2 or more PDF files</p>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button disabled={!isReady} onClick={handleProcess}
            style={{ padding: "10px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed" }}>
            {status === "processing" ? "Merging..." : "Merge PDFs"}
          </button>
          {status === "processing" && <Spinner />}
        </div>

        {status === "processing" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}>
              <span>Merging your PDFs...</span><span>{progress}%</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "5px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#2563eb", borderRadius: "99px", transition: "width 0.3s ease" }} />
            </div>
          </div>
        )}

        {status === "error" && (
          <div style={{ padding: "12px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
            Something went wrong. Please try again.
          </div>
        )}

        {status === "done" && downloadUrl && (
          <div style={{ border: "1px solid #bfdbfe", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: "#eff6ff", padding: "12px 16px" }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ Merge complete</p>
              <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>{files.length} files combined into one PDF</p>
            </div>
            <div style={{ padding: "12px 16px", background: "#fff" }}>
              <button onClick={handleDownload}
                style={{ width: "100%", padding: "11px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
                ⬇ Download merged PDF
              </button>
            </div>
            <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
              <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "12px", color: "#2563eb", fontWeight: 500 }}>→ Merge more PDFs</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
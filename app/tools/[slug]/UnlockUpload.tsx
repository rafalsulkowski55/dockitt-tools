"use client";

import { useState, useRef, useEffect } from "react";
import { ToolTracking } from "@/lib/analytics";
import { useConversionLimit } from "@/lib/use-conversion-limit";
import { usePendingFile } from "@/lib/use-pending-file";
import PricingModal from "@/app/components/PricingModal";

const TOOL_NAME = "unlock-pdf";
const PROCESSING_TYPE = "server" as const;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

type Status = "idle" | "validating" | "uploading" | "processing" | "done" | "error";

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function UnlockUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No file selected");
  const [fileSize, setFileSize] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { showPricingModal, setShowPricingModal, checkDownloadLimit, onConversionSuccess } = useConversionLimit();

  useEffect(() => { ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE); }, []);
  usePendingFile(handleFileSelect);

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function handleFileSelect(f: File) {
    setErrorMessage(""); setDownloadUrl(null); setProgress(0);
    if (f.type !== "application/pdf") { setErrorMessage("Please upload a PDF file."); setStatus("error"); return; }
    if (f.size > MAX_FILE_SIZE) { setErrorMessage(`File too large. Maximum size is ${formatSize(MAX_FILE_SIZE)}.`); setStatus("error"); return; }
    setFile(f); setFileName(f.name); setFileSize(formatSize(f.size)); setStatus("idle");
    ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (f) handleFileSelect(f); e.target.value = ""; }
  function handleDrop(e: React.DragEvent) { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFileSelect(f); }

  function handleReset() {
    setFile(null); setFileName("No file selected"); setFileSize(""); setPassword("");
    setStatus("idle"); setDownloadUrl(null); setProgress(0); setErrorMessage("");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleUnlock() {
    if (!file) return;
    setStatus("validating"); setErrorMessage(""); setDownloadUrl(null); setProgress(0);
    ToolTracking.processStarted(TOOL_NAME, PROCESSING_TYPE);
    try {
      const createRes = await fetch("/api/uploads/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ filename: file.name, contentType: file.type, sizeBytes: file.size, toolSlug: TOOL_NAME }) });
      if (!createRes.ok) { const err = await createRes.json(); throw new Error(err.error ?? "Failed to create upload URL"); }
      const { uploadUrl, storageKey } = await createRes.json();
      setStatus("uploading"); setProgress(10);
      const uploadRes = await fetch(uploadUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
      if (!uploadRes.ok) throw new Error("Upload to storage failed");
      setProgress(50); setStatus("processing");
      const completeRes = await fetch("/api/uploads/complete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ storageKey, toolSlug: TOOL_NAME, processingParams: { password } }) });
      if (!completeRes.ok) { const err = await completeRes.json(); throw new Error(err.error ?? "Processing failed"); }
      setProgress(100);
      const result = await completeRes.json();
      setDownloadUrl(result.downloadUrl); setStatus("done"); onConversionSuccess();
      ToolTracking.processSuccess(TOOL_NAME, PROCESSING_TYPE);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  async function handleDownload() {
    if (!downloadUrl) return;
    const canDownload = await checkDownloadLimit();
    if (!canDownload) return;
    onConversionSuccess();
    ToolTracking.downloadClicked(TOOL_NAME, PROCESSING_TYPE);
    const a = document.createElement("a"); a.href = downloadUrl; a.download = `unlocked-${file?.name ?? "file.pdf"}`; a.click();
  }

  const isProcessing = ["validating", "uploading", "processing"].includes(status);
  const processingLabel = status === "uploading" ? "Uploading to secure storage..." : status === "processing" ? "Unlocking PDF..." : "Validating...";

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
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{fileName}</p>
                <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{fileSize}</p>
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
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: "8px 0 0" }}>Maximum file size: 10MB</p>
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}>Password (leave empty if not password-protected)</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"
            style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", maxWidth: "280px", outline: "none" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button disabled={!file || isProcessing} onClick={handleUnlock}
            style={{ padding: "10px 20px", background: file && !isProcessing ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: file && !isProcessing ? "pointer" : "not-allowed" }}>
            {isProcessing ? "Processing..." : "Unlock PDF"}
          </button>
          {isProcessing && <Spinner />}
        </div>

        {isProcessing && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}>
              <span>{processingLabel}</span><span>{progress}%</span>
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

        {status === "done" && downloadUrl && (
          <div style={{ border: "1px solid #bfdbfe", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: "#eff6ff", padding: "12px 16px" }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ PDF unlocked successfully</p>
              <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>Password protection has been removed</p>
            </div>
            <div style={{ padding: "12px 16px", background: "#fff" }}>
              <button onClick={handleDownload} style={{ width: "100%", padding: "11px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
                ⬇ Download unlocked PDF
              </button>
            </div>
            <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
              <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "12px", color: "#2563eb", fontWeight: 500 }}>→ Unlock another PDF</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
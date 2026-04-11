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

  useEffect(() => {
    ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE);
  }, []);

  usePendingFile(handleFileSelect);

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function handleFileSelect(f: File) {
    setErrorMessage("");
    setDownloadUrl(null);
    setProgress(0);
    if (f.type !== "application/pdf") { setErrorMessage("Please upload a PDF file."); setStatus("error"); return; }
    if (f.size > MAX_FILE_SIZE) { setErrorMessage(`File too large. Maximum size is ${formatSize(MAX_FILE_SIZE)}.`); setStatus("error"); return; }
    setFile(f); setFileName(f.name); setFileSize(formatSize(f.size)); setStatus("idle");
    ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }
  function handleDrop(e: React.DragEvent) { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFileSelect(f); }
  function handleReset() { setFile(null); setFileName("No file selected"); setFileSize(""); setPassword(""); setStatus("idle"); setDownloadUrl(null); setProgress(0); setErrorMessage(""); }

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
    const a = document.createElement("a"); a.href = downloadUrl; a.download = file?.name ?? "file.pdf"; a.click();
  }

  const isProcessing = ["validating", "uploading", "processing"].includes(status);

  return (
    <>
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} style={{ border: "2px dashed #bfdbfe", background: "#f8faff", borderRadius: "12px", padding: "24px", textAlign: "center", cursor: "pointer" }}>
          {file ? (
            <div style={{ display: "flex", alignItems: "center", gap: "16px", textAlign: "left" }}>
              <div style={{ fontSize: "32px" }}>📄</div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#111", margin: "0 0 4px" }}>{fileName}</p>
                <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>{fileSize}</p>
                <p style={{ fontSize: "12px", color: "#2563eb", margin: "4px 0 0" }}>Click to change file</p>
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "12px" }}>Drag & drop your PDF here or</div>
              <button onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }} style={{ display: "inline-flex", alignItems: "center", padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px" }}>Choose PDF</button>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: "8px 0 0" }}>Maximum file size: 10MB</p>
            </>
          )}
          <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#6b7280" }}>
          <span>🔐</span>
          Processed securely on our server. Your file is deleted immediately after processing.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "13px", fontWeight: 500, color: "#4b5563" }}>Password (leave empty if not password-protected)</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", maxWidth: "300px", outline: "none" }} />
        </div>

        <button disabled={!file || isProcessing} onClick={handleUnlock} style={{ padding: "12px 24px", background: file && !isProcessing ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "15px", cursor: file && !isProcessing ? "pointer" : "not-allowed", width: "fit-content" }}>
          {status === "uploading" ? "Uploading..." : status === "processing" ? "Unlocking..." : status === "validating" ? "Validating..." : "Unlock PDF"}
        </button>

        {isProcessing && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#666", marginBottom: "6px" }}>
              <span>{status === "uploading" ? "Uploading to secure storage..." : status === "processing" ? "Unlocking PDF..." : "Validating..."}</span>
              <span>{progress}%</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "6px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#2563eb", borderRadius: "99px", transition: "width 0.3s ease" }} />
            </div>
          </div>
        )}

        {status === "error" && <div style={{ padding: "14px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px" }}>{errorMessage || "Something went wrong. Please try again."}</div>}

        {status === "done" && downloadUrl && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ padding: "20px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px" }}>
              <p style={{ fontSize: "18px", fontWeight: 700, color: "#2563eb", margin: "0 0 6px" }}>✅ PDF unlocked successfully</p>
              <p style={{ fontSize: "13px", color: "#4b5563", margin: 0 }}>Password protection has been removed.</p>
            </div>
            <button onClick={handleDownload} style={{ padding: "14px 28px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "15px", cursor: "pointer", width: "fit-content" }}>⬇ Download unlocked PDF</button>
            <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "13px", color: "#2563eb", fontWeight: 500, textAlign: "left" }}>→ Unlock another PDF</button>
          </div>
        )}
      </div>
    </>
  );
}
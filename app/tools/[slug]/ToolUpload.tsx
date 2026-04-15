"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ToolTracking } from "@/lib/analytics";
import { useConversionLimit } from "@/lib/use-conversion-limit";
import { usePendingFile } from "@/lib/use-pending-file";
import PricingModal from "@/app/components/PricingModal";

const TOOL_NAME = "compress-pdf";
const PROCESSING_TYPE = "server" as const;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

type Preset = "email" | "small" | "quality";
type Status = "idle" | "validating" | "uploading" | "processing" | "done" | "error";

const PRESETS: { id: Preset; label: string; subtext: string }[] = [
  { id: "email", label: "Email", subtext: "Balanced quality" },
  { id: "small", label: "Small file", subtext: "Maximum compression" },
  { id: "quality", label: "High quality", subtext: "Minimal compression" },
];

function Spinner() {
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20"
      style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}
    >
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ToolUpload() {
  const [fileName, setFileName] = useState("No file selected");
  const [fileSize, setFileSize] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<Preset>("email");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [resultInfo, setResultInfo] = useState<{
    originalSize: number;
    compressedSize: number;
    reduction: number;
    downloadUrl: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { showPricingModal, setShowPricingModal, checkDownloadLimit, onConversionSuccess, setPendingDownload } = useConversionLimit();

  useEffect(() => {
    ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE);
  }, []);

  usePendingFile(handleFileSelect);

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function getResultHeadline(reduction: number) {
    if (reduction >= 70) return `${reduction}% smaller 🎉`;
    if (reduction >= 30) return `${reduction}% smaller`;
    return "Reduced file size while preserving quality";
  }

  function getSuccessMessage(compressedSize: number) {
    if (compressedSize < 1024 * 1024) return "✓ Ready to send via email";
    if (compressedSize < 5 * 1024 * 1024) return "✓ Fits most upload limits";
    return "✓ File size reduced successfully";
  }

  async function generatePreview(f: File) {
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
      const arrayBuffer = await f.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 0.4 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      await page.render({ canvasContext: ctx as unknown as CanvasRenderingContext2D, viewport }).promise;
      setPreviewUrl(canvas.toDataURL());
    } catch {
      setPreviewUrl(null);
    }
  }

  function handleFileSelect(f: File) {
    setStatus("validating");
    setErrorMessage("");
    setResultInfo(null);
    setProgress(0);
    setPreviewUrl(null);

    if (f.type !== "application/pdf") {
      setErrorMessage("Please upload a PDF file.");
      setStatus("error");
      return;
    }

    if (f.size > MAX_FILE_SIZE) {
      setErrorMessage(`File too large. Maximum size is ${formatSize(MAX_FILE_SIZE)}.`);
      setStatus("error");
      return;
    }

    setFile(f);
    setFileName(f.name);
    setFileSize(formatSize(f.size));
    setStatus("idle");
    ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
    generatePreview(f);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (f) handleFileSelect(f);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    if (f) handleFileSelect(f);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleReset() {
    setFile(null);
    setFileName("No file selected");
    setFileSize("");
    setStatus("idle");
    setResultInfo(null);
    setProgress(0);
    setPreviewUrl(null);
    setErrorMessage("");
    setPreset("email");
  }

  async function handleProcess() {
    if (!file) return;

    setStatus("validating");
    setErrorMessage("");
    setResultInfo(null);
    setProgress(0);
    ToolTracking.processStarted(TOOL_NAME, PROCESSING_TYPE);

    try {
      const createRes = await fetch("/api/uploads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          sizeBytes: file.size,
          toolSlug: TOOL_NAME,
        }),
      });

      if (!createRes.ok) {
        const err = await createRes.json();
        throw new Error(err.error ?? "Failed to create upload URL");
      }

      const { uploadUrl, storageKey } = await createRes.json();

      setStatus("uploading");
      setProgress(10);

      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadRes.ok) throw new Error("Upload to storage failed");

      setProgress(50);
      setStatus("processing");

      const completeRes = await fetch("/api/uploads/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storageKey,
          toolSlug: TOOL_NAME,
          processingParams: { preset },
        }),
      });

      if (!completeRes.ok) {
        const err = await completeRes.json();
        throw new Error(err.error ?? "Processing failed");
      }

      setProgress(100);
      const result = await completeRes.json();

      setPendingDownload({
        storageKey,
        filename: `compressed-${file.name}`,
        toolSlug: TOOL_NAME,
        toolPath: `/tools/${TOOL_NAME}`,
        timestamp: Date.now(),
      });

      setResultInfo({
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        reduction: result.reduction,
        downloadUrl: result.downloadUrl,
      });

      setStatus("done");
      ToolTracking.processSuccess(TOOL_NAME, PROCESSING_TYPE);

    } catch (err: unknown) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  async function handleDownload() {
    if (!resultInfo) return;
    const canDownload = await checkDownloadLimit();
    if (!canDownload) return;
    onConversionSuccess();
    ToolTracking.downloadClicked(TOOL_NAME, PROCESSING_TYPE);
    const a = document.createElement("a");
    a.href = resultInfo.downloadUrl;
    a.download = `compressed-${file?.name ?? "file.pdf"}`;
    a.click();
  }

  const isProcessing = ["validating", "uploading", "processing"].includes(status);

  const processingLabel =
    status === "uploading" ? "Uploading to secure storage..." :
    status === "processing" ? "Compressing your PDF..." :
    "Validating...";

  return (
    <>
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => !file && inputRef.current?.click()}
          style={{
            border: "2px dashed #bfdbfe",
            borderRadius: "12px",
            padding: "20px",
            background: "#f8faff",
            cursor: file ? "default" : "pointer",
          }}
        >
          {file ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="PDF preview"
                  style={{ height: "72px", width: "auto", borderRadius: "6px", border: "1px solid #bfdbfe", flexShrink: 0 }}
                />
              ) : (
                <div style={{ width: "48px", height: "72px", borderRadius: "6px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "11px", fontWeight: 700, color: "#2563eb" }}>
                  PDF
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#111", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{fileName}</p>
                <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>{fileSize}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                  style={{ fontSize: "12px", color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: "4px" }}
                >
                  Click to change file
                </button>
              </div>
              {/* X button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleReset(); }}
                style={{
                  background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "6px",
                  width: "28px", height: "28px", display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "#6b7280",
                  fontSize: "14px", lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>Drag & drop your PDF here or</div>
              <label
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#2563eb", color: "#ffffff", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px" }}
                onClick={(e) => e.stopPropagation()}
              >
                Choose PDF
              </label>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: "8px 0 0" }}>Maximum file size: 10MB</p>
            </div>
          )}
          <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />
        </div>

        {/* Compression presets */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ fontSize: "13px", color: "#4b5563", margin: 0, fontWeight: 500 }}>Compression level:</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPreset(p.id)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "flex-start",
                  padding: "10px 16px", borderRadius: "8px", border: "1px solid",
                  borderColor: preset === p.id ? "#2563eb" : "#e5e7eb",
                  background: preset === p.id ? "#2563eb" : "#fff",
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: 600, color: preset === p.id ? "#fff" : "#111" }}>{p.label}</span>
                <span style={{ fontSize: "11px", color: preset === p.id ? "#bfdbfe" : "#9ca3af" }}>{p.subtext}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Process button */}
        <button
          disabled={!file || isProcessing}
          onClick={handleProcess}
          style={{
            padding: "12px 24px",
            background: file && !isProcessing ? "#2563eb" : "#d1d5db",
            color: "#ffffff", border: "none", borderRadius: "10px",
            fontWeight: 600, fontSize: "15px",
            cursor: file && !isProcessing ? "pointer" : "not-allowed",
            width: "fit-content",
          }}
        >
          {isProcessing ? "Processing..." : "Compress PDF"}
        </button>

        {/* Spinner + progress bar */}
        {isProcessing && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Spinner />
              <span style={{ fontSize: "13px", color: "#4b5563" }}>{processingLabel}</span>
              <span style={{ fontSize: "13px", color: "#9ca3af", marginLeft: "auto" }}>{progress}%</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "6px", overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${progress}%`,
                background: "#2563eb", borderRadius: "99px",
                transition: "width 0.3s ease",
              }} />
            </div>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div style={{ padding: "14px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px" }}>
            {errorMessage || "Something went wrong. Please try again."}
          </div>
        )}

        {/* Result */}
        {status === "done" && resultInfo && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "20px" }}>
              <p style={{ fontSize: "22px", fontWeight: 700, color: "#2563eb", margin: "0 0 6px" }}>
                {getResultHeadline(resultInfo.reduction)}
              </p>
              <p style={{ fontSize: "14px", color: "#4b5563", margin: "0 0 12px" }}>
                {formatSize(resultInfo.originalSize)} → {formatSize(resultInfo.compressedSize)}
              </p>
              <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
                <div style={{ flex: 1, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 14px" }}>
                  <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Before</p>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "#374151", margin: 0 }}>{formatSize(resultInfo.originalSize)}</p>
                </div>
                <div style={{ flex: 1, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "10px 14px" }}>
                  <p style={{ fontSize: "11px", color: "#16a34a", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>After</p>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "#15803d", margin: 0 }}>{formatSize(resultInfo.compressedSize)}</p>
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "#16a34a", margin: 0 }}>
                {getSuccessMessage(resultInfo.compressedSize)}
              </p>
            </div>

            <button
              onClick={handleDownload}
              style={{ padding: "14px 28px", background: "#16a34a", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "15px", cursor: "pointer", width: "100%" }}
            >
              ⬇ Download compressed PDF
            </button>

            <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "16px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", margin: "0 0 10px" }}>Next steps</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button
                  onClick={handleReset}
                  style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "13px", color: "#2563eb", fontWeight: 500, textAlign: "left" }}
                >
                  → Compress another PDF
                </button>
                <Link href="/tools/merge-pdf" style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>
                  → Merge PDF files
                </Link>
                <Link href="/tools/protect-pdf" style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>
                  → Password protect your PDF
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
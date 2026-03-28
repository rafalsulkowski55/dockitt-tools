"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ToolTracking } from "@/lib/analytics";

const TOOL_NAME = "compress-pdf";
const PROCESSING_TYPE = "server" as const;

type Preset = "email" | "small" | "quality";

const PRESETS: { id: Preset; label: string; subtext: string }[] = [
  { id: "email", label: "Email", subtext: "Balanced quality" },
  { id: "small", label: "Small file", subtext: "Maximum compression" },
  { id: "quality", label: "High quality", subtext: "Minimal compression" },
];

export default function ToolUpload() {
  const [fileName, setFileName] = useState("No file selected");
  const [fileSize, setFileSize] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<Preset>("email");
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultInfo, setResultInfo] = useState<{
    originalSize: number;
    compressedSize: number;
    reduction: number;
    url: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE);
  }, []);

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

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setFileName(f ? f.name : "No file selected");
    setFileSize(f ? formatSize(f.size) : "");
    setStatus("idle");
    setResultInfo(null);
    setProgress(0);
    setPreviewUrl(null);
    if (f) {
      ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
      generatePreview(f);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    if (f && f.type === "application/pdf") {
      setFile(f);
      setFileName(f.name);
      setFileSize(formatSize(f.size));
      setStatus("idle");
      setResultInfo(null);
      setProgress(0);
      setPreviewUrl(null);
      ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
      generatePreview(f);
    }
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
    setPreset("email");
  }

  async function handleProcess() {
    if (!file) return;
    setStatus("processing");
    setResultInfo(null);
    setProgress(0);
    ToolTracking.processStarted(TOOL_NAME, PROCESSING_TYPE);
    const interval = setInterval(() => {
      setProgress((p) => (p < 85 ? p + 5 : p));
    }, 300);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("preset", preset);
      const res = await fetch("/api/compress-pdf", { method: "POST", body: formData });
      clearInterval(interval);
      setProgress(100);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Unknown error");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const originalSize = parseInt(res.headers.get("X-Original-Size") ?? "0");
      const compressedSize = parseInt(res.headers.get("X-Compressed-Size") ?? "0");
      const reduction = parseInt(res.headers.get("X-Reduction-Percent") ?? "0");
      setResultInfo({ originalSize, compressedSize, reduction, url });
      setStatus("done");
      ToolTracking.processSuccess(TOOL_NAME, PROCESSING_TYPE);
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      setStatus("error");
    }
  }

  function handleDownload() {
    if (!resultInfo) return;
    ToolTracking.downloadClicked(TOOL_NAME, PROCESSING_TYPE);
    const a = document.createElement("a");
    a.href = resultInfo.url;
    a.download = `compressed-${file?.name ?? "file.pdf"}`;
    a.click();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Microcopy */}
      <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
        Upload your PDF and choose how much you want to reduce its size.
      </p>

      {/* Drag & drop */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current?.click()}
        style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "24px", textAlign: "center", background: "#f8faff", cursor: "pointer" }}
      >
        {previewUrl ? (
          <div style={{ display: "flex", alignItems: "center", gap: "16px", textAlign: "left" }}>
            <img src={previewUrl} alt="PDF preview" style={{ height: "80px", width: "auto", borderRadius: "6px", border: "1px solid #bfdbfe", boxShadow: "0 2px 6px rgba(37,99,235,0.1)", flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#111", margin: "0 0 4px" }}>{fileName}</p>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>{fileSize}</p>
              <p style={{ fontSize: "12px", color: "#2563eb", margin: "4px 0 0" }}>Click to change file</p>
            </div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: "13px", color: "#666", marginBottom: "12px" }}>Drag & drop your PDF here or</div>
            <label htmlFor="pdf-upload" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#2563eb", color: "#ffffff", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px" }} onClick={(e) => e.stopPropagation()}>
              Choose PDF
            </label>
          </>
        )}
        <input id="pdf-upload" ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />
      </div>

      {/* Presets */}
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

      {/* Compress button */}
      <button
        disabled={!file || status === "processing"}
        onClick={handleProcess}
        style={{
          padding: "12px 24px",
          background: file && status !== "processing" ? "#2563eb" : "#d1d5db",
          color: "#ffffff", border: "none", borderRadius: "10px",
          fontWeight: 600, fontSize: "15px",
          cursor: file && status !== "processing" ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        {status === "processing" ? "Compressing..." : "Compress PDF"}
      </button>

      {/* Progress bar */}
      {status === "processing" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#666", marginBottom: "6px" }}>
            <span>Compressing...</span>
            <span>{progress}%</span>
          </div>
          <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "6px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "#2563eb", borderRadius: "99px", transition: "width 0.3s ease" }} />
          </div>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div style={{ padding: "14px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px" }}>
          Something went wrong. Please try again.
        </div>
      )}

      {/* Result block */}
      {status === "done" && resultInfo && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "20px" }}>
            <p style={{ fontSize: "24px", fontWeight: 700, color: "#2563eb", margin: "0 0 6px" }}>
              {getResultHeadline(resultInfo.reduction)}
            </p>
            <p style={{ fontSize: "15px", color: "#4b5563", margin: "0 0 12px" }}>
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

          {/* Download button */}
          <button
            onClick={handleDownload}
            style={{ padding: "14px 28px", background: "#16a34a", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "15px", cursor: "pointer", width: "fit-content" }}
          >
            ⬇ Download compressed PDF
          </button>

          {/* Next steps */}
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
  );
}
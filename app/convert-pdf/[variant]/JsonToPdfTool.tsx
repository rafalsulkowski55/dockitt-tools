"use client";

import { useState, useRef, useEffect } from "react";
import type { ConvertVariant } from "@/data/convert/variants";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 40;
const FONT_SIZE = 10;
const LINE_H = 14;
const MAX_CHARS = 90;

type Props = { variant: ConvertVariant };

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function wrapLine(line: string): string[] {
  if (line.length <= MAX_CHARS) return [line];
  const result: string[] = [];
  let remaining = line;
  while (remaining.length > MAX_CHARS) {
    result.push(remaining.slice(0, MAX_CHARS));
    remaining = remaining.slice(MAX_CHARS);
  }
  if (remaining) result.push(remaining);
  return result;
}

export default function JsonToPdfTool({ variant }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ToolTracking.viewTool(variant.slug, PROCESSING_TYPE);
  }, [variant.slug]);

  function handleFileSelect(f: File) {
    if (f.size > MAX_FILE_SIZE) {
      setErrorMessage("File too large. Maximum size is 100MB.");
      setStatus("error");
      return;
    }
    setFile(f); setStatus("idle"); setErrorMessage(""); setDownloadUrl(null); setProgress(0);
    ToolTracking.uploadStarted(variant.slug, PROCESSING_TYPE);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFileSelect(f);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFileSelect(f);
  }

  function handleReset() {
    setFile(null); setStatus("idle"); setErrorMessage(""); setDownloadUrl(null); setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleConvert() {
    if (!file) return;
    ToolTracking.processStarted(variant.slug, PROCESSING_TYPE);
    setStatus("processing"); setErrorMessage(""); setDownloadUrl(null); setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p < 50 ? p + Math.random() * 12 : p));
    }, 200);

    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");

      const rawText = await file.text();
      setProgress(10);

      const parsed = JSON.parse(rawText);
      const formatted = JSON.stringify(parsed, null, 2);
      setProgress(20);

      const allLines: string[] = [];
      for (const raw of formatted.split("\n")) {
        allLines.push(...wrapLine(raw));
      }

      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Courier);
      const linesPerPage = Math.floor((PAGE_H - 2 * MARGIN) / LINE_H);

      let page = pdfDoc.addPage([PAGE_W, PAGE_H]);
      let y = PAGE_H - MARGIN;
      let lineOnPage = 0;
      const total = allLines.length;

      for (let idx = 0; idx < total; idx++) {
        if (lineOnPage >= linesPerPage) {
          page = pdfDoc.addPage([PAGE_W, PAGE_H]);
          y = PAGE_H - MARGIN;
          lineOnPage = 0;
        }
        const lineText = allLines[idx];
        if (lineText.trim()) {
          page.drawText(lineText, { x: MARGIN, y: y - FONT_SIZE, size: FONT_SIZE, font, color: rgb(0, 0, 0) });
        }
        y -= LINE_H;
        lineOnPage++;
        setProgress(20 + Math.round((idx / total) * 75));
      }

      clearInterval(interval);
      const bytes = await pdfDoc.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
      setProgress(100);
      setStatus("done");
      ToolTracking.processSuccess(variant.slug, PROCESSING_TYPE);
    } catch (err: unknown) {
      clearInterval(interval);
      const msg = err instanceof Error ? err.message : "Conversion failed.";
      setErrorMessage(msg.includes("JSON") || msg.includes("parse") ? "Invalid JSON: could not parse the file." : msg);
      setStatus("error"); setProgress(0);
    }
  }

  function handleDownload() {
    if (!downloadUrl) return;
    ToolTracking.downloadClicked(variant.slug, PROCESSING_TYPE);
    const baseName = file?.name.replace(/\.json$/i, "") ?? "document";
    const a = document.createElement("a"); a.href = downloadUrl; a.download = `${baseName}.pdf`; a.click();
  }

  const isProcessing = status === "processing";
  const isReady = !!file && !isProcessing;

  return (
    <>
      <input ref={inputRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleFileChange} />
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
          style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "16px", background: "#f8faff" }}>
          {file ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "52px", borderRadius: "6px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "10px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>JSON</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
                <button onClick={() => inputRef.current?.click()} style={{ fontSize: "11px", color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Change file</button>
              </div>
              <button onClick={handleReset} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "6px", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "#6b7280", fontSize: "13px" }}>✕</button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>Drag & drop your JSON file here or</div>
              <button onClick={() => inputRef.current?.click()} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#2563eb", color: "#fff", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px", border: "none" }}>
                {variant.inputLabel}
              </button>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button disabled={!isReady} onClick={handleConvert}
            style={{ padding: "10px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed" }}>
            {isProcessing ? "Converting..." : "Convert to PDF"}
          </button>
          {isProcessing && <Spinner />}
        </div>

        {isProcessing && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}>
              <span>Formatting JSON...</span><span>{Math.round(progress)}%</span>
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
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ Conversion complete</p>
              <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>Your PDF is ready to download</p>
            </div>
            <div style={{ padding: "12px 16px", background: "#fff" }}>
              <button onClick={handleDownload} style={{ width: "100%", padding: "11px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
                ⬇ Download PDF
              </button>
            </div>
            <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
              <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "12px", color: "#2563eb", fontWeight: 500 }}>→ Convert another file</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

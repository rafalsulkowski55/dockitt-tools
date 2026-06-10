"use client";

import { useState, useRef, useEffect } from "react";
import { ToolTracking } from "@/lib/analytics";
import { usePendingFile } from "@/lib/use-pending-file";

const TOOL_NAME = "pdf-word-count";
const PROCESSING_TYPE = "browser" as const;
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

type Status = "idle" | "processing" | "done" | "error";

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function PdfWordCountUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<{ words: number; chars: number; charsNoSpaces: number; pages: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE); }, []);
  usePendingFile(handleFileSelect);

  function handleFileSelect(f: File) {
    if (f.type !== "application/pdf") { setErrorMessage("Please upload a PDF file."); setStatus("error"); return; }
    if (f.size > MAX_FILE_SIZE) { setErrorMessage("File too large. Maximum size for this tool is 100MB. For large files, try splitting the PDF first."); setStatus("error"); return; }
    setFile(f); setFileName(f.name); setStatus("idle"); setErrorMessage(""); setResult(null);
    ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (f) handleFileSelect(f); e.target.value = ""; }
  function handleDrop(e: React.DragEvent) { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFileSelect(f); }

  function handleReset() {
    setFile(null); setFileName(""); setStatus("idle"); setErrorMessage(""); setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleProcess() {
    if (!file) return;
    setStatus("processing"); setErrorMessage(""); setResult(null);
    ToolTracking.processStarted(TOOL_NAME, PROCESSING_TYPE);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      let fullText = "";
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: { str?: string; [key: string]: unknown }) => item.str ?? "").join(" ");
        fullText += pageText + " ";
      }
      const words = fullText.trim().split(/\s+/).filter(w => w.length > 0).length;
      const chars = fullText.length;
      const charsNoSpaces = fullText.replace(/\s/g, "").length;
      setResult({ words, chars, charsNoSpaces, pages: numPages });
      setStatus("done");
      ToolTracking.processSuccess(TOOL_NAME, PROCESSING_TYPE);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const isProcessing = status === "processing";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />

      <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
        style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "16px", background: "#f8faff" }}>
        {file ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "52px", borderRadius: "6px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "10px", fontWeight: 700, color: "#2563eb" }}>PDF</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{fileName}</p>
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
            <p style={{ fontSize: "12px", color: "#9ca3af", margin: "8px 0 0" }}>Processed entirely in your browser</p>
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button disabled={!file || isProcessing} onClick={handleProcess}
          style={{ padding: "10px 20px", background: file && !isProcessing ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: file && !isProcessing ? "pointer" : "not-allowed" }}>
          {isProcessing ? "Counting..." : "Count Words"}
        </button>
        {isProcessing && <Spinner />}
      </div>

      {status === "error" && (
        <div style={{ padding: "12px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {status === "done" && result && (
        <div style={{ border: "1px solid #bfdbfe", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ background: "#eff6ff", padding: "12px 16px" }}>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ Word count complete</p>
            <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>Results for: {fileName}</p>
          </div>
          <div style={{ padding: "16px", background: "#fff", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { label: "Words", value: result.words.toLocaleString() },
              { label: "Pages", value: result.pages.toLocaleString() },
              { label: "Characters (with spaces)", value: result.chars.toLocaleString() },
              { label: "Characters (no spaces)", value: result.charsNoSpaces.toLocaleString() },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "12px" }}>
                <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{stat.label}</p>
                <p style={{ fontSize: "20px", fontWeight: 700, color: "#111", margin: 0 }}>{stat.value}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
            <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "12px", color: "#2563eb", fontWeight: 500 }}>→ Count words in another PDF</button>
          </div>
        </div>
      )}
    </div>
  );
}
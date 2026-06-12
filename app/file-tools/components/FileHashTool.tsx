"use client";

import { useState, useRef, useEffect } from "react";
import type { FileTool } from "@/data/file-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;
const MAX_SIZE = 500 * 1024 * 1024;

type Algo = "SHA-1" | "SHA-256" | "SHA-512";

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
}

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function FileHashTool({ tool }: { tool: FileTool }) {
  const [file, setFile] = useState<File | null>(null);
  const [algo, setAlgo] = useState<Algo>("SHA-256");
  const [hash, setHash] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function handleFile(f: File) {
    if (f.size > MAX_SIZE) { setErrorMessage("File exceeds 500MB limit."); setStatus("error"); return; }
    setFile(f); setHash(""); setStatus("idle"); setErrorMessage("");
    ToolTracking.uploadStarted(tool.slug, PROCESSING_TYPE);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }

  async function handleCompute() {
    if (!file) return;
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    setStatus("processing"); setHash(""); setErrorMessage("");
    try {
      const buf = await file.arrayBuffer();
      const digest = await crypto.subtle.digest(algo, buf);
      const hex = Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
      setHash(hex);
      setStatus("done");
      ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
    } catch {
      setErrorMessage("Failed to compute hash.");
      setStatus("error");
    }
  }

  async function copyHash() {
    if (!hash) return;
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isProcessing = status === "processing";
  const algos: Algo[] = ["SHA-1", "SHA-256", "SHA-512"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <input ref={inputRef} type="file" style={{ display: "none" }} onChange={handleInputChange} />
      <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => inputRef.current?.click()}
        style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "28px 20px", background: "#f8faff", textAlign: "center", cursor: "pointer" }}>
        {file ? (
          <>
            <div style={{ fontSize: "28px", marginBottom: "6px" }}>📄</div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "2px" }}>{file.name}</div>
            <div style={{ fontSize: "12px", color: "#9ca3af" }}>{formatBytes(file.size)} · Click to change</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔒</div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>Drop any file here</div>
            <div style={{ fontSize: "12px", color: "#9ca3af" }}>or click to browse (up to 500MB)</div>
          </>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "13px", color: "#374151", fontWeight: 600 }}>Algorithm:</span>
        {algos.map((a) => (
          <button key={a} onClick={() => { setAlgo(a); setHash(""); setStatus("idle"); }}
            style={{ padding: "6px 14px", borderRadius: "7px", border: "1px solid", borderColor: algo === a ? "#2563eb" : "#d1d5db", background: algo === a ? "#eff6ff" : "#fff", color: algo === a ? "#2563eb" : "#374151", fontWeight: algo === a ? 700 : 400, fontSize: "13px", cursor: "pointer" }}>
            {a}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button disabled={!file || isProcessing} onClick={handleCompute}
          style={{ padding: "10px 22px", background: file && !isProcessing ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: file && !isProcessing ? "pointer" : "not-allowed" }}>
          {isProcessing ? "Computing…" : "Compute Hash"}
        </button>
        {isProcessing && <Spinner />}
      </div>

      {status === "error" && (
        <div style={{ padding: "10px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage}
        </div>
      )}

      {status === "done" && hash && (
        <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", overflow: "hidden" }}>
          <div style={{ padding: "8px 14px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>{algo} Hash</span>
            <button onClick={copyHash}
              style={{ padding: "4px 10px", background: copied ? "#dcfce7" : "#fff", color: copied ? "#166534" : "#374151", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div style={{ padding: "14px", background: "#fff" }}>
            <code style={{ display: "block", wordBreak: "break-all", fontFamily: "monospace", fontSize: "13px", color: "#111", lineHeight: 1.6 }}>{hash}</code>
          </div>
        </div>
      )}
    </div>
  );
}

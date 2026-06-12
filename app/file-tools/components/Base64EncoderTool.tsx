"use client";

import { useState, useRef, useEffect } from "react";
import type { FileTool } from "@/data/file-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

export default function Base64EncoderTool({ tool }: { tool: FileTool }) {
  const [tab, setTab] = useState<"text" | "file">("text");
  const [textInput, setTextInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function processText() {
    setErrorMessage(""); setOutput("");
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(textInput))));
      } else {
        setOutput(decodeURIComponent(escape(atob(textInput.trim()))));
      }
      ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
    } catch {
      setErrorMessage(mode === "decode" ? "Invalid Base64 string." : "Failed to encode text.");
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    ToolTracking.uploadStarted(tool.slug, PROCESSING_TYPE);
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // Strip "data:...;base64," prefix
      const b64 = dataUrl.split(",")[1] ?? "";
      setOutput(b64); setErrorMessage("");
      ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
    };
    reader.onerror = () => setErrorMessage("Failed to read file.");
    reader.readAsDataURL(f);
    e.target.value = "";
  }

  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  function downloadOutput() {
    const blob = new Blob([output], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = mode === "encode" ? "encoded.txt" : "decoded.txt"; a.click();
    ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
  }

  const taStyle: React.CSSProperties = {
    width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "8px",
    fontSize: "13px", fontFamily: "monospace", resize: "vertical", minHeight: "120px",
    boxSizing: "border-box", lineHeight: 1.5,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px" }}>
        {(["text", "file"] as const).map((t) => (
          <button key={t} onClick={() => { setTab(t); setOutput(""); setErrorMessage(""); }}
            style={{ padding: "7px 16px", borderRadius: "8px", border: "1px solid", borderColor: tab === t ? "#2563eb" : "#d1d5db", background: tab === t ? "#eff6ff" : "#fff", color: tab === t ? "#2563eb" : "#374151", fontWeight: tab === t ? 700 : 400, fontSize: "13px", cursor: "pointer" }}>
            {t === "text" ? "Text" : "File → Base64"}
          </button>
        ))}
      </div>

      {tab === "text" && (
        <>
          <div style={{ display: "flex", gap: "4px" }}>
            {(["encode", "decode"] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setOutput(""); setErrorMessage(""); }}
                style={{ padding: "6px 14px", borderRadius: "7px", border: "1px solid", borderColor: mode === m ? "#2563eb" : "#d1d5db", background: mode === m ? "#eff6ff" : "#fff", color: mode === m ? "#2563eb" : "#374151", fontWeight: mode === m ? 700 : 400, fontSize: "12px", cursor: "pointer" }}>
                {m === "encode" ? "Encode" : "Decode"}
              </button>
            ))}
          </div>
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>
              {mode === "encode" ? "Plain text" : "Base64 string"}
            </label>
            <textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder={mode === "encode" ? "Enter text to encode…" : "Paste Base64 to decode…"} style={taStyle} />
          </div>
          <button onClick={processText}
            style={{ alignSelf: "flex-start", padding: "10px 22px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
            {mode === "encode" ? "Encode" : "Decode"}
          </button>
        </>
      )}

      {tab === "file" && (
        <>
          <input ref={fileRef} type="file" style={{ display: "none" }} onChange={handleFileChange} />
          <div onClick={() => fileRef.current?.click()}
            style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "28px", background: "#f8faff", textAlign: "center", cursor: "pointer" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>📎</div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>Click to select a file</div>
            <div style={{ fontSize: "12px", color: "#9ca3af" }}>Any file type — converted to Base64 string</div>
          </div>
        </>
      )}

      {errorMessage && (
        <div style={{ padding: "10px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage}
        </div>
      )}

      {output && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Output</label>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={copyOutput}
                style={{ padding: "4px 10px", background: copied ? "#dcfce7" : "#fff", color: copied ? "#166534" : "#374151", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={downloadOutput}
                style={{ padding: "4px 10px", background: "#fff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                Download
              </button>
            </div>
          </div>
          <textarea readOnly value={output} style={{ ...taStyle, background: "#f9fafb", minHeight: "120px" }} />
        </div>
      )}
    </div>
  );
}

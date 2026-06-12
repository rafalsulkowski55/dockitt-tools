"use client";

import { useState, useEffect, useRef } from "react";
import type { TextTool } from "@/data/text-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

export default function JsonFormatterTool({ tool }: { tool: TextTool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<2 | 4>(2);
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function handleFormat() {
    if (!input.trim()) { setErrorMessage("Please enter JSON."); setStatus("error"); return; }
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    try {
      const data = JSON.parse(input);
      setOutput(JSON.stringify(data, null, indent));
      setStatus("done");
      ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Invalid JSON.");
      setStatus("error");
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
  }

  function handleDownload() {
    const blob = new Blob([output], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "formatted.json"; a.click();
    ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
  }

  const taStyle: React.CSSProperties = {
    width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "8px",
    fontSize: "13px", fontFamily: "monospace", resize: "vertical", minHeight: "180px",
    boxSizing: "border-box", lineHeight: 1.5,
  };
  const btn = (primary?: boolean): React.CSSProperties => ({
    padding: "9px 18px", background: primary ? "#2563eb" : "#f3f4f6",
    color: primary ? "#fff" : "#374151", border: `1px solid ${primary ? "#2563eb" : "#e5e7eb"}`,
    borderRadius: "7px", fontWeight: 600, fontSize: "13px", cursor: "pointer",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div>
        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>JSON Input</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          placeholder={'{"name":"Alice","age":30,"tags":["developer","writer"]}'} style={taStyle} />
      </div>

      <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>Indent:</span>
        {([2, 4] as const).map((n) => (
          <label key={n} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", cursor: "pointer" }}>
            <input type="radio" name="indent" value={n} checked={indent === n} onChange={() => setIndent(n)} />
            {n} spaces
          </label>
        ))}
        <button onClick={handleFormat} style={{ ...btn(true), padding: "10px 22px" }}>Format JSON</button>
      </div>

      {status === "error" && (
        <div style={{ padding: "10px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage}
        </div>
      )}

      {status === "done" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Formatted JSON</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={handleCopy} style={btn()}>{copied ? "Copied!" : "Copy"}</button>
              <button onClick={handleDownload} style={btn()}>Download .json</button>
            </div>
          </div>
          <textarea value={output} readOnly style={{ ...taStyle, background: "#f9fafb" }} />
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import type { FileTool } from "@/data/file-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

export default function UrlEncoderTool({ tool }: { tool: FileTool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function process() {
    setErrorMessage(""); setOutput("");
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    try {
      setOutput(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input));
      ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
    } catch {
      setErrorMessage(mode === "decode" ? "Invalid percent-encoded string." : "Failed to encode.");
    }
  }

  async function copy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  const taStyle: React.CSSProperties = {
    width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "8px",
    fontSize: "13px", fontFamily: "monospace", resize: "vertical", minHeight: "100px",
    boxSizing: "border-box", lineHeight: 1.5,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", gap: "4px" }}>
        {(["encode", "decode"] as const).map((m) => (
          <button key={m} onClick={() => { setMode(m); setOutput(""); setErrorMessage(""); }}
            style={{ padding: "7px 16px", borderRadius: "8px", border: "1px solid", borderColor: mode === m ? "#2563eb" : "#d1d5db", background: mode === m ? "#eff6ff" : "#fff", color: mode === m ? "#2563eb" : "#374151", fontWeight: mode === m ? 700 : 400, fontSize: "13px", cursor: "pointer" }}>
            {m === "encode" ? "Encode" : "Decode"}
          </button>
        ))}
      </div>

      <div>
        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>
          {mode === "encode" ? "Plain text / URL" : "Percent-encoded string"}
        </label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "https://example.com/path?q=hello world" : "https%3A%2F%2Fexample.com%2Fpath%3Fq%3Dhello%20world"} style={taStyle} />
      </div>

      <button onClick={process}
        style={{ alignSelf: "flex-start", padding: "10px 22px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
        {mode === "encode" ? "Encode" : "Decode"}
      </button>

      {errorMessage && (
        <div style={{ padding: "10px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage}
        </div>
      )}

      {output && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Result</label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "11px", color: "#9ca3af" }}>{input.length} → {output.length} chars</span>
              <button onClick={copy}
                style={{ padding: "4px 10px", background: copied ? "#dcfce7" : "#fff", color: copied ? "#166534" : "#374151", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <textarea readOnly value={output} style={{ ...taStyle, background: "#f9fafb" }} />
        </div>
      )}
    </div>
  );
}

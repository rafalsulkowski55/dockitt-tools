"use client";

import { useState, useEffect, useRef } from "react";
import type { TextTool } from "@/data/text-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

export default function RemoveDuplicateLinesTool({ tool }: { tool: TextTool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [removed, setRemoved] = useState<number | null>(null);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWs, setTrimWs] = useState(true);
  const [copied, setCopied] = useState(false);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function handleProcess() {
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    const lines = input.split("\n");
    const seen = new Set<string>();
    const result: string[] = [];
    for (const line of lines) {
      const key = trimWs ? (caseSensitive ? line.trim() : line.trim().toLowerCase()) : (caseSensitive ? line : line.toLowerCase());
      if (!seen.has(key)) {
        seen.add(key);
        result.push(trimWs ? line.trim() : line);
      }
    }
    setOutput(result.join("\n"));
    setRemoved(lines.length - result.length);
    ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
  }

  function handleDownload() {
    const blob = new Blob([output], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "deduplicated.txt"; a.click();
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
        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Input Text</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={"apple\nbanana\nApple\ncherry\nbanana"} style={taStyle} />
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", cursor: "pointer" }}>
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
          Case sensitive
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", cursor: "pointer" }}>
          <input type="checkbox" checked={trimWs} onChange={(e) => setTrimWs(e.target.checked)} />
          Trim whitespace
        </label>
        <button onClick={handleProcess} style={{ ...btn(true), padding: "9px 20px" }}>Remove Duplicates</button>
      </div>

      {removed !== null && (
        <div style={{ padding: "8px 12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "7px", fontSize: "13px", color: "#166534" }}>
          Removed {removed} duplicate {removed === 1 ? "line" : "lines"}
        </div>
      )}

      {output && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Output</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={handleCopy} style={btn()}>{copied ? "Copied!" : "Copy"}</button>
              <button onClick={handleDownload} style={btn()}>Download .txt</button>
            </div>
          </div>
          <textarea value={output} readOnly style={{ ...taStyle, background: "#f9fafb" }} />
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import type { FileTool } from "@/data/file-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")        // strip comments
    .replace(/\s*([{}:;,>~+])\s*/g, "$1")    // remove whitespace around special chars
    .replace(/;\}/g, "}")                      // remove trailing semicolon before }
    .replace(/\s+/g, " ")                      // collapse whitespace
    .replace(/^\s+|\s+$/g, "")                 // trim
    .replace(/\s*{\s*/g, "{")                  // tighten braces
    .replace(/\s*}\s*/g, "}")
    .replace(/:\s+/g, ":")                     // remove space after colon
    .replace(/,\s+/g, ",");                    // remove space after comma
}

export default function CssMinifierTool({ tool }: { tool: FileTool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState<{ orig: number; min: number; pct: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function minify() {
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    const result = minifyCss(input);
    setOutput(result);
    setStats({
      orig: input.length,
      min: result.length,
      pct: input.length > 0 ? Math.round((1 - result.length / input.length) * 100) : 0,
    });
    ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
  }

  async function copy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  function download() {
    const blob = new Blob([output], { type: "text/css" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "styles.min.css"; a.click();
    ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
  }

  const taStyle: React.CSSProperties = {
    width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "8px",
    fontSize: "13px", fontFamily: "monospace", resize: "vertical", minHeight: "140px",
    boxSizing: "border-box", lineHeight: 1.5,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div>
        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>CSS Input</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder=".container { margin: 0 auto; padding: 0 16px; /* comment */ }" style={taStyle} />
      </div>

      <button onClick={minify}
        style={{ alignSelf: "flex-start", padding: "10px 22px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
        Minify CSS
      </button>

      {stats && (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "13px", background: "#f3f4f6", padding: "4px 10px", borderRadius: "6px", color: "#374151" }}>Original: {stats.orig.toLocaleString()} chars</span>
          <span style={{ fontSize: "13px", background: "#eff6ff", padding: "4px 10px", borderRadius: "6px", color: "#2563eb" }}>Minified: {stats.min.toLocaleString()} chars</span>
          <span style={{ fontSize: "13px", background: "#f0fdf4", padding: "4px 10px", borderRadius: "6px", color: "#16a34a", fontWeight: 700 }}>−{stats.pct}% saved</span>
        </div>
      )}

      {output && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Minified CSS</label>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={copy}
                style={{ padding: "4px 10px", background: copied ? "#dcfce7" : "#fff", color: copied ? "#166534" : "#374151", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={download}
                style={{ padding: "4px 10px", background: "#fff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                Download .min.css
              </button>
            </div>
          </div>
          <textarea readOnly value={output} style={{ ...taStyle, background: "#f9fafb", minHeight: "100px" }} />
        </div>
      )}
    </div>
  );
}

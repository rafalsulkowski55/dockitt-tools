"use client";

import { useState, useEffect, useRef } from "react";
import type { TextTool } from "@/data/text-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

export default function MarkdownToHtmlTool({ tool }: { tool: TextTool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  async function handleConvert() {
    if (!input.trim()) { setErrorMessage("Please enter some Markdown text."); setStatus("error"); return; }
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    try {
      const { marked } = await import("marked");
      const html = await marked(input);
      setOutput(String(html));
      setStatus("done");
      ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Conversion failed.");
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
    const doc = `<!DOCTYPE html>\n<html lang="en">\n<meta charset="UTF-8">\n<body>\n${output}\n</body>\n</html>`;
    const blob = new Blob([doc], { type: "text/html" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "converted.html"; a.click();
    ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
  }

  const taStyle: React.CSSProperties = {
    width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "8px",
    fontSize: "13px", fontFamily: "monospace", resize: "vertical", minHeight: "200px",
    boxSizing: "border-box", lineHeight: 1.5,
  };
  const btnStyle = (active?: boolean): React.CSSProperties => ({
    padding: "9px 18px", background: active ? "#2563eb" : "#f3f4f6",
    color: active ? "#fff" : "#374151", border: `1px solid ${active ? "#2563eb" : "#e5e7eb"}`,
    borderRadius: "7px", fontWeight: 600, fontSize: "13px", cursor: "pointer",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div>
        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Markdown Input</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="# Hello World&#10;&#10;This is **bold** and *italic* text.&#10;&#10;- Item one&#10;- Item two" style={taStyle} />
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button onClick={handleConvert} style={{ ...btnStyle(true), padding: "10px 22px" }}>Convert to HTML</button>
      </div>

      {status === "error" && (
        <div style={{ padding: "10px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage}
        </div>
      )}

      {status === "done" && (
        <>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>HTML Output</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setShowPreview(!showPreview)} style={btnStyle(showPreview)}>
                  {showPreview ? "Hide Preview" : "Preview"}
                </button>
                <button onClick={handleCopy} style={btnStyle()}>{copied ? "Copied!" : "Copy"}</button>
                <button onClick={handleDownload} style={btnStyle()}>Download .html</button>
              </div>
            </div>
            <textarea value={output} readOnly style={{ ...taStyle, background: "#f9fafb", color: "#374151" }} />
          </div>

          {showPreview && (
            <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
              <div style={{ padding: "8px 14px", background: "#f3f4f6", borderBottom: "1px solid #e5e7eb", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>
                Rendered Preview
              </div>
              <div
                style={{ padding: "20px 24px", background: "#fff", fontSize: "15px", lineHeight: 1.7, color: "#111" }}
                dangerouslySetInnerHTML={{ __html: output }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

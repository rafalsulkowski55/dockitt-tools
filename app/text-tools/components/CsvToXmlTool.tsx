"use client";

import { useState, useEffect, useRef } from "react";
import type { TextTool } from "@/data/text-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function sanitizeTag(key: string): string {
  let tag = key.trim().replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_\-.]/g, "");
  if (/^[^a-zA-Z_]/.test(tag)) tag = "col_" + tag;
  return tag || "col";
}

export default function CsvToXmlTool({ tool }: { tool: TextTool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  async function handleConvert() {
    if (!input.trim()) { setErrorMessage("Please enter CSV data."); setStatus("error"); return; }
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    try {
      const Papa = (await import("papaparse")).default;
      const result = Papa.parse<Record<string, string>>(input, { header: true, skipEmptyLines: true });
      if (result.errors.length > 0 && result.data.length === 0) throw new Error(result.errors[0].message);
      const rows = result.data.map((row) => {
        const cells = Object.entries(row)
          .map(([k, v]) => `    <${sanitizeTag(k)}>${escapeXml(String(v ?? ""))}</${sanitizeTag(k)}>`)
          .join("\n");
        return `  <record>\n${cells}\n  </record>`;
      }).join("\n");
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<records>\n${rows}\n</records>`;
      setOutput(xml);
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
    const blob = new Blob([output], { type: "application/xml" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "converted.xml"; a.click();
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
        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>CSV Input</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          placeholder={"name,age,city\nAlice,30,London\nBob,25,Paris"} style={taStyle} />
      </div>

      <button onClick={handleConvert} style={{ ...btn(true), alignSelf: "flex-start", padding: "10px 22px" }}>Convert to XML</button>

      {status === "error" && (
        <div style={{ padding: "10px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage}
        </div>
      )}

      {status === "done" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>XML Output</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={handleCopy} style={btn()}>{copied ? "Copied!" : "Copy"}</button>
              <button onClick={handleDownload} style={btn()}>Download .xml</button>
            </div>
          </div>
          <textarea value={output} readOnly style={{ ...taStyle, background: "#f9fafb" }} />
        </div>
      )}
    </div>
  );
}

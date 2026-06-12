"use client";

import { useState, useEffect, useRef } from "react";
import type { TextTool } from "@/data/text-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

export default function XmlToCsvTool({ tool }: { tool: TextTool }) {
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
    if (!input.trim()) { setErrorMessage("Please enter XML."); setStatus("error"); return; }
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "application/xml");
      const errNode = doc.querySelector("parsererror");
      if (errNode) throw new Error(errNode.textContent ?? "XML parse error");
      const root = doc.documentElement;
      const children = Array.from(root.children);
      if (children.length === 0) throw new Error("No child elements found in root.");
      const tagCounts: Record<string, number> = {};
      for (const c of children) { tagCounts[c.tagName] = (tagCounts[c.tagName] || 0) + 1; }
      const recordTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0][0];
      const records = Array.from(root.getElementsByTagName(recordTag));
      const headers = new Set<string>();
      const rows: Record<string, string>[] = records.map((rec) => {
        const row: Record<string, string> = {};
        for (let i = 0; i < rec.attributes.length; i++) {
          const a = rec.attributes[i]; headers.add(a.name); row[a.name] = a.value;
        }
        for (const child of Array.from(rec.children)) {
          headers.add(child.tagName); row[child.tagName] = child.textContent?.trim() ?? "";
        }
        return row;
      });
      const Papa = (await import("papaparse")).default;
      const csv = Papa.unparse(rows, { columns: Array.from(headers) });
      setOutput(csv);
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
    const blob = new Blob([output], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "converted.csv"; a.click();
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
        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>XML Input</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          placeholder={"<records>\n  <record>\n    <name>Alice</name>\n    <age>30</age>\n  </record>\n  <record>\n    <name>Bob</name>\n    <age>25</age>\n  </record>\n</records>"} style={taStyle} />
      </div>

      <button onClick={handleConvert} style={{ ...btn(true), alignSelf: "flex-start", padding: "10px 22px" }}>Convert to CSV</button>

      {status === "error" && (
        <div style={{ padding: "10px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage}
        </div>
      )}

      {status === "done" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>CSV Output</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={handleCopy} style={btn()}>{copied ? "Copied!" : "Copy"}</button>
              <button onClick={handleDownload} style={btn()}>Download .csv</button>
            </div>
          </div>
          <textarea value={output} readOnly style={{ ...taStyle, background: "#f9fafb" }} />
        </div>
      )}
    </div>
  );
}

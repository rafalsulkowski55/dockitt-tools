"use client";

import { useState, useEffect, useRef } from "react";
import type { TextTool } from "@/data/text-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

function xmlNodeToObj(node: Element): unknown {
  const result: Record<string, unknown> = {};
  for (let i = 0; i < node.attributes.length; i++) {
    const attr = node.attributes[i];
    result[`@${attr.name}`] = attr.value;
  }
  const childElements = Array.from(node.children);
  if (childElements.length === 0) {
    const text = node.textContent?.trim() ?? "";
    if (Object.keys(result).length === 0) return text;
    if (text) result["#text"] = text;
    return result;
  }
  const grouped: Record<string, unknown[]> = {};
  for (const child of childElements) {
    const key = child.tagName;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(xmlNodeToObj(child));
  }
  for (const [key, arr] of Object.entries(grouped)) {
    result[key] = arr.length === 1 ? arr[0] : arr;
  }
  const textParts = Array.from(node.childNodes)
    .filter((n) => n.nodeType === Node.TEXT_NODE)
    .map((n) => n.textContent?.trim())
    .filter(Boolean);
  if (textParts.length > 0) result["#text"] = textParts.join(" ");
  return result;
}

export default function XmlToJsonTool({ tool }: { tool: TextTool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function handleConvert() {
    if (!input.trim()) { setErrorMessage("Please enter XML."); setStatus("error"); return; }
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "application/xml");
      const errNode = doc.querySelector("parsererror");
      if (errNode) throw new Error(errNode.textContent ?? "XML parse error");
      const root = doc.documentElement;
      const obj: Record<string, unknown> = {};
      obj[root.tagName] = xmlNodeToObj(root);
      setOutput(JSON.stringify(obj, null, 2));
      setStatus("done");
      ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "XML parse error.");
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
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "converted.json"; a.click();
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
          placeholder={"<persons>\n  <person id=\"1\">\n    <name>Alice</name>\n    <age>30</age>\n  </person>\n</persons>"} style={taStyle} />
      </div>

      <button onClick={handleConvert} style={{ ...btn(true), alignSelf: "flex-start", padding: "10px 22px" }}>Convert to JSON</button>

      {status === "error" && (
        <div style={{ padding: "10px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage}
        </div>
      )}

      {status === "done" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>JSON Output</label>
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

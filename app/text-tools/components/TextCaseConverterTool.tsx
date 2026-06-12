"use client";

import { useState, useEffect, useRef } from "react";
import type { TextTool } from "@/data/text-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function toSentenceCase(str: string): string {
  return str.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
}

function toCamelCase(str: string): string {
  const words = str.split(/[\s_\-./\\]+/).filter(Boolean);
  return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
}

function toPascalCase(str: string): string {
  return str.split(/[\s_\-./\\]+/).filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
}

function toSnakeCase(str: string): string {
  return str.trim().toLowerCase().replace(/[\s\-./\\]+/g, "_").replace(/[^a-z0-9_]/g, "");
}

function toKebabCase(str: string): string {
  return str.trim().toLowerCase().replace(/[\s_./\\]+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const CONVERSIONS = [
  { label: "UPPERCASE", fn: (s: string) => s.toUpperCase() },
  { label: "lowercase", fn: (s: string) => s.toLowerCase() },
  { label: "Title Case", fn: toTitleCase },
  { label: "Sentence case", fn: toSentenceCase },
  { label: "camelCase", fn: toCamelCase },
  { label: "PascalCase", fn: toPascalCase },
  { label: "snake_case", fn: toSnakeCase },
  { label: "kebab-case", fn: toKebabCase },
];

export default function TextCaseConverterTool({ tool }: { tool: TextTool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeCase, setActiveCase] = useState("");
  const [copied, setCopied] = useState(false);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function handleConvert(label: string, fn: (s: string) => string) {
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    setOutput(fn(input));
    setActiveCase(label);
    ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
  }

  const taStyle: React.CSSProperties = {
    width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "8px",
    fontSize: "14px", fontFamily: "inherit", resize: "vertical", minHeight: "140px",
    boxSizing: "border-box", lineHeight: 1.6,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div>
        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Input Text</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter or paste your text here..." style={taStyle} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {CONVERSIONS.map(({ label, fn }) => (
          <button key={label} onClick={() => handleConvert(label, fn)}
            style={{ padding: "8px 14px", background: activeCase === label ? "#2563eb" : "#f3f4f6", color: activeCase === label ? "#fff" : "#374151", border: `1px solid ${activeCase === label ? "#2563eb" : "#e5e7eb"}`, borderRadius: "7px", fontWeight: 600, fontSize: "13px", cursor: "pointer", fontFamily: "monospace" }}>
            {label}
          </button>
        ))}
      </div>

      {output && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>
              Output{activeCase ? ` — ${activeCase}` : ""}
            </label>
            <button onClick={handleCopy}
              style={{ padding: "7px 14px", background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb", borderRadius: "7px", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea value={output} readOnly style={{ ...taStyle, background: "#f9fafb", minHeight: "100px" }} />
        </div>
      )}
    </div>
  );
}

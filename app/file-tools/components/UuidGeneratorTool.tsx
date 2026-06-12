"use client";

import { useState, useEffect, useRef } from "react";
import type { FileTool } from "@/data/file-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

type Format = "standard" | "uppercase" | "no-hyphens";

export default function UuidGeneratorTool({ tool }: { tool: FileTool }) {
  const [quantity, setQuantity] = useState(1);
  const [format, setFormat] = useState<Format>("standard");
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function applyFormat(uuid: string, fmt: Format) {
    if (fmt === "uppercase") return uuid.toUpperCase();
    if (fmt === "no-hyphens") return uuid.replace(/-/g, "");
    return uuid;
  }

  function generate() {
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    const result = Array.from({ length: quantity }, () => applyFormat(crypto.randomUUID(), format));
    setUuids(result);
    ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
  }

  async function copy() {
    if (!uuids.length) return;
    await navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  function download() {
    const blob = new Blob([uuids.join("\n")], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "uuids.txt"; a.click();
    ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
  }

  const formats: { value: Format; label: string; example: string }[] = [
    { value: "standard",   label: "Standard",   example: "550e8400-e29b-41d4-a716-446655440000" },
    { value: "uppercase",  label: "Uppercase",  example: "550E8400-E29B-41D4-A716-446655440000" },
    { value: "no-hyphens", label: "No hyphens", example: "550e8400e29b41d4a716446655440000" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Quantity */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>Quantity:</label>
        <input type="number" min={1} max={100} value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
          style={{ width: "80px", padding: "7px 10px", border: "1px solid #d1d5db", borderRadius: "7px", fontSize: "13px", textAlign: "center" }} />
        <span style={{ fontSize: "12px", color: "#9ca3af" }}>(max 100)</span>
      </div>

      {/* Format */}
      <div>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "8px" }}>Format:</label>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {formats.map((f) => (
            <label key={f.value} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <input type="radio" name="uuid-format" value={f.value} checked={format === f.value} onChange={() => setFormat(f.value)} />
              <span style={{ fontSize: "13px", color: "#374151" }}>{f.label}</span>
              <code style={{ fontSize: "11px", color: "#6b7280", fontFamily: "monospace" }}>{f.example}</code>
            </label>
          ))}
        </div>
      </div>

      <button onClick={generate}
        style={{ alignSelf: "flex-start", padding: "10px 22px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
        Generate {quantity === 1 ? "UUID" : `${quantity} UUIDs`}
      </button>

      {uuids.length > 0 && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>{uuids.length} UUID{uuids.length !== 1 ? "s" : ""}</label>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={copy}
                style={{ padding: "4px 10px", background: copied ? "#dcfce7" : "#fff", color: copied ? "#166534" : "#374151", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                {copied ? "Copied!" : "Copy All"}
              </button>
              {uuids.length > 1 && (
                <button onClick={download}
                  style={{ padding: "4px 10px", background: "#fff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                  Download
                </button>
              )}
            </div>
          </div>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", maxHeight: "320px", overflowY: "auto" }}>
            {uuids.map((u, i) => (
              <div key={i} style={{ padding: "9px 14px", borderBottom: i < uuids.length - 1 ? "1px solid #f3f4f6" : "none", fontFamily: "monospace", fontSize: "13px", color: "#111", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                {u}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

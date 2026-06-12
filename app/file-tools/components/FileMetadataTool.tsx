"use client";

import { useState, useRef, useEffect } from "react";
import type { FileTool } from "@/data/file-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  if (b < 1024 * 1024 * 1024) return `${(b / 1024 / 1024).toFixed(2)} MB`;
  return `${(b / 1024 / 1024 / 1024).toFixed(3)} GB`;
}

type Row = { label: string; value: string };

function fileToRows(f: File): Row[] {
  const rows: Row[] = [
    { label: "Name", value: f.name },
    { label: "Size", value: `${formatBytes(f.size)} (${f.size.toLocaleString()} bytes)` },
    { label: "Type", value: f.type || "(unknown)" },
    { label: "Last Modified", value: new Date(f.lastModified).toLocaleString() },
  ];
  // Extension
  const dot = f.name.lastIndexOf(".");
  if (dot > 0) rows.push({ label: "Extension", value: f.name.slice(dot) });
  return rows;
}

export default function FileMetadataTool({ tool }: { tool: FileTool }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function handleFile(f: File) {
    setRows(fileToRows(f));
    setFileName(f.name);
    ToolTracking.uploadStarted(tool.slug, PROCESSING_TYPE);
    ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <input ref={inputRef} type="file" style={{ display: "none" }} onChange={handleInputChange} />
      <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => inputRef.current?.click()}
        style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "28px 20px", background: "#f8faff", textAlign: "center", cursor: "pointer" }}>
        {rows ? (
          <>
            <div style={{ fontSize: "28px", marginBottom: "6px" }}>📄</div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "2px" }}>{fileName}</div>
            <div style={{ fontSize: "12px", color: "#9ca3af" }}>Click to inspect another file</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>Drop any file here</div>
            <div style={{ fontSize: "12px", color: "#9ca3af" }}>Metadata is read instantly — no file content is accessed</div>
          </>
        )}
      </div>

      {rows && (
        <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", overflow: "hidden" }}>
          {rows.map((row, i) => (
            <div key={row.label} style={{ display: "grid", gridTemplateColumns: "140px 1fr", borderBottom: i < rows.length - 1 ? "1px solid #f3f4f6" : "none" }}>
              <div style={{ padding: "10px 14px", background: "#f9fafb", fontSize: "12px", fontWeight: 600, color: "#6b7280", borderRight: "1px solid #f3f4f6" }}>
                {row.label}
              </div>
              <div style={{ padding: "10px 14px", fontSize: "13px", color: "#111", wordBreak: "break-all", fontFamily: "monospace" }}>
                {row.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

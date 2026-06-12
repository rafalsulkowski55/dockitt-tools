"use client";

import { useState, useEffect, useRef } from "react";
import type { TextTool } from "@/data/text-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

export default function CsvViewerTool({ tool }: { tool: TextTool }) {
  const [input, setInput] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput((ev.target?.result as string) ?? "");
    reader.readAsText(f);
    e.target.value = "";
  }

  async function handleView() {
    if (!input.trim()) { setErrorMessage("Please enter CSV data or upload a file."); setStatus("error"); return; }
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    try {
      const Papa = (await import("papaparse")).default;
      const result = Papa.parse<string[]>(input, { skipEmptyLines: true });
      if (result.errors.length > 0 && result.data.length === 0) throw new Error(result.errors[0].message);
      const [firstRow, ...dataRows] = result.data;
      setHeaders(firstRow);
      setRows(dataRows);
      setStatus("done");
      ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Parse error.");
      setStatus("error");
    }
  }

  const btn = (primary?: boolean): React.CSSProperties => ({
    padding: "9px 18px", background: primary ? "#2563eb" : "#f3f4f6",
    color: primary ? "#fff" : "#374151", border: `1px solid ${primary ? "#2563eb" : "#e5e7eb"}`,
    borderRadius: "7px", fontWeight: 600, fontSize: "13px", cursor: "pointer",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <input ref={fileRef} type="file" accept=".csv,.tsv,.txt" style={{ display: "none" }} onChange={handleFileChange} />
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>CSV Input</label>
          <button onClick={() => fileRef.current?.click()} style={btn()}>Upload .csv</button>
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          placeholder={"name,age,city\nAlice,30,London\nBob,25,Paris"}
          style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "13px", fontFamily: "monospace", resize: "vertical", minHeight: "120px", boxSizing: "border-box" }} />
      </div>

      <button onClick={handleView} style={{ ...btn(true), alignSelf: "flex-start", padding: "10px 22px" }}>View as Table</button>

      {status === "error" && (
        <div style={{ padding: "10px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage}
        </div>
      )}

      {status === "done" && headers.length > 0 && (
        <div>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 8px" }}>
            {rows.length} rows × {headers.length} columns
          </p>
          <div style={{ overflowX: "auto", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#eff6ff" }}>
                  {headers.map((h, i) => (
                    <th key={i} style={{ padding: "9px 12px", textAlign: "left", fontWeight: 600, color: "#1e40af", borderBottom: "2px solid #bfdbfe", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : "#f9fafb" }}>
                    {headers.map((_, ci) => (
                      <td key={ci} style={{ padding: "7px 12px", color: "#374151", borderBottom: "1px solid #f3f4f6", whiteSpace: "nowrap", maxWidth: "240px", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {row[ci] ?? ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

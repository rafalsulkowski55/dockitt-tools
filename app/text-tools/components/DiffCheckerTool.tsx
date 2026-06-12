"use client";

import { useState, useEffect, useRef } from "react";
import type { TextTool } from "@/data/text-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

type DiffLine = { type: "equal" | "removed" | "added"; text: string };

function lcs(a: string[], b: string[]): number[][] {
  const m = a.length; const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp;
}

function diff(original: string[], modified: string[]): DiffLine[] {
  const dp = lcs(original, modified);
  const result: DiffLine[] = [];
  let i = original.length; let j = modified.length;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && original[i - 1] === modified[j - 1]) {
      result.unshift({ type: "equal", text: original[i - 1] }); i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: "added", text: modified[j - 1] }); j--;
    } else {
      result.unshift({ type: "removed", text: original[i - 1] }); i--;
    }
  }
  return result;
}

export default function DiffCheckerTool({ tool }: { tool: TextTool }) {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [diffLines, setDiffLines] = useState<DiffLine[] | null>(null);
  const [stats, setStats] = useState({ added: 0, removed: 0, unchanged: 0 });
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function handleCompare() {
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    const origLines = original.split("\n");
    const modLines = modified.split("\n");
    const result = diff(origLines, modLines);
    setDiffLines(result);
    setStats({
      added: result.filter((l) => l.type === "added").length,
      removed: result.filter((l) => l.type === "removed").length,
      unchanged: result.filter((l) => l.type === "equal").length,
    });
    ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
  }

  const taStyle: React.CSSProperties = {
    width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "8px",
    fontSize: "13px", fontFamily: "monospace", resize: "vertical", minHeight: "160px",
    boxSizing: "border-box", lineHeight: 1.5,
  };

  const bgFor = (type: DiffLine["type"]) =>
    type === "added" ? "#dcfce7" : type === "removed" ? "#fee2e2" : "#fff";
  const colorFor = (type: DiffLine["type"]) =>
    type === "added" ? "#166534" : type === "removed" ? "#991b1b" : "#374151";
  const prefixFor = (type: DiffLine["type"]) =>
    type === "added" ? "+ " : type === "removed" ? "- " : "  ";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Original</label>
          <textarea value={original} onChange={(e) => setOriginal(e.target.value)} placeholder="Paste original text here..." style={taStyle} />
        </div>
        <div>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Modified</label>
          <textarea value={modified} onChange={(e) => setModified(e.target.value)} placeholder="Paste modified text here..." style={taStyle} />
        </div>
      </div>

      <button onClick={handleCompare}
        style={{ alignSelf: "flex-start", padding: "10px 22px", background: "#2563eb", color: "#fff", border: "1px solid #2563eb", borderRadius: "7px", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
        Compare
      </button>

      {diffLines !== null && (
        <>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "13px", background: "#dcfce7", color: "#166534", padding: "4px 10px", borderRadius: "6px", fontWeight: 600 }}>+{stats.added} added</span>
            <span style={{ fontSize: "13px", background: "#fee2e2", color: "#991b1b", padding: "4px 10px", borderRadius: "6px", fontWeight: 600 }}>−{stats.removed} removed</span>
            <span style={{ fontSize: "13px", background: "#f3f4f6", color: "#6b7280", padding: "4px 10px", borderRadius: "6px", fontWeight: 600 }}>{stats.unchanged} unchanged</span>
          </div>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "auto", maxHeight: "500px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "monospace", fontSize: "13px" }}>
              <tbody>
                {diffLines.map((line, i) => (
                  <tr key={i} style={{ background: bgFor(line.type) }}>
                    <td style={{ width: "28px", padding: "3px 8px", color: colorFor(line.type), userSelect: "none", borderRight: "1px solid #e5e7eb", textAlign: "center", fontWeight: 700 }}>
                      {line.type === "added" ? "+" : line.type === "removed" ? "−" : ""}
                    </td>
                    <td style={{ padding: "3px 12px", color: colorFor(line.type), whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                      {prefixFor(line.type)}{line.text}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import type { TextTool } from "@/data/text-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

function getStats(text: string) {
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const sentences = text.trim() === "" ? 0 : (text.match(/[.!?]+/g) ?? []).length;
  const paragraphs = text.trim() === "" ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  const readSec = Math.round((words / 200) * 60);
  const readMin = Math.floor(readSec / 60);
  const readSecRem = readSec % 60;
  const readTime = readMin > 0 ? `${readMin}m ${readSecRem}s` : `${readSecRem}s`;
  return { chars, charsNoSpaces, words, sentences, paragraphs, readTime };
}

export default function WordCounterTool({ tool }: { tool: TextTool }) {
  const [input, setInput] = useState("");
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  const stats = getStats(input);

  const statItems = [
    { label: "Words", value: stats.words.toLocaleString() },
    { label: "Characters", value: stats.chars.toLocaleString() },
    { label: "Characters (no spaces)", value: stats.charsNoSpaces.toLocaleString() },
    { label: "Sentences", value: stats.sentences.toLocaleString() },
    { label: "Paragraphs", value: stats.paragraphs.toLocaleString() },
    { label: "Reading time", value: stats.readTime },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div>
        <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
          Type or paste your text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start typing or paste your text here..."
          style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit", resize: "vertical", minHeight: "200px", boxSizing: "border-box", lineHeight: 1.6 }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px" }}>
        {statItems.map(({ label, value }) => (
          <div key={label} style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "14px 16px" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#1d4ed8", lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>{label}</div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
        Reading time based on 200 words per minute average.
      </p>
    </div>
  );
}

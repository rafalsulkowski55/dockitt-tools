"use client";

import { useState, useEffect, useRef } from "react";
import type { TextTool } from "@/data/text-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure dolor reprehenderit voluptate velit esse cillum dolore fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim est laborum".split(" ");

function pickWords(n: number, startOffset: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < n; i++) out.push(WORDS[(startOffset + i) % WORDS.length]);
  return out;
}

function makeSentence(wordCount: number, offset: number, capitalise: boolean): string {
  const words = pickWords(wordCount, offset);
  if (capitalise) words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function makeParagraph(idx: number): string {
  if (idx === 0) return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const numSentences = 4 + (idx % 4);
  const sentences: string[] = [];
  let offset = (idx * 17) % WORDS.length;
  for (let i = 0; i < numSentences; i++) {
    const wc = 8 + ((offset + i * 3) % 8);
    sentences.push(makeSentence(wc, offset, i === 0));
    offset = (offset + wc) % WORDS.length;
  }
  return sentences.join(" ");
}

function generate(type: "paragraphs" | "sentences" | "words", count: number): string {
  if (type === "paragraphs") {
    return Array.from({ length: count }, (_, i) => makeParagraph(i)).join("\n\n");
  }
  if (type === "sentences") {
    const sentences: string[] = [];
    let offset = 0;
    for (let i = 0; i < count; i++) {
      const wc = 8 + (i * 3 % 8);
      sentences.push(makeSentence(wc, offset, true));
      offset = (offset + wc) % WORDS.length;
    }
    return sentences.join("\n");
  }
  const rawWords = pickWords(count, 0);
  if (rawWords.length > 0) rawWords[0] = rawWords[0].charAt(0).toUpperCase() + rawWords[0].slice(1);
  return rawWords.join(" ") + ".";
}

export default function LoremIpsumGeneratorTool({ tool }: { tool: TextTool }) {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function handleGenerate() {
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    setOutput(generate(type, count));
    ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
  }

  const maxCount = type === "paragraphs" ? 10 : type === "sentences" ? 50 : 1000;
  const radioBtn = (active: boolean): React.CSSProperties => ({
    padding: "7px 14px", border: `1px solid ${active ? "#2563eb" : "#e5e7eb"}`,
    borderRadius: "6px", background: active ? "#eff6ff" : "#fff",
    color: active ? "#2563eb" : "#374151", fontWeight: active ? 600 : 400,
    fontSize: "13px", cursor: "pointer",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
        {(["paragraphs", "sentences", "words"] as const).map((t) => (
          <button key={t} onClick={() => { setType(t); setCount(t === "paragraphs" ? 3 : t === "sentences" ? 5 : 50); }} style={radioBtn(type === t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ fontSize: "13px", color: "#374151", fontWeight: 500 }}>Count:</label>
          <input type="number" min="1" max={maxCount} value={count} onChange={(e) => setCount(Math.min(maxCount, Math.max(1, parseInt(e.target.value) || 1)))}
            style={{ width: "70px", padding: "7px 10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "13px" }} />
        </div>
        <button onClick={handleGenerate}
          style={{ padding: "9px 20px", background: "#2563eb", color: "#fff", border: "1px solid #2563eb", borderRadius: "7px", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
          Generate
        </button>
      </div>

      {output && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Generated Text</label>
            <button onClick={handleCopy}
              style={{ padding: "7px 14px", background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb", borderRadius: "7px", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea value={output} readOnly
            style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit", resize: "vertical", minHeight: "200px", boxSizing: "border-box", lineHeight: 1.7, background: "#f9fafb" }} />
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import type { FileTool } from "@/data/file-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function getStrength(pw: string): { label: string; color: string; width: string } {
  let score = 0;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 2) return { label: "Weak", color: "#ef4444", width: "25%" };
  if (score <= 3) return { label: "Fair", color: "#f59e0b", width: "50%" };
  if (score <= 4) return { label: "Good", color: "#3b82f6", width: "75%" };
  return { label: "Strong", color: "#16a34a", width: "100%" };
}

export default function PasswordGeneratorTool({ tool }: { tool: FileTool }) {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function generate() {
    let charset = "";
    if (useUpper) charset += UPPER;
    if (useLower) charset += LOWER;
    if (useDigits) charset += DIGITS;
    if (useSymbols) charset += SYMBOLS;
    if (!charset) { setErrorMessage("Select at least one character type."); return; }
    setErrorMessage("");
    const bytes = crypto.getRandomValues(new Uint32Array(length));
    const pw = Array.from(bytes).map((b) => charset[b % charset.length]).join("");
    setPassword(pw);
    ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
  }

  async function copy() {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  const strength = password ? getStrength(password) : null;

  const checkboxStyle = { display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "13px", color: "#374151" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Length */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>Password length</label>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#2563eb" }}>{length}</span>
        </div>
        <input type="range" min={6} max={64} value={length} onChange={(e) => setLength(+e.target.value)}
          style={{ width: "100%", accentColor: "#2563eb" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>
          <span>6</span><span>64</span>
        </div>
      </div>

      {/* Character types */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        <label style={checkboxStyle}>
          <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} />
          Uppercase (A-Z)
        </label>
        <label style={checkboxStyle}>
          <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} />
          Lowercase (a-z)
        </label>
        <label style={checkboxStyle}>
          <input type="checkbox" checked={useDigits} onChange={(e) => setUseDigits(e.target.checked)} />
          Numbers (0-9)
        </label>
        <label style={checkboxStyle}>
          <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />
          Symbols (!@#…)
        </label>
      </div>

      <button onClick={generate}
        style={{ alignSelf: "flex-start", padding: "10px 22px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
        Generate Password
      </button>

      {errorMessage && (
        <div style={{ padding: "10px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage}
        </div>
      )}

      {password && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Generated password</label>
            <button onClick={copy}
              style={{ padding: "4px 10px", background: copied ? "#dcfce7" : "#fff", color: copied ? "#166534" : "#374151", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div style={{ padding: "14px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", fontFamily: "monospace", fontSize: "15px", fontWeight: 600, color: "#111", wordBreak: "break-all", letterSpacing: "0.04em" }}>
            {password}
          </div>
          {strength && (
            <div style={{ marginTop: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                <span style={{ color: "#6b7280" }}>Strength</span>
                <span style={{ color: strength.color, fontWeight: 600 }}>{strength.label}</span>
              </div>
              <div style={{ height: "5px", background: "#e5e7eb", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", background: strength.color, width: strength.width, transition: "width 0.3s ease, background 0.3s ease", borderRadius: "3px" }} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

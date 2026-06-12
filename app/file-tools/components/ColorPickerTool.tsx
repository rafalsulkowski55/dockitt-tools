"use client";

import { useState, useEffect, useRef } from "react";
import type { FileTool } from "@/data/file-tools/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;

type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };
type HSV = { h: number; s: number; v: number };

function hexToRgb(hex: string): RGB | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function rgbToHex({ r, g, b }: RGB) {
  return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  const nr = r / 255, ng = g / 255, nb = b / 255;
  const max = Math.max(nr, ng, nb), min = Math.min(nr, ng, nb);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = max === nr ? (ng - nb) / d + (ng < nb ? 6 : 0)
    : max === ng ? (nb - nr) / d + 2
    : (nr - ng) / d + 4;
  return { h: Math.round(h * 60), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb({ h, s, l }: HSL): RGB {
  const sn = s / 100, ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = ln - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60)       { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else              { r = c; b = x; }
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

function rgbToHsv({ r, g, b }: RGB): HSV {
  const nr = r / 255, ng = g / 255, nb = b / 255;
  const max = Math.max(nr, ng, nb), min = Math.min(nr, ng, nb), d = max - min;
  const v = max;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (d !== 0) {
    h = max === nr ? (ng - nb) / d + (ng < nb ? 6 : 0)
      : max === ng ? (nb - nr) / d + 2
      : (nr - ng) / d + 4;
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), v: Math.round(v * 100) };
}

function hsvToRgb({ h, s, v }: HSV): RGB {
  const sn = s / 100, vn = v / 100;
  const i = Math.floor(h / 60), f = h / 60 - i;
  const p = vn * (1 - sn), q = vn * (1 - f * sn), t = vn * (1 - (1 - f) * sn);
  let r = 0, g = 0, b = 0;
  switch (i % 6) {
    case 0: r = vn; g = t;  b = p;  break;
    case 1: r = q;  g = vn; b = p;  break;
    case 2: r = p;  g = vn; b = t;  break;
    case 3: r = p;  g = q;  b = vn; break;
    case 4: r = t;  g = p;  b = vn; break;
    case 5: r = vn; g = p;  b = q;  break;
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  }
  return (
    <button onClick={copy} style={{ padding: "3px 8px", fontSize: "10px", fontWeight: 600, border: "1px solid #e5e7eb", borderRadius: "5px", background: copied ? "#dcfce7" : "#fff", color: copied ? "#166534" : "#6b7280", cursor: "pointer" }}>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function ColorPickerTool({ tool }: { tool: FileTool }) {
  const [hex, setHex] = useState("#2563eb");
  const [rgb, setRgb] = useState<RGB>({ r: 37, g: 99, b: 235 });
  const [hsl, setHsl] = useState<HSL>({ h: 221, s: 83, l: 53 });
  const [hsv, setHsv] = useState<HSV>({ h: 221, s: 84, v: 92 });
  const didView = useRef(false);

  useEffect(() => {
    if (!didView.current) { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); didView.current = true; }
  }, [tool.slug]);

  function fromHex(h: string) {
    const r = hexToRgb(h); if (!r) return;
    setHex(h); setRgb(r); setHsl(rgbToHsl(r)); setHsv(rgbToHsv(r));
  }

  function fromRgb(r: RGB) {
    setRgb(r); setHex(rgbToHex(r)); setHsl(rgbToHsl(r)); setHsv(rgbToHsv(r));
  }

  function fromHsl(h: HSL) {
    const r = hslToRgb(h); setHsl(h); setRgb(r); setHex(rgbToHex(r)); setHsv(rgbToHsv(r));
  }

  function fromHsv(v: HSV) {
    const r = hsvToRgb(v); setHsv(v); setRgb(r); setHex(rgbToHex(r)); setHsl(rgbToHsl(r));
  }

  const inputStyle: React.CSSProperties = { width: "60px", padding: "5px 7px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "13px", textAlign: "center" };
  const labelStyle: React.CSSProperties = { fontSize: "11px", fontWeight: 600, color: "#6b7280", marginBottom: "4px", display: "block" };

  const hexStr = hex.toUpperCase();
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const hsvStr = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {/* Color swatch + native picker */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "12px", background: hex, border: "1px solid #e5e7eb", flexShrink: 0 }} />
        <div>
          <label style={labelStyle}>Click to pick color</label>
          <input type="color" value={hex} onChange={(e) => fromHex(e.target.value)}
            style={{ width: "48px", height: "36px", padding: "2px", border: "1px solid #d1d5db", borderRadius: "7px", cursor: "pointer" }} />
        </div>
      </div>

      {/* HEX */}
      <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px", background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#374151" }}>HEX</span>
          <CopyBtn text={hexStr} />
        </div>
        <input type="text" value={hexStr} onChange={(e) => fromHex(e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value)}
          style={{ ...inputStyle, width: "110px", fontFamily: "monospace", textTransform: "uppercase" }} />
      </div>

      {/* RGB */}
      <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px", background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#374151" }}>RGB</span>
          <CopyBtn text={rgbStr} />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {(["r", "g", "b"] as const).map((ch) => (
            <div key={ch}>
              <label style={labelStyle}>{ch.toUpperCase()}</label>
              <input type="number" min={0} max={255} value={rgb[ch]}
                onChange={(e) => fromRgb({ ...rgb, [ch]: Math.max(0, Math.min(255, +e.target.value)) })}
                style={inputStyle} />
            </div>
          ))}
        </div>
      </div>

      {/* HSL */}
      <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px", background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#374151" }}>HSL</span>
          <CopyBtn text={hslStr} />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div><label style={labelStyle}>H (0-360)</label><input type="number" min={0} max={360} value={hsl.h} onChange={(e) => fromHsl({ ...hsl, h: Math.max(0, Math.min(360, +e.target.value)) })} style={inputStyle} /></div>
          <div><label style={labelStyle}>S %</label><input type="number" min={0} max={100} value={hsl.s} onChange={(e) => fromHsl({ ...hsl, s: Math.max(0, Math.min(100, +e.target.value)) })} style={inputStyle} /></div>
          <div><label style={labelStyle}>L %</label><input type="number" min={0} max={100} value={hsl.l} onChange={(e) => fromHsl({ ...hsl, l: Math.max(0, Math.min(100, +e.target.value)) })} style={inputStyle} /></div>
        </div>
      </div>

      {/* HSV */}
      <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px", background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#374151" }}>HSV</span>
          <CopyBtn text={hsvStr} />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div><label style={labelStyle}>H (0-360)</label><input type="number" min={0} max={360} value={hsv.h} onChange={(e) => fromHsv({ ...hsv, h: Math.max(0, Math.min(360, +e.target.value)) })} style={inputStyle} /></div>
          <div><label style={labelStyle}>S %</label><input type="number" min={0} max={100} value={hsv.s} onChange={(e) => fromHsv({ ...hsv, s: Math.max(0, Math.min(100, +e.target.value)) })} style={inputStyle} /></div>
          <div><label style={labelStyle}>V %</label><input type="number" min={0} max={100} value={hsv.v} onChange={(e) => fromHsv({ ...hsv, v: Math.max(0, Math.min(100, +e.target.value)) })} style={inputStyle} /></div>
        </div>
      </div>
    </div>
  );
}

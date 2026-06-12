"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const FORMAT_LABELS: Record<string, string> = {
  pdf: "PDF", jpg: "JPG", png: "PNG", webp: "WebP", bmp: "BMP",
  txt: "Text / TXT", gif: "GIF", md: "Markdown", csv: "CSV", json: "JSON",
  svg: "SVG", ico: "ICO", heic: "HEIC", tiff: "TIFF",
  image: "Any Image",
};

const FORMAT_COLORS: Record<string, { bg: string; fg: string }> = {
  pdf:   { bg: "#fef2f2", fg: "#dc2626" },
  jpg:   { bg: "#eff6ff", fg: "#2563eb" },
  png:   { bg: "#f0fdf4", fg: "#16a34a" },
  webp:  { bg: "#fdf4ff", fg: "#9333ea" },
  bmp:   { bg: "#fff7ed", fg: "#ea580c" },
  txt:   { bg: "#f9fafb", fg: "#6b7280" },
  gif:   { bg: "#fefce8", fg: "#ca8a04" },
  md:    { bg: "#f0f9ff", fg: "#0369a1" },
  csv:   { bg: "#f0fdf4", fg: "#15803d" },
  json:  { bg: "#fefce8", fg: "#b45309" },
  svg:   { bg: "#f5f3ff", fg: "#7c3aed" },
  ico:   { bg: "#eff6ff", fg: "#1d4ed8" },
  heic:  { bg: "#fff1f2", fg: "#e11d48" },
  tiff:  { bg: "#f9fafb", fg: "#374151" },
  image: { bg: "#eff6ff", fg: "#2563eb" },
};

export interface SlimVariant {
  slug: string;
  inputFormat: string;
  outputFormat: string;
}

interface ConvertSelectorProps {
  variants: SlimVariant[];
  currentSlug?: string;
  baseUrl: string;
  showConvertButton?: boolean;
}

function fmtLabel(f: string) { return FORMAT_LABELS[f] ?? f.toUpperCase(); }
function fmtColors(f: string) { return FORMAT_COLORS[f] ?? { bg: "#f3f4f6", fg: "#374151" }; }

function FormatBlock({ format, label, options, onChange }: {
  format: string; label: string; options: string[]; onChange: (v: string) => void;
}) {
  const c = fmtColors(format);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</span>
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", minWidth: "130px", pointerEvents: "none" }}>
          <span style={{ padding: "2px 7px", borderRadius: "5px", fontSize: "11px", fontWeight: 800, letterSpacing: "0.03em", background: c.bg, color: c.fg, flexShrink: 0 }}>
            {format === "image" ? "IMG" : format === "md" ? "MD" : format.toUpperCase()}
          </span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#111", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{fmtLabel(format)}</span>
          <span style={{ color: "#9ca3af", fontSize: "11px", flexShrink: 0 }}>▾</span>
        </div>
        <select
          value={format}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }}
        >
          {options.map((f) => (
            <option key={f} value={f}>{fmtLabel(f)}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function ConvertSelector({ variants, currentSlug, baseUrl, showConvertButton = false }: ConvertSelectorProps) {
  const router = useRouter();
  const current = variants.find((v) => v.slug === currentSlug);

  const fromOptions = Array.from(new Set(variants.map((v) => v.inputFormat)));
  const initialFrom = current?.inputFormat ?? fromOptions[0] ?? "";

  const [from, setFrom] = useState(initialFrom);

  const toOptions = Array.from(new Set(variants.filter((v) => v.inputFormat === from).map((v) => v.outputFormat)));
  const initialTo = current?.outputFormat ?? toOptions[0] ?? "";
  const [to, setTo] = useState(initialTo);

  const effectiveTo = toOptions.includes(to) ? to : (toOptions[0] ?? "");
  const targetVariant = variants.find((v) => v.inputFormat === from && v.outputFormat === effectiveTo);

  function handleFromChange(newFrom: string) {
    setFrom(newFrom);
    const avail = Array.from(new Set(variants.filter((v) => v.inputFormat === newFrom).map((v) => v.outputFormat)));
    const newTo = avail[0] ?? "";
    setTo(newTo);
    if (!showConvertButton) {
      const target = variants.find((v) => v.inputFormat === newFrom && v.outputFormat === newTo);
      if (target) router.push(`${baseUrl}/${target.slug}`);
    }
  }

  function handleToChange(newTo: string) {
    setTo(newTo);
    if (!showConvertButton) {
      const target = variants.find((v) => v.inputFormat === from && v.outputFormat === newTo);
      if (target) router.push(`${baseUrl}/${target.slug}`);
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", flexWrap: "wrap" }}>
      <FormatBlock format={from} label="From" options={fromOptions} onChange={handleFromChange} />

      <div style={{ fontSize: "20px", color: "#d1d5db", paddingBottom: "11px", userSelect: "none", flexShrink: 0 }}>→</div>

      <FormatBlock format={effectiveTo} label="To" options={toOptions} onChange={handleToChange} />

      {showConvertButton && (
        <button
          disabled={!targetVariant}
          onClick={() => { if (targetVariant) router.push(`${baseUrl}/${targetVariant.slug}`); }}
          style={{
            padding: "10px 22px",
            background: targetVariant ? "#2563eb" : "#d1d5db",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "14px",
            cursor: targetVariant ? "pointer" : "not-allowed",
            whiteSpace: "nowrap",
          }}
        >
          Convert →
        </button>
      )}
    </div>
  );
}

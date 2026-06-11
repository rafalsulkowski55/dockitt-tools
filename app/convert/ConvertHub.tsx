"use client";

import { useState } from "react";
import Link from "next/link";
import type { ConvertVariant } from "@/data/convert/variants";
import { getAllConvertImageVariants } from "@/data/convert-image/variants";

const IMAGE_VARIANT_META: Record<string, { icon: string; desc: string }> = {
  "jpg-to-png":   { icon: "🖼️", desc: "Convert JPEG to lossless PNG" },
  "jpg-to-webp":  { icon: "🖼️", desc: "Convert JPEG to modern WebP" },
  "jpg-to-bmp":   { icon: "🖼️", desc: "Convert JPEG to uncompressed BMP" },
  "jpg-to-ico":   { icon: "🔷", desc: "Convert JPEG to ICO icon format" },
  "png-to-jpg":   { icon: "🖼️", desc: "Convert PNG to compressed JPEG" },
  "png-to-webp":  { icon: "🖼️", desc: "Convert PNG to modern WebP" },
  "png-to-bmp":   { icon: "🖼️", desc: "Convert PNG to uncompressed BMP" },
  "png-to-ico":   { icon: "🔷", desc: "Convert PNG to ICO icon format" },
  "webp-to-jpg":  { icon: "🖼️", desc: "Convert WebP to JPEG for compatibility" },
  "webp-to-png":  { icon: "🖼️", desc: "Convert WebP to lossless PNG" },
  "webp-to-bmp":  { icon: "🖼️", desc: "Convert WebP to uncompressed BMP" },
  "bmp-to-jpg":   { icon: "🖼️", desc: "Convert BMP to compressed JPEG" },
  "bmp-to-png":   { icon: "🖼️", desc: "Convert BMP to lossless PNG" },
  "bmp-to-webp":  { icon: "🖼️", desc: "Convert BMP to modern WebP" },
};

const VARIANT_META: Record<string, { icon: string; desc: string }> = {
  "pdf-to-jpg":  { icon: "🖼️", desc: "Extract every page as a JPEG image" },
  "pdf-to-png":  { icon: "🖼️", desc: "Extract every page as a PNG image" },
  "pdf-to-webp": { icon: "🖼️", desc: "Extract every page as a WebP image" },
  "pdf-to-bmp":  { icon: "🖼️", desc: "Extract every page as a BMP image" },
  "pdf-to-txt":  { icon: "📝", desc: "Extract all text into a plain text file" },
  "jpg-to-pdf":  { icon: "📄", desc: "Combine multiple JPG images into one PDF" },
  "png-to-pdf":  { icon: "📄", desc: "Combine multiple PNG images into one PDF" },
  "webp-to-pdf": { icon: "📄", desc: "Combine multiple WebP images into one PDF" },
  "bmp-to-pdf":  { icon: "📄", desc: "Combine multiple BMP images into one PDF" },
  "gif-to-pdf":  { icon: "📄", desc: "Combine multiple GIF images into one PDF" },
  "text-to-pdf":      { icon: "📄", desc: "Convert a plain text file to a PDF document" },
  "pdf-to-markdown":  { icon: "📝", desc: "Extract text from a PDF as a Markdown file" },
  "markdown-to-pdf":  { icon: "📄", desc: "Convert a Markdown .md file to PDF" },
  "csv-to-pdf":       { icon: "📊", desc: "Convert a CSV spreadsheet to a PDF table" },
  "json-to-pdf":      { icon: "📄", desc: "Convert a JSON file to a formatted PDF" },
  "svg-to-pdf":       { icon: "🖼️", desc: "Convert SVG vector graphics to a PDF" },
  "pdf-metadata":     { icon: "🔍", desc: "Extract metadata from a PDF as a JSON file" },
};

type Props = {
  variants: ConvertVariant[];
};

export default function ConvertHub({ variants }: Props) {
  const [tab, setTab] = useState<"pdf" | "image">("pdf");

  const tabBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: "10px 24px",
    fontSize: "14px",
    fontWeight: 600,
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: active ? "#2563eb" : "transparent",
    color: active ? "#fff" : "#6b7280",
    transition: "all 0.15s",
  });

  return (
    <main style={{ background: "#f9fafb", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "56px 24px 40px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>
            Converters
          </p>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.02em", marginBottom: "12px", marginTop: 0 }}>
            Convert files online
          </h1>
          <p style={{ fontSize: "17px", color: "#4b5563", lineHeight: 1.6, marginBottom: "32px", marginTop: 0, maxWidth: "560px" }}>
            Free browser-based file converters. Everything runs in your browser — no upload, no account, complete privacy.
          </p>

          {/* Tab switcher */}
          <div style={{ display: "inline-flex", background: "#f3f4f6", borderRadius: "10px", padding: "4px", gap: "2px" }}>
            <button onClick={() => setTab("pdf")} style={tabBtnStyle(tab === "pdf")}>PDF Convert</button>
            <button onClick={() => setTab("image")} style={tabBtnStyle(tab === "image")}>Image Convert</button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px" }}>

          {tab === "pdf" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "16px", marginTop: 0, borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
                PDF Conversion
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
                {variants.map((v) => {
                  const meta = VARIANT_META[v.slug] ?? { icon: "🔄", desc: v.description };
                  return (
                    <Link key={v.slug} href={`/convert-pdf/${v.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{
                        background: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        height: "100%",
                        transition: "border-color 0.15s",
                      }}>
                        <span style={{ fontSize: "28px" }}>{meta.icon}</span>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{v.name}</p>
                          <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{meta.desc}</p>
                        </div>
                        <p style={{ fontSize: "12px", color: "#2563eb", fontWeight: 600, margin: 0 }}>Convert now →</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div style={{ marginTop: "32px", padding: "16px 20px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#14532d" }}>
                <span style={{ flexShrink: 0 }}>✅</span>
                <span><strong>All conversions run in your browser.</strong> Your files never leave your device — no upload, no server, complete privacy.</span>
              </div>
            </div>
          )}

          {tab === "image" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "16px", marginTop: 0, borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
                Image Conversion
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
                {getAllConvertImageVariants().map((v) => {
                  const meta = IMAGE_VARIANT_META[v.slug] ?? { icon: "🔄", desc: v.description };
                  return (
                    <Link key={v.slug} href={`/convert-image/${v.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", height: "100%", transition: "border-color 0.15s" }}>
                        <span style={{ fontSize: "28px" }}>{meta.icon}</span>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{v.name}</p>
                          <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{meta.desc}</p>
                        </div>
                        <p style={{ fontSize: "12px", color: "#2563eb", fontWeight: 600, margin: 0 }}>Convert now →</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div style={{ marginTop: "32px", padding: "16px 20px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#14532d" }}>
                <span style={{ flexShrink: 0 }}>✅</span>
                <span><strong>All conversions run in your browser.</strong> Your files never leave your device — no upload, no server, complete privacy.</span>
              </div>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}

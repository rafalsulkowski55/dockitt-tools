import type { Metadata } from "next";
import Link from "next/link";
import { getAllFileTools } from "@/data/file-tools/tools";

export const metadata: Metadata = {
  title: "File Utilities Online — Free Browser-Based Tools | Dockitt",
  description: "Free browser-based file utilities. Create ZIP archives, extract files, compute file hashes, encode Base64, generate passwords, pick colors and more. Everything runs in your browser — no upload, no account.",
  openGraph: {
    title: "File Utilities Online — Free Browser-Based Tools | Dockitt",
    description: "Free browser-based file utilities. Create ZIP archives, extract files, compute file hashes, encode Base64, generate passwords, pick colors and more. Everything runs in your browser — no upload, no account.",
    url: "https://www.dockitt.com/file-tools",
    siteName: "Dockitt",
    locale: "en_US",
    type: "website",
  },
};

const TOOL_META: Record<string, { icon: string; desc: string }> = {
  "create-zip":         { icon: "🗜️", desc: "Bundle multiple files into a single ZIP archive" },
  "extract-zip":        { icon: "📦", desc: "View and download individual files from a ZIP" },
  "file-hash":          { icon: "🔒", desc: "Compute SHA-1, SHA-256 or SHA-512 hash of any file" },
  "base64-encoder":     { icon: "🔤", desc: "Encode or decode text and files as Base64" },
  "url-encoder":        { icon: "🔗", desc: "Percent-encode or decode URLs and query strings" },
  "password-generator": { icon: "🔑", desc: "Generate strong random passwords with a strength meter" },
  "uuid-generator":     { icon: "🆔", desc: "Generate UUIDs in standard, uppercase or no-hyphens format" },
  "file-metadata":      { icon: "🔍", desc: "Inspect file name, size, type and last-modified date" },
  "color-picker":       { icon: "🎨", desc: "Pick colors and convert between HEX, RGB, HSL and HSV" },
  "css-minifier":       { icon: "✂️", desc: "Minify CSS by stripping comments and whitespace" },
};

export default function FileToolsPage() {
  const tools = getAllFileTools();

  return (
    <main style={{ background: "#f9fafb", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "56px 24px 40px" }}>
          <nav style={{ marginBottom: "16px" }}>
            <Link href="/categories" style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>
              ← All Tools
            </Link>
          </nav>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>
            File Utilities
          </p>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.02em", marginBottom: "12px", marginTop: 0 }}>
            File Utilities Online
          </h1>
          <p style={{ fontSize: "17px", color: "#4b5563", lineHeight: 1.6, marginBottom: 0, marginTop: 0, maxWidth: "580px" }}>
            Create and extract ZIP archives, compute file hashes, encode Base64, generate passwords and UUIDs, pick colors, and minify CSS. All tools run entirely in your browser — no upload, no account, complete privacy.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
            {tools.map((t) => {
              const meta = TOOL_META[t.slug] ?? { icon: "🛠️", desc: t.description };
              return (
                <Link key={t.slug} href={`/file-tools/${t.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", height: "100%" }}>
                    <span style={{ fontSize: "28px" }}>{meta.icon}</span>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{t.name}</p>
                      <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{meta.desc}</p>
                    </div>
                    <p style={{ fontSize: "12px", color: "#2563eb", fontWeight: 600, margin: 0 }}>Open tool →</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div style={{ marginTop: "32px", padding: "16px 20px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#14532d" }}>
            <span style={{ flexShrink: 0 }}>✅</span>
            <span><strong>All tools run in your browser.</strong> Your data never leaves your device — no upload, no server, complete privacy.</span>
          </div>
        </div>
      </section>

    </main>
  );
}

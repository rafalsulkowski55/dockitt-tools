import type { Metadata } from "next";
import Link from "next/link";
import { getAllTextTools } from "@/data/text-tools/tools";

export const metadata: Metadata = {
  title: "Text & Data Tools Online — Free Browser-Based Converters | Dockitt",
  description: "Free browser-based text and data tools. Convert CSV, JSON, XML, YAML. Format, diff, sort and transform text. Everything runs in your browser — no upload, no account.",
  openGraph: {
    title: "Text & Data Tools Online — Free Browser-Based Converters | Dockitt",
    description: "Free browser-based text and data tools. Convert CSV, JSON, XML, YAML. Format, diff, sort and transform text. Everything runs in your browser — no upload, no account.",
    url: "https://www.dockitt.com/text-tools",
    siteName: "Dockitt",
    locale: "en_US",
    type: "website",
  },
};

const TOOL_META: Record<string, { icon: string; desc: string }> = {
  "markdown-to-html":       { icon: "📝", desc: "Convert Markdown to HTML with live preview" },
  "html-to-markdown":       { icon: "📄", desc: "Strip HTML and extract clean Markdown" },
  "csv-to-json":            { icon: "📊", desc: "Convert CSV rows to a JSON array of objects" },
  "json-to-csv":            { icon: "📋", desc: "Flatten a JSON array to CSV rows" },
  "xml-to-json":            { icon: "🔄", desc: "Parse XML and output formatted JSON" },
  "json-to-xml":            { icon: "🔄", desc: "Build an XML document from a JSON object" },
  "csv-to-xml":             { icon: "🔄", desc: "Convert CSV rows to an XML records document" },
  "xml-to-csv":             { icon: "🔄", desc: "Extract XML records as CSV rows" },
  "yaml-to-json":           { icon: "⚙️", desc: "Parse YAML config files and output JSON" },
  "json-to-yaml":           { icon: "⚙️", desc: "Convert JSON to clean, readable YAML" },
  "csv-viewer":             { icon: "👁️", desc: "Render CSV data as a formatted HTML table" },
  "word-counter":           { icon: "🔢", desc: "Count words, characters, sentences and reading time" },
  "text-case-converter":    { icon: "Aa", desc: "Convert between UPPERCASE, camelCase, snake_case and more" },
  "remove-duplicate-lines": { icon: "🗑️", desc: "Filter out repeated lines from any text" },
  "sort-lines":             { icon: "↕️", desc: "Sort lines alphabetically or in reverse order" },
  "lorem-ipsum-generator":  { icon: "📖", desc: "Generate Lorem Ipsum placeholder text" },
  "diff-checker":           { icon: "🔍", desc: "Compare two texts and highlight the differences" },
};

export default function TextToolsPage() {
  const tools = getAllTextTools();

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
            Text & Data Tools
          </p>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.02em", marginBottom: "12px", marginTop: 0 }}>
            Text & Data Tools Online
          </h1>
          <p style={{ fontSize: "17px", color: "#4b5563", lineHeight: 1.6, marginBottom: 0, marginTop: 0, maxWidth: "580px" }}>
            Convert between CSV, JSON, XML and YAML. Format, diff, sort and transform text. All tools run entirely in your browser — no upload, no account, complete privacy.
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
                <Link key={t.slug} href={`/text-tools/${t.slug}`} style={{ textDecoration: "none" }}>
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

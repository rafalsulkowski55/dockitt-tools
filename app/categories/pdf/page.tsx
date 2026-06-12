import type { Metadata } from "next";
import Link from "next/link";
import { getAllTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "PDF Tools Online — Free Browser-Based PDF Editor | Dockitt",
  description: "10 free browser-based PDF tools. Merge, split, rotate, delete pages, add watermarks, sign, crop and convert PDFs. No upload to external servers, no account required.",
  openGraph: {
    title: "PDF Tools Online — Free Browser-Based PDF Editor | Dockitt",
    description: "10 free browser-based PDF tools. Merge, split, rotate, delete pages, add watermarks, sign, crop and convert PDFs. No upload to external servers, no account required.",
    url: "https://www.dockitt.com/categories/pdf",
    siteName: "Dockitt",
    locale: "en_US",
    type: "website",
  },
};

const TOOL_ICONS: Record<string, string> = {
  "compress-pdf":      "📦",
  "merge-pdf":         "🔗",
  "split-pdf":         "✂️",
  "rotate-pdf":        "🔄",
  "delete-pdf-pages":  "🗑️",
  "extract-pdf-pages": "📤",
  "protect-pdf":       "🔐",
  "unlock-pdf":        "🔓",
  "watermark-pdf":     "💧",
  "sign-pdf":          "✍️",
  "crop-pdf":          "✂️",
  "repair-pdf":        "🔧",
  "ocr-pdf":           "🔍",
  "reorder-pdf-pages": "🔀",
  "pdf-word-count":    "🔢",
  "add-page-numbers":  "🔢",
  "flatten-pdf":       "📄",
  "remove-metadata":   "🔍",
  "resize-pages":      "📐",
  "dark-mode-pdf":     "🌙",
};

export default function PdfCategoryPage() {
  const tools = getAllTools();

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
            PDF Tools
          </p>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.02em", marginBottom: "12px", marginTop: 0 }}>
            PDF Tools Online
          </h1>
          <p style={{ fontSize: "17px", color: "#4b5563", lineHeight: 1.6, marginBottom: 0, marginTop: 0, maxWidth: "580px" }}>
            Merge, split, rotate, crop, watermark and convert PDF files. All tools process your files entirely in your browser — no upload to external servers, no account required.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
            {tools.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", height: "100%" }}>
                  <span style={{ fontSize: "28px" }}>{TOOL_ICONS[t.slug] ?? "📄"}</span>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{t.name}</p>
                    <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{t.shortDescription}</p>
                  </div>
                  <p style={{ fontSize: "12px", color: "#2563eb", fontWeight: 600, margin: 0 }}>Open tool →</p>
                </div>
              </Link>
            ))}
          </div>

          {/* PDF Convert link */}
          <div style={{ marginTop: "24px", padding: "20px 24px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", margin: "0 0 4px" }}>Convert PDF files</p>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>PDF to JPG, PNG, Word, Excel and more — 17 conversion tools</p>
            </div>
            <Link href="/convert-pdf" style={{ fontSize: "13px", color: "#2563eb", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>Browse converters →</Link>
          </div>

          <div style={{ marginTop: "16px", padding: "16px 20px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#14532d" }}>
            <span style={{ flexShrink: 0 }}>✅</span>
            <span><strong>All PDF tools run in your browser.</strong> Your files never leave your device — no upload, no server, complete privacy.</span>
          </div>
        </div>
      </section>

    </main>
  );
}

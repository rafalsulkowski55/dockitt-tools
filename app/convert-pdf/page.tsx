import type { Metadata } from "next";
import Link from "next/link";
import { getAllConvertVariants } from "@/data/convert/variants";

export const metadata: Metadata = {
  title: "Convert PDF Online — Free PDF Converter | Dockitt",
  description: "Free online PDF converter. Convert PDF to JPG, PNG, or convert JPG and PNG to PDF. Runs entirely in your browser — no upload, no account needed.",
  openGraph: {
    title: "Convert PDF Online — Free PDF Converter | Dockitt",
    description: "Free online PDF converter. Convert PDF to JPG, PNG, or convert JPG and PNG to PDF. Runs entirely in your browser — no upload, no account needed.",
    url: "https://www.dockitt.com/convert-pdf",
    siteName: "Dockitt",
    locale: "en_US",
    type: "website",
  },
};

const VARIANT_META: Record<string, { icon: string; desc: string }> = {
  "pdf-to-jpg":   { icon: "🖼️", desc: "Extract every page as a JPEG image" },
  "pdf-to-png":   { icon: "🖼️", desc: "Extract every page as a PNG image" },
  "pdf-to-webp":  { icon: "🖼️", desc: "Extract every page as a WebP image" },
  "pdf-to-bmp":   { icon: "🖼️", desc: "Extract every page as a BMP image" },
  "pdf-to-txt":   { icon: "📝", desc: "Extract all text into a plain text file" },
  "jpg-to-pdf":   { icon: "📄", desc: "Combine multiple JPG images into one PDF" },
  "png-to-pdf":   { icon: "📄", desc: "Combine multiple PNG images into one PDF" },
  "webp-to-pdf":  { icon: "📄", desc: "Combine multiple WebP images into one PDF" },
  "bmp-to-pdf":   { icon: "📄", desc: "Combine multiple BMP images into one PDF" },
  "gif-to-pdf":   { icon: "📄", desc: "Combine multiple GIF images into one PDF" },
  "text-to-pdf":  { icon: "📄", desc: "Convert a plain text file to a PDF document" },
};

export default function ConvertPdfPage() {
  const variants = getAllConvertVariants();

  return (
    <main style={{ background: "#f9fafb", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "56px 24px 40px" }}>
          <nav style={{ marginBottom: "16px" }}>
            <Link href="/convert" style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>
              ← All Converters
            </Link>
          </nav>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>
            PDF Converter
          </p>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.02em", marginBottom: "12px", marginTop: 0 }}>
            Convert PDF online
          </h1>
          <p style={{ fontSize: "17px", color: "#4b5563", lineHeight: 1.6, marginBottom: 0, marginTop: 0, maxWidth: "560px" }}>
            Convert PDF to JPG, PNG and more — or convert images to PDF. All conversions run entirely in your browser.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px" }}>
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
      </section>

    </main>
  );
}

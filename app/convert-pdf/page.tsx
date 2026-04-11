import Link from "next/link";

export const metadata = {
  title: "Convert PDF Online — PDF Converter",
  description: "Convert PDF to Word, JPG, PNG, and more. Or convert JPG, PNG, and Word files to PDF. Free, no signup required.",
};

const CONVERT_VARIANTS = [
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    desc: "Convert PDF to editable .docx file.",
    from: "PDF",
    to: "DOCX",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    desc: "Convert .doc or .docx to PDF.",
    from: "DOCX",
    to: "PDF",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    desc: "Convert PDF pages to JPG images.",
    from: "PDF",
    to: "JPG",
    color: "#ca8a04",
    bg: "#fefce8",
  },
  {
    slug: "pdf-to-png",
    name: "PDF to PNG",
    desc: "Convert PDF pages to PNG images.",
    from: "PDF",
    to: "PNG",
    color: "#9333ea",
    bg: "#fdf4ff",
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    desc: "Combine JPG images into a PDF.",
    from: "JPG",
    to: "PDF",
    color: "#ca8a04",
    bg: "#fefce8",
  },
  {
    slug: "png-to-pdf",
    name: "PNG to PDF",
    desc: "Combine PNG images into a PDF.",
    from: "PNG",
    to: "PDF",
    color: "#9333ea",
    bg: "#fdf4ff",
  },
];

export default function ConvertPdfPage() {
  return (
    <main style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 24px" }}>

      <div style={{ marginBottom: "36px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>
          Convert PDF
        </p>
        <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "8px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
          Convert PDF files online
        </h1>
        <p style={{ fontSize: "15px", color: "#4b5563", margin: 0 }}>
          Convert PDF to Word, JPG, or PNG — or convert images and Word documents to PDF. Free, works in your browser.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
        {CONVERT_VARIANTS.map((v) => (
          <Link key={v.slug} href={`/convert-pdf/${v.slug}`} style={{ textDecoration: "none" }}>
            <div style={{
              background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px",
              padding: "20px", display: "flex", flexDirection: "column", gap: "12px",
              height: "100%",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{
                  background: v.bg, color: v.color,
                  fontSize: "11px", fontWeight: 700,
                  padding: "3px 8px", borderRadius: "6px",
                  letterSpacing: "0.04em",
                }}>
                  {v.from}
                </span>
                <span style={{ color: "#9ca3af", fontSize: "14px" }}>→</span>
                <span style={{
                  background: v.bg, color: v.color,
                  fontSize: "11px", fontWeight: 700,
                  padding: "3px 8px", borderRadius: "6px",
                  letterSpacing: "0.04em",
                }}>
                  {v.to}
                </span>
              </div>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "#111", margin: "0 0 4px" }}>{v.name}</p>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, lineHeight: 1.4 }}>{v.desc}</p>
              </div>
              <p style={{ fontSize: "13px", color: "#2563eb", fontWeight: 500, margin: 0 }}>
                Convert now →
              </p>
            </div>
          </Link>
        ))}
      </div>

    </main>
  );
}
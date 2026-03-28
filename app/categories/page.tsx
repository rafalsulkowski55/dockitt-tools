import Link from "next/link";

const CATEGORIES = [
  {
    slug: "core",
    name: "Core PDF Tools",
    description: "Essential tools for everyday PDF tasks — merge, split, compress, rotate and more.",
    icon: "⚙️",
    count: 5,
  },
  {
    slug: "security",
    name: "PDF Security Tools",
    description: "Protect, unlock, sign and watermark your PDF files quickly and for free.",
    icon: "🔐",
    count: 4,
  },
  {
    slug: "utility",
    name: "PDF Utility Tools",
    description: "Advanced PDF utilities — crop, OCR, repair, reorder pages and more.",
    icon: "🛠️",
    count: 5,
  },
  {
    slug: "convert",
    name: "Convert PDF",
    description: "Convert PDFs to images and Word documents, or convert images and Word files to PDF.",
    icon: "🔄",
    count: 6,
    href: "/convert-pdf",
  },
];

export const metadata = {
  title: "PDF Tool Categories — Dockitt",
  description: "Browse all free PDF tools by category — core tools, security, utilities, and conversions.",
};

export default function CategoriesPage() {
  return (
    <main style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>
            Categories
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "8px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
            Browse PDF tools by category
          </h1>
          <p style={{ fontSize: "15px", color: "#4b5563", margin: 0 }}>
            All tools are free, require no signup, and run directly in your browser.
          </p>
        </div>

        {/* Categories grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href ?? `/categories/${cat.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: "12px", padding: "24px 20px",
                display: "flex", flexDirection: "column", gap: "10px",
                height: "100%",
              }}>
                <div style={{ fontSize: "28px" }}>{cat.icon}</div>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "#111", marginBottom: "6px" }}>
                    {cat.name}
                  </p>
                  <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.5, margin: "0 0 12px" }}>
                    {cat.description}
                  </p>
                  <p style={{ fontSize: "12px", color: "#2563eb", fontWeight: 500, margin: 0 }}>
                    {cat.count} tools →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
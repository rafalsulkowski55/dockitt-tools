import Link from "next/link";
import { getAllTools } from "@/lib/tools";
import { getAllConvertVariants } from "@/data/convert/variants";

const TOOL_ICONS: Record<string, string> = {
  "compress-pdf": "📦",
  "merge-pdf": "🔗",
  "split-pdf": "✂️",
  "rotate-pdf": "🔄",
  "delete-pdf-pages": "🗑️",
  "extract-pdf-pages": "📤",
  "protect-pdf": "🔐",
  "unlock-pdf": "🔓",
  "watermark-pdf": "💧",
  "sign-pdf": "✍️",
  "crop-pdf": "✂️",
  "repair-pdf": "🔧",
  "ocr-pdf": "🔍",
  "reorder-pdf-pages": "🔀",
};

const CATEGORY_LABELS: Record<string, string> = {
  core: "Core PDF Tools",
  security: "PDF Security Tools",
  utility: "PDF Utility Tools",
};

export const metadata = {
  title: "All PDF Tools — Dockitt",
  description: "Browse all free PDF tools — merge, split, compress, convert, protect and more.",
};

export default function CategoriesPage() {
  const tools = getAllTools();
  const convertVariants = getAllConvertVariants();

  const grouped: Record<string, typeof tools> = {};
  for (const tool of tools) {
    if (!grouped[tool.category]) grouped[tool.category] = [];
    grouped[tool.category].push(tool);
  }

  return (
    <main style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>
            All Tools
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "8px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
            Browse all PDF tools
          </h1>
          <p style={{ fontSize: "15px", color: "#4b5563", margin: 0 }}>
            All tools are free, require no signup, and most run directly in your browser.
          </p>
        </div>

        {/* Grouped tool categories */}
        {Object.entries(grouped).map(([category, categoryTools]) => (
          <div key={category} style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "14px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
              {CATEGORY_LABELS[category] ?? category}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px" }}>
              {categoryTools.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: "#fff", border: "1px solid #e5e7eb",
                    borderRadius: "12px", padding: "16px",
                    display: "flex", flexDirection: "column", gap: "8px",
                    height: "100%",
                  }}>
                    <span style={{ fontSize: "20px" }}>{TOOL_ICONS[tool.slug] ?? "📄"}</span>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", marginBottom: "3px" }}>{tool.name}</p>
                      <p style={{ fontSize: "12px", color: "#9ca3af", lineHeight: 1.4, margin: 0 }}>{tool.shortDescription}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Convert PDF section */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "14px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
            Convert PDF
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px" }}>
            {convertVariants.map((variant) => (
              <Link key={variant.slug} href={`/convert-pdf/${variant.slug}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#fff", border: "1px solid #e5e7eb",
                  borderRadius: "12px", padding: "16px",
                  display: "flex", flexDirection: "column", gap: "8px",
                  height: "100%",
                }}>
                  <span style={{ fontSize: "20px" }}>🔄</span>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", marginBottom: "3px" }}>{variant.name}</p>
                    <p style={{ fontSize: "12px", color: "#9ca3af", lineHeight: 1.4, margin: 0 }}>{variant.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
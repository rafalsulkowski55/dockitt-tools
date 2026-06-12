import Link from "next/link";
import { getAllTools } from "@/lib/tools";
import { getAllConvertVariants } from "@/data/convert/variants";
import { getAllConvertImageVariants } from "@/data/convert-image/variants";
import { getAllEditImageTools } from "@/data/edit-image/tools";
import { getAllTextTools } from "@/data/text-tools/tools";
import { getAllFileTools } from "@/data/file-tools/tools";

export const metadata = {
  title: "All Tools — PDF, Image, Text & More | Dockitt",
  description: "Browse 98 free browser-based tools: merge, split, convert, edit PDFs; convert and edit images; transform text and data; create archives. No signup required.",
};

const TOP_CATEGORIES = [
  { name: "Core PDF Tools",   desc: "Merge, split, rotate and delete PDF pages.",     icon: "✂️", color: "#2563eb", bg: "#eff6ff",  href: "/categories/core",    count: 4 },
  { name: "PDF Utilities",    desc: "Crop, reorder, extract pages and count words.",   icon: "🔧", color: "#16a34a", bg: "#f0fdf4",  href: "/categories/utility", count: 4 },
  { name: "PDF Edit & Sign",  desc: "Add watermarks and sign PDF documents.",          icon: "✍️", color: "#dc2626", bg: "#fef2f2",  href: "/categories/security", count: 2 },
  { name: "PDF Convert",      desc: "Convert between PDF, images and documents.",      icon: "🔄", color: "#ea580c", bg: "#fff7ed",  href: "/convert-pdf",        count: 17 },
  { name: "Image Convert",    desc: "Convert between JPG, PNG, WebP and more.",        icon: "🖼️", color: "#9333ea", bg: "#fdf4ff",  href: "/convert-image",      count: 28 },
  { name: "Image Edit",       desc: "Resize, crop, compress and rotate images.",       icon: "✏️", color: "#0891b2", bg: "#ecfeff",  href: "/edit-image",         count: 13 },
  { name: "Text & Data",      desc: "Convert, format and transform text and data.",    icon: "📝", color: "#0369a1", bg: "#f0f9ff",  href: "/text-tools",         count: 18 },
  { name: "File Utilities",   desc: "Archive, hash, encode and inspect files.",        icon: "🗂️", color: "#7c3aed", bg: "#f5f3ff",  href: "/file-tools",         count: 10 },
];

const TOOL_ICONS: Record<string, string> = {
  "compress-pdf": "📦", "merge-pdf": "🔗", "split-pdf": "✂️", "rotate-pdf": "🔄",
  "delete-pdf-pages": "🗑️", "extract-pdf-pages": "📤", "protect-pdf": "🔐",
  "unlock-pdf": "🔓", "watermark-pdf": "💧", "sign-pdf": "✍️", "crop-pdf": "✂️",
  "repair-pdf": "🔧", "ocr-pdf": "🔍", "reorder-pdf-pages": "🔀", "pdf-word-count": "🔢",
};

function SectionHeading({ title, href, color }: { title: string; href: string; color: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
      <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111", margin: 0, borderLeft: `3px solid ${color}`, paddingLeft: "12px" }}>
        {title}
      </h2>
      <Link href={href} style={{ fontSize: "12px", color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>See all →</Link>
    </div>
  );
}

function ToolCard({ name, desc, href, icon = "📄" }: { name: string; desc: string; href: string; icon?: string }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px", display: "flex", flexDirection: "column", gap: "6px", height: "100%" }}>
        <span style={{ fontSize: "18px" }}>{icon}</span>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", margin: "0 0 2px" }}>{name}</p>
        <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0, lineHeight: 1.4 }}>{desc}</p>
      </div>
    </Link>
  );
}

export default function CategoriesPage() {
  const pdfTools = getAllTools();
  const coreTools = pdfTools.filter((t) => t.category === "core");
  const utilityTools = pdfTools.filter((t) => t.category === "utility");
  const securityTools = pdfTools.filter((t) => t.category === "security");
  const pdfConvert = getAllConvertVariants();
  const imgConvert = getAllConvertImageVariants();
  const imgEdit = getAllEditImageTools();
  const textTools = getAllTextTools();
  const fileTools = getAllFileTools();

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
    gap: "8px",
    marginBottom: "40px",
  };

  return (
    <main style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1020px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>
            All Tools
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "8px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
            Browse all tools
          </h1>
          <p style={{ fontSize: "15px", color: "#4b5563", margin: 0 }}>
            98 free tools — all run in your browser, no signup, no upload to external servers.
          </p>
        </div>

        {/* Category cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "10px", marginBottom: "48px" }}>
          {TOP_CATEGORIES.map((cat) => (
            <Link key={cat.href} href={cat.href} style={{ textDecoration: "none" }}>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", display: "flex", alignItems: "flex-start", gap: "14px", height: "100%" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: cat.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                  {cat.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "6px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{cat.name}</p>
                    <span style={{ fontSize: "11px", color: "#9ca3af", flexShrink: 0 }}>{cat.count}</span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0, lineHeight: 1.4 }}>{cat.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Core PDF */}
        <SectionHeading title="Core PDF Tools" href="/categories/core" color="#2563eb" />
        <div style={gridStyle}>
          {coreTools.map((t) => (
            <ToolCard key={t.slug} name={t.name} desc={t.shortDescription} href={`/tools/${t.slug}`} icon={TOOL_ICONS[t.slug]} />
          ))}
        </div>

        {/* PDF Utilities */}
        <SectionHeading title="PDF Utilities" href="/categories/utility" color="#16a34a" />
        <div style={gridStyle}>
          {utilityTools.map((t) => (
            <ToolCard key={t.slug} name={t.name} desc={t.shortDescription} href={`/tools/${t.slug}`} icon={TOOL_ICONS[t.slug]} />
          ))}
        </div>

        {/* PDF Edit & Sign */}
        <SectionHeading title="PDF Edit & Sign" href="/categories/security" color="#dc2626" />
        <div style={gridStyle}>
          {securityTools.map((t) => (
            <ToolCard key={t.slug} name={t.name} desc={t.shortDescription} href={`/tools/${t.slug}`} icon={TOOL_ICONS[t.slug]} />
          ))}
        </div>

        {/* PDF Convert */}
        <SectionHeading title="PDF Convert" href="/convert-pdf" color="#ea580c" />
        <div style={gridStyle}>
          {pdfConvert.map((v) => (
            <ToolCard key={v.slug} name={v.name} desc={v.description} href={`/convert-pdf/${v.slug}`} icon="🔄" />
          ))}
        </div>

        {/* Image Convert */}
        <SectionHeading title="Image Convert" href="/convert-image" color="#9333ea" />
        <div style={gridStyle}>
          {imgConvert.map((v) => (
            <ToolCard key={v.slug} name={v.name} desc={v.description} href={`/convert-image/${v.slug}`} icon="🖼️" />
          ))}
        </div>

        {/* Image Edit */}
        <SectionHeading title="Image Edit" href="/edit-image" color="#0891b2" />
        <div style={gridStyle}>
          {imgEdit.map((t) => (
            <ToolCard key={t.slug} name={t.name} desc={t.description} href={`/edit-image/${t.slug}`} icon="✏️" />
          ))}
        </div>

        {/* Text & Data */}
        <SectionHeading title="Text & Data" href="/text-tools" color="#0369a1" />
        <div style={gridStyle}>
          {textTools.map((t) => (
            <ToolCard key={t.slug} name={t.name} desc={t.description} href={`/text-tools/${t.slug}`} icon="📝" />
          ))}
        </div>

        {/* File Utilities */}
        <SectionHeading title="File Utilities" href="/file-tools" color="#7c3aed" />
        <div style={gridStyle}>
          {fileTools.map((t) => (
            <ToolCard key={t.slug} name={t.name} desc={t.description} href={`/file-tools/${t.slug}`} icon="🗂️" />
          ))}
        </div>

        <div style={{ padding: "16px 20px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#14532d" }}>
          <span style={{ flexShrink: 0 }}>✅</span>
          <span><strong>All 98 tools run in your browser.</strong> No upload, no account, complete privacy.</span>
        </div>

      </div>
    </main>
  );
}

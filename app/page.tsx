import Link from "next/link";
import { getAllTools } from "@/lib/tools";

const POPULAR_TOOLS = [
  { slug: "compress-pdf", icon: "📦", bg: "#eff6ff" },
  { slug: "merge-pdf", icon: "🔗", bg: "#f0fdf4" },
  { slug: "split-pdf", icon: "✂️", bg: "#fefce8" },
  { slug: "rotate-pdf", icon: "🔄", bg: "#fdf4ff" },
  { slug: "protect-pdf", icon: "🔐", bg: "#fef2f2" },
  { slug: "unlock-pdf", icon: "🔓", bg: "#fff7ed" },
  { slug: "watermark-pdf", icon: "💧", bg: "#fefce8" },
  { slug: "ocr-pdf", icon: "🔍", bg: "#f0fdf4" },
  { slug: "pdf-to-word", icon: "📝", bg: "#fff7ed" },
  { slug: "word-to-pdf", icon: "📄", bg: "#eff6ff" },
];

const POPULAR_TOOL_HREFS: Record<string, string> = {
  "pdf-to-word": "/convert-pdf/pdf-to-word",
  "word-to-pdf": "/convert-pdf/word-to-pdf",
};

const USE_CASES = [
  { label: "Compress PDF for email", href: "/tools/compress-pdf" },
  { label: "Reduce PDF size without losing quality", href: "/tools/compress-pdf" },
  { label: "Merge PDF files online", href: "/tools/merge-pdf" },
  { label: "Convert PDF to Word", href: "/convert-pdf/pdf-to-word" },
  { label: "Split PDF by page range", href: "/tools/split-pdf" },
  { label: "Add password to PDF", href: "/tools/protect-pdf" },
  { label: "Make scanned PDF searchable", href: "/tools/ocr-pdf" },
  { label: "Remove pages from PDF", href: "/tools/delete-pdf-pages" },
  { label: "Rotate PDF pages online", href: "/tools/rotate-pdf" },
  { label: "Add watermark to PDF", href: "/tools/watermark-pdf" },
  { label: "Extract pages from PDF", href: "/tools/extract-pdf-pages" },
  { label: "Repair corrupted PDF file", href: "/tools/repair-pdf" },
];

const WHY_ITEMS = [
  { icon: "⚡", title: "Fast processing", text: "Most operations complete in under 5 seconds." },
  { icon: "🚫", title: "No signup required", text: "Just open, upload, and download. No account needed." },
  { icon: "📱", title: "Works on any device", text: "Desktop, tablet, or phone — it works everywhere." },
  { icon: "🔒", title: "Privacy focused", text: "Files are never stored or shared. Processed and gone." },
];

const QUICK_TOOLS = [
  { slug: "compress-pdf", label: "Compress", icon: "📦", href: "/tools/compress-pdf" },
  { slug: "merge-pdf", label: "Merge", icon: "🔗", href: "/tools/merge-pdf" },
  { slug: "split-pdf", label: "Split", icon: "✂️", href: "/tools/split-pdf" },
  { slug: "pdf-to-word", label: "PDF → Word", icon: "📝", href: "/convert-pdf/pdf-to-word" },
  { slug: "word-to-pdf", label: "Word → PDF", icon: "📄", href: "/convert-pdf/word-to-pdf" },
  { slug: "protect-pdf", label: "Protect", icon: "🔐", href: "/tools/protect-pdf" },
  { slug: "rotate-pdf", label: "Rotate", icon: "🔄", href: "/tools/rotate-pdf" },
  { slug: "ocr-pdf", label: "OCR", icon: "🔍", href: "/tools/ocr-pdf" },
];

export default function Home() {
  const allTools = getAllTools();

  const popularTools = POPULAR_TOOLS.map(({ slug, icon, bg }) => {
    const tool = allTools.find((t) => t.slug === slug);
    return tool ? { ...tool, icon, bg } : null;
  }).filter(Boolean) as (ReturnType<typeof getAllTools>[0] & { icon: string; bg: string })[];

  return (
    <main style={{ background: "#f9fafb" }}>

      {/* ── HERO ── */}
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px 48px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "#eff6ff", color: "#2563eb",
          fontSize: "12px", fontWeight: 500, padding: "4px 14px",
          borderRadius: "100px", marginBottom: "24px",
          border: "1px solid #bfdbfe",
        }}>
          🔒 No signup · Works in your browser · Files stay private
        </div>

        <h1 style={{
          fontSize: "clamp(26px, 5vw, 46px)", fontWeight: 700,
          lineHeight: 1.18, color: "#0f0f0f",
          letterSpacing: "-0.02em", marginBottom: "14px",
        }}>
          All-in-one PDF tools.<br />
          <span style={{ color: "#2563eb" }}>Fast, simple, and safe.</span>
        </h1>

        <p style={{
          fontSize: "16px", color: "#4b5563",
          maxWidth: "440px", margin: "0 auto 32px", lineHeight: 1.6,
        }}>
          Compress, merge, split and convert PDFs in seconds, no signup required.
        </p>

        {/* Tool picker */}
        <div id="tool-picker" style={{
          border: "1px solid #e5e7eb",
          background: "#fff",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "16px",
          textAlign: "left",
        }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "14px" }}>
            Choose what you want to do:
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "8px",
          }}>
            {QUICK_TOOLS.map((t) => (
              <Link key={t.slug} href={t.href} style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 12px", borderRadius: "8px",
                border: "1px solid #e5e7eb", background: "#f9fafb",
                textDecoration: "none", color: "#111",
                fontSize: "13px", fontWeight: 500,
              }}>
                <span style={{ fontSize: "16px" }}>{t.icon}</span>
                {t.label}
              </Link>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #e5e7eb", marginTop: "16px", paddingTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
              🔒 Files never leave your device
            </p>
            <Link href="/categories" style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>
              See all 20 tools →
            </Link>
          </div>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* ── POPULAR TOOLS ── */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "44px 24px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>Tools</p>
        <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "6px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
          Popular PDF tools
        </h2>
        <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "24px" }}>
          Everything you need to work with PDF files, no installation required.{" "}
          <Link href="/convert-pdf" style={{ color: "#2563eb", textDecoration: "none" }}>Convert PDF →</Link>
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "10px" }}>
          {popularTools.map((tool) => {
            const href = POPULAR_TOOL_HREFS[tool.slug] ?? `/tools/${tool.slug}`;
            return (
              <Link key={tool.slug} href={href} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px",
                  padding: "18px 14px", display: "flex", flexDirection: "column", gap: "10px",
                }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: tool.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px" }}>
                    {tool.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", marginBottom: "3px" }}>{tool.name}</p>
                    <p style={{ fontSize: "12px", color: "#9ca3af", lineHeight: 1.4, margin: 0 }}>{tool.shortDescription}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* ── HOW IT WORKS ── */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "44px 24px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>How it works</p>
        <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "6px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
          Three steps to done
        </h2>
        <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "28px" }}>No account, no software, no waiting.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { num: "01", icon: "📂", title: "Upload your file", text: "Drag & drop or click to select your PDF. Your file stays on your device and is never sent to a server." },
            { num: "02", icon: "⚙️", title: "Process instantly", text: "Choose what you want to do — compress, merge, split, convert. Processing starts immediately in your browser." },
            { num: "03", icon: "⬇️", title: "Download result", text: "Get your processed file right away. No email required, no waiting — just click download and you're done." },
          ].map((step) => (
            <div key={step.num} style={{
              background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px",
              padding: "20px", display: "flex", flexDirection: "column", gap: "12px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                  {step.num}
                </div>
                <span style={{ fontSize: "22px" }}>{step.icon}</span>
              </div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#111", margin: 0 }}>{step.title}</p>
              <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.55, margin: 0 }}>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* ── WHY DOCKITT ── */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "44px 24px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>Why Dockitt</p>
        <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "6px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
          Built for people who just want it to work
        </h2>
        <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "24px" }}>No distractions. No bloat. Just PDF tools that do the job.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
          {WHY_ITEMS.map((item) => (
            <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "12px", background: "#fff", borderRadius: "10px", padding: "16px", border: "1px solid #e5e7eb" }}>
              <span style={{ fontSize: "20px", flexShrink: 0 }}>{item.icon}</span>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#111", marginBottom: "3px" }}>{item.title}</p>
                <p style={{ fontSize: "13px", color: "#4b5563", margin: 0, lineHeight: 1.5 }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* ── USE CASES ── */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "44px 24px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>Use cases</p>
        <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "6px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
          What people use Dockitt for
        </h2>
        <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "24px" }}>Common tasks, handled quickly.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "8px" }}>
          {USE_CASES.map((uc) => (
            <Link key={uc.label} href={uc.href} style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "11px 14px", borderRadius: "8px",
              border: "1px solid #e5e7eb", background: "#fff",
              textDecoration: "none", color: "#4b5563", fontSize: "13px",
            }}>
              <span style={{ color: "#2563eb" }}>→</span>
              {uc.label}
            </Link>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* ── SEO DESCRIPTION ── */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "44px 24px" }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderLeft: "3px solid #2563eb", borderRadius: "12px", padding: "24px 28px" }}>
          <p style={{ fontSize: "15px", color: "#4b5563", lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: "#111" }}>Dockitt</strong> is a simple online tool that helps you work with PDF files quickly and easily.
            You can compress, merge, split and convert PDFs without installing anything.
            All tools run directly in your browser, your files never leave your device.
            Whether you need to shrink a PDF for email, combine multiple documents, or convert a file to Word,
            Dockitt handles it in seconds, for free.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ textAlign: "center", padding: "56px 24px", background: "#f3f4f6", borderTop: "1px solid #e5e7eb" }}>
        <h2 style={{ fontSize: "clamp(18px, 3.5vw, 28px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "8px" }}>
          Start working with your PDF now
        </h2>
        <p style={{ fontSize: "15px", color: "#4b5563", marginBottom: "24px" }}>No signup required. Works in your browser.</p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#tool-picker" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#2563eb", color: "#fff", padding: "12px 28px", borderRadius: "8px", fontSize: "15px", fontWeight: 500, textDecoration: "none" }}>
            ↑ Choose a tool
          </a>
          <Link href="/categories" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#4b5563", fontSize: "15px", textDecoration: "none", padding: "12px 20px", borderRadius: "8px", border: "1px solid #d1d5db", background: "#fff" }}>
            See all tools →
          </Link>
        </div>
      </section>

    </main>
  );
}
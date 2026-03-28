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

const USE_CASES = [
  { label: "Compress PDF for email", href: "/tools/compress-pdf" },
  { label: "Reduce PDF size without losing quality", href: "/tools/compress-pdf" },
  { label: "Merge PDF files online", href: "/tools/merge-pdf" },
  { label: "Convert PDF to Word", href: "/tools/pdf-to-word" },
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

export default function Home() {
  const allTools = getAllTools();

  const popularTools = POPULAR_TOOLS.map(({ slug, icon, bg }) => {
    const tool = allTools.find((t) => t.slug === slug);
    return tool ? { ...tool, icon, bg } : null;
  }).filter(Boolean) as (ReturnType<typeof getAllTools>[0] & { icon: string; bg: string })[];

  return (
    <main style={{ background: "#f9fafb" }}>

      {/* HERO */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "#eff6ff", color: "#2563eb",
          fontSize: "12px", fontWeight: 500, padding: "4px 14px",
          borderRadius: "100px", marginBottom: "28px",
          border: "1px solid #bfdbfe",
        }}>
          🔒 Free · No signup · Files stay on your device
        </div>

        <h1 style={{
          fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700,
          lineHeight: 1.18, color: "#0f0f0f",
          letterSpacing: "-0.02em", marginBottom: "16px",
        }}>
          All-in-one PDF tools.<br />
          <span style={{ color: "#2563eb" }}>Fast, simple, and free.</span>
        </h1>

        <p style={{
          fontSize: "17px", color: "#4b5563",
          maxWidth: "460px", margin: "0 auto 40px", lineHeight: 1.65,
        }}>
          Compress, merge, split and convert PDFs in seconds — no signup required.
        </p>

        <div style={{
          border: "2px dashed #bfdbfe", background: "#eff6ff",
          borderRadius: "16px", padding: "48px 24px", marginBottom: "20px",
        }}>
          <div style={{
            width: "48px", height: "48px", background: "#fff", borderRadius: "12px",
            margin: "0 auto 14px", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "22px",
            boxShadow: "0 2px 8px rgba(37,99,235,0.12)",
          }}>📄</div>
          <p style={{ fontSize: "15px", color: "#374151", marginBottom: "4px", fontWeight: 500 }}>
            Drag &amp; drop your PDF here
          </p>
          <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
            or choose a tool below · PDF files up to 50MB
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/tools/compress-pdf" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#2563eb", color: "#fff",
            padding: "12px 28px", borderRadius: "8px",
            fontSize: "15px", fontWeight: 500, textDecoration: "none",
          }}>
            ↑ Upload PDF
          </Link>
          <Link href="/categories/core" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            color: "#4b5563", fontSize: "15px", textDecoration: "none",
            padding: "12px 20px", borderRadius: "8px",
            border: "1px solid #e5e7eb", background: "#fff",
          }}>
            See all tools →
          </Link>
        </div>

        <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "16px" }}>
          🔒 Files are processed locally and never uploaded to any server
        </p>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* POPULAR TOOLS */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "64px 24px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "10px" }}>Tools</p>
        <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "8px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
          Popular PDF tools
        </h2>
        <p style={{ fontSize: "15px", color: "#4b5563", marginBottom: "32px" }}>
          Everything you need to work with PDF files — no installation required.{" "}
          <Link href="/convert-pdf" style={{ color: "#2563eb", textDecoration: "none" }}>Convert PDF →</Link>
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "12px" }}>
          {popularTools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px",
                padding: "20px 16px", display: "flex", flexDirection: "column", gap: "10px",
              }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: tool.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                  {tool.icon}
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", marginBottom: "4px" }}>{tool.name}</p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", lineHeight: 1.4, margin: 0 }}>{tool.shortDescription}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "64px 24px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "10px" }}>How it works</p>
        <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "8px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
          Three steps to done
        </h2>
        <p style={{ fontSize: "15px", color: "#4b5563", marginBottom: "40px" }}>No account, no software, no waiting.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
          {[
            { num: "01", icon: "📂", title: "Upload your file", text: "Drag & drop or click to select your PDF. Files stay on your device." },
            { num: "02", icon: "⚙️", title: "Process instantly", text: "Your file is processed in seconds, directly in the browser." },
            { num: "03", icon: "⬇️", title: "Download result", text: "Get your processed file immediately — no email, no waiting." },
          ].map((step) => (
            <div key={step.num} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 }}>
                {step.num}
              </div>
              <div style={{ fontSize: "26px" }}>{step.icon}</div>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#111", margin: 0 }}>{step.title}</p>
              <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.55, margin: 0 }}>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* WHY DOCKITT */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "64px 24px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "10px" }}>Why Dockitt</p>
        <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "8px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
          Built for people who just want it to work
        </h2>
        <p style={{ fontSize: "15px", color: "#4b5563", marginBottom: "36px" }}>No distractions. No bloat. Just PDF tools that do the job.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
          {WHY_ITEMS.map((item) => (
            <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "12px", background: "#f9fafb", borderRadius: "10px", padding: "18px 16px", border: "1px solid #e5e7eb" }}>
              <span style={{ fontSize: "20px", flexShrink: 0 }}>{item.icon}</span>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#111", marginBottom: "4px" }}>{item.title}</p>
                <p style={{ fontSize: "13px", color: "#4b5563", margin: 0, lineHeight: 1.5 }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* USE CASES */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "64px 24px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "10px" }}>Use cases</p>
        <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "8px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
          What people use Dockitt for
        </h2>
        <p style={{ fontSize: "15px", color: "#4b5563", marginBottom: "32px" }}>Common tasks, handled quickly.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "8px" }}>
          {USE_CASES.map((uc) => (
            <Link key={uc.label} href={uc.href} style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "12px 14px", borderRadius: "8px",
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

      {/* SEO DESCRIPTION */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderLeft: "3px solid #2563eb", borderRadius: "12px", padding: "28px 32px" }}>
          <p style={{ fontSize: "15px", color: "#4b5563", lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: "#111" }}>Dockitt</strong> is a simple online tool that helps you work with PDF files quickly and easily.
            You can compress, merge, split and convert PDFs without installing anything.
            All tools run directly in your browser — your files never leave your device.
            Whether you need to shrink a PDF for email, combine multiple documents, or convert a file to Word,
            Dockitt handles it in seconds, for free.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ textAlign: "center", padding: "72px 24px", background: "#f3f4f6", borderTop: "1px solid #e5e7eb" }}>
        <h2 style={{ fontSize: "clamp(20px, 3.5vw, 30px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "10px" }}>
          Start working with your PDF now
        </h2>
        <p style={{ fontSize: "15px", color: "#4b5563", marginBottom: "28px" }}>Free, instant, no signup required.</p>
        <Link href="/tools/compress-pdf" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "#2563eb", color: "#fff",
          padding: "13px 32px", borderRadius: "8px",
          fontSize: "15px", fontWeight: 500, textDecoration: "none",
        }}>
          ↑ Upload PDF
        </Link>
      </section>

    </main>
  );
}
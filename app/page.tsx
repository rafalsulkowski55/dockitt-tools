import React from "react";
import Link from "next/link";
import {
  FileArchive, GitMerge, Scissors, RotateCw, Lock,
  ScanText, FileText, FileOutput, Zap, Layers,
  Smartphone, ShieldCheck, FolderOpen, Settings, Download,
} from "lucide-react";

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
  { Icon: Zap, title: "Fast processing", text: "Most operations complete in under 5 seconds.", color: "#ca8a04", bg: "#fefce8" },
  { Icon: Smartphone, title: "Works on any device", text: "Desktop, tablet, or phone — it works everywhere.", color: "#9333ea", bg: "#fdf4ff" },
  { Icon: ShieldCheck, title: "Privacy focused", text: "Files are never stored or shared. Processed and gone.", color: "#16a34a", bg: "#f0fdf4" },
  { Icon: Layers, title: "20+ tools", text: "Everything you need to work with PDFs in one place.", color: "#2563eb", bg: "#eff6ff" },
];

const QUICK_TOOLS = [
  { slug: "compress-pdf", label: "Compress", Icon: FileArchive, href: "/tools/compress-pdf", popular: true },
  { slug: "merge-pdf", label: "Merge", Icon: GitMerge, href: "/tools/merge-pdf", popular: false },
  { slug: "split-pdf", label: "Split", Icon: Scissors, href: "/tools/split-pdf", popular: false },
  { slug: "pdf-to-word", label: "PDF to Word", Icon: FileText, href: "/convert-pdf/pdf-to-word", popular: false },
  { slug: "word-to-pdf", label: "Word to PDF", Icon: FileOutput, href: "/convert-pdf/word-to-pdf", popular: false },
  { slug: "protect-pdf", label: "Protect", Icon: Lock, href: "/tools/protect-pdf", popular: false },
  { slug: "rotate-pdf", label: "Rotate", Icon: RotateCw, href: "/tools/rotate-pdf", popular: false },
  { slug: "ocr-pdf", label: "OCR", Icon: ScanText, href: "/tools/ocr-pdf", popular: false },
];

const CATEGORIES = [
  {
    slug: "core",
    name: "Core PDF Tools",
    desc: "Compress, merge, split, rotate and more.",
    count: 5,
    icon: FileArchive,
    color: "#2563eb",
    bg: "#eff6ff",
    href: "/categories/core",
  },
  {
    slug: "convert",
    name: "Convert PDF",
    desc: "PDF to Word, JPG, PNG and back.",
    count: 6,
    icon: FileText,
    color: "#ea580c",
    bg: "#fff7ed",
    href: "/convert-pdf",
  },
  {
    slug: "security",
    name: "PDF Security",
    desc: "Protect, unlock, sign and watermark.",
    count: 4,
    icon: Lock,
    color: "#dc2626",
    bg: "#fef2f2",
    href: "/categories/security",
  },
  {
    slug: "utility",
    name: "PDF Utilities",
    desc: "OCR, repair, crop and reorder pages.",
    count: 5,
    icon: ScanText,
    color: "#16a34a",
    bg: "#f0fdf4",
    href: "/categories/utility",
  },
];

export default function Home() {
  return (
    <main style={{ background: "#f9fafb" }}>

      {/* HERO — split layout */}
      <section style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "45% 55%",
            gap: "48px",
            alignItems: "center",
          }}
          className="hero-grid"
          >
            {/* Lewa kolumna */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "#eff6ff", color: "#2563eb",
                fontSize: "12px", fontWeight: 500, padding: "4px 14px",
                borderRadius: "100px", marginBottom: "20px",
                border: "1px solid #bfdbfe",
              }}>
                Works in your browser · Files stay private
              </div>

              <h1 style={{
                fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700,
                lineHeight: 1.15, color: "#0f0f0f",
                letterSpacing: "-0.02em", marginBottom: "16px",
              }}>
                All-in-one PDF tools.<br />
                <span style={{ color: "#2563eb" }}>Fast, simple, and safe.</span>
              </h1>

              <p style={{
                fontSize: "16px", color: "#4b5563",
                lineHeight: 1.6, marginBottom: "24px",
              }}>
                Compress, merge, split and convert PDFs in seconds.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { Icon: ShieldCheck, text: "Files stay private — processed and gone", color: "#16a34a" },
                  { Icon: Zap, text: "Works in your browser — no software needed", color: "#ca8a04" },
                  { Icon: Layers, text: "Fast and free — 20+ tools available", color: "#2563eb" },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#374151" }}>
                    <item.Icon size={15} color={item.color} strokeWidth={2.5} />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Prawa kolumna */}
            <div>
              <div style={{
                border: "1px solid #e5e7eb",
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "14px" }}>
                  Choose what you want to do:
                </p>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "8px",
                }}>
                  {QUICK_TOOLS.map((t) => (
                    <Link key={t.slug} href={t.href} style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "10px 12px", borderRadius: "8px",
                      border: t.popular ? "1.5px solid #2563eb" : "1px solid #e5e7eb",
                      background: t.popular ? "#eff6ff" : "#f9fafb",
                      textDecoration: "none", color: "#111",
                      fontSize: "13px", fontWeight: 500,
                      position: "relative",
                    }}>
                      {t.popular && (
                        <span style={{
                          position: "absolute", top: "-8px", right: "8px",
                          background: "#2563eb", color: "#fff",
                          fontSize: "9px", fontWeight: 700,
                          padding: "2px 6px", borderRadius: "4px",
                          letterSpacing: "0.05em",
                        }}>
                          POPULAR
                        </span>
                      )}
                      <t.Icon size={15} color={t.popular ? "#2563eb" : "#6b7280"} strokeWidth={2} />
                      {t.label}
                    </Link>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid #e5e7eb", marginTop: "16px", paddingTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                    Browser tools run locally · Server tools delete files instantly
                  </p>
                  <Link href="/categories" style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap", marginLeft: "12px" }}>
                    See all 20 →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* CATEGORIES */}
      <section style={{ background: "#f9fafb" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "44px 24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>Tools</p>
          <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "6px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
            Browse by category
          </h2>
          <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "24px" }}>
            Everything you need to work with PDF files, no installation required.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={cat.href} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px",
                  padding: "28px", display: "flex", flexDirection: "column", gap: "12px",
                  height: "100%",
                }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: cat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <cat.icon size={24} color={cat.color} strokeWidth={2} />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{cat.name}</p>
                    <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 6px", lineHeight: 1.4 }}>{cat.desc}</p>
                    <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>{cat.count} tools</p>
                  </div>
                  <p style={{ fontSize: "13px", color: "#2563eb", fontWeight: 500, margin: 0 }}>Browse tools →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* HOW IT WORKS — split layout z SVG */}
      <section style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "44px 24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>How it works</p>
          <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "6px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
            Three steps to done
          </h2>
          <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "36px" }}>Fast, simple, and private.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }} className="how-grid">

            {/* Lewa — SVG ilustracja */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Dokument PDF */}
                <rect x="70" y="60" width="140" height="180" rx="10" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2"/>
                <rect x="70" y="60" width="140" height="44" rx="10" fill="#2563eb"/>
                <rect x="70" y="90" width="140" height="14" fill="#2563eb"/>
                <text x="140" y="88" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="sans-serif">PDF</text>
                {/* Linie tekstu */}
                <rect x="90" y="124" width="100" height="8" rx="4" fill="#e5e7eb"/>
                <rect x="90" y="140" width="80" height="8" rx="4" fill="#e5e7eb"/>
                <rect x="90" y="156" width="100" height="8" rx="4" fill="#e5e7eb"/>
                <rect x="90" y="172" width="60" height="8" rx="4" fill="#e5e7eb"/>
                <rect x="90" y="188" width="90" height="8" rx="4" fill="#e5e7eb"/>
                {/* Strzałka upload */}
                <circle cx="60" cy="140" r="18" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5"/>
                <path d="M60 148 L60 132 M54 138 L60 132 L66 138" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Strzałka download */}
                <circle cx="220" cy="140" r="18" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5"/>
                <path d="M220 132 L220 148 M214 142 L220 148 L226 142" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Iskierki */}
                <circle cx="140" cy="50" r="4" fill="#2563eb" opacity="0.3"/>
                <circle cx="160" cy="44" r="3" fill="#2563eb" opacity="0.2"/>
                <circle cx="120" cy="46" r="3" fill="#2563eb" opacity="0.2"/>
              </svg>
            </div>

            {/* Prawa — kroki */}
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {[
                { num: "01", Icon: FolderOpen, title: "Upload your file", text: "Drag & drop or click to select your PDF. Most tools process files entirely in your browser, no upload needed." },
                { num: "02", Icon: Settings, title: "Process instantly", text: "Choose what you want to do — compress, merge, split, convert. Browser tools start immediately; server tools process securely and delete your file right after." },
                { num: "03", Icon: Download, title: "Download result", text: "Get your processed file right away. No email required, no waiting, just click download and you're done." },
              ].map((step) => (
                <div key={step.num} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                    {step.num}
                  </div>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: "#111", margin: "0 0 4px" }}>{step.title}</p>
                    <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.6, margin: 0 }}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* WHY DOCKITT */}
      <section style={{ background: "#f9fafb" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "44px 24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>Why Dockitt</p>
          <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "6px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
            Built for people who just want it to work
          </h2>
          <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "24px" }}>No distractions. No bloat. Just PDF tools that do the job.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }} className="why-grid">
            {WHY_ITEMS.map((item) => (
              <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "12px", background: "#fff", borderRadius: "10px", padding: "16px", border: "1px solid #e5e7eb" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <item.Icon size={17} color={item.color} strokeWidth={2} />
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#111", marginBottom: "3px" }}>{item.title}</p>
                  <p style={{ fontSize: "13px", color: "#4b5563", margin: 0, lineHeight: 1.5 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* USE CASES */}
      <section style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "44px 24px" }}>
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
                border: "1px solid #e5e7eb", background: "#f9fafb",
                textDecoration: "none", color: "#4b5563", fontSize: "13px",
              }}>
                <span style={{ color: "#2563eb" }}>→</span>
                {uc.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* SEO DESCRIPTION */}
      <section style={{ background: "#f9fafb" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "44px 24px" }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderLeft: "3px solid #2563eb", borderRadius: "12px", padding: "24px 28px" }}>
            <p style={{ fontSize: "15px", color: "#4b5563", lineHeight: 1.75, margin: 0 }}>
              <strong style={{ color: "#111" }}>Dockitt</strong> is a simple online tool that helps you work with PDF files quickly and easily.
              You can compress, merge, split and convert PDFs without installing anything.
              Most tools run directly in your browser. For tools that require server processing such as compression, OCR, and PDF to Word, files are sent over an encrypted connection and deleted immediately after processing.
              Whether you need to shrink a PDF for email, combine multiple documents, or convert a file to Word,
              Dockitt handles it in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ textAlign: "center", padding: "80px 24px", background: "#eff6ff", borderTop: "1px solid #bfdbfe" }}>
        <h2 style={{ fontSize: "clamp(18px, 3.5vw, 28px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "8px" }}>
          Start working with your PDF now
        </h2>
        <p style={{ fontSize: "15px", color: "#4b5563", marginBottom: "28px" }}>Works in your browser. Fast and free.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <Link href="/categories" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#2563eb", color: "#fff", padding: "12px 28px", borderRadius: "8px", fontSize: "15px", fontWeight: 500, textDecoration: "none" }}>
            See all tools →
          </Link>
          <Link href="/convert-pdf" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#2563eb", padding: "12px 28px", borderRadius: "8px", fontSize: "15px", fontWeight: 500, textDecoration: "none", border: "1.5px solid #2563eb" }}>
            Convert PDF →
          </Link>
        </div>
      </section>

    </main>
  );
}
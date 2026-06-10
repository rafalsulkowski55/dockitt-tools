"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileArchive, Lock, FileText, Zap, Layers,
  Smartphone, ShieldCheck, FolderOpen, Settings, Download,
  X,
} from "lucide-react";

const USE_CASES = [
  { label: "Merge PDF files online", href: "/tools/merge-pdf" },
  { label: "Split PDF by page range", href: "/tools/split-pdf" },
  { label: "Remove pages from PDF", href: "/tools/delete-pdf-pages" },
  { label: "Rotate PDF pages online", href: "/tools/rotate-pdf" },
  { label: "Extract pages from PDF", href: "/tools/extract-pdf-pages" },
  { label: "Reorder PDF pages", href: "/tools/reorder-pdf-pages" },
  { label: "Add watermark to PDF", href: "/tools/watermark-pdf" },
  { label: "Sign a PDF document", href: "/tools/sign-pdf" },
  { label: "Crop PDF pages", href: "/tools/crop-pdf" },
  { label: "Convert PDF to JPG", href: "/convert-pdf/pdf-to-jpg" },
  { label: "Convert PDF to PNG", href: "/convert-pdf/pdf-to-png" },
  { label: "Convert JPG to PDF", href: "/convert-pdf/jpg-to-pdf" },
];

const WHY_ITEMS = [
  { Icon: Zap, title: "Fast processing", text: "Most operations complete in under 5 seconds.", color: "#ca8a04", bg: "#fefce8" },
  { Icon: Smartphone, title: "Works on any device", text: "Desktop, tablet, or phone it works everywhere.", color: "#9333ea", bg: "#fdf4ff" },
  { Icon: ShieldCheck, title: "Privacy focused", text: "Files are never stored or shared. Processed and gone.", color: "#16a34a", bg: "#f0fdf4" },
  { Icon: Layers, title: "14 free tools", text: "Everything you need to work with PDFs in one place.", color: "#2563eb", bg: "#eff6ff" },
];

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadBox() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileSizeWarning, setFileSizeWarning] = useState(false);

  const TOOLS_COLUMNS = [
    {
      label: "Organize",
      tools: [
        { name: "Merge PDF", desc: "Combine PDFs", slug: "merge-pdf" },
        { name: "Split PDF", desc: "Extract pages", slug: "split-pdf" },
        { name: "Rotate PDF", desc: "Fix orientation", slug: "rotate-pdf" },
        { name: "Delete pages", desc: "Remove pages", slug: "delete-pdf-pages" },
        { name: "Extract pages", desc: "Save specific pages", slug: "extract-pdf-pages" },
        { name: "Reorder pages", desc: "Drag to rearrange", slug: "reorder-pdf-pages" },
      ],
    },
    {
      label: "Convert",
      tools: [
        { name: "PDF to JPG", desc: "Pages as images", slug: "pdf-to-jpg", href: "/convert-pdf/pdf-to-jpg" },
        { name: "PDF to PNG", desc: "High quality", slug: "pdf-to-png", href: "/convert-pdf/pdf-to-png" },
        { name: "JPG to PDF", desc: "Images to PDF", slug: "jpg-to-pdf", href: "/convert-pdf/jpg-to-pdf" },
        { name: "PNG to PDF", desc: "Images to PDF", slug: "png-to-pdf", href: "/convert-pdf/png-to-pdf" },
        { name: "Word count", desc: "Count words & pages", slug: "pdf-word-count" },
      ],
    },
    {
      label: "Edit & Sign",
      tools: [
        { name: "Watermark PDF", desc: "Add text or image", slug: "watermark-pdf" },
        { name: "Sign PDF", desc: "Add signature", slug: "sign-pdf" },
        { name: "Crop PDF", desc: "Trim margins", slug: "crop-pdf" },
      ],
    },
  ];

  const handleFile = useCallback((f: File) => {
    if (f.type !== "application/pdf") return;
    setFile(f);
    setFileSizeWarning(f.size > 100 * 1024 * 1024);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
    e.target.value = "";
  };

  const goToTool = (slug: string, href?: string) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      sessionStorage.setItem("pendingFile", reader.result as string);
      sessionStorage.setItem("pendingFileName", file.name);
      sessionStorage.setItem("pendingFileSize", String(file.size));
      router.push(href ?? `/tools/${slug}`);
    };
    reader.readAsDataURL(file);
  };

  if (!file) {
    return (
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        style={{
          border: `2px dashed ${dragOver ? "#2563eb" : "#d1d5db"}`,
          borderRadius: "16px",
          background: dragOver ? "#eff6ff" : "#ffffff",
          padding: "40px 32px",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleChange} />
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto 16px" }}>
          <rect x="12" y="4" width="40" height="56" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2"/>
          <rect x="12" y="4" width="40" height="18" rx="6" fill="#2563eb"/>
          <rect x="12" y="16" width="40" height="6" fill="#2563eb"/>
          <text x="32" y="15" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="sans-serif">PDF</text>
          <rect x="20" y="30" width="24" height="4" rx="2" fill="#bfdbfe"/>
          <rect x="20" y="38" width="18" height="4" rx="2" fill="#bfdbfe"/>
          <rect x="20" y="46" width="22" height="4" rx="2" fill="#bfdbfe"/>
        </svg>
        <p style={{ fontSize: "18px", fontWeight: 700, color: "#111", margin: "0 0 12px" }}>
          Drag & drop your PDF here
        </p>
        <p style={{ fontSize: "14px", color: "#9ca3af", margin: "0 0 16px" }}>or</p>
        <button
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
          style={{
            width: "100%", background: "#2563eb", color: "#fff",
            fontSize: "16px", fontWeight: 600, padding: "14px",
            borderRadius: "10px", border: "none", cursor: "pointer",
          }}
        >
          Choose PDF file
        </button>
        <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "12px", marginBottom: 0 }}>
          Works with any PDF · Up to 100MB
        </p>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: "16px", background: "#ffffff", overflow: "hidden" }}>
      <div style={{
        background: "#f0fdf4", padding: "12px 16px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>✅</span>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#111", margin: 0 }}>{file.name}</p>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{formatSize(file.size)}</p>
            {fileSizeWarning && (
              <p style={{ fontSize: "12px", color: "#b45309", margin: "2px 0 0", fontWeight: 500 }}>
                This file is too large for most tools (max 100MB). Try splitting it first.
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => setFile(null)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: "4px" }}
        >
          <X size={18} />
        </button>
      </div>

      <div style={{ padding: "16px" }}>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px" }}>
          What do you want to do?
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "6px" }}>
          {TOOLS_COLUMNS.map((col) => (
            <div key={col.label}>
              <p style={{ margin: "0 0 6px", fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {col.label}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                {col.tools.map((tool) => (
                  <div
                    key={tool.slug}
                    onClick={() => goToTool(tool.slug, (tool as { href?: string }).href)}
                    style={{
                      padding: "7px 9px", borderRadius: "8px", cursor: "pointer",
                      background: "#f9fafb", border: "1px solid #e5e7eb",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = "#eff6ff";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#2563eb";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = "#f9fafb";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e7eb";
                    }}
                  >
                    <p style={{ margin: "0 0 1px", fontSize: "11px", fontWeight: 600, color: "#111" }}>{tool.name}</p>
                    <p style={{ margin: 0, fontSize: "10px", color: "#6b7280" }}>{tool.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CATEGORIES = [
  { slug: "core", name: "Organize PDF", desc: "Merge, split, rotate, and delete pages.", count: 4, icon: FileArchive, color: "#2563eb", bg: "#eff6ff", href: "/categories/core" },
  { slug: "convert", name: "Convert PDF", desc: "PDF to JPG, PNG, and back.", count: 4, icon: FileText, color: "#ea580c", bg: "#fff7ed", href: "/convert-pdf" },
  { slug: "security", name: "Edit & Sign", desc: "Watermark, sign, crop, and reorder pages.", count: 6, icon: Lock, color: "#16a34a", bg: "#f0fdf4", href: "/categories/security" },
];

export default function Home() {
  return (
    <main style={{ background: "#f9fafb" }}>

      {/* HERO */}
      <section style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "42% 58%", gap: "48px", alignItems: "center" }} className="hero-grid">

            {/* Lewa */}
            <div>
              <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, lineHeight: 1.15, color: "#0f0f0f", letterSpacing: "-0.02em", marginBottom: "16px", marginTop: 0 }}>
                All-in-one PDF tools.<br />
                <span style={{ color: "#2563eb" }}>Fast, simple, and safe.</span>
              </h1>
              <p style={{ fontSize: "18px", color: "#4b5563", lineHeight: 1.6, marginBottom: "24px" }}>
                Compress, merge, split and convert PDFs in seconds.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { Icon: ShieldCheck, text: "Files stay private — processed and gone", color: "#16a34a" },
                  { Icon: Zap, text: "Works in your browser — no software needed", color: "#ca8a04" },
                  { Icon: Layers, text: "Fast — 30+ tools available", color: "#2563eb" },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", color: "#374151" }}>
                    <item.Icon size={20} color={item.color} strokeWidth={2.5} />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Prawa */}
            <UploadBox />
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
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "10px", height: "100%" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: cat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <cat.icon size={26} color={cat.color} strokeWidth={2} />
                  </div>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "#111", margin: 0 }}>{cat.name}</p>
                  <p style={{ fontSize: "14px", color: "#6b7280", margin: 0, lineHeight: 1.4 }}>{cat.desc}</p>
                  <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>{cat.count} tools</p>
                  <p style={{ fontSize: "13px", color: "#2563eb", fontWeight: 600, margin: 0 }}>Browse tools →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

      {/* HOW IT WORKS */}
      <section style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "44px 24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>How it works</p>
          <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "6px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
            Three steps to done
          </h2>
          <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "36px" }}>Fast, simple, and private.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }} className="how-grid">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "24px" }}>
                <span style={{ fontSize: "32px", color: "#2563eb" }}>↑</span>
                <div style={{ width: "200px", height: "260px", borderRadius: "12px", background: "#fff", border: "2px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", padding: "16px", gap: "10px", position: "relative" }}>
                  <span style={{ position: "absolute", top: "12px", right: "12px", background: "#dc2626", color: "#fff", fontSize: "12px", fontWeight: 700, padding: "3px 8px", borderRadius: "4px" }}>PDF</span>
                  <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ height: "8px", borderRadius: "4px", background: "#e5e7eb", width: "80%" }} />
                    <div style={{ height: "8px", borderRadius: "4px", background: "#e5e7eb", width: "60%" }} />
                    <div style={{ height: "8px", borderRadius: "4px", background: "#e5e7eb", width: "70%" }} />
                    <div style={{ height: "8px", borderRadius: "4px", background: "#e5e7eb", width: "50%" }} />
                    <div style={{ height: "8px", borderRadius: "4px", background: "#e5e7eb", width: "75%" }} />
                  </div>
                </div>
                <span style={{ fontSize: "32px", color: "#16a34a" }}>↓</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {[
                { num: "01", Icon: FolderOpen, title: "Upload your file", text: "Drag & drop or click to select your PDF. All tools process files entirely in your browser — no upload needed." },
                { num: "02", Icon: Settings, title: "Process instantly", text: "Choose what you want to do — merge, split, rotate, convert. Processing starts immediately in your browser." },
                { num: "03", Icon: Download, title: "Download result", text: "Get your processed file right away. No email required, no waiting, just click download and you're done." },
              ].map((step) => (
                <div key={step.num} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                    {step.num}
                  </div>
                  <div>
                    <p style={{ fontSize: "16px", fontWeight: 600, color: "#111", margin: "0 0 4px" }}>{step.title}</p>
                    <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.6, margin: 0 }}>{step.text}</p>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }} className="why-grid">
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
              <Link key={uc.label} href={uc.href} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "11px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#f9fafb", textDecoration: "none", color: "#4b5563", fontSize: "13px" }}>
                <span style={{ color: "#2563eb" }}>→</span>
                {uc.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ textAlign: "center", padding: "80px 24px", background: "#eff6ff", borderTop: "1px solid #bfdbfe" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "8px" }}>
          Start working with your PDF now
        </h2>
        <p style={{ fontSize: "15px", color: "#4b5563", marginBottom: "28px" }}>Works in your browser. Fast.</p>
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
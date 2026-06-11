import type { Metadata } from "next";
import Link from "next/link";
import { getAllEditImageTools } from "@/data/edit-image/tools";

export const metadata: Metadata = {
  title: "Edit Images Online — Free Image Editor | Dockitt",
  description: "Free browser-based image editing tools. Compress, resize, crop, rotate, blur, watermark and more. Everything runs in your browser — no upload, no account needed.",
  openGraph: {
    title: "Edit Images Online — Free Image Editor | Dockitt",
    description: "Free browser-based image editing tools. Compress, resize, crop, rotate, blur, watermark and more. Everything runs in your browser — no upload, no account needed.",
    url: "https://www.dockitt.com/edit-image",
    siteName: "Dockitt",
    locale: "en_US",
    type: "website",
  },
};

const TOOL_META: Record<string, { icon: string; desc: string }> = {
  "compress-image":   { icon: "📦", desc: "Reduce image file size without visible quality loss" },
  "resize-image":     { icon: "↔️", desc: "Change image dimensions to any width and height" },
  "crop-image":       { icon: "✂️", desc: "Crop images to exact pixel coordinates" },
  "rotate-image":     { icon: "🔄", desc: "Rotate images by 90°, 180°, or a custom angle" },
  "flip-image":       { icon: "🪞", desc: "Mirror images horizontally or vertically" },
  "grayscale-image":  { icon: "🎞️", desc: "Convert colour images to black and white" },
  "invert-image":     { icon: "🌑", desc: "Invert image colours to create a negative effect" },
  "watermark-image":  { icon: "💧", desc: "Add text watermark with custom position and opacity" },
  "remove-exif":      { icon: "🔒", desc: "Strip GPS, camera info and all metadata from photos" },
  "blur-image":       { icon: "🌫️", desc: "Apply Gaussian blur with adjustable intensity" },
  "add-border-image": { icon: "🖼️", desc: "Add a solid colour border around any image" },
  "merge-images":     { icon: "🔗", desc: "Combine two images side by side or stacked" },
  "exif-viewer":      { icon: "🔍", desc: "View camera settings, GPS location and all EXIF data" },
};

export default function EditImagePage() {
  const tools = getAllEditImageTools();

  return (
    <main style={{ background: "#f9fafb", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "56px 24px 40px" }}>
          <nav style={{ marginBottom: "16px" }}>
            <Link href="/" style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>
              ← Home
            </Link>
          </nav>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>
            Image Editor
          </p>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.02em", marginBottom: "12px", marginTop: 0 }}>
            Edit images online
          </h1>
          <p style={{ fontSize: "17px", color: "#4b5563", lineHeight: 1.6, marginBottom: 0, marginTop: 0, maxWidth: "560px" }}>
            Compress, resize, crop, rotate, blur, watermark and more. All tools run entirely in your browser — no upload, no account, complete privacy.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
            {tools.map((t) => {
              const meta = TOOL_META[t.slug] ?? { icon: "🖼️", desc: t.description };
              return (
                <Link key={t.slug} href={`/edit-image/${t.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", height: "100%" }}>
                    <span style={{ fontSize: "28px" }}>{meta.icon}</span>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{t.name}</p>
                      <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{meta.desc}</p>
                    </div>
                    <p style={{ fontSize: "12px", color: "#2563eb", fontWeight: 600, margin: 0 }}>Edit now →</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div style={{ marginTop: "32px", padding: "16px 20px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#14532d" }}>
            <span style={{ flexShrink: 0 }}>✅</span>
            <span><strong>All tools run in your browser.</strong> Your files never leave your device — no upload, no server, complete privacy.</span>
          </div>
        </div>
      </section>

    </main>
  );
}

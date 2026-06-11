import type { Metadata } from "next";
import Link from "next/link";
import { getAllConvertImageVariants } from "@/data/convert-image/variants";

export const metadata: Metadata = {
  title: "Convert Images Online — Free Image Converter | Dockitt",
  description: "Free browser-based image converter. Convert between JPG, PNG, WebP, BMP and ICO. All conversions run in your browser — no upload, no account needed.",
  openGraph: {
    title: "Convert Images Online — Free Image Converter | Dockitt",
    description: "Free browser-based image converter. Convert between JPG, PNG, WebP, BMP and ICO. All conversions run in your browser — no upload, no account needed.",
    url: "https://www.dockitt.com/convert-image",
    siteName: "Dockitt",
    locale: "en_US",
    type: "website",
  },
};

const VARIANT_META: Record<string, { icon: string; desc: string }> = {
  "jpg-to-png":   { icon: "🖼️", desc: "Convert JPEG images to lossless PNG" },
  "jpg-to-webp":  { icon: "🖼️", desc: "Convert JPEG images to modern WebP" },
  "jpg-to-bmp":   { icon: "🖼️", desc: "Convert JPEG images to uncompressed BMP" },
  "jpg-to-ico":   { icon: "🔷", desc: "Convert JPEG images to ICO icon format" },
  "png-to-jpg":   { icon: "🖼️", desc: "Convert PNG images to compressed JPEG" },
  "png-to-webp":  { icon: "🖼️", desc: "Convert PNG images to modern WebP" },
  "png-to-bmp":   { icon: "🖼️", desc: "Convert PNG images to uncompressed BMP" },
  "png-to-ico":   { icon: "🔷", desc: "Convert PNG images to ICO icon format" },
  "webp-to-jpg":  { icon: "🖼️", desc: "Convert WebP images to JPEG for compatibility" },
  "webp-to-png":  { icon: "🖼️", desc: "Convert WebP images to lossless PNG" },
  "webp-to-bmp":  { icon: "🖼️", desc: "Convert WebP images to uncompressed BMP" },
  "bmp-to-jpg":        { icon: "🖼️", desc: "Convert BMP bitmaps to compressed JPEG" },
  "bmp-to-png":        { icon: "🖼️", desc: "Convert BMP bitmaps to lossless PNG" },
  "bmp-to-webp":       { icon: "🖼️", desc: "Convert BMP bitmaps to modern WebP" },
  "gif-to-jpg":        { icon: "🖼️", desc: "Convert GIF to compressed JPEG" },
  "gif-to-png":        { icon: "🖼️", desc: "Convert GIF to lossless PNG" },
  "gif-to-webp":       { icon: "🖼️", desc: "Convert GIF to modern WebP" },
  "svg-to-png":        { icon: "🔷", desc: "Render SVG vector graphics to PNG" },
  "svg-to-jpg":        { icon: "🔷", desc: "Render SVG vector graphics to JPG" },
  "svg-to-webp":       { icon: "🔷", desc: "Render SVG vector graphics to WebP" },
  "heic-to-jpg":       { icon: "📷", desc: "Convert iPhone HEIC photos to JPEG" },
  "heic-to-png":       { icon: "📷", desc: "Convert iPhone HEIC photos to PNG" },
  "tiff-to-jpg":       { icon: "🖼️", desc: "Convert TIFF images to compressed JPEG" },
  "tiff-to-png":       { icon: "🖼️", desc: "Convert TIFF images to lossless PNG" },
  "ico-to-png":        { icon: "🔷", desc: "Extract ICO icon as a PNG image" },
  "ico-to-jpg":        { icon: "🔷", desc: "Extract ICO icon as a JPEG image" },
  "image-to-base64":   { icon: "📝", desc: "Encode any image as a Base64 data URL" },
  "base64-to-image":   { icon: "📝", desc: "Decode a Base64 data URL back to an image" },
};

export default function ConvertImagePage() {
  const variants = getAllConvertImageVariants();

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
            Image Converter
          </p>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.02em", marginBottom: "12px", marginTop: 0 }}>
            Convert images online
          </h1>
          <p style={{ fontSize: "17px", color: "#4b5563", lineHeight: 1.6, marginBottom: 0, marginTop: 0, maxWidth: "560px" }}>
            Convert between JPG, PNG, WebP, BMP and ICO. All conversions run entirely in your browser — no upload, no account, complete privacy.
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
                <Link key={v.slug} href={`/convert-image/${v.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", height: "100%" }}>
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

import { notFound } from "next/navigation";
import { getAllConvertImageVariants, getConvertImageVariant } from "@/data/convert-image/variants";
import type { ConvertImageVariant } from "@/data/convert-image/variants";
import Link from "next/link";
import ConvertSelector from "@/app/components/ConvertSelector";
import JpgToPngTool from "../components/JpgToPngTool";
import JpgToWebpTool from "../components/JpgToWebpTool";
import JpgToBmpTool from "../components/JpgToBmpTool";
import JpgToIcoTool from "../components/JpgToIcoTool";
import PngToJpgTool from "../components/PngToJpgTool";
import PngToWebpTool from "../components/PngToWebpTool";
import PngToBmpTool from "../components/PngToBmpTool";
import PngToIcoTool from "../components/PngToIcoTool";
import WebpToJpgTool from "../components/WebpToJpgTool";
import WebpToPngTool from "../components/WebpToPngTool";
import WebpToBmpTool from "../components/WebpToBmpTool";
import BmpToJpgTool from "../components/BmpToJpgTool";
import BmpToPngTool from "../components/BmpToPngTool";
import BmpToWebpTool from "../components/BmpToWebpTool";
import GifToJpgTool from "../components/GifToJpgTool";
import GifToPngTool from "../components/GifToPngTool";
import GifToWebpTool from "../components/GifToWebpTool";
import SvgToPngTool from "../components/SvgToPngTool";
import SvgToJpgTool from "../components/SvgToJpgTool";
import SvgToWebpTool from "../components/SvgToWebpTool";
import HeicToJpgTool from "../components/HeicToJpgTool";
import HeicToPngTool from "../components/HeicToPngTool";
import TiffToJpgTool from "../components/TiffToJpgTool";
import TiffToPngTool from "../components/TiffToPngTool";
import IcoToPngTool from "../components/IcoToPngTool";
import IcoToJpgTool from "../components/IcoToJpgTool";
import ImageToBase64Tool from "../components/ImageToBase64Tool";
import Base64ToImageTool from "../components/Base64ToImageTool";

function ImageConvertRouter({ variant }: { variant: ConvertImageVariant }) {
  switch (variant.slug) {
    case "jpg-to-png":   return <JpgToPngTool  variant={variant} />;
    case "jpg-to-webp":  return <JpgToWebpTool variant={variant} />;
    case "jpg-to-bmp":   return <JpgToBmpTool  variant={variant} />;
    case "jpg-to-ico":   return <JpgToIcoTool  variant={variant} />;
    case "png-to-jpg":   return <PngToJpgTool  variant={variant} />;
    case "png-to-webp":  return <PngToWebpTool variant={variant} />;
    case "png-to-bmp":   return <PngToBmpTool  variant={variant} />;
    case "png-to-ico":   return <PngToIcoTool  variant={variant} />;
    case "webp-to-jpg":  return <WebpToJpgTool variant={variant} />;
    case "webp-to-png":  return <WebpToPngTool variant={variant} />;
    case "webp-to-bmp":  return <WebpToBmpTool variant={variant} />;
    case "bmp-to-jpg":        return <BmpToJpgTool      variant={variant} />;
    case "bmp-to-png":        return <BmpToPngTool      variant={variant} />;
    case "bmp-to-webp":       return <BmpToWebpTool     variant={variant} />;
    case "gif-to-jpg":        return <GifToJpgTool      variant={variant} />;
    case "gif-to-png":        return <GifToPngTool      variant={variant} />;
    case "gif-to-webp":       return <GifToWebpTool     variant={variant} />;
    case "svg-to-png":        return <SvgToPngTool      variant={variant} />;
    case "svg-to-jpg":        return <SvgToJpgTool      variant={variant} />;
    case "svg-to-webp":       return <SvgToWebpTool     variant={variant} />;
    case "heic-to-jpg":       return <HeicToJpgTool     variant={variant} />;
    case "heic-to-png":       return <HeicToPngTool     variant={variant} />;
    case "tiff-to-jpg":       return <TiffToJpgTool     variant={variant} />;
    case "tiff-to-png":       return <TiffToPngTool     variant={variant} />;
    case "ico-to-png":        return <IcoToPngTool      variant={variant} />;
    case "ico-to-jpg":        return <IcoToJpgTool      variant={variant} />;
    case "image-to-base64":   return <ImageToBase64Tool variant={variant} />;
    case "base64-to-image":   return <Base64ToImageTool variant={variant} />;
    default:                  return null;
  }
}

type PageProps = { params: Promise<{ variant: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { variant } = await params;
  const v = getConvertImageVariant(variant);
  if (!v) return {};
  return { title: `${v.title} | Dockitt`, description: v.description };
}

export async function generateStaticParams() {
  return getAllConvertImageVariants().map((v) => ({ variant: v.slug }));
}

export default async function ConvertImageVariantPage({ params }: PageProps) {
  const { variant } = await params;
  const v = getConvertImageVariant(variant);
  if (!v) notFound();

  const bullets = [
    { color: "#16a34a", text: "Processed entirely in your browser — never leaves your device" },
    { color: "#2563eb", text: "No software needed — works in any modern browser" },
    { color: "#ca8a04", text: "Fast — most conversions complete in under a second" },
    { color: "#6b7280",  text: "Files up to 100MB supported" },
  ];

  return (
    <main style={{ background: "#ffffff" }}>

      {/* HERO */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "42% 58%", gap: "48px", alignItems: "start" }} className="hero-grid">

            {/* Left */}
            <div style={{ alignSelf: "start" }}>
              <nav style={{ marginBottom: "16px" }}>
                <ol style={{ display: "flex", alignItems: "center", gap: "8px", listStyle: "none", margin: 0, padding: 0, fontSize: "13px", color: "#9ca3af" }}>
                  <li><Link href="/" style={{ color: "#2563eb", textDecoration: "none" }}>Home</Link></li>
                  <li style={{ color: "#d1d5db" }}>›</li>
                  <li><Link href="/convert-image" style={{ color: "#9ca3af", textDecoration: "none" }}>Image Convert</Link></li>
                  <li style={{ color: "#d1d5db" }}>›</li>
                  <li style={{ color: "#111" }}>{v.name}</li>
                </ol>
              </nav>

              <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "12px", marginTop: 0 }}>
                {v.title}
              </h1>
              <p style={{ fontSize: "18px", color: "#4b5563", lineHeight: 1.6, margin: 0 }}>
                {v.description}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px" }}>
                {bullets.map((b) => (
                  <div key={b.text} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#374151" }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="10" cy="10" r="9" stroke={b.color} strokeWidth="1.5" fill="none" />
                      <path d="M6 10l3 3 5-5" stroke={b.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right tool */}
            <div style={{ alignSelf: "start", background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden" }}>
              {/* Variant switcher */}
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
                    Convert
                  </p>
                  <Link href="/convert" style={{ fontSize: "12px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>← All Converters</Link>
                </div>
                <ConvertSelector currentSlug={variant} currentRoute="convert-image" />
              </div>

              {/* Privacy banner */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: "#f0fdf4", borderBottom: "1px solid #bbf7d0", padding: "12px 16px", fontSize: "13px", color: "#14532d" }}>
                <span style={{ flexShrink: 0 }}>✅</span>
                <span><strong>Processed entirely in your browser.</strong> Your file never leaves your device — no upload, no server, complete privacy.</span>
              </div>

              <div style={{ padding: "24px" }}>
                <ImageConvertRouter variant={v} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: "#f9fafb" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

            {v.longDescription && (
              <section style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px" }}>
                <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.8", margin: 0 }}>{v.longDescription}</p>
              </section>
            )}

            <section style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px" }}>
              <h2 style={{ marginTop: 0, fontSize: "20px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>How to use</h2>
              <ol style={{ paddingLeft: "20px", margin: 0 }}>
                {v.howTo.map((step) => (
                  <li key={step} style={{ marginBottom: "10px", color: "#444", fontSize: "14px", lineHeight: 1.6 }}>{step}</li>
                ))}
              </ol>
            </section>

            <section style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px" }}>
              <h2 style={{ marginTop: 0, fontSize: "20px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>FAQ</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {v.faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 style={{ margin: "0 0 8px 0", fontSize: "15px", fontWeight: 600, color: "#111" }}>{faq.question}</h3>
                    <p style={{ margin: 0, color: "#444", fontSize: "14px", lineHeight: 1.6 }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </section>

    </main>
  );
}

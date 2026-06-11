import { notFound } from "next/navigation";
import { getAllEditImageTools, getEditImageTool } from "@/data/edit-image/tools";
import type { EditImageTool } from "@/data/edit-image/tools";
import Link from "next/link";
import CompressImageTool from "../components/CompressImageTool";
import ResizeImageTool from "../components/ResizeImageTool";
import CropImageTool from "../components/CropImageTool";
import RotateImageTool from "../components/RotateImageTool";
import FlipImageTool from "../components/FlipImageTool";
import GrayscaleImageTool from "../components/GrayscaleImageTool";
import InvertImageTool from "../components/InvertImageTool";
import WatermarkImageTool from "../components/WatermarkImageTool";
import RemoveExifTool from "../components/RemoveExifTool";
import BlurImageTool from "../components/BlurImageTool";
import AddBorderImageTool from "../components/AddBorderImageTool";
import MergeImagesTool from "../components/MergeImagesTool";
import ExifViewerTool from "../components/ExifViewerTool";

function EditImageRouter({ tool }: { tool: EditImageTool }) {
  switch (tool.slug) {
    case "compress-image":   return <CompressImageTool   tool={tool} />;
    case "resize-image":     return <ResizeImageTool     tool={tool} />;
    case "crop-image":       return <CropImageTool       tool={tool} />;
    case "rotate-image":     return <RotateImageTool     tool={tool} />;
    case "flip-image":       return <FlipImageTool       tool={tool} />;
    case "grayscale-image":  return <GrayscaleImageTool  tool={tool} />;
    case "invert-image":     return <InvertImageTool     tool={tool} />;
    case "watermark-image":  return <WatermarkImageTool  tool={tool} />;
    case "remove-exif":      return <RemoveExifTool      tool={tool} />;
    case "blur-image":       return <BlurImageTool       tool={tool} />;
    case "add-border-image": return <AddBorderImageTool  tool={tool} />;
    case "merge-images":     return <MergeImagesTool     tool={tool} />;
    case "exif-viewer":      return <ExifViewerTool      tool={tool} />;
    default:                 return null;
  }
}

type PageProps = { params: Promise<{ variant: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { variant } = await params;
  const t = getEditImageTool(variant);
  if (!t) return {};
  return { title: `${t.title} | Dockitt`, description: t.description };
}

export async function generateStaticParams() {
  return getAllEditImageTools().map((t) => ({ variant: t.slug }));
}

export default async function EditImageVariantPage({ params }: PageProps) {
  const { variant } = await params;
  const tool = getEditImageTool(variant);
  const all = getAllEditImageTools();
  if (!tool) notFound();

  const bullets = [
    { color: "#16a34a", text: "Processed entirely in your browser — never leaves your device" },
    { color: "#2563eb", text: "No software needed — works in any modern browser" },
    { color: "#ca8a04", text: "Fast — most operations complete in under a second" },
    { color: "#6b7280", text: "Files up to 100MB supported" },
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
                  <li><Link href="/edit-image" style={{ color: "#9ca3af", textDecoration: "none" }}>Edit Image</Link></li>
                  <li style={{ color: "#d1d5db" }}>›</li>
                  <li style={{ color: "#111" }}>{tool.name}</li>
                </ol>
              </nav>

              <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "12px", marginTop: 0 }}>
                {tool.title}
              </h1>
              <p style={{ fontSize: "18px", color: "#4b5563", lineHeight: 1.6, margin: 0 }}>
                {tool.description}
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
              {/* Tool switcher */}
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 8px" }}>
                  Edit tools
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {all.map((item) => (
                    <Link key={item.slug} href={`/edit-image/${item.slug}`}
                      style={{ padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 500, textDecoration: "none", background: item.slug === variant ? "#2563eb" : "#fff", color: item.slug === variant ? "#fff" : "#374151", border: "1px solid", borderColor: item.slug === variant ? "#2563eb" : "#e5e7eb" }}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Privacy banner */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: "#f0fdf4", borderBottom: "1px solid #bbf7d0", padding: "12px 16px", fontSize: "13px", color: "#14532d" }}>
                <span style={{ flexShrink: 0 }}>✅</span>
                <span><strong>Processed entirely in your browser.</strong> Your file never leaves your device — no upload, no server, complete privacy.</span>
              </div>

              <div style={{ padding: "24px" }}>
                <EditImageRouter tool={tool} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: "#f9fafb" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

            {tool.longDescription && (
              <section style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px" }}>
                <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.8", margin: 0 }}>{tool.longDescription}</p>
              </section>
            )}

            <section style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px" }}>
              <h2 style={{ marginTop: 0, fontSize: "20px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>How to use</h2>
              <ol style={{ paddingLeft: "20px", margin: 0 }}>
                {tool.howTo.map((step) => (
                  <li key={step} style={{ marginBottom: "10px", color: "#444", fontSize: "14px", lineHeight: 1.6 }}>{step}</li>
                ))}
              </ol>
            </section>

            <section style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px" }}>
              <h2 style={{ marginTop: 0, fontSize: "20px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>FAQ</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {tool.faqs.map((faq) => (
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

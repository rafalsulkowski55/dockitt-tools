import { notFound } from "next/navigation";
import { getAllTools, getToolBySlug, getRelatedTools } from "@/lib/tools";
import { Suspense } from "react";
import ToolUpload from "./ToolUpload";
import MergeUpload from "./MergeUpload";
import SplitUpload from "./SplitUpload";
import Breadcrumbs from "./Breadcrumbs";
import RotateUpload from "./RotateUpload";
import DeletePagesUpload from "./DeletePagesUpload";
import ExtractPagesUpload from "./ExtractPagesUpload";
import ProtectUpload from "./ProtectUpload";
import UnlockUpload from "./UnlockUpload";
import WatermarkUpload from "./WatermarkUpload";
import SignUpload from "./SignUpload";
import CropUpload from "./CropUpload";
import ReorderUpload from "./ReorderUpload";
import RepairUpload from "./RepairUpload";
import OcrUpload from "./OcrUpload";
import DownloadHandler from "./DownloadHandler";
import Link from "next/link";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `https://www.dockitt.com/tools/${slug}`,
      siteName: "Dockitt",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: tool.title,
      description: tool.description,
    },
  };
}

export async function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
}

const SERVER_SIDE_TOOLS = new Set([
  "compress-pdf",
  "protect-pdf",
  "unlock-pdf",
  "repair-pdf",
  "ocr-pdf",
  "pdf-to-word",
  "word-to-pdf",
]);

function ToolComponent({ slug }: { slug: string }) {
  switch (slug) {
    case "compress-pdf": return <ToolUpload />;
    case "merge-pdf": return <MergeUpload />;
    case "split-pdf": return <SplitUpload />;
    case "rotate-pdf": return <RotateUpload />;
    case "delete-pdf-pages": return <DeletePagesUpload />;
    case "extract-pdf-pages": return <ExtractPagesUpload />;
    case "protect-pdf": return <ProtectUpload />;
    case "unlock-pdf": return <UnlockUpload />;
    case "watermark-pdf": return <WatermarkUpload />;
    case "sign-pdf": return <SignUpload />;
    case "crop-pdf": return <CropUpload />;
    case "reorder-pdf-pages": return <ReorderUpload />;
    case "repair-pdf": return <RepairUpload />;
    case "ocr-pdf": return <OcrUpload />;
    default: return <ToolUpload />;
  }
}

const categoryLabels: Record<string, string> = {
  core: "Core PDF Tools",
  security: "PDF Security Tools",
  utility: "PDF Utility Tools",
};

const introVariants: Record<string, "A" | "B" | "C" | "D"> = {
  "compress-pdf": "A", "merge-pdf": "B", "split-pdf": "A", "rotate-pdf": "C",
  "delete-pdf-pages": "B", "protect-pdf": "D", "unlock-pdf": "A",
  "watermark-pdf": "D", "sign-pdf": "C", "crop-pdf": "B", "repair-pdf": "A",
  "ocr-pdf": "C", "extract-pdf-pages": "B", "reorder-pdf-pages": "D",
};

function IntroSection({ tool, variant, slug }: {
  tool: { title: string; description: string; name: string; primaryKeyword: string };
  variant: "A" | "B" | "C" | "D";
  slug: string;
}) {
  const subtitles = {
    A: "Upload your file below and get the result in seconds. No sign-up required.",
    B: "Works directly in your browser with no account needed.",
    C: "Processes your file instantly. Nothing is stored on our servers after download.",
    D: "Fast, and private. Your files are deleted immediately after processing.",
  };

  if (slug === "compress-pdf") {
    return (
      <section>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "12px", marginTop: 0 }}>
          Reduce PDF file size for email, forms and uploads
        </h1>
        <p style={{ fontSize: "18px", color: "#4b5563", lineHeight: 1.6, margin: 0 }}>
          Make large PDF files smaller so you can send them by email or upload them without size errors. No signup required.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "12px", marginTop: 0 }}>
        {tool.title}
      </h1>
      <p style={{ fontSize: "18px", color: "#4b5563", lineHeight: 1.6, marginBottom: "8px", marginTop: 0 }}>
        {tool.description}
      </p>
      <p style={{ fontSize: "15px", color: "#6b7280", margin: 0 }}>{subtitles[variant]}</p>
    </section>
  );
}

const sectionStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "24px",
};

const h2Style = {
  marginTop: 0,
  fontSize: "20px",
  borderLeft: "3px solid #2563eb",
  paddingLeft: "12px",
};

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const related = getRelatedTools(tool.relatedTools ?? []);
  const categoryLabel = categoryLabels[tool.category] ?? tool.category;
  const variant = introVariants[slug] ?? "A";

  const schemaApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": "WebApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": tool.description,
    "url": `https://www.dockitt.com/tools/${slug}`,
  };

  const schemaFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
    })),
  };

  const bullets = SERVER_SIDE_TOOLS.has(slug)
    ? [
        { color: "#16a34a", text: "Your file is deleted immediately after processing" },
        { color: "#2563eb", text: "Encrypted connection — safe and private" },
        { color: "#ca8a04", text: "Result ready in seconds" },
      ]
    : [
        { color: "#16a34a", text: "Processed entirely in your browser — never leaves your device" },
        { color: "#2563eb", text: "No software needed — works in any browser" },
        { color: "#ca8a04", text: "Fast — most operations complete in seconds" },
      ];

  return (
    <main style={{ background: "#ffffff" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />

      <Suspense fallback={null}>
        <DownloadHandler />
      </Suspense>

      {/* HERO */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "42% 58%", gap: "48px", alignItems: "start" }}
            className="hero-grid"
          >
            {/* Lewa — sticky na górze */}
            <div style={{ alignSelf: "start" }}>
              <Breadcrumbs toolName={tool.name} />
              <IntroSection tool={tool} variant={variant} slug={slug} />
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

            {/* Prawa — upload box */}
            <div style={{ alignSelf: "start", background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden" }}>
              {SERVER_SIDE_TOOLS.has(slug) ? (
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  background: "#fffbeb", borderBottom: "1px solid #fde68a",
                  padding: "12px 16px", fontSize: "13px", color: "#92400e",
                }}>
                  <span style={{ flexShrink: 0 }}>🔐</span>
                  <span><strong>Processed on our secure server.</strong> Your file is sent over an encrypted connection, converted, and deleted immediately.</span>
                </div>
              ) : (
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  background: "#f0fdf4", borderBottom: "1px solid #bbf7d0",
                  padding: "12px 16px", fontSize: "13px", color: "#14532d",
                }}>
                  <span style={{ flexShrink: 0 }}>✅</span>
                  <span><strong>Processed entirely in your browser.</strong> Your file never leaves your device — no upload, no server, complete privacy.</span>
                </div>
              )}
              <div style={{ padding: "24px" }}>
                <ToolComponent slug={slug} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: "#f9fafb" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

            <section style={{ display: "flex", gap: "10px" }}>
              <Link
                href={`/categories/${tool.category}`}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flex: 1, background: "#ffffff", border: "1px solid #2563eb",
                  color: "#2563eb", padding: "10px 18px", borderRadius: "8px",
                  fontSize: "13px", textDecoration: "none", fontWeight: 500,
                }}
              >
                ← {categoryLabel}
              </Link>
              <Link
                href={`/guides/how-to-${tool.slug}`}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flex: 1, background: "#2563eb", border: "1px solid #2563eb",
                  color: "#ffffff", padding: "10px 18px", borderRadius: "8px",
                  fontSize: "13px", textDecoration: "none", fontWeight: 500,
                }}
              >
                📖 How to {tool.name} →
              </Link>
            </section>

            {tool.longDescription && (
              <section style={sectionStyle}>
                <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.8", margin: 0 }}>
                  {tool.longDescription}
                </p>
              </section>
            )}

            <section style={sectionStyle}>
              <h2 style={h2Style}>How to use</h2>
              <ol style={{ paddingLeft: "20px", margin: 0 }}>
                {tool.howTo.map((step) => (
                  <li key={step} style={{ marginBottom: "10px", color: "#444" }}>{step}</li>
                ))}
              </ol>
            </section>

            <section style={sectionStyle}>
              <h2 style={h2Style}>FAQ</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {tool.faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 style={{ margin: "0 0 8px 0", fontSize: "17px" }}>{faq.question}</h3>
                    <p style={{ margin: 0, color: "#444" }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {related.length > 0 && (
              <section style={sectionStyle}>
                <h2 style={h2Style}>Related Tools</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {related.map((relatedTool) => (
                    <Link
                      key={relatedTool!.slug}
                      href={`/tools/${relatedTool!.slug}`}
                      style={{
                        display: "flex", flexDirection: "column",
                        padding: "16px", background: "#f9fafb",
                        border: "1px solid #e5e7eb", borderRadius: "12px",
                        textDecoration: "none",
                      }}
                    >
                      <span style={{ fontWeight: 600, color: "#2563eb", fontSize: "15px" }}>{relatedTool!.name}</span>
                      <span style={{ color: "#555", fontSize: "13px", marginTop: "4px" }}>{relatedTool!.shortDescription}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </section>
    </main>
  );
}
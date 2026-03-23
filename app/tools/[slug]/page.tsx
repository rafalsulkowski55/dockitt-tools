import { notFound } from "next/navigation";
import { getAllTools, getToolBySlug, getRelatedTools } from "@/lib/tools";
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
import Link from "next/link";

type ToolPageProps = {
  params: Promise<{
    slug: string;
  }>;
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
  return getAllTools().map((tool) => ({
    slug: tool.slug,
  }));
}

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
}

const introVariants: Record<string, "A" | "B" | "C" | "D"> = {
  "compress-pdf": "A",
  "merge-pdf": "B",
  "split-pdf": "A",
  "rotate-pdf": "C",
  "delete-pdf-pages": "B",
  "protect-pdf": "D",
  "unlock-pdf": "A",
  "watermark-pdf": "D",
  "sign-pdf": "C",
  "crop-pdf": "B",
  "repair-pdf": "A",
  "ocr-pdf": "C",
  "extract-pdf-pages": "B",
  "reorder-pdf-pages": "D",
}

function IntroSection({ tool, variant }: {
  tool: { title: string; description: string; name: string; primaryKeyword: string };
  variant: "A" | "B" | "C" | "D"
}) {
  if (variant === "A") {
    return (
      <section>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px" }}>
          {tool.title}
        </h1>
        <p style={{ fontSize: "18px", color: "#444", margin: "0 0 12px 0" }}>
          {tool.description}
        </p>
        <p style={{ fontSize: "15px", color: "#555", margin: 0 }}>
          Upload your file below and get the result in seconds. No sign-up required.
        </p>
      </section>
    )
  }

  if (variant === "B") {
    return (
      <section>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px" }}>
          {tool.title}
        </h1>
        <p style={{ fontSize: "18px", color: "#444", margin: "0 0 12px 0" }}>
          {tool.description}
        </p>
        <p style={{ fontSize: "15px", color: "#555", margin: 0 }}>
          Works directly in your browser. Free to use with no account needed.
        </p>
      </section>
    )
  }

  if (variant === "C") {
    return (
      <section>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px" }}>
          {tool.title}
        </h1>
        <p style={{ fontSize: "18px", color: "#444", margin: "0 0 12px 0" }}>
          {tool.description}
        </p>
        <p style={{ fontSize: "15px", color: "#555", margin: 0 }}>
          Processes your file instantly. Nothing is stored on our servers after download.
        </p>
      </section>
    )
  }

  return (
    <section>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px" }}>
        {tool.title}
      </h1>
      <p style={{ fontSize: "18px", color: "#444", margin: "0 0 12px 0" }}>
        {tool.description}
      </p>
      <p style={{ fontSize: "15px", color: "#555", margin: 0 }}>
        Free, fast, and private. Your files are deleted immediately after processing.
      </p>
    </section>
  )
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const related = getRelatedTools(tool.relatedTools ?? []);
  const categoryLabel = categoryLabels[tool.category] ?? tool.category
  const variant = introVariants[slug] ?? "A"

  const schemaApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": "WebApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": tool.description,
    "url": `https://www.dockitt.com/tools/${slug}`,
  }

  const schemaFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "40px 20px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

        <div>
          <Breadcrumbs toolName={tool.name} />
          <IntroSection tool={tool} variant={variant} />
        </div>

        <section style={{
          background: "#ffffff", border: "1px solid #e5e7eb",
          borderRadius: "16px", padding: "24px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}>
          <div style={{
            border: "2px dashed #d1d5db", borderRadius: "12px",
            padding: "32px", background: "#fafafa",
          }}>
            <ToolComponent slug={slug} />
          </div>
        </section>

        <section style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link
            href={`/categories/${tool.category}`}
            style={{
              display: "inline-flex", alignItems: "center",
              background: "#ffffff", border: "1px solid #e5e7eb",
              color: "#444", padding: "6px 14px",
              borderRadius: "8px", fontSize: "13px",
              textDecoration: "none", fontWeight: 500,
            }}
          >
            ← {categoryLabel}
          </Link>
          <Link
            href={`/guides/how-to-${tool.slug}`}
            style={{
              display: "inline-flex", alignItems: "center",
              background: "#ffffff", border: "1px solid #e5e7eb",
              color: "#444", padding: "6px 14px",
              borderRadius: "8px", fontSize: "13px",
              textDecoration: "none", fontWeight: 500,
            }}
          >
            📖 How to {tool.name} →
          </Link>
        </section>

        {tool.longDescription && (
          <section style={{
            background: "#ffffff", border: "1px solid #e5e7eb",
            borderRadius: "16px", padding: "24px",
          }}>
            <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.8", margin: 0 }}>
              {tool.longDescription}
            </p>
          </section>
        )}

        <section style={{
          background: "#ffffff", border: "1px solid #e5e7eb",
          borderRadius: "16px", padding: "24px",
        }}>
          <h2 style={{ marginTop: 0, fontSize: "20px" }}>How to use</h2>
          <ol style={{ paddingLeft: "20px", margin: 0 }}>
            {tool.howTo.map((step) => (
              <li key={step} style={{ marginBottom: "10px", color: "#444" }}>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section style={{
          background: "#ffffff", border: "1px solid #e5e7eb",
          borderRadius: "16px", padding: "24px",
        }}>
          <h2 style={{ marginTop: 0, fontSize: "20px" }}>FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {tool.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "17px" }}>
                  {faq.question}
                </h3>
                <p style={{ margin: 0, color: "#444" }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section style={{
            background: "#ffffff", border: "1px solid #e5e7eb",
            borderRadius: "16px", padding: "24px",
          }}>
            <h2 style={{ marginTop: 0, fontSize: "20px" }}>Related Tools</h2>
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
                  <span style={{ fontWeight: 600, color: "#111", fontSize: "15px" }}>
                    {relatedTool!.name}
                  </span>
                  <span style={{ color: "#555", fontSize: "13px", marginTop: "4px" }}>
                    {relatedTool!.shortDescription}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
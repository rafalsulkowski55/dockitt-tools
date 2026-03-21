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
  };
}

export async function generateStaticParams() {
  return getAllTools().map((tool) => ({
    slug: tool.slug,
  }));
}

function ToolComponent({ slug }: { slug: string }) {
  switch (slug) {
    case "compress-pdf":
      return <ToolUpload />;
    case "merge-pdf":
      return <MergeUpload />;
    case "split-pdf":
      return <SplitUpload />;
    case "rotate-pdf":
      return <RotateUpload />;
    case "delete-pdf-pages":
      return <DeletePagesUpload />;
    case "extract-pdf-pages":
      return <ExtractPagesUpload />;
    case "protect-pdf":
      return <ProtectUpload />;
    case "unlock-pdf":
      return <UnlockUpload />;
    case "watermark-pdf":
      return <WatermarkUpload />;
    case "sign-pdf":
      return <SignUpload />;
    case "crop-pdf":
      return <CropUpload />;
    case "reorder-pdf-pages":
      return <ReorderUpload />;
    case "repair-pdf":
      return <RepairUpload />;
    case "ocr-pdf":
      return <OcrUpload />;
    default:
      return <ToolUpload />;
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const related = getRelatedTools(tool.relatedTools ?? []);

  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

        <section>
          <Breadcrumbs toolName={tool.name} />
          <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px" }}>
            {tool.title}
          </h1>
          <p style={{ fontSize: "18px", color: "#555", margin: 0 }}>
            {tool.description}
          </p>
        </section>

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

        {tool.longDescription && (
          <section style={{
            background: "#ffffff", border: "1px solid #e5e7eb",
            borderRadius: "16px", padding: "24px",
          }}>
            <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.8", margin: 0 }}>
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
                <p style={{ margin: 0, color: "#555" }}>{faq.answer}</p>
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
                  <span style={{ color: "#666", fontSize: "13px", marginTop: "4px" }}>
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
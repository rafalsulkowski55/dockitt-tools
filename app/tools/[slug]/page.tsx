import { notFound } from "next/navigation";
import { getAllTools, getToolBySlug } from "@/lib/tools";
import ToolUpload from "./ToolUpload";
import MergeUpload from "./MergeUpload";
import SplitUpload from "./SplitUpload";

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

  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

        <section>
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

      </div>
    </main>
  );
}
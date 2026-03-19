import { notFound } from "next/navigation";
import { getAllConvertVariants, getConvertVariant } from "@/data/convert/variants";
import ConvertTool from "./ConvertTool";
import Link from "next/link";

type ConvertPageProps = {
  params: Promise<{
    variant: string;
  }>;
};

export async function generateMetadata({ params }: ConvertPageProps) {
  const { variant } = await params;
  const v = getConvertVariant(variant);
  if (!v) return {};
  return {
    title: `${v.title} — Dockitt`,
    description: v.description,
  };
}

export async function generateStaticParams() {
  return getAllConvertVariants().map((v) => ({
    variant: v.slug,
  }));
}

export default async function ConvertPage({ params }: ConvertPageProps) {
  const { variant } = await params;
  const v = getConvertVariant(variant);
  const all = getAllConvertVariants();

  if (!v) {
    notFound();
  }

  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

        {/* Breadcrumbs */}
        <nav>
          <ol style={{
            display: "flex", alignItems: "center", gap: "8px",
            listStyle: "none", margin: 0, padding: 0,
            fontSize: "14px", color: "#999",
          }}>
            <li><Link href="/" style={{ color: "#999", textDecoration: "none" }}>Home</Link></li>
            <li style={{ color: "#ccc" }}>›</li>
            <li><Link href="/convert-pdf" style={{ color: "#999", textDecoration: "none" }}>Convert PDF</Link></li>
            <li style={{ color: "#ccc" }}>›</li>
            <li style={{ color: "#333" }}>{v.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <section>
          <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px" }}>
            {v.title}
          </h1>
          <p style={{ fontSize: "18px", color: "#555", margin: 0 }}>
            {v.description}
          </p>
        </section>

        {/* Variant menu */}
        <section style={{
          background: "#ffffff", border: "1px solid #e5e7eb",
          borderRadius: "16px", padding: "16px",
        }}>
          <p style={{ fontSize: "13px", color: "#999", margin: "0 0 12px 0" }}>
            Select conversion type:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {all.map((item) => (
              <Link
                key={item.slug}
                href={`/convert-pdf/${item.slug}`}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  background: item.slug === variant ? "#111111" : "#f3f4f6",
                  color: item.slug === variant ? "#ffffff" : "#333333",
                  border: "1px solid",
                  borderColor: item.slug === variant ? "#111111" : "#e5e7eb",
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Tool */}
        <section style={{
          background: "#ffffff", border: "1px solid #e5e7eb",
          borderRadius: "16px", padding: "24px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}>
          <div style={{
            border: "2px dashed #d1d5db", borderRadius: "12px",
            padding: "32px", background: "#fafafa",
          }}>
            <ConvertTool variant={v} />
          </div>
        </section>

        {/* Long description */}
        <section style={{
            background: "#ffffff", border: "1px solid #e5e7eb",
            borderRadius: "16px", padding: "24px",
            }}>
                <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.8", margin: 0 }}>
                    {v.longDescription}
                    </p>
                    </section>

{/* How to use */}
<section style={{
  background: "#ffffff", border: "1px solid #e5e7eb",
  borderRadius: "16px", padding: "24px",
}}>
  <h2 style={{ marginTop: 0, fontSize: "20px" }}>How to use</h2>
  <ol style={{ paddingLeft: "20px", margin: 0 }}>
    {v.howTo.map((step) => (
      <li key={step} style={{ marginBottom: "10px", color: "#444" }}>
        {step}
      </li>
    ))}
  </ol>
</section>

{/* FAQ */}

        {/* FAQ */}
        <section style={{
          background: "#ffffff", border: "1px solid #e5e7eb",
          borderRadius: "16px", padding: "24px",
        }}>
          <h2 style={{ marginTop: 0, fontSize: "20px" }}>FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {v.faqs.map((faq) => (
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
import { notFound } from "next/navigation";
import { getAllConvertVariants, getConvertVariant } from "@/data/convert/variants";
import ConvertTool from "./ConvertTool";
import Link from "next/link";

type ConvertPageProps = {
  params: Promise<{ variant: string }>;
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
  return getAllConvertVariants().map((v) => ({ variant: v.slug }));
}

export default async function ConvertPage({ params }: ConvertPageProps) {
  const { variant } = await params;
  const v = getConvertVariant(variant);
  const all = getAllConvertVariants();
  if (!v) notFound();

  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

        {/* Breadcrumbs */}
        <nav>
          <ol style={{
            display: "flex", alignItems: "center", gap: "8px",
            listStyle: "none", margin: 0, padding: 0,
            fontSize: "14px", color: "#9ca3af",
          }}>
            <li><Link href="/" style={{ color: "#2563eb", textDecoration: "none" }}>Home</Link></li>
            <li style={{ color: "#d1d5db" }}>›</li>
            <li><Link href="/convert-pdf" style={{ color: "#9ca3af", textDecoration: "none" }}>Convert PDF</Link></li>
            <li style={{ color: "#d1d5db" }}>›</li>
            <li style={{ color: "#111" }}>{v.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <section>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 700, marginBottom: "10px", color: "#0f0f0f", letterSpacing: "-0.015em" }}>
            {v.title}
          </h1>
          <p style={{ fontSize: "16px", color: "#4b5563", margin: 0, lineHeight: 1.6 }}>
            {v.description}
          </p>
        </section>

        {/* Variant switcher */}
        <section style={{
          background: "#fff", border: "1px solid #e5e7eb",
          borderRadius: "12px", padding: "16px",
        }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px 0" }}>
            Select conversion type:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {all.map((item) => (
              <Link
                key={item.slug}
                href={`/convert-pdf/${item.slug}`}
                style={{
                  padding: "8px 14px", borderRadius: "8px",
                  fontSize: "13px", fontWeight: 500, textDecoration: "none",
                  background: item.slug === variant ? "#2563eb" : "#f9fafb",
                  color: item.slug === variant ? "#fff" : "#374151",
                  border: "1px solid",
                  borderColor: item.slug === variant ? "#2563eb" : "#e5e7eb",
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Tool */}
        <section style={{
          background: "#fff", border: "1px solid #e5e7eb",
          borderRadius: "12px", padding: "24px",
        }}>
          <ConvertTool variant={v} />
        </section>

        {/* Long description */}
        {v.longDescription && (
          <section style={{
            background: "#fff", border: "1px solid #e5e7eb",
            borderLeft: "3px solid #2563eb",
            borderRadius: "12px", padding: "24px",
          }}>
            <p style={{ fontSize: "15px", color: "#4b5563", lineHeight: 1.8, margin: 0 }}>
              {v.longDescription}
            </p>
          </section>
        )}

        {/* How to use */}
        <section style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ marginTop: 0, fontSize: "18px", fontWeight: 700, color: "#0f0f0f", borderLeft: "3px solid #2563eb", paddingLeft: "12px", marginBottom: "16px" }}>
            How to use
          </h2>
          <ol style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            {v.howTo.map((step) => (
              <li key={step} style={{ color: "#4b5563", fontSize: "14px", lineHeight: 1.6 }}>
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ marginTop: 0, fontSize: "18px", fontWeight: 700, color: "#0f0f0f", borderLeft: "3px solid #2563eb", paddingLeft: "12px", marginBottom: "20px" }}>
            FAQ
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {v.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "15px", fontWeight: 600, color: "#111" }}>
                  {faq.question}
                </h3>
                <p style={{ margin: 0, color: "#4b5563", fontSize: "14px", lineHeight: 1.6 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
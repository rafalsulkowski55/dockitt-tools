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

const R2_VARIANTS = new Set(["pdf-to-word", "word-to-pdf"]);

export default async function ConvertPage({ params }: ConvertPageProps) {
  const { variant } = await params;
  const v = getConvertVariant(variant);
  const all = getAllConvertVariants();
  if (!v) notFound();

  const isServer = R2_VARIANTS.has(variant);

  const bullets = isServer
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

      {/* HERO */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "42% 58%", gap: "48px", alignItems: "start" }} className="hero-grid">

            {/* Lewa */}
            <div style={{ alignSelf: "start" }}>
              <nav style={{ marginBottom: "16px" }}>
                <ol style={{ display: "flex", alignItems: "center", gap: "8px", listStyle: "none", margin: 0, padding: 0, fontSize: "13px", color: "#9ca3af" }}>
                  <li><Link href="/" style={{ color: "#2563eb", textDecoration: "none" }}>Home</Link></li>
                  <li style={{ color: "#d1d5db" }}>›</li>
                  <li><Link href="/convert-pdf" style={{ color: "#9ca3af", textDecoration: "none" }}>Convert PDF</Link></li>
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

            {/* Prawa — tool */}
            <div style={{ alignSelf: "start", background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden" }}>
              {/* Variant switcher */}
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 8px" }}>
                  Conversion type
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {all.map((item) => (
                    <Link key={item.slug} href={`/convert-pdf/${item.slug}`}
                      style={{ padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 500, textDecoration: "none", background: item.slug === variant ? "#2563eb" : "#fff", color: item.slug === variant ? "#fff" : "#374151", border: "1px solid", borderColor: item.slug === variant ? "#2563eb" : "#e5e7eb" }}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Privacy banner */}
              {isServer ? (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: "#fffbeb", borderBottom: "1px solid #fde68a", padding: "12px 16px", fontSize: "13px", color: "#92400e" }}>
                  <span style={{ flexShrink: 0 }}>🔐</span>
                  <span><strong>Processed on our secure server.</strong> Your file is sent over an encrypted connection, converted, and deleted immediately.</span>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: "#f0fdf4", borderBottom: "1px solid #bbf7d0", padding: "12px 16px", fontSize: "13px", color: "#14532d" }}>
                  <span style={{ flexShrink: 0 }}>✅</span>
                  <span><strong>Processed entirely in your browser.</strong> Your file never leaves your device — no upload, no server, complete privacy.</span>
                </div>
              )}

              <div style={{ padding: "24px" }}>
                <ConvertTool variant={v} />
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
                <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.8", margin: 0 }}>
                  {v.longDescription}
                </p>
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
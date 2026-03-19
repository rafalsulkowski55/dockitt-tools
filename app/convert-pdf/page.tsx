import Link from "next/link";
import { getAllConvertVariants } from "@/data/convert/variants";

export const metadata = {
  title: "Convert PDF Online — Dockitt",
  description: "Convert PDF files to JPG, PNG, Word and more — free, fast, and without any sign-up.",
};

export default function ConvertPdfPage() {
  const variants = getAllConvertVariants();

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 20px" }}>

      <section style={{ marginBottom: "48px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, marginBottom: "16px" }}>
          Convert PDF Online
        </h1>
        <p style={{ fontSize: "18px", color: "#555", maxWidth: "560px", margin: 0 }}>
          Convert PDF files to images, Word documents, and more — or convert images and documents to PDF. Free, fast, and without any sign-up.
        </p>
      </section>

      <section>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "16px",
        }}>
          {variants.map((variant) => (
            <Link
              key={variant.slug}
              href={`/convert-pdf/${variant.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                padding: "24px",
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                cursor: "pointer",
              }}>
                <h2 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 8px 0", color: "#111" }}>
                  {variant.name}
                </h2>
                <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
                  {variant.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
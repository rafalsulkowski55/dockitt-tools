import Link from "next/link";
import { getAllTools } from "@/lib/tools";

export default function Home() {
  const tools = getAllTools();

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 20px" }}>

      <section style={{ marginBottom: "60px" }}>
        <h1 style={{ fontSize: "42px", fontWeight: 800, marginBottom: "16px" }}>
          Free PDF Tools Online
        </h1>
        <p style={{ fontSize: "18px", color: "#555", maxWidth: "560px", margin: 0 }}>
          Compress, merge, split and convert PDF files — free, fast, and without limits.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "24px" }}>
          All Tools
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "16px",
        }}>
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                padding: "24px",
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                cursor: "pointer",
                transition: "border-color 0.15s",
              }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 8px 0", color: "#111" }}>
                  {tool.name}
                </h3>
                <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
                  {tool.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
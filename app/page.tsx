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

      <section style={{ marginBottom: "60px" }}>
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

      <section style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "48px",
        marginBottom: "60px",
      }}>
        <h2 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "32px", textAlign: "center" }}>
          Why use Dockitt?
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "32px",
        }}>
          {[
            {
              title: "No sign-up required",
              description: "Just open the tool and use it. No account, no email, no registration.",
            },
            {
              title: "Completely free",
              description: "No subscriptions, no paywalls, no hidden limits. Free forever.",
            },
            {
              title: "No watermarks",
              description: "Your files come back clean. No branding added to your documents.",
            },
            {
              title: "Fast and lightweight",
              description: "Built to be quick. No bloated interface, no unnecessary loading.",
            },
            {
              title: "Your files stay private",
              description: "Files are deleted immediately after processing. We don't store them.",
            },
            {
              title: "Works in your browser",
              description: "No software to install. Open the tool, upload your file, done.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "#111" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6", margin: 0 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
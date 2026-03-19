import Link from "next/link";
import { getAllTools } from "@/lib/tools";

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <main>
      <h1>All Tools</h1>
      <p>Browse our free online file and document tools.</p>

      <div style={{ marginTop: 32, display: "grid", gap: 16 }}>
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            style={{
              display: "block",
              padding: "20px",
              border: "1px solid #e5e5e5",
              borderRadius: "12px",
              background: "#ffffff",
              color: "#111111",
              textDecoration: "none",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: 600, marginBottom: 8 }}>
              {tool.name}
            </div>
            <div style={{ color: "#666666" }}>{tool.shortDescription}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
import Link from "next/link";

export const metadata = {
  title: "Text & Data Tools | Dockitt",
  description: "Browser-based text and data tools. Coming soon.",
};

export default function TextToolSlugPage() {
  return (
    <main style={{ background: "#f9fafb", minHeight: "60vh" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#fff7ed", color: "#ea580c", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 12px", borderRadius: "99px", marginBottom: "20px" }}>
          Coming Soon
        </div>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#0f0f0f", marginBottom: "12px", letterSpacing: "-0.02em" }}>
          Text & Data Tools
        </h1>
        <p style={{ fontSize: "16px", color: "#6b7280", marginBottom: "32px", lineHeight: 1.6 }}>
          This text tool is coming soon. In the meantime, try our PDF tools below.
        </p>
        <Link href="/categories" style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "12px 24px", borderRadius: "8px", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}>
          ← Browse all tools
        </Link>
      </div>
    </main>
  );
}

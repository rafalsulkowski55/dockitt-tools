import Link from "next/link";

export default function PricingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "48px 16px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111", margin: "0 0 12px" }}>
            Simple, transparent pricing
          </h1>
          <p style={{ fontSize: "16px", color: "#6b7280", margin: 0 }}>
            Start . Upgrade when you need more.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>

          {/* Free */}
          <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280", marginBottom: "8px" }}>FREE</div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: "#111", marginBottom: "4px" }}>$0</div>
            <div style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "24px" }}>forever</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["1 conversion per day", "Max 10MB files", "All tools included"].map((f) => (
                <li key={f} style={{ fontSize: "14px", color: "#374151", display: "flex", gap: "8px" }}>
                  <span style={{ color: "#16a34a" }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/" style={{ display: "block", textAlign: "center", padding: "11px", background: "#f3f4f6", color: "#111", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Get started
            </Link>
          </div>

          {/* Pay-per-use */}
          <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#2563eb", marginBottom: "8px" }}>PAY-PER-USE</div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: "#111", marginBottom: "4px" }}>$0.99</div>
            <div style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "24px" }}>per 48 hours</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Unlimited conversions", "Max 50MB files", "48h access", "All tools included"].map((f) => (
                <li key={f} style={{ fontSize: "14px", color: "#374151", display: "flex", gap: "8px" }}>
                  <span style={{ color: "#16a34a" }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/login" style={{ display: "block", textAlign: "center", padding: "11px", background: "#2563eb", color: "#fff", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Get access
            </Link>
          </div>

          {/* Premium */}
          <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", boxShadow: "0 4px 20px rgba(37,99,235,0.12)", border: "2px solid #2563eb", position: "relative" }}>
            <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#2563eb", color: "#fff", borderRadius: "20px", padding: "3px 12px", fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap" }}>
              MOST POPULAR
            </div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#2563eb", marginBottom: "8px" }}>PREMIUM</div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: "#111", marginBottom: "4px" }}>$4.99</div>
            <div style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "4px" }}>per month</div>
            <div style={{ fontSize: "13px", color: "#16a34a", fontWeight: 600, marginBottom: "24px" }}>or $49.99/year — save 17%</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Unlimited conversions", "Max 100MB files", "All tools included", "Conversion history"].map((f) => (
                <li key={f} style={{ fontSize: "14px", color: "#374151", display: "flex", gap: "8px" }}>
                  <span style={{ color: "#16a34a" }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/login" style={{ display: "block", textAlign: "center", padding: "11px", background: "#2563eb", color: "#fff", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Go Premium
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
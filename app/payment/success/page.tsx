import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div style={{
      minHeight: "100vh", background: "#f9fafb",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
    }}>
      <div style={{
        background: "#fff", borderRadius: "16px", padding: "40px",
        width: "100%", maxWidth: "480px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: "0 0 8px" }}>
          Payment successful!
        </h1>
        <p style={{ fontSize: "15px", color: "#6b7280", margin: "0 0 24px", lineHeight: 1.6 }}>
          Check your email — we sent you a magic link to activate your account and access your plan.
        </p>
        <div style={{
          background: "#eff6ff", border: "1px solid #bfdbfe",
          borderRadius: "10px", padding: "16px", marginBottom: "24px",
        }}>
          <p style={{ fontSize: "13px", color: "#1d4ed8", margin: 0, lineHeight: 1.6 }}>
            Click the link in your email to sign in automatically with your new plan active.
          </p>
        </div>
        <Link
          href="/"
          style={{
            padding: "12px 24px",
            background: "#2563eb", color: "#fff", borderRadius: "8px",
            fontSize: "14px", fontWeight: 600, textDecoration: "none",
          }}
        >
          Go to Dockitt
        </Link>
      </div>
    </div>
  );
}
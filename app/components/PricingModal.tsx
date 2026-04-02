"use client";

import { useState } from "react";

interface PricingModalProps {
  onClose: () => void;
}

export default function PricingModal({ onClose }: PricingModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<"pay_per_use" | "monthly" | "yearly" | null>(null);
  const [error, setError] = useState("");

  async function handleCheckout(plan: "pay_per_use" | "monthly" | "yearly") {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setLoading(plan);

    const priceMap = {
      pay_per_use: "pay_per_use",
      monthly: "premium_monthly",
      yearly: "premium_yearly",
    };

    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan: priceMap[plan] }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(null);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(null);
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: "16px", padding: "32px",
          width: "100%", maxWidth: "520px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", margin: 0 }}>
            You've reached your daily limit
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#9ca3af", lineHeight: 1 }}
          >
            ×
          </button>
        </div>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 24px" }}>
          Unlock more conversions by choosing a plan below.
        </p>

        {/* Email input */}
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%", padding: "11px 14px", borderRadius: "8px",
            border: "1px solid #d1d5db", fontSize: "14px", outline: "none",
            boxSizing: "border-box", marginBottom: "16px",
          }}
        />

        {error && (
          <p style={{ fontSize: "13px", color: "#dc2626", margin: "-8px 0 12px" }}>{error}</p>
        )}

        {/* Plans */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

          {/* Pay-per-use */}
          <div style={{
            border: "1px solid #e5e7eb", borderRadius: "10px", padding: "16px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: "15px", color: "#111" }}>Pay-per-use</div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "2px" }}>48h access · up to 50MB · unlimited conversions</div>
            </div>
            <button
              onClick={() => handleCheckout("pay_per_use")}
              disabled={loading !== null}
              style={{
                background: "#2563eb", color: "#fff", border: "none",
                borderRadius: "8px", padding: "9px 16px", fontSize: "14px",
                fontWeight: 600, cursor: loading !== null ? "not-allowed" : "pointer",
                opacity: loading !== null ? 0.7 : 1, whiteSpace: "nowrap",
              }}
            >
              {loading === "pay_per_use" ? "..." : "$0.99"}
            </button>
          </div>

          {/* Premium Monthly */}
          <div style={{
            border: "2px solid #2563eb", borderRadius: "10px", padding: "16px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "#f8faff",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: 600, fontSize: "15px", color: "#111" }}>Premium Monthly</span>
                <span style={{ fontSize: "11px", background: "#2563eb", color: "#fff", borderRadius: "4px", padding: "2px 6px", fontWeight: 600 }}>POPULAR</span>
              </div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "2px" }}>Monthly · up to 100MB · unlimited conversions</div>
            </div>
            <button
              onClick={() => handleCheckout("monthly")}
              disabled={loading !== null}
              style={{
                background: "#2563eb", color: "#fff", border: "none",
                borderRadius: "8px", padding: "9px 16px", fontSize: "14px",
                fontWeight: 600, cursor: loading !== null ? "not-allowed" : "pointer",
                opacity: loading !== null ? 0.7 : 1, whiteSpace: "nowrap",
              }}
            >
              {loading === "monthly" ? "..." : "$4.99/mo"}
            </button>
          </div>

          {/* Premium Yearly */}
          <div style={{
            border: "1px solid #e5e7eb", borderRadius: "10px", padding: "16px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: 600, fontSize: "15px", color: "#111" }}>Premium Yearly</span>
                <span style={{ fontSize: "11px", background: "#16a34a", color: "#fff", borderRadius: "4px", padding: "2px 6px", fontWeight: 600 }}>SAVE 17%</span>
              </div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "2px" }}>Yearly · up to 100MB · unlimited conversions</div>
            </div>
            <button
              onClick={() => handleCheckout("yearly")}
              disabled={loading !== null}
              style={{
                background: "#2563eb", color: "#fff", border: "none",
                borderRadius: "8px", padding: "9px 16px", fontSize: "14px",
                fontWeight: 600, cursor: loading !== null ? "not-allowed" : "pointer",
                opacity: loading !== null ? 0.7 : 1, whiteSpace: "nowrap",
              }}
            >
              {loading === "yearly" ? "..." : "$49.99/yr"}
            </button>
          </div>

        </div>

        <p style={{ fontSize: "12px", color: "#9ca3af", margin: "16px 0 0", textAlign: "center" }}>
          After payment you'll receive a magic link to activate your account.
        </p>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("dockitt_cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("dockitt_cookie_consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("dockitt_cookie_consent", "declined");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag?.("consent", "update", { analytics_storage: "denied" });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "#fff", borderTop: "1px solid #e5e7eb",
      padding: "16px", zIndex: 999,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: "16px", flexWrap: "wrap",
      boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
    }}>
      <p style={{ fontSize: "14px", color: "#374151", margin: 0, flex: 1 }}>
        We use cookies to analyze traffic and improve your experience.{" "}
        <a href="/privacy" style={{ color: "#2563eb", textDecoration: "none" }}>Learn more</a>.
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={decline}
          style={{
            padding: "8px 16px", borderRadius: "8px", border: "1px solid #e5e7eb",
            background: "#fff", fontSize: "14px", color: "#6b7280", cursor: "pointer",
          }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          style={{
            padding: "8px 16px", borderRadius: "8px", border: "none",
            background: "#2563eb", color: "#fff", fontSize: "14px",
            fontWeight: 600, cursor: "pointer",
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { getPendingDownload, clearPendingDownload } from "@/lib/conversion-limit";

function UpsellModal({ onUpgrade, onDecline }: { onUpgrade: () => void; onDecline: () => void }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: "16px",
    }}>
      <div style={{
        background: "#fff", borderRadius: "16px", padding: "32px",
        width: "100%", maxWidth: "420px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>⚡</div>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", margin: "0 0 8px" }}>
          Upgrade to Premium
        </h2>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 24px" }}>
          You're on 48-hour access. Upgrade now for unlimited use every month.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px", textAlign: "left" }}>
          {["Unlimited conversions, always", "Up to 100MB files", "File history for 7 days", "Cancel anytime"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#374151" }}>
              <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span> {item}
            </div>
          ))}
        </div>

        <button
          onClick={onUpgrade}
          style={{
            width: "100%", padding: "13px", background: "#2563eb", color: "#fff",
            border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 600,
            cursor: "pointer", marginBottom: "10px",
          }}
        >
          Upgrade to Premium — $4.99/mo
        </button>
        <button
          onClick={onDecline}
          style={{
            width: "100%", padding: "11px", background: "none", color: "#6b7280",
            border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px",
            cursor: "pointer",
          }}
        >
          No thanks, continue with 48-hour access
        </button>
      </div>
    </div>
  );
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [tier, setTier] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      setStatus("error");
      return;
    }

    async function handleSuccess() {
      try {
        const res = await fetch(`/api/stripe/pending-session?session_id=${sessionId}`);
        const data = await res.json();

        if (!res.ok || !data.access_token) {
          setStatus("error");
          return;
        }

        const supabase = createClient();
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });

        if (sessionError) {
          setStatus("error");
          return;
        }

        const pending = getPendingDownload();
        if (pending?.storageKey) {
          await fetch("/api/files/claim", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              storageKey: pending.storageKey,
              accessToken: data.access_token,
            }),
          });
        }

        // Oblicz ścieżkę redirect
        if (pending) {
          const toolPath = pending.toolPath ?? `/tools/${pending.toolSlug}`;
          if (pending.storageKey) {
            setPendingPath(`${toolPath}?download=true&storageKey=${encodeURIComponent(pending.storageKey)}&filename=${encodeURIComponent(pending.filename)}`);
          } else {
            setPendingPath(`${toolPath}?reprocess=true`);
          }
        } else {
          setPendingPath("/account");
        }

        setTier(data.tier);
        setExpiresAt(data.pay_per_use_expires_at);
        setEmail(data.email ?? null);
        setStatus("success");

        // Pokaż upsell tylko dla pay_per_use, po 1.5s
        if (data.tier === "pay_per_use") {
          setTimeout(() => setShowUpsell(true), 1500);
        } else {
          // Premium — redirect od razu po 2s
          setTimeout(() => {
            clearPendingDownload();
            router.push(pending
              ? (pending.storageKey
                  ? `${pending.toolPath ?? `/tools/${pending.toolSlug}`}?download=true&storageKey=${encodeURIComponent(pending.storageKey)}&filename=${encodeURIComponent(pending.filename)}`
                  : `${pending.toolPath ?? `/tools/${pending.toolSlug}`}?reprocess=true`)
              : "/account"
            );
          }, 2000);
        }

      } catch {
        setStatus("error");
      }
    }

    handleSuccess();
  }, [searchParams, router]);

  function handleDecline() {
    setShowUpsell(false);
    clearPendingDownload();
    router.push(pendingPath ?? "/account");
  }

  async function handleUpgrade() {
    setShowUpsell(false);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan: "premium_monthly" }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      router.push(pendingPath ?? "/account");
    }
  }

  return (
    <>
      {showUpsell && <UpsellModal onUpgrade={handleUpgrade} onDecline={handleDecline} />}

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
          {status === "loading" && (
            <>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
              <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: "0 0 8px" }}>
                Activating your account...
              </h1>
              <p style={{ fontSize: "15px", color: "#6b7280", margin: 0 }}>
                Please wait a moment.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
              <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: "0 0 8px" }}>
                Payment successful!
              </h1>
              <p style={{ fontSize: "15px", color: "#6b7280", margin: "0 0 16px" }}>
                {tier === "pay_per_use" && expiresAt
                  ? `Your 48-hour access is active until ${new Date(expiresAt).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}.`
                  : "Your Premium plan is now active."}
              </p>
              <div style={{
                background: "#eff6ff", border: "1px solid #bfdbfe",
                borderRadius: "10px", padding: "16px",
              }}>
                <p style={{ fontSize: "13px", color: "#1d4ed8", margin: 0 }}>
                  {tier === "pay_per_use"
                    ? "One moment — we have a special offer for you..."
                    : "Check your email for your account details. Redirecting you now..."}
                </p>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
              <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: "0 0 8px" }}>
                Something went wrong
              </h1>
              <p style={{ fontSize: "15px", color: "#6b7280", margin: "0 0 24px" }}>
                Your payment was successful. Check your email for your account details.
              </p>
              <a href="/" style={{
                display: "inline-block", padding: "12px 24px",
                background: "#2563eb", color: "#fff", borderRadius: "8px",
                fontSize: "14px", fontWeight: 600, textDecoration: "none",
              }}>
                Go to Dockitt
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#6b7280" }}>Loading...</p>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
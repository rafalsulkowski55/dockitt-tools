"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { getPendingDownload, clearPendingDownload } from "@/lib/conversion-limit";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [tier, setTier] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      setStatus("error");
      return;
    }

    async function handleSuccess() {
      try {
        // Pobierz tokeny bezpośrednio z pending_sessions
        const res = await fetch(`/api/stripe/pending-session?session_id=${sessionId}`);
        const data = await res.json();

        if (!res.ok || !data.access_token) {
          console.error("pending-session error:", data);
          setStatus("error");
          return;
        }

        // Zaloguj usera przez tokeny
        const supabase = createClient();
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });

        if (sessionError) {
          console.error("setSession error:", sessionError);
          setStatus("error");
          return;
        }

        setTier(data.tier);
        setExpiresAt(data.pay_per_use_expires_at);
        setStatus("success");

        // Sprawdź pending download i zrób redirect
        setTimeout(() => {
          const pending = getPendingDownload();
          if (pending) {
            clearPendingDownload();
            const toolPath = pending.toolPath ?? `/tools/${pending.toolSlug}`;
            if (pending.storageKey) {
              router.push(`${toolPath}?download=true&storageKey=${encodeURIComponent(pending.storageKey)}&filename=${encodeURIComponent(pending.filename)}`);
            } else {
              router.push(`${toolPath}?reprocess=true`);
            }
          } else {
            router.push("/account");
          }
        }, 2000);

      } catch (err) {
        console.error("handleSuccess error:", err);
        setStatus("error");
      }
    }

    handleSuccess();
  }, [searchParams, router]);

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
              borderRadius: "10px", padding: "16px", marginBottom: "24px",
            }}>
              <p style={{ fontSize: "13px", color: "#1d4ed8", margin: 0 }}>
                Check your email for your account details. Redirecting you now...
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
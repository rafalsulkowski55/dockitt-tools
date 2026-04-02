"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      setStatus("error");
      return;
    }

    async function handleSuccess() {
      try {
        // Pobierz email z session_id przez nasz API
        const res = await fetch(`/api/stripe/session?session_id=${sessionId}`);
        const data = await res.json();

        if (!res.ok || !data.email) {
          setStatus("error");
          return;
        }

        // Wyślij magic link i automatycznie zaloguj
        const supabase = createClient();
        await supabase.auth.signInWithOtp({
          email: data.email,
          options: {
            emailRedirectTo: "https://www.dockitt.com/auth/callback",
          },
        });

        setStatus("success");

        // Po 3 sekundach redirect na stronę główną lub tool
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch {
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
              Check your email — we sent you a link to access your files anytime.
            </p>
            <div style={{
              background: "#eff6ff", border: "1px solid #bfdbfe",
              borderRadius: "10px", padding: "16px", marginBottom: "24px",
            }}>
              <p style={{ fontSize: "13px", color: "#1d4ed8", margin: 0 }}>
                You'll be redirected automatically in a moment...
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
              Your payment was successful. Check your email for a sign-in link.
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
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#6b7280" }}>Loading...</p>
    </div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
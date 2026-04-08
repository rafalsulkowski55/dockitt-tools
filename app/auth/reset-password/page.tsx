"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState<"request" | "set-new">("request");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const supabase = createClient();

  useEffect(() => {
    // Jeśli user wrócił z linku resetującego, Supabase ustawia sesję automatycznie
    // Wykrywamy to po hash fragmentcie w URL (#access_token=...)
    const hash = window.location.hash;
    if (hash.includes("access_token") && hash.includes("type=recovery")) {
      setMode("set-new");
    }
  }, []);

  async function handleRequest() {
    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }
    setStatus("loading");
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://dockitt.com/auth/reset-password",
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("done");
      setMessage("Check your email — we sent you a password reset link.");
    }
  }

  async function handleSetNew() {
    if (!password.trim() || !confirmPassword.trim()) {
      setStatus("error");
      setMessage("Please fill in both fields.");
      return;
    }
    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      setStatus("error");
      setMessage("Password must be at least 8 characters.");
      return;
    }
    setStatus("loading");
    setMessage("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("done");
      setMessage("Password updated successfully! Redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "400px", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>

        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: "0 0 8px" }}>
          {mode === "request" ? "Reset your password" : "Set new password"}
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 24px" }}>
          {mode === "request"
            ? "Enter your email and we'll send you a reset link."
            : "Enter your new password below."}
        </p>

        {status === "done" ? (
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "20px", textAlign: "center" }}>
            <p style={{ fontSize: "15px", fontWeight: 600, color: "#1d4ed8", margin: "0 0 6px" }}>
              {mode === "request" ? "Check your inbox!" : "Password updated!"}
            </p>
            <p style={{ fontSize: "13px", color: "#3b82f6", margin: 0 }}>{message}</p>
          </div>
        ) : mode === "request" ? (
          <>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRequest()}
              style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", boxSizing: "border-box", marginBottom: "12px" }}
            />
            <button
              onClick={handleRequest}
              disabled={status === "loading"}
              style={{ width: "100%", padding: "12px", background: status === "loading" ? "#d1d5db" : "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: status === "loading" ? "not-allowed" : "pointer" }}
            >
              {status === "loading" ? "Sending..." : "Send reset link"}
            </button>
            {status === "error" && (
              <p style={{ fontSize: "13px", color: "#dc2626", margin: "12px 0 0" }}>{message}</p>
            )}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <a href="/login" style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none" }}>
                ← Back to sign in
              </a>
            </div>
          </>
        ) : (
          <>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", boxSizing: "border-box", marginBottom: "10px" }}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSetNew()}
              style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", boxSizing: "border-box", marginBottom: "12px" }}
            />
            <button
              onClick={handleSetNew}
              disabled={status === "loading"}
              style={{ width: "100%", padding: "12px", background: status === "loading" ? "#d1d5db" : "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: status === "loading" ? "not-allowed" : "pointer" }}
            >
              {status === "loading" ? "Saving..." : "Set new password"}
            </button>
            {status === "error" && (
              <p style={{ fontSize: "13px", color: "#dc2626", margin: "12px 0 0" }}>{message}</p>
            )}
          </>
        )}

      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const supabase = createClient();

  async function handleSignIn() {
    if (!email.trim() || !password.trim()) {
      setStatus("error");
      setMessage("Please enter your email and password.");
      return;
    }
    setStatus("loading");
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setMessage("Invalid email or password.");
    } else {
      window.location.href = "/";
    }
  }

  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "https://dockitt.com/auth/callback" },
    });
    if (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "400px", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>

        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: "0 0 8px" }}>
          Sign in to Dockitt
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 16px" }}>
          Welcome back — sign in to your account.
        </p>

        <div style={{ background: "#f8faff", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "14px 16px", marginBottom: "24px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#1d4ed8", margin: "0 0 8px" }}>With an account you get:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {["Access your converted files anytime", "File history for 7 days (Premium)", "Manage your subscription"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#374151" }}>
                <span style={{ color: "#2563eb", fontWeight: 700 }}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleGoogle}
          style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "20px" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
        </div>

        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
          style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", boxSizing: "border-box", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
          style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
        />

        <div style={{ textAlign: "right", marginTop: "8px", marginBottom: "16px" }}>
          <a href="/auth/reset-password" style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none" }}>
            Forgot password?
          </a>
        </div>

        <button
          onClick={handleSignIn}
          disabled={status === "loading"}
          style={{ width: "100%", padding: "12px", background: status === "loading" ? "#d1d5db" : "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: status === "loading" ? "not-allowed" : "pointer" }}
        >
          {status === "loading" ? "Signing in..." : "Sign in"}
        </button>

        {status === "error" && (
          <p style={{ fontSize: "13px", color: "#dc2626", margin: "12px 0 0" }}>{message}</p>
        )}

      </div>
    </div>
  );
}
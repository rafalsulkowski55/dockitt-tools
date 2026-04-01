"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const supabase = createClient();

  async function handleEmailAuth() {
    setStatus("loading");
    setMessage("");

    if (mode === "signup") {
      if (!name.trim()) {
        setStatus("error");
        setMessage("Please enter your name.");
        return;
      }
      if (password !== confirmPassword) {
        setStatus("error");
        setMessage("Passwords do not match.");
        return;
      }
      if (password.length < 8) {
        setStatus("error");
        setMessage("Password must be at least 8 characters.");
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: "https://dockitt.com/auth/callback",
        },
      });

      if (error) {
        setStatus("error");
        setMessage(error.message);
      } else {
        setStatus("done");
        setMessage("Check your email to confirm your account.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setStatus("error");
        setMessage(error.message);
      } else {
        window.location.href = "/";
      }
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
          {mode === "login" ? "Sign in to Dockitt" : "Create your account"}
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 24px" }}>
          {mode === "login" ? "Welcome back." : "Free to get started."}
        </p>

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

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }}
          />
          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }}
            />
          )}
        </div>

        <button
          onClick={handleEmailAuth}
          disabled={status === "loading"}
          style={{ width: "100%", padding: "12px", background: status === "loading" ? "#d1d5db" : "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: status === "loading" ? "not-allowed" : "pointer", marginTop: "16px" }}
        >
          {status === "loading" ? "Loading..." : mode === "login" ? "Sign in" : "Create account"}
        </button>

        {status === "error" && (
          <p style={{ fontSize: "13px", color: "#dc2626", margin: "12px 0 0" }}>{message}</p>
        )}
        {status === "done" && (
          <p style={{ fontSize: "13px", color: "#16a34a", margin: "12px 0 0" }}>{message}</p>
        )}

        <p style={{ fontSize: "13px", color: "#6b7280", margin: "20px 0 0", textAlign: "center" }}>
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setStatus("idle"); setMessage(""); }}
            style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontWeight: 500, fontSize: "13px" }}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>

      </div>
    </div>
  );
}
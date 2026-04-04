"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    if (!password || password.length < 8) {
      setStatus("error");
      setMessage("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("success");
      setMessage("Password changed successfully!");
      setTimeout(() => router.push("/account"), 2000);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "400px", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: "0 0 24px" }}>Change password</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }}
          />
          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            style={{ padding: "12px", background: status === "loading" ? "#d1d5db" : "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: status === "loading" ? "not-allowed" : "pointer" }}
          >
            {status === "loading" ? "Saving..." : "Save new password"}
          </button>
        </div>

        {status === "error" && <p style={{ fontSize: "13px", color: "#dc2626", margin: "12px 0 0" }}>{message}</p>}
        {status === "success" && <p style={{ fontSize: "13px", color: "#16a34a", margin: "12px 0 0" }}>{message}</p>}

        <button onClick={() => router.push("/account")} style={{ background: "none", border: "none", color: "#6b7280", fontSize: "13px", cursor: "pointer", marginTop: "16px", padding: 0 }}>
          ← Back to My Account
        </button>
      </div>
    </div>
  );
}
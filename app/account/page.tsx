"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import pool from "@/lib/db";

interface Profile {
  tier: "free" | "pay_per_use" | "premium";
  pay_per_use_expires_at: string | null;
  stripe_customer_id: string | null;
}

interface HistoryItem {
  tool_slug: string;
  original_filename: string;
  created_at: string;
  storage_key: string;
  expires_at: string | null;
  deleted_at: string | null;
}

export default function AccountPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadAccount() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setEmail(session.user.email ?? null);

      // Pobierz profil
      const { data: profileData } = await supabase
        .from("profiles")
        .select("tier, pay_per_use_expires_at, stripe_customer_id")
        .eq("id", session.user.id)
        .single();

      if (profileData) setProfile(profileData);

      // Pobierz historię przez API
      const res = await fetch("/api/account/history", {
        headers: { "Authorization": `Bearer ${session.access_token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history ?? []);
      }

      setLoading(false);
    }

    loadAccount();
  }, [router]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#6b7280", fontSize: "15px" }}>Loading...</p>
      </div>
    );
  }

  if (!profile) return null;

  const tierLabel = { free: "Free", pay_per_use: "Pay-per-use", premium: "Premium" }[profile.tier];
  const tierColor = { free: "#6b7280", pay_per_use: "#2563eb", premium: "#16a34a" }[profile.tier];

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "32px 16px" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: 0 }}>My Account</h1>
          <button onClick={handleSignOut} style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 16px", fontSize: "14px", color: "#6b7280", cursor: "pointer" }}>
            Sign out
          </button>
        </div>

        {/* Plan */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#2563eb", marginBottom: "12px" }}>Current Plan</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: tierColor }}>{tierLabel}</div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>{email}</div>
              {profile.tier === "pay_per_use" && profile.pay_per_use_expires_at && (
                <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
                  Expires: {new Date(profile.pay_per_use_expires_at).toLocaleString()}
                </div>
              )}
            </div>
            {profile.tier === "premium" && profile.stripe_customer_id && (
              <button
                onClick={async () => {
                  const res = await fetch("/api/stripe/portal", { method: "POST" });
                  const data = await res.json();
                  if (data.url) window.location.href = data.url;
                }}
                style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 18px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
              >
                Manage subscription
              </button>
            )}
            {profile.tier === "free" && (
              <Link href="/pricing" style={{ background: "#2563eb", color: "#fff", borderRadius: "8px", padding: "10px 18px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
                Upgrade
              </Link>
            )}
          </div>
        </div>

        {/* Historia */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#2563eb", marginBottom: "16px" }}>Recent Conversions</div>
          {history.length === 0 ? (
            <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0 }}>No conversions yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {history.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < history.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "#111" }}>{item.original_filename}</div>
                    <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>{item.tool_slug}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ fontSize: "12px", color: "#9ca3af" }}>{new Date(item.created_at).toLocaleDateString()}</div>
                    {item.storage_key && item.expires_at && new Date(item.expires_at) > new Date() && (
                      <button
                        onClick={async () => {
                          const res = await fetch(`/api/files/download?storageKey=${encodeURIComponent(item.storage_key)}`);
                          const data = await res.json();
                          if (data.error === "FILE_EXPIRED") {
                            alert("This file has expired.");
                            return;
                          }
                          if (data.downloadUrl) {
                            const a = document.createElement("a");
                            a.href = data.downloadUrl;
                            a.download = item.original_filename;
                            a.click();
                          }
                        }}
                        style={{ padding: "6px 12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                      >
                        ⬇ Download
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div id="settings" style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#2563eb", marginBottom: "16px" }}>Account Settings</div>
          <div style={{ fontSize: "14px", color: "#374151", marginBottom: "8px" }}>Email: {email}</div>
          <Link href="/account/change-password" style={{ fontSize: "14px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>
            Change password →
          </Link>
        </div>

      </div>
    </div>
  );
}
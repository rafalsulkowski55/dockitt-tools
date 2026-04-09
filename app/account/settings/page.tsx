"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

interface Profile {
  tier: "free" | "pay_per_use" | "premium";
  pay_per_use_expires_at: string | null;
  stripe_customer_id: string | null;
}

export default function AccountSettingsPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setEmail(session.user.email ?? null);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("tier, pay_per_use_expires_at, stripe_customer_id")
        .eq("id", session.user.id)
        .single();

      if (profileData) setProfile(profileData);

      setLoading(false);
    }

    load();
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

        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: 0 }}>Account Settings</h1>

        {/* Plan */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#2563eb", marginBottom: "12px" }}>Current Plan</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: tierColor }}>{tierLabel}</div>
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
            {profile.tier === "pay_per_use" && (
              <Link href="/pricing" style={{ background: "#2563eb", color: "#fff", borderRadius: "8px", padding: "10px 18px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
                Upgrade to Premium
              </Link>
            )}
          </div>
        </div>

        {/* Account */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#2563eb", marginBottom: "16px" }}>Account</div>
          <div style={{ fontSize: "14px", color: "#374151", marginBottom: "12px" }}>Email: <strong>{email}</strong></div>
          <Link href="/account/change-password" style={{ fontSize: "14px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>
            Change password →
          </Link>
        </div>

        {/* Legal */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#2563eb", marginBottom: "16px" }}>Legal</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link href="/privacy-policy" style={{ fontSize: "14px", color: "#2563eb", textDecoration: "none" }}>Privacy Policy →</Link>
            <Link href="/terms" style={{ fontSize: "14px", color: "#2563eb", textDecoration: "none" }}>Terms & Conditions →</Link>
            <a href="mailto:hello@dockitt.com" style={{ fontSize: "14px", color: "#2563eb", textDecoration: "none" }}>Contact us →</a>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "12px", fontSize: "14px", color: "#dc2626", cursor: "pointer" }}
        >
          Sign out
        </button>

      </div>
    </div>
  );
}
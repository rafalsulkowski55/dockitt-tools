"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setEmail(session?.user?.email ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header style={{
      borderBottom: "1px solid #e5e7eb",
      background: "#ffffff",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        padding: "0 16px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <Image src="/favicon.svg" alt="Dockitt" width={28} height={28} />
          <span style={{ fontWeight: 800, fontSize: "18px", color: "#111" }}>Dockitt</span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: "24px", alignItems: "center" }} className="desktop-nav">
          <Link href="/" style={{ fontSize: "14px", color: "#444", textDecoration: "none" }}>Home</Link>
          <Link href="/convert-pdf" style={{ fontSize: "14px", color: "#444", textDecoration: "none" }}>Convert PDF</Link>
          <Link href="/categories" style={{ fontSize: "14px", color: "#444", textDecoration: "none" }}>All Tools</Link>
          <Link href="/guides" style={{ fontSize: "14px", color: "#444", textDecoration: "none" }}>Guides</Link>

          {email ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  background: "#f3f4f6", border: "none", borderRadius: "8px",
                  padding: "7px 14px", fontSize: "14px", color: "#111",
                  cursor: "pointer", fontWeight: 500,
                }}
              >
                My Account ▾
              </button>
              {dropdownOpen && (
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 8px)",
                  background: "#fff", border: "1px solid #e5e7eb",
                  borderRadius: "10px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  minWidth: "180px", overflow: "hidden",
                }}>
                  <Link
                    href="/account"
                    onClick={() => setDropdownOpen(false)}
                    style={{ display: "block", padding: "12px 16px", fontSize: "14px", color: "#111", textDecoration: "none" }}
                  >
                    My Files
                  </Link>
                  <Link
                    href="/account/settings"
                    onClick={() => setDropdownOpen(false)}
                    style={{ display: "block", padding: "12px 16px", fontSize: "14px", color: "#111", textDecoration: "none", borderTop: "1px solid #f3f4f6" }}
                  >
                    Account Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    style={{ width: "100%", textAlign: "left", padding: "12px 16px", fontSize: "14px", color: "#dc2626", background: "none", border: "none", cursor: "pointer", borderTop: "1px solid #f3f4f6" }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              style={{
                fontSize: "14px", fontWeight: 600, color: "#fff",
                background: "#2563eb", borderRadius: "8px",
                padding: "7px 16px", textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          )}
        </nav>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            flexDirection: "column",
            gap: "5px",
          }}
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", width: "22px", height: "2px", background: "#111", borderRadius: "2px" }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: "#111", borderRadius: "2px" }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: "#111", borderRadius: "2px" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav style={{
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          borderTop: "1px solid #e5e7eb",
          padding: "8px 0",
        }} className="mobile-nav">
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ padding: "12px 16px", fontSize: "15px", color: "#111", textDecoration: "none" }}>Home</Link>
          <Link href="/convert-pdf" onClick={() => setMenuOpen(false)} style={{ padding: "12px 16px", fontSize: "15px", color: "#111", textDecoration: "none" }}>Convert PDF</Link>
          <Link href="/categories" onClick={() => setMenuOpen(false)} style={{ padding: "12px 16px", fontSize: "15px", color: "#111", textDecoration: "none" }}>All Tools</Link>
          <Link href="/guides" onClick={() => setMenuOpen(false)} style={{ padding: "12px 16px", fontSize: "15px", color: "#111", textDecoration: "none" }}>Guides</Link>
          {email ? (
            <>
              <Link href="/account" onClick={() => setMenuOpen(false)} style={{ padding: "12px 16px", fontSize: "15px", color: "#111", textDecoration: "none" }}>My Files</Link>
              <Link href="/account/settings" onClick={() => setMenuOpen(false)} style={{ padding: "12px 16px", fontSize: "15px", color: "#111", textDecoration: "none" }}>Account Settings</Link>
              <button onClick={handleSignOut} style={{ textAlign: "left", padding: "12px 16px", fontSize: "15px", color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}>Sign out</button>
            </>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} style={{ padding: "12px 16px", fontSize: "15px", color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
          )}
        </nav>
      )}
    </header>
  );
}
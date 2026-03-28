"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <nav style={{ display: "flex", gap: "24px" }} className="desktop-nav">
          <Link href="/" style={{ fontSize: "14px", color: "#444", textDecoration: "none" }}>Home</Link>
          <Link href="/convert-pdf" style={{ fontSize: "14px", color: "#444", textDecoration: "none" }}>Convert PDF</Link>
          <Link href="/categories" style={{ fontSize: "14px", color: "#444", textDecoration: "none" }}>All Tools</Link>
          <Link href="/guides" style={{ fontSize: "14px", color: "#444", textDecoration: "none" }}>Guides</Link>
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
        </nav>
      )}
    </header>
  );
}
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const DROPDOWN_PANEL: React.CSSProperties = {
  position: "absolute",
  top: "calc(100% + 6px)",
  left: 0,
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.09)",
  padding: "6px",
  minWidth: "180px",
  zIndex: 200,
};

const DROPDOWN_LINK: React.CSSProperties = {
  display: "block",
  padding: "8px 12px",
  fontSize: "13px",
  color: "#374151",
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: 500,
  whiteSpace: "nowrap",
};

const DIVIDER: React.CSSProperties = {
  height: "1px",
  background: "#e5e7eb",
  margin: "4px 0",
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const toolsTimer = useRef<NodeJS.Timeout | null>(null);

  const close = () => setMenuOpen(false);

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

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <Image src="/favicon.svg" alt="Dockitt" width={28} height={28} />
          <span style={{ fontWeight: 800, fontSize: "18px", color: "#111" }}>Dockitt</span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: "2px", alignItems: "center" }} className="desktop-nav">

          <Link href="/" style={{ fontSize: "14px", color: "#444", textDecoration: "none", padding: "6px 10px", borderRadius: "6px" }}>
            Home
          </Link>

          <Link href="/convert" style={{ fontSize: "14px", color: "#444", textDecoration: "none", padding: "6px 10px", borderRadius: "6px" }}>
            Convert
          </Link>

          {/* Tools dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => { if (toolsTimer.current) clearTimeout(toolsTimer.current); setToolsOpen(true); }}
            onMouseLeave={() => { toolsTimer.current = setTimeout(() => setToolsOpen(false), 150); }}
          >
            <button style={{
              fontSize: "14px", color: "#444", background: "none", border: "none",
              cursor: "pointer", padding: "6px 10px", borderRadius: "6px",
              display: "flex", alignItems: "center", gap: "5px",
            }}>
              Tools <span style={{ fontSize: "9px", opacity: 0.6 }}>▾</span>
            </button>
            {toolsOpen && (
              <div
                style={DROPDOWN_PANEL}
                onMouseEnter={() => { if (toolsTimer.current) clearTimeout(toolsTimer.current); }}
                onMouseLeave={() => { toolsTimer.current = setTimeout(() => setToolsOpen(false), 150); }}
              >
                <Link href="/categories/pdf" style={DROPDOWN_LINK} onClick={() => setToolsOpen(false)}>PDF Tools</Link>
                <div style={DIVIDER} />
                <Link href="/edit-image" style={DROPDOWN_LINK} onClick={() => setToolsOpen(false)}>Image Edit</Link>
                <Link href="/text-tools" style={DROPDOWN_LINK} onClick={() => setToolsOpen(false)}>Text & Data</Link>
                <Link href="/dev-tools" style={DROPDOWN_LINK} onClick={() => setToolsOpen(false)}>Developer Tools</Link>
                <Link href="/file-tools" style={DROPDOWN_LINK} onClick={() => setToolsOpen(false)}>File Utilities</Link>
              </div>
            )}
          </div>

          <Link href="/categories" style={{ fontSize: "14px", color: "#444", textDecoration: "none", padding: "6px 10px", borderRadius: "6px" }}>
            All Tools
          </Link>

        </nav>

        {/* Hamburger */}
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

          <Link href="/" onClick={close} style={{ padding: "12px 16px", fontSize: "15px", color: "#111", textDecoration: "none" }}>Home</Link>
          <Link href="/convert" onClick={close} style={{ padding: "12px 16px", fontSize: "15px", color: "#111", textDecoration: "none" }}>Convert</Link>

          {/* Mobile Tools */}
          <button
            onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
            style={{ padding: "12px 16px", fontSize: "15px", color: "#111", background: "none", border: "none", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            Tools <span style={{ fontSize: "10px", opacity: 0.55 }}>{mobileToolsOpen ? "▴" : "▾"}</span>
          </button>
          {mobileToolsOpen && (
            <div style={{ background: "#f9fafb", borderTop: "1px solid #f3f4f6", borderBottom: "1px solid #f3f4f6" }}>
              <Link href="/categories/pdf" onClick={close} style={{ padding: "10px 28px", fontSize: "13px", color: "#444", textDecoration: "none", display: "block" }}>PDF Tools</Link>
              <Link href="/edit-image" onClick={close} style={{ padding: "10px 28px", fontSize: "13px", color: "#444", textDecoration: "none", display: "block" }}>Image Edit</Link>
              <Link href="/text-tools" onClick={close} style={{ padding: "10px 28px", fontSize: "13px", color: "#444", textDecoration: "none", display: "block" }}>Text & Data</Link>
              <Link href="/dev-tools" onClick={close} style={{ padding: "10px 28px", fontSize: "13px", color: "#444", textDecoration: "none", display: "block" }}>Developer Tools</Link>
              <Link href="/file-tools" onClick={close} style={{ padding: "10px 28px", fontSize: "13px", color: "#444", textDecoration: "none", display: "block" }}>File Utilities</Link>
            </div>
          )}

          <Link href="/categories" onClick={close} style={{ padding: "12px 16px", fontSize: "15px", color: "#111", textDecoration: "none" }}>All Tools</Link>

        </nav>
      )}
    </header>
  );
}

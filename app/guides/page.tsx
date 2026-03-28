"use client";

import { getAllGuides } from "@/data/guides/index";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function GuidesPage() {
  const guides = getAllGuides();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return guides;
    const q = query.toLowerCase();
    return guides.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q)
    );
  }, [query, guides]);

  return (
    <main style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>
            Guides
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "8px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
            PDF Guides
          </h1>
          <p style={{ fontSize: "15px", color: "#4b5563", margin: 0, lineHeight: 1.6 }}>
            Step-by-step guides for the most common PDF tasks — no software required.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "28px" }}>
          <span style={{
            position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
            fontSize: "16px", pointerEvents: "none",
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%", padding: "11px 16px 11px 40px",
              border: "1px solid #e5e7eb", borderRadius: "8px",
              fontSize: "14px", background: "#fff",
              outline: "none", boxSizing: "border-box",
              color: "#111",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer",
                fontSize: "16px", color: "#9ca3af", padding: "0",
              }}
            >✕</button>
          )}
        </div>

        {/* Results count */}
        {query && (
          <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "16px" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{query}&quot;
          </p>
        )}

        {/* Guides list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filtered.length > 0 ? filtered.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "18px 20px",
                display: "flex", alignItems: "flex-start", gap: "14px",
              }}>
                <span style={{ fontSize: "20px", flexShrink: 0, marginTop: "2px" }}>📄</span>
                <div>
                  <p style={{ fontWeight: 600, color: "#111", margin: "0 0 4px", fontSize: "15px" }}>
                    {guide.title}
                  </p>
                  <p style={{ color: "#6b7280", margin: 0, fontSize: "13px", lineHeight: 1.5 }}>
                    {guide.description}
                  </p>
                </div>
                <span style={{ marginLeft: "auto", color: "#2563eb", flexShrink: 0, fontSize: "16px", paddingLeft: "8px" }}>→</span>
              </div>
            </Link>
          )) : (
            <div style={{ textAlign: "center", padding: "48px 24px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px" }}>
              <p style={{ fontSize: "24px", marginBottom: "8px" }}>🔍</p>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#111", marginBottom: "4px" }}>No guides found</p>
              <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>Try a different search term</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
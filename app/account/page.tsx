"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

interface HistoryItem {
  tool_slug: string;
  original_filename: string;
  created_at: string;
  storage_key: string;
  expires_at: string | null;
  deleted_at: string | null;
}

export default function MyFilesPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
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

      const res = await fetch("/api/account/history", {
        headers: { "Authorization": `Bearer ${session.access_token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history ?? []);
      }

      setLoading(false);
    }

    load();
  }, [router]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#6b7280", fontSize: "15px" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "32px 16px" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>

        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: 0 }}>My Files</h1>

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

      </div>
    </div>
  );
}
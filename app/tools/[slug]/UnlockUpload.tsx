"use client";

import { useState } from "react";

export default function UnlockUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setStatus("idle");
    setErrorMessage("");
  }

  async function handleProcess() {
    if (!file) return;
    setStatus("processing");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("password", password);

      const res = await fetch("/api/unlock-pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Unknown error");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `unlocked-${file.name}`;
      a.click();
      setStatus("done");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMessage(message);
      setStatus("error");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <label
          htmlFor="unlock-upload"
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            padding: "12px 18px", background: "#111111", color: "#ffffff",
            borderRadius: "10px", fontWeight: 600, cursor: "pointer",
          }}
        >
          Choose PDF
        </label>
        <span style={{ color: "#666666", fontSize: "15px" }}>
          {file ? file.name : "No file selected"}
        </span>
        <input
          id="unlock-upload"
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {file && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "14px", color: "#444" }}>
            Password (leave empty if not password-protected):
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{
              padding: "10px 14px", border: "1px solid #d1d5db",
              borderRadius: "8px", fontSize: "14px", width: "240px",
            }}
          />
        </div>
      )}

      <button
        disabled={!file || status === "processing"}
        onClick={handleProcess}
        style={{
          padding: "12px 18px",
          background: file && status !== "processing" ? "#2563eb" : "#d1d5db",
          color: "#ffffff", border: "none", borderRadius: "10px",
          fontWeight: 600,
          cursor: file && status !== "processing" ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        {status === "processing" ? "Processing..." : "Unlock PDF"}
      </button>

      {status === "error" && (
        <div style={{
          padding: "14px 16px", background: "#fef2f2", color: "#dc2626",
          border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px",
        }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {status === "done" && (
        <div style={{
          padding: "14px 16px", background: "#eff6ff", color: "#1d4ed8",
          border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px",
        }}>
          Done. Your unlocked PDF has been downloaded.
        </div>
      )}

    </div>
  );
}
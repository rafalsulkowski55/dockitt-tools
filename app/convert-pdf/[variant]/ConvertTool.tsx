"use client";

import { useState } from "react";
import { ConvertVariant } from "@/data/convert/variants";

type Props = {
  variant: ConvertVariant;
};

export default function ConvertTool({ variant }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    setFiles(selected);
    setStatus("idle");
    setErrorMessage("");
    e.target.value = "";
  }

  async function handleConvert() {
    if (files.length === 0) return;
    setStatus("processing");
    setErrorMessage("");

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("variant", variant.slug);

      const res = await fetch("/api/convert-pdf", {
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
      a.download = `converted.${variant.outputFormat}`;
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
          htmlFor="convert-upload"
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            padding: "12px 18px", background: "#111111", color: "#ffffff",
            borderRadius: "10px", fontWeight: 600, cursor: "pointer",
          }}
        >
          {variant.inputLabel}
        </label>
        <span style={{ color: "#666666", fontSize: "15px" }}>
          {files.length === 0 ? "No file selected" : files.map((f) => f.name).join(", ")}
        </span>
        <input
          id="convert-upload"
          type="file"
          accept={variant.accept}
          multiple={variant.inputFormat !== "pdf" || variant.outputFormat === "pdf"}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      <button
        disabled={files.length === 0 || status === "processing"}
        onClick={handleConvert}
        style={{
          padding: "12px 18px",
          background: files.length > 0 && status !== "processing" ? "#2563eb" : "#d1d5db",
          color: "#ffffff", border: "none", borderRadius: "10px",
          fontWeight: 600,
          cursor: files.length > 0 && status !== "processing" ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        {status === "processing" ? "Converting..." : `Convert to ${variant.outputFormat.toUpperCase()}`}
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
          Conversion complete. Your file has been downloaded.
        </div>
      )}

    </div>
  );
}
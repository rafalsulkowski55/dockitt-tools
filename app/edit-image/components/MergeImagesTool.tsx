"use client";

import { useState, useRef, useEffect } from "react";
import type { EditImageTool } from "@/data/edit-image/tools";
import { ToolTracking } from "@/lib/analytics";

const PROCESSING_TYPE = "browser" as const;
const MAX_FILE_SIZE = 50 * 1024 * 1024;

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function FileSlot({ label, file, onSelect, onClear, accept }: {
  label: string;
  file: File | null;
  onSelect: (f: File) => void;
  onClear: () => void;
  accept: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div style={{ flex: 1 }}>
      <input ref={ref} type="file" accept={accept} style={{ display: "none" }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onSelect(f); e.target.value = ""; }} />
      <div style={{ border: "2px dashed #bfdbfe", borderRadius: "10px", padding: "14px", background: "#f8faff", minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {file ? (
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "32px", height: "42px", borderRadius: "4px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "9px", fontWeight: 700, color: "#2563eb" }}>IMG</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#111", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
              <button onClick={() => ref.current?.click()} style={{ fontSize: "10px", color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Change</button>
            </div>
            <button onClick={onClear} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "5px", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "#6b7280", fontSize: "11px" }}>✕</button>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>{label}</div>
            <button onClick={() => ref.current?.click()} style={{ padding: "7px 14px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "7px", fontWeight: 600, cursor: "pointer", fontSize: "12px" }}>
              Choose Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MergeImagesTool({ tool }: { tool: EditImageTool }) {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal");

  useEffect(() => { ToolTracking.viewTool(tool.slug, PROCESSING_TYPE); }, [tool.slug]);

  function handleSelectFile1(f: File) {
    if (f.size > MAX_FILE_SIZE) { setErrorMessage("First image too large (max 50MB)."); setStatus("error"); return; }
    setFile1(f); setStatus("idle"); setErrorMessage(""); setDownloadUrl(null);
    ToolTracking.uploadStarted(tool.slug, PROCESSING_TYPE);
  }

  function handleSelectFile2(f: File) {
    if (f.size > MAX_FILE_SIZE) { setErrorMessage("Second image too large (max 50MB)."); setStatus("error"); return; }
    setFile2(f); setStatus("idle"); setErrorMessage(""); setDownloadUrl(null);
  }

  function handleReset() {
    setFile1(null); setFile2(null); setStatus("idle"); setErrorMessage(""); setDownloadUrl(null);
  }

  function loadImage(f: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(f);
      const i = new Image();
      i.onload = () => { URL.revokeObjectURL(url); resolve(i); };
      i.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load image")); };
      i.src = url;
    });
  }

  async function handleProcess() {
    if (!file1 || !file2) { setErrorMessage("Please select both images."); setStatus("error"); return; }
    ToolTracking.processStarted(tool.slug, PROCESSING_TYPE);
    setStatus("processing"); setErrorMessage(""); setDownloadUrl(null);
    try {
      const [img1, img2] = await Promise.all([loadImage(file1), loadImage(file2)]);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      if (layout === "horizontal") {
        canvas.width = img1.naturalWidth + img2.naturalWidth;
        canvas.height = Math.max(img1.naturalHeight, img2.naturalHeight);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img1, 0, 0);
        ctx.drawImage(img2, img1.naturalWidth, 0);
      } else {
        canvas.width = Math.max(img1.naturalWidth, img2.naturalWidth);
        canvas.height = img1.naturalHeight + img2.naturalHeight;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img1, 0, 0);
        ctx.drawImage(img2, 0, img1.naturalHeight);
      }
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => { if (!b) { reject(new Error("toBlob failed")); return; } resolve(b); }, "image/png");
      });
      setDownloadUrl(URL.createObjectURL(blob));
      setStatus("done");
      ToolTracking.processSuccess(tool.slug, PROCESSING_TYPE);
    } catch {
      setErrorMessage("Merge failed. Please try different images.");
      setStatus("error");
    }
  }

  function handleDownload() {
    if (!downloadUrl) return;
    ToolTracking.downloadClicked(tool.slug, PROCESSING_TYPE);
    const a = document.createElement("a"); a.href = downloadUrl; a.download = "merged-image.png"; a.click();
  }

  const isProcessing = status === "processing";
  const isReady = !!file1 && !!file2 && !isProcessing;
  const btnStyle = (active: boolean) => ({
    padding: "7px 14px", border: `1px solid ${active ? "#2563eb" : "#d1d5db"}`,
    borderRadius: "6px", background: active ? "#eff6ff" : "#fff",
    color: active ? "#2563eb" : "#374151", fontWeight: active ? 600 : 400,
    fontSize: "13px", cursor: "pointer",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <FileSlot label="First Image" file={file1} onSelect={handleSelectFile1} onClear={() => { setFile1(null); setStatus("idle"); }} accept={tool.accept} />
        <FileSlot label="Second Image" file={file2} onSelect={handleSelectFile2} onClear={() => { setFile2(null); setStatus("idle"); }} accept={tool.accept} />
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setLayout("horizontal")} style={btnStyle(layout === "horizontal")}>Side by side</button>
        <button onClick={() => setLayout("vertical")} style={btnStyle(layout === "vertical")}>Stacked</button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button disabled={!isReady} onClick={handleProcess}
          style={{ padding: "10px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed" }}>
          {isProcessing ? "Merging..." : "Merge Images"}
        </button>
        {isProcessing && <Spinner />}
      </div>

      {status === "error" && (
        <div style={{ padding: "12px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {status === "done" && downloadUrl && (
        <div style={{ border: "1px solid #bfdbfe", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ background: "#eff6ff", padding: "12px 16px" }}>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ Images merged</p>
            <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>Your combined PNG is ready</p>
          </div>
          <div style={{ padding: "12px 16px", background: "#fff" }}>
            <button onClick={handleDownload} style={{ width: "100%", padding: "11px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
              ⬇ Download Merged Image (PNG)
            </button>
          </div>
          <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
            <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "12px", color: "#2563eb", fontWeight: 500 }}>→ Merge other images</button>
          </div>
        </div>
      )}

    </div>
  );
}

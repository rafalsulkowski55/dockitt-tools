"use client";

import { useState, useRef, useEffect } from "react";
import { ToolTracking } from "@/lib/analytics";
import { useConversionLimit } from "@/lib/use-conversion-limit";
import { usePendingFile } from "@/lib/use-pending-file";
import PricingModal from "@/app/components/PricingModal";

const TOOL_NAME = "rotate-pdf";
const PROCESSING_TYPE = "browser" as const;

export default function RotateUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<string>("90");
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { showPricingModal, setShowPricingModal, checkDownloadLimit, onConversionSuccess } = useConversionLimit();

  useEffect(() => { ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE); }, []);

  usePendingFile((f) => {
    setFile(f); setStatus("idle"); setErrorMessage(""); setProgress(0);
    ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f); setStatus("idle"); setErrorMessage(""); setProgress(0);
    if (f) ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    if (f && f.type === "application/pdf") {
      setFile(f); setStatus("idle"); setErrorMessage(""); setProgress(0);
      ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
    }
  }

  async function handleProcess() {
    if (!file) return;
    ToolTracking.processStarted(TOOL_NAME, PROCESSING_TYPE);
    setStatus("processing"); setErrorMessage(""); setProgress(0);
    const interval = setInterval(() => { setProgress((p) => (p < 85 ? p + 5 : p)); }, 300);
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      pdfDoc.getPages().forEach(page => page.setRotation(degrees(parseInt(angle))));
      clearInterval(interval); setProgress(100);
      const newBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(newBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = `rotated-${file.name}`; a.click();
      setStatus("done"); onConversionSuccess();
      ToolTracking.processSuccess(TOOL_NAME, PROCESSING_TYPE);
      ToolTracking.downloadClicked(TOOL_NAME, PROCESSING_TYPE);
    } catch (err: unknown) {
      clearInterval(interval);
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  }

  return (
    <>
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => inputRef.current?.click()} style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "24px", textAlign: "center", background: "#f8faff", cursor: "pointer" }}>
          <div style={{ fontSize: "13px", color: "#666", marginBottom: "12px" }}>Drag & drop your PDF here or</div>
          <label htmlFor="rotate-upload" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#2563eb", color: "#ffffff", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px" }} onClick={(e) => e.stopPropagation()}>Choose PDF</label>
          <input id="rotate-upload" ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />
          {file && <div style={{ marginTop: "12px", fontSize: "14px", color: "#444" }}>📄 {file.name}</div>}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#555" }}>
          <span>🔒</span>Processed entirely in your browser. Files never leave your device.
        </div>

        {file && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "14px", color: "#444" }}>Rotation angle:</span>
            {["90", "180", "270"].map((a) => (
              <button key={a} onClick={() => setAngle(a)} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid", borderColor: angle === a ? "#2563eb" : "#e5e7eb", background: angle === a ? "#2563eb" : "#f9fafb", color: angle === a ? "#ffffff" : "#333333", fontWeight: 500, cursor: "pointer", fontSize: "14px" }}>
                {a}°
              </button>
            ))}
          </div>
        )}

        <button disabled={!file || status === "processing"} onClick={handleProcess} style={{ padding: "12px 24px", background: file && status !== "processing" ? "#2563eb" : "#d1d5db", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "15px", cursor: file && status !== "processing" ? "pointer" : "not-allowed", width: "fit-content" }}>
          {status === "processing" ? "Processing..." : "Rotate PDF"}
        </button>

        {status === "processing" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#666", marginBottom: "6px" }}><span>Processing...</span><span>{progress}%</span></div>
            <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "6px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#2563eb", borderRadius: "99px", transition: "width 0.3s ease" }} />
            </div>
          </div>
        )}

        {status === "error" && <div style={{ padding: "14px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px" }}>{errorMessage || "Something went wrong. Please try again."}</div>}
        {status === "done" && <div style={{ padding: "14px 16px", background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px" }}>✅ Rotation complete. Your file has been downloaded.</div>}
      </div>
    </>
  );
}
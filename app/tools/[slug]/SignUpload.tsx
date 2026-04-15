"use client";

import { useState, useRef, useEffect } from "react";
import { ToolTracking } from "@/lib/analytics";
import { useConversionLimit } from "@/lib/use-conversion-limit";
import { usePendingFile } from "@/lib/use-pending-file";
import PricingModal from "@/app/components/PricingModal";

const TOOL_NAME = "sign-pdf";
const PROCESSING_TYPE = "browser" as const;

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function SignUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const [signaturePos, setSignaturePos] = useState<{ x: number; y: number } | null>(null);
  const [pdfScale, setPdfScale] = useState(1);
  const [progress, setProgress] = useState(0);

  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { showPricingModal, setShowPricingModal, onConversionSuccess } = useConversionLimit();
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE);
    const canvas = signatureCanvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.strokeStyle = "#111111"; ctx.lineWidth = 2.5; ctx.lineCap = "round"; ctx.lineJoin = "round";
  }, []);

  usePendingFile((f) => { handleFile(f); });

  async function handleFile(f: File) {
    setFile(f); setStatus("idle"); setErrorMessage(""); setSignaturePos(null);
    setIsSigned(false); setProgress(0); clearSignature();
    ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
    const pdf = await pdfjsLib.getDocument({ data: await f.arrayBuffer() }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    const scale = 620 / viewport.width;
    setPdfScale(scale);
    const sv = page.getViewport({ scale });
    const canvas = previewCanvasRef.current; if (!canvas) return;
    canvas.width = sv.width; canvas.height = sv.height;
    await page.render({ canvasContext: canvas.getContext("2d") as unknown as CanvasRenderingContext2D, viewport: sv }).promise;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }
  function handleDrop(e: React.DragEvent) { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f && f.type === "application/pdf") handleFile(f); }

  function handleReset() {
    setFile(null); setStatus("idle"); setErrorMessage(""); setSignaturePos(null);
    setIsSigned(false); setProgress(0); clearSignature();
    if (inputRef.current) inputRef.current.value = "";
  }

  function getCanvasPos(e: React.MouseEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * (canvas.width / rect.width), y: (e.clientY - rect.top) * (canvas.height / rect.height) };
  }

  function handlePreviewClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = previewCanvasRef.current; if (!canvas) return;
    setSignaturePos(getCanvasPos(e, canvas));
  }

  function startDrawing(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = signatureCanvasRef.current; if (!canvas) return;
    isDrawing.current = true; lastPos.current = getCanvasPos(e, canvas);
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.beginPath(); ctx.moveTo(lastPos.current.x, lastPos.current.y);
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing.current) return;
    const canvas = signatureCanvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx || !lastPos.current) return;
    const pos = getCanvasPos(e, canvas);
    ctx.beginPath(); ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y); ctx.stroke();
    lastPos.current = pos; setIsSigned(true);
  }

  function stopDrawing() { isDrawing.current = false; lastPos.current = null; signatureCanvasRef.current?.getContext("2d")?.beginPath(); }

  function clearSignature() {
    const canvas = signatureCanvasRef.current; if (!canvas) return;
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height); setIsSigned(false);
  }

  async function handleProcess() {
    if (!file || !isSigned) return;
    ToolTracking.processStarted(TOOL_NAME, PROCESSING_TYPE);
    setStatus("processing"); setErrorMessage(""); setProgress(0);
    const interval = setInterval(() => { setProgress((p) => (p < 85 ? p + Math.random() * 12 : p)); }, 300);
    try {
      const sigCanvas = signatureCanvasRef.current; if (!sigCanvas) throw new Error("Canvas not found");
      const sigBytes = Uint8Array.from(atob(sigCanvas.toDataURL("image/png").split(",")[1]), c => c.charCodeAt(0));
      const { PDFDocument } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const sigImage = await pdfDoc.embedPng(sigBytes);
      const page = pdfDoc.getPages()[0];
      const { height } = page.getSize();
      const sigWidth = 200; const sigHeight = 80;
      page.drawImage(sigImage, {
        x: signaturePos ? signaturePos.x / pdfScale : 50,
        y: signaturePos ? height - (signaturePos.y / pdfScale) - sigHeight : 50,
        width: sigWidth, height: sigHeight,
      });
      clearInterval(interval); setProgress(100);
      const saved = await pdfDoc.save();
      const blob = new Blob([saved.buffer as ArrayBuffer], { type: "application/pdf" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `signed-${file.name}`; a.click();
      setStatus("done"); onConversionSuccess();
      ToolTracking.processSuccess(TOOL_NAME, PROCESSING_TYPE);
      ToolTracking.downloadClicked(TOOL_NAME, PROCESSING_TYPE);
    } catch (err: unknown) {
      clearInterval(interval);
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      setStatus("error"); setProgress(0);
    }
  }

  const isReady = file && isSigned && status !== "processing";

  return (
    <>
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
      <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
          style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "16px", background: "#f8faff" }}>
          {file ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "52px", borderRadius: "6px", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "10px", fontWeight: 700, color: "#2563eb" }}>PDF</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#111", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
                <button onClick={() => inputRef.current?.click()} style={{ fontSize: "11px", color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Change file</button>
              </div>
              <button onClick={handleReset} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "6px", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "#6b7280", fontSize: "13px" }}>✕</button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>Drag & drop your PDF here or</div>
              <button onClick={() => inputRef.current?.click()} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#2563eb", color: "#fff", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "14px", border: "none" }}>
                Choose PDF
              </button>
            </div>
          )}
        </div>

        {file && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#374151", margin: 0 }}>Step 1 — Click where you want to place your signature:</p>
              <div style={{ position: "relative", display: "inline-block", maxWidth: "100%" }}>
                <canvas ref={previewCanvasRef} onClick={handlePreviewClick} style={{ border: "1px solid #bfdbfe", borderRadius: "8px", cursor: "crosshair", display: "block", maxWidth: "100%" }} />
                {signaturePos && (
                  <div style={{ position: "absolute", left: `${(signaturePos.x / (previewCanvasRef.current?.width ?? 1)) * 100}%`, top: `${(signaturePos.y / (previewCanvasRef.current?.height ?? 1)) * 100}%`, width: "120px", height: "48px", border: "2px dashed #2563eb", borderRadius: "4px", background: "rgba(37,99,235,0.08)", pointerEvents: "none", transform: "translate(-4px, -4px)" }} />
                )}
              </div>
              <p style={{ fontSize: "11px", color: signaturePos ? "#16a34a" : "#9ca3af", margin: 0 }}>
                {signaturePos ? "✓ Position set — click elsewhere to move it" : "Click anywhere on the document to set position"}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#374151", margin: 0 }}>Step 2 — Draw your signature:</p>
              <canvas ref={signatureCanvasRef} width={400} height={100}
                onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                style={{ border: "2px dashed #bfdbfe", borderRadius: "8px", cursor: "crosshair", background: "#f8faff", maxWidth: "100%", display: "block" }} />
              <button onClick={clearSignature} style={{ padding: "6px 12px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "12px", cursor: "pointer", width: "fit-content", color: "#555" }}>Clear</button>
            </div>
          </>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button disabled={!isReady} onClick={handleProcess}
            style={{ padding: "10px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed" }}>
            {status === "processing" ? "Signing..." : "Sign PDF"}
          </button>
          {status === "processing" && <Spinner />}
        </div>

        {status === "processing" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}>
              <span>Adding signature...</span><span>{Math.round(progress)}%</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "5px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#2563eb", borderRadius: "99px", transition: "width 0.3s ease" }} />
            </div>
          </div>
        )}

        {status === "error" && (
          <div style={{ padding: "12px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px" }}>
            {errorMessage || "Something went wrong. Please try again."}
          </div>
        )}

        {status === "done" && (
          <div style={{ border: "1px solid #bfdbfe", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: "#eff6ff", padding: "12px 16px" }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ PDF signed successfully</p>
              <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>Your file has been downloaded</p>
            </div>
            <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
              <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "12px", color: "#2563eb", fontWeight: 500 }}>→ Sign another PDF</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
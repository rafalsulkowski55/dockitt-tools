"use client";

import { useState, useRef, useEffect } from "react";
import { ToolTracking } from "@/lib/analytics";
import { useConversionLimit } from "@/lib/use-conversion-limit";
import { usePendingFile } from "@/lib/use-pending-file";
import PricingModal from "@/app/components/PricingModal";

const TOOL_NAME = "sign-pdf";
const PROCESSING_TYPE = "browser" as const;

export default function SignUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const [signaturePos, setSignaturePos] = useState<{ x: number; y: number } | null>(null);
  const [pdfScale, setPdfScale] = useState(1);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { showPricingModal, setShowPricingModal, onConversionSuccess } = useConversionLimit();
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE);
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#111111";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  usePendingFile((f) => { handleFile(f); });

  async function handleFile(f: File) {
    setFile(f); setStatus("idle"); setErrorMessage(""); setSignaturePos(null);
    setIsSigned(false); setProgress(0); clearSignature();
    ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
    const arrayBuffer = await f.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    const scale = 680 / viewport.width;
    setPdfScale(scale);
    const scaledViewport = page.getViewport({ scale });
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx as unknown as CanvasRenderingContext2D, viewport: scaledViewport }).promise;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (f) handleFile(f); }
  function handleDrop(e: React.DragEvent) { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f && f.type === "application/pdf") handleFile(f); }

  function getCanvasPos(e: React.MouseEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * (canvas.width / rect.width), y: (e.clientY - rect.top) * (canvas.height / rect.height) };
  }

  function handlePreviewClick(e: React.MouseEvent<HTMLCanvasElement>) { const canvas = previewCanvasRef.current; if (!canvas) return; setSignaturePos(getCanvasPos(e, canvas)); }

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
      const { width, height } = page.getSize();
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
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop} style={{ border: `2px dashed ${dragOver ? "#2563eb" : "#bfdbfe"}`, background: dragOver ? "#e0eeff" : "#f8faff", borderRadius: "12px", padding: "32px 24px", textAlign: "center", cursor: "pointer", transition: "all 0.15s" }}>
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>📄</div>
          {file ? <p style={{ fontSize: "14px", color: "#111", fontWeight: 500, margin: 0 }}>{file.name}</p> : (
            <><p style={{ fontSize: "14px", color: "#374151", fontWeight: 500, margin: "0 0 4px" }}>Drag & drop your PDF here</p><p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>or click to browse</p></>
          )}
          <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />
        </div>

        <button onClick={() => inputRef.current?.click()} style={{ padding: "11px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 500, fontSize: "14px", cursor: "pointer", width: "fit-content" }}>Choose PDF</button>
        <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>🔒 Processed entirely in your browser. Files never leave your device.</p>

        {file && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "14px", color: "#111", fontWeight: 600 }}>Step 1 — Click where you want to place your signature:</span>
            <div style={{ position: "relative", display: "inline-block", maxWidth: "100%" }}>
              <canvas ref={previewCanvasRef} onClick={handlePreviewClick} style={{ border: "1px solid #bfdbfe", borderRadius: "8px", cursor: "crosshair", display: "block", maxWidth: "100%" }} />
              {signaturePos && <div style={{ position: "absolute", left: `${(signaturePos.x / (previewCanvasRef.current?.width ?? 1)) * 100}%`, top: `${(signaturePos.y / (previewCanvasRef.current?.height ?? 1)) * 100}%`, width: "120px", height: "48px", border: "2px dashed #2563eb", borderRadius: "4px", background: "rgba(37,99,235,0.08)", pointerEvents: "none", transform: "translate(-4px, -4px)" }} />}
            </div>
            <span style={{ fontSize: "13px", color: signaturePos ? "#16a34a" : "#9ca3af" }}>{signaturePos ? "✓ Position set — click elsewhere to move it" : "Click anywhere on the document to set position"}</span>
          </div>
        )}

        {file && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "14px", color: "#111", fontWeight: 600 }}>Step 2 — Draw your signature:</span>
            <canvas ref={signatureCanvasRef} width={400} height={120} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} style={{ border: "2px dashed #bfdbfe", borderRadius: "8px", cursor: "crosshair", background: "#f8faff", maxWidth: "100%", display: "block" }} />
            <button onClick={clearSignature} style={{ padding: "8px 14px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", cursor: "pointer", width: "fit-content", color: "#555" }}>Clear</button>
          </div>
        )}

        <button disabled={!isReady} onClick={handleProcess} style={{ padding: "12px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 500, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed", width: "fit-content" }}>
          {status === "processing" ? "Signing..." : "Sign PDF"}
        </button>

        {status === "processing" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ background: "#e5e7eb", borderRadius: "100px", height: "6px", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: "100px", background: "#2563eb", width: `${progress}%`, transition: "width 0.3s ease" }} />
            </div>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{Math.round(progress)}%</p>
          </div>
        )}

        {status === "error" && <div style={{ padding: "14px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px" }}>{errorMessage || "Something went wrong. Please try again."}</div>}
        {status === "done" && <div style={{ padding: "14px 16px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px" }}>✅ PDF signed and downloaded successfully.</div>}
      </div>
    </>
  );
}
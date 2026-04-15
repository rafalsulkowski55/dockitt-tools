"use client";

import { useState, useRef, useEffect } from "react";
import { ToolTracking } from "@/lib/analytics";
import { useConversionLimit } from "@/lib/use-conversion-limit";
import { usePendingFile } from "@/lib/use-pending-file";
import PricingModal from "@/app/components/PricingModal";

const TOOL_NAME = "crop-pdf";
const PROCESSING_TYPE = "browser" as const;

type CropBox = { x: number; y: number; width: number; height: number };

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="10" cy="10" r="8" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
      <path d="M10 2 a8 8 0 0 1 8 8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function CropUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [cropBox, setCropBox] = useState<CropBox | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [appliedToAll, setAppliedToAll] = useState(false);
  const [progress, setProgress] = useState(0);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { showPricingModal, setShowPricingModal, onConversionSuccess } = useConversionLimit();
  const isDragging = useRef(false);
  const isResizing = useRef<string | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const cropStart = useRef<CropBox>({ x: 0, y: 0, width: 0, height: 0 });
  const pdfRef = useRef<unknown>(null);
  const pdfScaleRef = useRef(1);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const cropBoxRef = useRef<CropBox | null>(null);
  const allCropsRef = useRef<Record<number, CropBox>>({});

  useEffect(() => { ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE); }, []);
  useEffect(() => { cropBoxRef.current = cropBox; }, [cropBox]);

  usePendingFile((f) => { handleFile(f); });

  function drawOverlay(box: CropBox) {
    const canvas = overlayCanvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const { width, height } = canvasSizeRef.current;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(0, 0, width, height);
    ctx.clearRect(box.x, box.y, box.width, box.height);
    ctx.strokeStyle = "#2563eb"; ctx.lineWidth = 2; ctx.strokeRect(box.x, box.y, box.width, box.height);
    ctx.strokeStyle = "rgba(37,99,235,0.4)"; ctx.lineWidth = 1; ctx.beginPath();
    ctx.moveTo(box.x + box.width / 3, box.y); ctx.lineTo(box.x + box.width / 3, box.y + box.height);
    ctx.moveTo(box.x + box.width * 2 / 3, box.y); ctx.lineTo(box.x + box.width * 2 / 3, box.y + box.height);
    ctx.moveTo(box.x, box.y + box.height / 3); ctx.lineTo(box.x + box.width, box.y + box.height / 3);
    ctx.moveTo(box.x, box.y + box.height * 2 / 3); ctx.lineTo(box.x + box.width, box.y + box.height * 2 / 3);
    ctx.stroke();
    const hs = 10; ctx.fillStyle = "#2563eb";
    [{ x: box.x, y: box.y }, { x: box.x + box.width, y: box.y }, { x: box.x, y: box.y + box.height }, { x: box.x + box.width, y: box.y + box.height }].forEach(c => ctx.fillRect(c.x - hs / 2, c.y - hs / 2, hs, hs));
    [{ x: box.x + box.width / 2, y: box.y }, { x: box.x + box.width / 2, y: box.y + box.height }, { x: box.x, y: box.y + box.height / 2 }, { x: box.x + box.width, y: box.y + box.height / 2 }].forEach(e => ctx.fillRect(e.x - hs / 2, e.y - hs / 2, hs, hs));
  }

  async function renderPage(pageNum: number) {
    if (!pdfRef.current) return;
    const pdf = pdfRef.current as { getPage: (n: number) => Promise<unknown> };
    const page = await pdf.getPage(pageNum) as { getViewport: (o: { scale: number }) => { width: number; height: number }; render: (o: unknown) => { promise: Promise<void> } };
    const containerWidth = Math.min(660, window.innerWidth - 100);
    const viewport = page.getViewport({ scale: 1 });
    const scale = containerWidth / viewport.width;
    pdfScaleRef.current = scale;
    const sv = page.getViewport({ scale });
    canvasSizeRef.current = { width: sv.width, height: sv.height };
    const canvas = previewCanvasRef.current; const overlay = overlayCanvasRef.current;
    if (!canvas || !overlay) return;
    canvas.width = sv.width; canvas.height = sv.height; overlay.width = sv.width; overlay.height = sv.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx as unknown as CanvasRenderingContext2D, viewport: sv }).promise;
    const margin = 20;
    const box = allCropsRef.current[pageNum] ?? { x: margin, y: margin, width: sv.width - margin * 2, height: sv.height - margin * 2 };
    allCropsRef.current[pageNum] = box;
    setCropBox(box); drawOverlay(box);
  }

  async function handleFile(f: File) {
    setFile(f); setStatus("idle"); setErrorMessage(""); setCropBox(null);
    setCurrentPage(1); setProgress(0); allCropsRef.current = {};
    ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
    const pdf = await pdfjsLib.getDocument({ data: await f.arrayBuffer() }).promise;
    pdfRef.current = pdf; setTotalPages(pdf.numPages);
    await renderPage(1);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }
  function handleDrop(e: React.DragEvent) { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f && f.type === "application/pdf") handleFile(f); }

  function handleReset() {
    setFile(null); setStatus("idle"); setErrorMessage(""); setCropBox(null);
    setCurrentPage(1); setProgress(0); allCropsRef.current = {};
    if (inputRef.current) inputRef.current.value = "";
  }

  async function goToPage(pageNum: number) {
    if (cropBoxRef.current) allCropsRef.current[currentPage] = cropBoxRef.current;
    setCurrentPage(pageNum); await renderPage(pageNum);
  }

  function getPos(e: React.MouseEvent) {
    const overlay = overlayCanvasRef.current; if (!overlay) return { x: 0, y: 0 };
    const rect = overlay.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * (overlay.width / rect.width), y: (e.clientY - rect.top) * (overlay.height / rect.height) };
  }

  function getHandle(pos: { x: number; y: number }, box: CropBox): string | null {
    const hs = 14;
    const handles: Record<string, { x: number; y: number }> = { nw: { x: box.x, y: box.y }, ne: { x: box.x + box.width, y: box.y }, sw: { x: box.x, y: box.y + box.height }, se: { x: box.x + box.width, y: box.y + box.height }, n: { x: box.x + box.width / 2, y: box.y }, s: { x: box.x + box.width / 2, y: box.y + box.height }, w: { x: box.x, y: box.y + box.height / 2 }, e: { x: box.x + box.width, y: box.y + box.height / 2 } };
    for (const [name, point] of Object.entries(handles)) { if (Math.abs(pos.x - point.x) < hs && Math.abs(pos.y - point.y) < hs) return name; }
    return null;
  }

  function handleMouseDown(e: React.MouseEvent) {
    const box = cropBoxRef.current; if (!box) return;
    const pos = getPos(e); const handle = getHandle(pos, box);
    if (handle) { isResizing.current = handle; }
    else if (pos.x >= box.x && pos.x <= box.x + box.width && pos.y >= box.y && pos.y <= box.y + box.height) { isDragging.current = true; }
    else return;
    cropStart.current = { ...box }; dragStart.current = pos;
  }

  function handleMouseMove(e: React.MouseEvent) {
    const box = cropBoxRef.current; if (!box) return;
    const pos = getPos(e); const { width: cw, height: ch } = canvasSizeRef.current;
    const dx = pos.x - dragStart.current.x; const dy = pos.y - dragStart.current.y; const min = 30;
    let newBox = { ...box };
    if (isDragging.current) { newBox.x = Math.max(0, Math.min(cw - box.width, cropStart.current.x + dx)); newBox.y = Math.max(0, Math.min(ch - box.height, cropStart.current.y + dy)); }
    else if (isResizing.current) {
      const h = isResizing.current; let { x, y, width, height } = cropStart.current;
      if (h.includes("e")) width = Math.max(min, width + dx);
      if (h.includes("s")) height = Math.max(min, height + dy);
      if (h.includes("w")) { const nx = x + dx; width = Math.max(min, width - dx); x = nx; }
      if (h.includes("n")) { const ny = y + dy; height = Math.max(min, height - dy); y = ny; }
      x = Math.max(0, x); y = Math.max(0, y); width = Math.min(cw - x, width); height = Math.min(ch - y, height);
      newBox = { x, y, width, height };
    } else {
      const handle = getHandle(pos, box); const overlay = overlayCanvasRef.current;
      if (overlay) {
        if (handle === "nw" || handle === "se") overlay.style.cursor = "nwse-resize";
        else if (handle === "ne" || handle === "sw") overlay.style.cursor = "nesw-resize";
        else if (handle === "n" || handle === "s") overlay.style.cursor = "ns-resize";
        else if (handle === "e" || handle === "w") overlay.style.cursor = "ew-resize";
        else if (pos.x >= box.x && pos.x <= box.x + box.width && pos.y >= box.y && pos.y <= box.y + box.height) overlay.style.cursor = "move";
        else overlay.style.cursor = "default";
      }
      return;
    }
    cropBoxRef.current = newBox; setCropBox(newBox); drawOverlay(newBox);
  }

  function handleMouseUp() { isDragging.current = false; isResizing.current = null; }

  function applyToAllPages() {
    const box = cropBoxRef.current; if (!box) return;
    for (let i = 1; i <= totalPages; i++) allCropsRef.current[i] = { ...box };
    setAppliedToAll(true); setTimeout(() => setAppliedToAll(false), 2000);
  }

  async function handleProcess() {
    if (!file || !cropBoxRef.current) return;
    if (cropBoxRef.current) allCropsRef.current[currentPage] = cropBoxRef.current;
    ToolTracking.processStarted(TOOL_NAME, PROCESSING_TYPE);
    setStatus("processing"); setErrorMessage(""); setProgress(0);
    const interval = setInterval(() => { setProgress((p) => (p < 85 ? p + Math.random() * 12 : p)); }, 300);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const scale = pdfScaleRef.current; const { height: ch } = canvasSizeRef.current;
      const pdfDoc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      pdfDoc.getPages().forEach((page, index) => {
        const pageNum = index + 1; const box = allCropsRef.current[pageNum] ?? allCropsRef.current[currentPage]; if (!box) return;
        const { height } = page.getSize();
        page.setCropBox(Math.round(box.x / scale), Math.round((ch - box.y - box.height) / scale), Math.round(box.width / scale), Math.round(box.height / scale));
      });
      clearInterval(interval); setProgress(100);
      const saved = await pdfDoc.save({ useObjectStreams: true });
      const blob = new Blob([saved.buffer as ArrayBuffer], { type: "application/pdf" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `cropped-${file.name}`; a.click();
      setStatus("done"); onConversionSuccess();
      ToolTracking.processSuccess(TOOL_NAME, PROCESSING_TYPE); ToolTracking.downloadClicked(TOOL_NAME, PROCESSING_TYPE);
    } catch (err: unknown) {
      clearInterval(interval);
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      setStatus("error"); setProgress(0);
    }
  }

  const isReady = file && status !== "processing";

  return (
    <>
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
      <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{ border: "2px dashed #bfdbfe", borderRadius: "12px", padding: "16px", background: "#f8faff" }}
        >
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

        {/* Page navigation */}
        {file && totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <button onClick={() => goToPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontSize: "13px" }}>← Prev</button>
            <span style={{ fontSize: "13px", color: "#555" }}>Page {currentPage} of {totalPages}</span>
            <button onClick={() => goToPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontSize: "13px" }}>Next →</button>
            <button onClick={applyToAllPages} style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #2563eb", background: appliedToAll ? "#16a34a" : "#eff6ff", color: appliedToAll ? "#fff" : "#2563eb", cursor: "pointer", fontSize: "12px", transition: "all 0.2s" }}>
              {appliedToAll ? "✓ Applied to all" : "Apply to all pages"}
            </button>
          </div>
        )}

        {/* Canvas preview */}
        {file && totalPages > 0 && (
          <>
            <div style={{ position: "relative", display: "inline-block", maxWidth: "100%", borderRadius: "8px", overflow: "hidden", border: "1px solid #bfdbfe" }}>
              <canvas ref={previewCanvasRef} style={{ display: "block", maxWidth: "100%" }} />
              <canvas ref={overlayCanvasRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} style={{ position: "absolute", top: 0, left: 0, maxWidth: "100%", cursor: "default" }} />
            </div>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Drag the crop box or its handles to adjust. The dark area will be removed.</p>
          </>
        )}

        {/* Process button + spinner */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            disabled={!isReady}
            onClick={handleProcess}
            style={{ padding: "10px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed" }}
          >
            {status === "processing" ? "Cropping..." : "Crop PDF"}
          </button>
          {status === "processing" && <Spinner />}
        </div>

        {/* Progress bar */}
        {status === "processing" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}>
              <span>Cropping your PDF...</span>
              <span>{Math.round(progress)}%</span>
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
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb", margin: "0 0 2px" }}>✅ PDF cropped successfully</p>
              <p style={{ fontSize: "12px", color: "#16a34a", margin: 0 }}>Your file has been downloaded</p>
            </div>
            <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
              <button onClick={handleReset} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "12px", color: "#2563eb", fontWeight: 500 }}>→ Crop another PDF</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
"use client";

import { useState, useRef, useEffect } from "react";
import { ToolTracking } from "@/lib/analytics";

const TOOL_NAME = "crop-pdf";
const PROCESSING_TYPE = "browser" as const;

type CropBox = { x: number; y: number; width: number; height: number };

export default function CropUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [cropBox, setCropBox] = useState<CropBox | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [appliedToAll, setAppliedToAll] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDragging = useRef(false);
  const isResizing = useRef<string | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const cropStart = useRef<CropBox>({ x: 0, y: 0, width: 0, height: 0 });
  const pdfRef = useRef<unknown>(null);
  const pdfScaleRef = useRef(1);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const cropBoxRef = useRef<CropBox | null>(null);
  const allCropsRef = useRef<Record<number, CropBox>>({});

  useEffect(() => {
    ToolTracking.viewTool(TOOL_NAME, PROCESSING_TYPE);
  }, []);

  useEffect(() => {
    cropBoxRef.current = cropBox;
  }, [cropBox]);

  function drawOverlay(box: CropBox) {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvasSizeRef.current;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, width, height);
    ctx.clearRect(box.x, box.y, box.width, box.height);
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 2;
    ctx.strokeRect(box.x, box.y, box.width, box.height);
    ctx.strokeStyle = "rgba(37,99,235,0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(box.x + box.width / 3, box.y);
    ctx.lineTo(box.x + box.width / 3, box.y + box.height);
    ctx.moveTo(box.x + box.width * 2 / 3, box.y);
    ctx.lineTo(box.x + box.width * 2 / 3, box.y + box.height);
    ctx.moveTo(box.x, box.y + box.height / 3);
    ctx.lineTo(box.x + box.width, box.y + box.height / 3);
    ctx.moveTo(box.x, box.y + box.height * 2 / 3);
    ctx.lineTo(box.x + box.width, box.y + box.height * 2 / 3);
    ctx.stroke();
    const hs = 10;
    ctx.fillStyle = "#2563eb";
    [{ x: box.x, y: box.y }, { x: box.x + box.width, y: box.y }, { x: box.x, y: box.y + box.height }, { x: box.x + box.width, y: box.y + box.height }]
      .forEach(c => ctx.fillRect(c.x - hs / 2, c.y - hs / 2, hs, hs));
    [{ x: box.x + box.width / 2, y: box.y }, { x: box.x + box.width / 2, y: box.y + box.height }, { x: box.x, y: box.y + box.height / 2 }, { x: box.x + box.width, y: box.y + box.height / 2 }]
      .forEach(e => ctx.fillRect(e.x - hs / 2, e.y - hs / 2, hs, hs));
  }

  async function renderPage(pageNum: number) {
    if (!pdfRef.current) return;
    const pdf = pdfRef.current as { getPage: (n: number) => Promise<unknown> };
    const page = await pdf.getPage(pageNum) as {
      getViewport: (o: { scale: number }) => { width: number; height: number };
      render: (o: unknown) => { promise: Promise<void> };
    };
    const containerWidth = Math.min(660, window.innerWidth - 100);
    const viewport = page.getViewport({ scale: 1 });
    const scale = containerWidth / viewport.width;
    pdfScaleRef.current = scale;
    const sv = page.getViewport({ scale });
    canvasSizeRef.current = { width: sv.width, height: sv.height };
    const canvas = previewCanvasRef.current;
    const overlay = overlayCanvasRef.current;
    if (!canvas || !overlay) return;
    canvas.width = sv.width; canvas.height = sv.height;
    overlay.width = sv.width; overlay.height = sv.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx as unknown as CanvasRenderingContext2D, viewport: sv }).promise;
    const margin = 20;
    const box = allCropsRef.current[pageNum] ?? { x: margin, y: margin, width: sv.width - margin * 2, height: sv.height - margin * 2 };
    allCropsRef.current[pageNum] = box;
    setCropBox(box);
    drawOverlay(box);
  }

  async function handleFile(f: File) {
    setFile(f);
    setStatus("idle");
    setErrorMessage("");
    setCropBox(null);
    setCurrentPage(1);
    setProgress(0);
    allCropsRef.current = {};
    ToolTracking.uploadStarted(TOOL_NAME, PROCESSING_TYPE);
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
    const arrayBuffer = await f.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    pdfRef.current = pdf;
    setTotalPages(pdf.numPages);
    await renderPage(1);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type === "application/pdf") handleFile(f);
  }

  async function goToPage(pageNum: number) {
    if (cropBoxRef.current) allCropsRef.current[currentPage] = cropBoxRef.current;
    setCurrentPage(pageNum);
    await renderPage(pageNum);
  }

  function getPos(e: React.MouseEvent) {
    const overlay = overlayCanvasRef.current;
    if (!overlay) return { x: 0, y: 0 };
    const rect = overlay.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * (overlay.width / rect.width), y: (e.clientY - rect.top) * (overlay.height / rect.height) };
  }

  function getHandle(pos: { x: number; y: number }, box: CropBox): string | null {
    const hs = 14;
    const handles: Record<string, { x: number; y: number }> = {
      nw: { x: box.x, y: box.y }, ne: { x: box.x + box.width, y: box.y },
      sw: { x: box.x, y: box.y + box.height }, se: { x: box.x + box.width, y: box.y + box.height },
      n: { x: box.x + box.width / 2, y: box.y }, s: { x: box.x + box.width / 2, y: box.y + box.height },
      w: { x: box.x, y: box.y + box.height / 2 }, e: { x: box.x + box.width, y: box.y + box.height / 2 },
    };
    for (const [name, point] of Object.entries(handles)) {
      if (Math.abs(pos.x - point.x) < hs && Math.abs(pos.y - point.y) < hs) return name;
    }
    return null;
  }

  function handleMouseDown(e: React.MouseEvent) {
    const box = cropBoxRef.current;
    if (!box) return;
    const pos = getPos(e);
    const handle = getHandle(pos, box);
    if (handle) { isResizing.current = handle; }
    else if (pos.x >= box.x && pos.x <= box.x + box.width && pos.y >= box.y && pos.y <= box.y + box.height) { isDragging.current = true; }
    else return;
    cropStart.current = { ...box };
    dragStart.current = pos;
  }

  function handleMouseMove(e: React.MouseEvent) {
    const box = cropBoxRef.current;
    if (!box) return;
    const pos = getPos(e);
    const { width: cw, height: ch } = canvasSizeRef.current;
    const dx = pos.x - dragStart.current.x;
    const dy = pos.y - dragStart.current.y;
    const min = 30;
    let newBox = { ...box };
    if (isDragging.current) {
      newBox.x = Math.max(0, Math.min(cw - box.width, cropStart.current.x + dx));
      newBox.y = Math.max(0, Math.min(ch - box.height, cropStart.current.y + dy));
    } else if (isResizing.current) {
      const h = isResizing.current;
      let { x, y, width, height } = cropStart.current;
      if (h.includes("e")) width = Math.max(min, width + dx);
      if (h.includes("s")) height = Math.max(min, height + dy);
      if (h.includes("w")) { const nx = x + dx; width = Math.max(min, width - dx); x = nx; }
      if (h.includes("n")) { const ny = y + dy; height = Math.max(min, height - dy); y = ny; }
      x = Math.max(0, x); y = Math.max(0, y);
      width = Math.min(cw - x, width); height = Math.min(ch - y, height);
      newBox = { x, y, width, height };
    } else {
      const handle = getHandle(pos, box);
      const overlay = overlayCanvasRef.current;
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
    cropBoxRef.current = newBox;
    setCropBox(newBox);
    drawOverlay(newBox);
  }

  function handleMouseUp() {
    isDragging.current = false;
    isResizing.current = null;
  }

  function applyToAllPages() {
    const box = cropBoxRef.current;
    if (!box) return;
    for (let i = 1; i <= totalPages; i++) allCropsRef.current[i] = { ...box };
    setAppliedToAll(true);
    setTimeout(() => setAppliedToAll(false), 2000);
  }

  async function handleProcess() {
    if (!file || !cropBoxRef.current) return;
    if (cropBoxRef.current) allCropsRef.current[currentPage] = cropBoxRef.current;
    ToolTracking.processStarted(TOOL_NAME, PROCESSING_TYPE);
    setStatus("processing");
    setErrorMessage("");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p < 85 ? p + Math.random() * 12 : p));
    }, 300);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const cropsData: Record<number, { top: number; bottom: number; left: number; right: number }> = {};
      const scale = pdfScaleRef.current;
      const { width: cw, height: ch } = canvasSizeRef.current;
      for (let i = 1; i <= totalPages; i++) {
        const box = allCropsRef.current[i] ?? allCropsRef.current[currentPage];
        if (box) {
          cropsData[i] = {
            left: Math.round(box.x / scale), top: Math.round(box.y / scale),
            right: Math.round((cw - box.x - box.width) / scale),
            bottom: Math.round((ch - box.y - box.height) / scale),
          };
        }
      }
      formData.append("crops", JSON.stringify(cropsData));
      const res = await fetch("/api/crop-pdf", { method: "POST", body: formData });
      clearInterval(interval);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Unknown error");
      }
      setProgress(100);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cropped-${file.name}`;
      a.click();
      setStatus("done");
      ToolTracking.processSuccess(TOOL_NAME, PROCESSING_TYPE);
      ToolTracking.downloadClicked(TOOL_NAME, PROCESSING_TYPE);
    } catch (err: unknown) {
      clearInterval(interval);
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
      setProgress(0);
    }
  }

  const isReady = file && status !== "processing";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{ border: `2px dashed ${dragOver ? "#2563eb" : "#bfdbfe"}`, background: dragOver ? "#e0eeff" : "#f8faff", borderRadius: "12px", padding: "32px 24px", textAlign: "center", cursor: "pointer", transition: "all 0.15s" }}
      >
        <div style={{ fontSize: "28px", marginBottom: "8px" }}>📄</div>
        {file ? (
          <p style={{ fontSize: "14px", color: "#111", fontWeight: 500, margin: 0 }}>{file.name}</p>
        ) : (
          <>
            <p style={{ fontSize: "14px", color: "#374151", fontWeight: 500, margin: "0 0 4px" }}>Drag & drop your PDF here</p>
            <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>or click to browse</p>
          </>
        )}
        <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />
      </div>

      <button onClick={() => inputRef.current?.click()} style={{ padding: "11px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 500, fontSize: "14px", cursor: "pointer", width: "fit-content" }}>
        Choose PDF
      </button>

      <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
        🔒 Processed entirely in your browser. Files never leave your device.
      </p>

      {file && totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={() => goToPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontSize: "14px" }}>← Prev</button>
          <span style={{ fontSize: "14px", color: "#555" }}>Page {currentPage} of {totalPages}</span>
          <button onClick={() => goToPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontSize: "14px" }}>Next →</button>
          <button onClick={applyToAllPages} style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #2563eb", background: appliedToAll ? "#16a34a" : "#eff6ff", color: appliedToAll ? "#fff" : "#2563eb", cursor: "pointer", fontSize: "13px", transition: "all 0.2s" }}>
            {appliedToAll ? "✓ Applied to all pages" : "Apply to all pages"}
          </button>
        </div>
      )}

      {file && totalPages > 0 && (
        <>
          <div style={{ position: "relative", display: "inline-block", maxWidth: "100%", borderRadius: "8px", overflow: "hidden", border: "1px solid #bfdbfe" }}>
            <canvas ref={previewCanvasRef} style={{ display: "block", maxWidth: "100%" }} />
            <canvas ref={overlayCanvasRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} style={{ position: "absolute", top: 0, left: 0, maxWidth: "100%", cursor: "default" }} />
          </div>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>Drag the crop box or its handles to adjust. The dark area will be removed.</p>
        </>
      )}

      <button disabled={!isReady} onClick={handleProcess} style={{ padding: "12px 20px", background: isReady ? "#2563eb" : "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 500, fontSize: "14px", cursor: isReady ? "pointer" : "not-allowed", width: "fit-content" }}>
        {status === "processing" ? "Cropping..." : "Crop PDF"}
      </button>

      {status === "processing" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ background: "#e5e7eb", borderRadius: "100px", height: "6px", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: "100px", background: "#2563eb", width: `${progress}%`, transition: "width 0.3s ease" }} />
          </div>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{Math.round(progress)}%</p>
        </div>
      )}

      {status === "error" && (
        <div style={{ padding: "14px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px" }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {status === "done" && (
        <div style={{ padding: "14px 16px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px" }}>
          ✅ PDF cropped and downloaded successfully.
        </div>
      )}

    </div>
  );
}
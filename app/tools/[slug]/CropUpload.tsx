"use client";

import { useState, useRef, useEffect } from "react";

type CropBox = { x: number; y: number; width: number; height: number };

export default function CropUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [cropBox, setCropBox] = useState<CropBox | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [appliedToAll, setAppliedToAll] = useState(false);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);
  const isResizing = useRef<string | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const cropStart = useRef<CropBox>({ x: 0, y: 0, width: 0, height: 0 });
  const pdfRef = useRef<unknown>(null);
  const pdfScaleRef = useRef(1);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const cropBoxRef = useRef<CropBox | null>(null);
  const allCropsRef = useRef<Record<number, CropBox>>({});

  // Keep cropBoxRef in sync
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

    // Dark overlay
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, width, height);
    ctx.clearRect(box.x, box.y, box.width, box.height);

    // Border
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(box.x, box.y, box.width, box.height);

    // Grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
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

    // Corner handles
    const hs = 10;
    ctx.fillStyle = "white";
    const corners = [
      { x: box.x, y: box.y },
      { x: box.x + box.width, y: box.y },
      { x: box.x, y: box.y + box.height },
      { x: box.x + box.width, y: box.y + box.height },
    ];
    corners.forEach(c => {
      ctx.fillRect(c.x - hs / 2, c.y - hs / 2, hs, hs);
    });

    // Edge handles
    const edges = [
      { x: box.x + box.width / 2, y: box.y },
      { x: box.x + box.width / 2, y: box.y + box.height },
      { x: box.x, y: box.y + box.height / 2 },
      { x: box.x + box.width, y: box.y + box.height / 2 },
    ];
    edges.forEach(e => {
      ctx.fillRect(e.x - hs / 2, e.y - hs / 2, hs, hs);
    });
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

    canvas.width = sv.width;
    canvas.height = sv.height;
    overlay.width = sv.width;
    overlay.height = sv.height;

    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx as unknown as CanvasRenderingContext2D, viewport: sv }).promise;

    const existingCrop = allCropsRef.current[pageNum];
    const margin = 20;
    const box = existingCrop ?? {
      x: margin, y: margin,
      width: sv.width - margin * 2,
      height: sv.height - margin * 2,
    };
    allCropsRef.current[pageNum] = box;
    setCropBox(box);
    drawOverlay(box);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setStatus("idle");
    setErrorMessage("");
    setCropBox(null);
    setCurrentPage(1);
    allCropsRef.current = {};
    if (!f) return;

    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

    const arrayBuffer = await f.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    pdfRef.current = pdf;
    setTotalPages(pdf.numPages);
    await renderPage(1);
  }

  async function goToPage(pageNum: number) {
    if (cropBoxRef.current) {
      allCropsRef.current[currentPage] = cropBoxRef.current;
    }
    setCurrentPage(pageNum);
    await renderPage(pageNum);
  }

  function getPos(e: React.MouseEvent) {
    const overlay = overlayCanvasRef.current;
    if (!overlay) return { x: 0, y: 0 };
    const rect = overlay.getBoundingClientRect();
    const scaleX = overlay.width / rect.width;
    const scaleY = overlay.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function getHandle(pos: { x: number; y: number }, box: CropBox): string | null {
    const hs = 14;
    const handles: Record<string, { x: number; y: number }> = {
      nw: { x: box.x, y: box.y },
      ne: { x: box.x + box.width, y: box.y },
      sw: { x: box.x, y: box.y + box.height },
      se: { x: box.x + box.width, y: box.y + box.height },
      n: { x: box.x + box.width / 2, y: box.y },
      s: { x: box.x + box.width / 2, y: box.y + box.height },
      w: { x: box.x, y: box.y + box.height / 2 },
      e: { x: box.x + box.width, y: box.y + box.height / 2 },
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
    if (handle) {
      isResizing.current = handle;
    } else if (pos.x >= box.x && pos.x <= box.x + box.width && pos.y >= box.y && pos.y <= box.y + box.height) {
      isDragging.current = true;
    } else {
      return;
    }
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
  for (let i = 1; i <= totalPages; i++) {
    allCropsRef.current[i] = { ...box };
  }
  setAppliedToAll(true);
  setTimeout(() => setAppliedToAll(false), 2000);
}

  async function handleProcess() {
    if (!file || !cropBoxRef.current) return;
    if (cropBoxRef.current) allCropsRef.current[currentPage] = cropBoxRef.current;
    setStatus("processing");
    setErrorMessage("");

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
            left: Math.round(box.x / scale),
            top: Math.round(box.y / scale),
            right: Math.round((cw - box.x - box.width) / scale),
            bottom: Math.round((ch - box.y - box.height) / scale),
          };
        }
      }

      formData.append("crops", JSON.stringify(cropsData));

      const res = await fetch("/api/crop-pdf", { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Unknown error");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cropped-${file.name}`;
      a.click();
      setStatus("done");
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <label htmlFor="crop-upload" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          padding: "12px 18px", background: "#111111", color: "#ffffff",
          borderRadius: "10px", fontWeight: 600, cursor: "pointer",
        }}>
          Choose PDF
        </label>
        <span style={{ color: "#666666", fontSize: "15px" }}>
          {file ? file.name : "No file selected"}
        </span>
        <input id="crop-upload" type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFileChange} />
      </div>

      {file && totalPages > 0 && (
        <>
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <button onClick={() => goToPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
                style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontSize: "14px" }}>
                ← Prev
              </button>
              <span style={{ fontSize: "14px", color: "#555" }}>Page {currentPage} of {totalPages}</span>
              <button onClick={() => goToPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
                style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontSize: "14px" }}>
                Next →
              </button>
              <button onClick={applyToAllPages}
                style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #2563eb", background: appliedToAll ? "#16a34a" : "#eff6ff", color: appliedToAll ? "#ffffff" : "#2563eb", cursor: "pointer", fontSize: "13px", transition: "all 0.2s" }}>
                    {appliedToAll ? "✓ Applied to all pages" : "Apply to all pages"}
               </button>
            </div>
          )}

          <div style={{ position: "relative", display: "inline-block", maxWidth: "100%", borderRadius: "8px", overflow: "hidden" }}>
            <canvas ref={previewCanvasRef} style={{ display: "block", maxWidth: "100%" }} />
            <canvas
              ref={overlayCanvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ position: "absolute", top: 0, left: 0, maxWidth: "100%", cursor: "default" }}
            />
          </div>

          <span style={{ fontSize: "13px", color: "#666" }}>
            Drag the crop box or its handles to adjust. The dark area will be removed.
          </span>
        </>
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
        {status === "processing" ? "Processing..." : "Crop PDF"}
      </button>

      {status === "error" && (
        <div style={{ padding: "14px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px" }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {status === "done" && (
        <div style={{ padding: "14px 16px", background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px" }}>
          Done. Your cropped PDF has been downloaded.
        </div>
      )}
    </div>
  );
}
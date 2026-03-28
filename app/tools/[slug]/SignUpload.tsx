"use client";

import { useState, useRef, useEffect } from "react";

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
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#111111";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  async function handleFile(f: File) {
    setFile(f);
    setStatus("idle");
    setErrorMessage("");
    setSignaturePos(null);
    setIsSigned(false);
    setProgress(0);
    clearSignature();

    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

    const arrayBuffer = await f.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    const containerWidth = 680;
    const viewport = page.getViewport({ scale: 1 });
    const scale = containerWidth / viewport.width;
    setPdfScale(scale);

    const scaledViewport = page.getViewport({ scale });
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({
      canvasContext: ctx as unknown as CanvasRenderingContext2D,
      viewport: scaledViewport,
    }).promise;
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

  function getCanvasPos(e: React.MouseEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function handlePreviewClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    setSignaturePos(getCanvasPos(e, canvas));
  }

  function startDrawing(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    isDrawing.current = true;
    lastPos.current = getCanvasPos(e, canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing.current) return;
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || !lastPos.current) return;
    const pos = getCanvasPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
    setIsSigned(true);
  }

  function stopDrawing() {
    isDrawing.current = false;
    lastPos.current = null;
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")?.beginPath();
  }

  function clearSignature() {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    setIsSigned(false);
  }

  async function handleProcess() {
    if (!file || !isSigned) return;
    setStatus("processing");
    setErrorMessage("");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p < 85 ? p + Math.random() * 12 : p));
    }, 300);

    try {
      const sigCanvas = signatureCanvasRef.current;
      if (!sigCanvas) throw new Error("Canvas not found");

      const signatureBlob = await new Promise<Blob>((resolve, reject) => {
        sigCanvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Failed to create signature image"));
        }, "image/png");
      });

      const sigWidth = 200;
      const sigHeight = 80;
      const pdfX = signaturePos ? signaturePos.x / pdfScale : 50;
      const pdfY = signaturePos ? signaturePos.y / pdfScale : 50;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signatureBlob, "signature.png");
      formData.append("page", "1");
      formData.append("x", pdfX.toString());
      formData.append("y", pdfY.toString());
      formData.append("width", sigWidth.toString());
      formData.append("height", sigHeight.toString());

      const res = await fetch("/api/sign-pdf", {
        method: "POST",
        body: formData,
      });

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
      a.download = `signed-${file.name}`;
      a.click();
      setStatus("done");
    } catch (err: unknown) {
      clearInterval(interval);
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMessage(message);
      setStatus("error");
      setProgress(0);
    }
  }

  const isReady = file && isSigned && status !== "processing";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Drag & drop zona */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragOver ? "#2563eb" : "#bfdbfe"}`,
          background: dragOver ? "#e0eeff" : "#f8faff",
          borderRadius: "12px",
          padding: "32px 24px",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        <div style={{ fontSize: "28px", marginBottom: "8px" }}>📄</div>
        {file ? (
          <p style={{ fontSize: "14px", color: "#111", fontWeight: 500, margin: 0 }}>{file.name}</p>
        ) : (
          <>
            <p style={{ fontSize: "14px", color: "#374151", fontWeight: 500, margin: "0 0 4px" }}>
              Drag & drop your PDF here
            </p>
            <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>or click to browse</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {/* Choose PDF button */}
      <button
        onClick={() => inputRef.current?.click()}
        style={{
          padding: "11px 20px", background: "#2563eb", color: "#fff",
          border: "none", borderRadius: "8px", fontWeight: 500,
          fontSize: "14px", cursor: "pointer", width: "fit-content",
        }}
      >
        Choose PDF
      </button>

      {/* Privacy note */}
      <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
        🔒 Files never leave your device — processed securely and deleted immediately
      </p>

      {/* Step 1 — PDF preview */}
      {file && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "14px", color: "#111", fontWeight: 600 }}>
            Step 1 — Click where you want to place your signature:
          </span>
          <div style={{ position: "relative", display: "inline-block", maxWidth: "100%" }}>
            <canvas
              ref={previewCanvasRef}
              onClick={handlePreviewClick}
              style={{
                border: "1px solid #bfdbfe",
                borderRadius: "8px",
                cursor: "crosshair",
                display: "block",
                maxWidth: "100%",
              }}
            />
            {signaturePos && (
              <div style={{
                position: "absolute",
                left: `${(signaturePos.x / (previewCanvasRef.current?.width ?? 1)) * 100}%`,
                top: `${(signaturePos.y / (previewCanvasRef.current?.height ?? 1)) * 100}%`,
                width: "120px", height: "48px",
                border: "2px dashed #2563eb",
                borderRadius: "4px",
                background: "rgba(37,99,235,0.08)",
                pointerEvents: "none",
                transform: "translate(-4px, -4px)",
              }} />
            )}
          </div>
          <span style={{ fontSize: "13px", color: signaturePos ? "#16a34a" : "#9ca3af" }}>
            {signaturePos ? "✓ Position set — click elsewhere to move it" : "Click anywhere on the document to set position"}
          </span>
        </div>
      )}

      {/* Step 2 — Signature canvas */}
      {file && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "14px", color: "#111", fontWeight: 600 }}>
            Step 2 — Draw your signature:
          </span>
          <canvas
            ref={signatureCanvasRef}
            width={400}
            height={120}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{
              border: "2px dashed #bfdbfe",
              borderRadius: "8px",
              cursor: "crosshair",
              background: "#f8faff",
              maxWidth: "100%",
              display: "block",
            }}
          />
          <button
            onClick={clearSignature}
            style={{
              padding: "8px 14px", background: "#f9fafb",
              border: "1px solid #e5e7eb", borderRadius: "8px",
              fontSize: "13px", cursor: "pointer", width: "fit-content", color: "#555",
            }}
          >
            Clear
          </button>
        </div>
      )}

      {/* Action button */}
      <button
        disabled={!isReady}
        onClick={handleProcess}
        style={{
          padding: "12px 20px",
          background: isReady ? "#2563eb" : "#d1d5db",
          color: "#fff", border: "none", borderRadius: "8px",
          fontWeight: 500, fontSize: "14px",
          cursor: isReady ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        {status === "processing" ? "Signing..." : "Sign PDF"}
      </button>

      {/* Progress bar */}
      {status === "processing" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ background: "#e5e7eb", borderRadius: "100px", height: "6px", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: "100px", background: "#2563eb",
              width: `${progress}%`, transition: "width 0.3s ease",
            }} />
          </div>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{Math.round(progress)}%</p>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div style={{ padding: "14px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "14px" }}>
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {/* Success */}
      {status === "done" && (
        <div style={{ padding: "14px 16px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "14px" }}>
          ✅ PDF signed and downloaded successfully.
        </div>
      )}

    </div>
  );
}
"use client";

import { useState, useRef, useEffect } from "react";

export default function SignUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const [signaturePos, setSignaturePos] = useState<{ x: number; y: number } | null>(null);
  const [pdfScale, setPdfScale] = useState(1);

  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
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

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setStatus("idle");
    setErrorMessage("");
    setSignaturePos(null);
    setIsSigned(false);
    clearSignature();
    if (!f) return;

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
    const pos = getCanvasPos(e, canvas);
    setSignaturePos(pos);
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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
  }

  function clearSignature() {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsSigned(false);
  }

  async function handleProcess() {
    if (!file || !isSigned) return;
    setStatus("processing");
    setErrorMessage("");

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

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Unknown error");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `signed-${file.name}`;
      a.click();
      setStatus("done");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMessage(message);
      setStatus("error");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <label
          htmlFor="sign-upload"
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
          id="sign-upload"
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {file && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "14px", color: "#444", fontWeight: 600 }}>
            Step 1 — Click on the document where you want to place your signature:
          </span>
          <div style={{ position: "relative", display: "inline-block", maxWidth: "100%" }}>
            <canvas
              ref={previewCanvasRef}
              onClick={handlePreviewClick}
              style={{
                border: "1px solid #d1d5db",
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
                width: "120px",
                height: "48px",
                border: "2px dashed #2563eb",
                borderRadius: "4px",
                background: "rgba(37,99,235,0.08)",
                pointerEvents: "none",
                transform: "translate(-4px, -4px)",
              }}/>
            )}
          </div>
          {signaturePos ? (
            <span style={{ fontSize: "13px", color: "#16a34a" }}>
              ✓ Position set — click elsewhere to move it
            </span>
          ) : (
            <span style={{ fontSize: "13px", color: "#999" }}>
              Click anywhere on the document to set position
            </span>
          )}
        </div>
      )}

      {file && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "14px", color: "#444", fontWeight: 600 }}>
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
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              cursor: "crosshair",
              background: "#f9fafb",
              maxWidth: "100%",
              display: "block",
            }}
          />
          <button
            onClick={clearSignature}
            style={{
              padding: "8px 14px", background: "#f9fafb",
              border: "1px solid #e5e7eb", borderRadius: "8px",
              fontSize: "13px", cursor: "pointer", width: "fit-content",
              color: "#555",
            }}
          >
            Clear
          </button>
        </div>
      )}

      <button
        disabled={!file || !isSigned || status === "processing"}
        onClick={handleProcess}
        style={{
          padding: "12px 18px",
          background: file && isSigned && status !== "processing" ? "#2563eb" : "#d1d5db",
          color: "#ffffff", border: "none", borderRadius: "10px",
          fontWeight: 600,
          cursor: file && isSigned && status !== "processing" ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        {status === "processing" ? "Processing..." : "Sign PDF"}
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
          Done. Your signed PDF has been downloaded.
        </div>
      )}

    </div>
  );
}
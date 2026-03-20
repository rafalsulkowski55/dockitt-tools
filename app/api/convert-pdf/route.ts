import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";
export const maxDuration = 30;

const RAILWAY_API_URL = process.env.RAILWAY_API_URL || 'https://dockitt-api-production.up.railway.app';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const variant = formData.get("variant") as string;
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // jpg/png to pdf
    if (variant === "jpg-to-pdf" || variant === "png-to-pdf") {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        let image;
        if (variant === "jpg-to-pdf" || file.type === "image/jpeg") {
          image = await pdfDoc.embedJpg(bytes);
        } else {
          image = await pdfDoc.embedPng(bytes);
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }

      const pdfBytes = await pdfDoc.save();

      return new NextResponse(Buffer.from(pdfBytes), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="converted.pdf"`,
        },
      });
    }

    // pdf to jpg/png — pdfjs w przeglądarce, nie przez API
    if (variant === "pdf-to-jpg" || variant === "pdf-to-png") {
      return NextResponse.json(
        { error: "PDF to image conversion requires additional server setup. Coming soon." },
        { status: 501 }
      );
    }

    // pdf to word — Railway
    if (variant === "pdf-to-word") {
      const response = await fetch(`${RAILWAY_API_URL}/pdf-to-word`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Server error' }));
        return NextResponse.json(error, { status: response.status });
      }
      const buffer = await response.arrayBuffer();
      return new NextResponse(Buffer.from(buffer), {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': 'attachment; filename="converted.docx"',
        },
      });
    }

    // word to pdf — Railway
    if (variant === "word-to-pdf") {
      const response = await fetch(`${RAILWAY_API_URL}/word-to-pdf`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Server error' }));
        return NextResponse.json(error, { status: response.status });
      }
      const buffer = await response.arrayBuffer();
      return new NextResponse(Buffer.from(buffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="converted.pdf"',
        },
      });
    }

    return NextResponse.json({ error: "Unknown conversion type" }, { status: 400 });

  } catch (err) {
    console.error("Convert PDF error:", err);
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 });
  }
}
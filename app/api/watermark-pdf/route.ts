import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, degrees } from "pdf-lib";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const text = formData.get("text") as string ?? "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!text.trim()) {
      return NextResponse.json({ error: "No watermark text provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pages = pdfDoc.getPages();

    for (const page of pages) {
      const { width, height } = page.getSize();
      page.drawText(text, {
        x: width / 2 - (text.length * 6),
        y: height / 2,
        size: 48,
        color: rgb(0.8, 0.8, 0.8),
        opacity: 0.4,
        rotate: degrees(45),
      });
    }

    const newBytes = await pdfDoc.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(newBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="watermarked.pdf"`,
      },
    });
  } catch (err) {
    console.error("Watermark PDF error:", err);
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 });
  }
}
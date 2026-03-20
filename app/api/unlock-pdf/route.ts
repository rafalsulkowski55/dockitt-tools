import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();

    let pdfDoc;
    try {
      pdfDoc = await PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true,
      });
    } catch {
      return NextResponse.json(
        { error: "Could not process this PDF file." },
        { status: 400 }
      );
    }

    const newBytes = await pdfDoc.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(newBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="unlocked.pdf"`,
      },
    });
  } catch (err) {
    console.error("Unlock PDF error:", err);
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 });
  }
}
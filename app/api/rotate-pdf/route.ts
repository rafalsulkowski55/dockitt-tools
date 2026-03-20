import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, degrees } from "pdf-lib";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const angle = parseInt(formData.get("angle") as string ?? "90");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
      page.setRotation(degrees(angle));
    });

    const rotatedBytes = await pdfDoc.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(rotatedBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="rotated.pdf"`,
      },
    });
  } catch (err) {
    console.error("Rotate PDF error:", err);
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 });
  }
}
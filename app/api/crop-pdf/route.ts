import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const cropsStr = formData.get("crops") as string ?? "{}";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const crops = JSON.parse(cropsStr) as Record<string, { top: number; bottom: number; left: number; right: number }>;

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pages = pdfDoc.getPages();

    pages.forEach((page, index) => {
      const pageNum = index + 1;
      const crop = crops[pageNum.toString()];
      if (!crop) return;
      const { width, height } = page.getSize();
      page.setCropBox(
        crop.left,
        crop.bottom,
        width - crop.left - crop.right,
        height - crop.top - crop.bottom
      );
    });

    const newBytes = await pdfDoc.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(newBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="cropped.pdf"`,
      },
    });
  } catch (err) {
    console.error("Crop PDF error:", err);
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 });
  }
}
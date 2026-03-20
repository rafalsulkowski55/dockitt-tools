import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const orderStr = formData.get("order") as string ?? "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const order = orderStr.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));

    if (order.length === 0) {
      return NextResponse.json({ error: "No page order provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const sourcePdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const totalPages = sourcePdf.getPageCount();

    const invalidPages = order.filter(p => p < 1 || p > totalPages);
    if (invalidPages.length > 0) {
      return NextResponse.json(
        { error: `Invalid page numbers: ${invalidPages.join(", ")}. PDF has ${totalPages} pages.` },
        { status: 400 }
      );
    }

    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(sourcePdf, order.map(p => p - 1));
    pages.forEach(page => newPdf.addPage(page));

    const newBytes = await newPdf.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(newBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="reordered.pdf"`,
        "X-Total-Pages": totalPages.toString(),
      },
    });
  } catch (err) {
    console.error("Reorder PDF pages error:", err);
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 });
  }
}
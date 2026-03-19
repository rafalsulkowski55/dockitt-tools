import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const fromPage = parseInt(formData.get("fromPage") as string);
    const toPage = parseInt(formData.get("toPage") as string);

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
    });

    const totalPages = pdfDoc.getPageCount();

    if (isNaN(fromPage) || isNaN(toPage) || fromPage < 1 || toPage > totalPages || fromPage > toPage) {
      return NextResponse.json(
        { error: `Invalid page range. PDF has ${totalPages} pages.` },
        { status: 400 }
      );
    }

    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(
      pdfDoc,
      Array.from({ length: toPage - fromPage + 1 }, (_, i) => fromPage - 1 + i)
    );
    pages.forEach((page) => newPdf.addPage(page));

    const newBytes = await newPdf.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(newBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="split.pdf"`,
        "X-Total-Pages": totalPages.toString(),
      },
    });
  } catch (err) {
    console.error("Split PDF error:", err);
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 });
  }
}
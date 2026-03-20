import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const signatureFile = formData.get("signature") as File | null;
    const page = parseInt(formData.get("page") as string ?? "1");
    const x = parseFloat(formData.get("x") as string ?? "50");
    const y = parseFloat(formData.get("y") as string ?? "50");
    const width = parseFloat(formData.get("width") as string ?? "200");
    const height = parseFloat(formData.get("height") as string ?? "80");

    if (!file || !signatureFile) {
      return NextResponse.json({ error: "No file or signature provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const signatureBuffer = await signatureFile.arrayBuffer();

    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const totalPages = pdfDoc.getPageCount();
    const pageIndex = Math.min(Math.max(page - 1, 0), totalPages - 1);
    const pdfPage = pdfDoc.getPage(pageIndex);
    const { height: pageHeight } = pdfPage.getSize();

    const pngImage = await pdfDoc.embedPng(new Uint8Array(signatureBuffer));

    // PDF Y axis is from bottom, canvas Y axis is from top
    const pdfY = pageHeight - y - height;

    pdfPage.drawImage(pngImage, {
      x,
      y: pdfY,
      width,
      height,
    });

    const newBytes = await pdfDoc.save({ useObjectStreams: true });

    return new NextResponse(Buffer.from(newBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="signed.pdf"`,
      },
    });
  } catch (err) {
    console.error("Sign PDF error:", err);
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 });
  }
}
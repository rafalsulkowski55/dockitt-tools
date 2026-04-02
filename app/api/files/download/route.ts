import { NextRequest, NextResponse } from "next/server";
import { getSignedDownloadUrl } from "@/lib/r2";
import { getFileRecord } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const storageKey = searchParams.get("storageKey");

    if (!storageKey) {
      return NextResponse.json({ error: "Missing storageKey" }, { status: 400 });
    }

    // Sprawdź czy plik istnieje w DB
    const record = await getFileRecord(storageKey);
    if (!record) {
      return NextResponse.json({ error: "FILE_EXPIRED" }, { status: 404 });
    }

    // Generuj signed download URL
    const downloadUrl = await getSignedDownloadUrl(storageKey);
    return NextResponse.json({ downloadUrl });
  } catch (error) {
    console.error("files/download error:", error);
    return NextResponse.json({ error: "Failed to get download URL" }, { status: 500 });
  }
}
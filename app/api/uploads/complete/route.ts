import { NextRequest, NextResponse } from "next/server";
import { getFileRecord, updateFileStatus } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { storageKey, toolSlug, processingParams } = await req.json();

    if (!storageKey || !toolSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const record = await getFileRecord(storageKey);
    if (!record) {
      return NextResponse.json({ error: "File record not found" }, { status: 404 });
    }

    await updateFileStatus(storageKey, "processing");

    const RAILWAY_API_URL = process.env.RAILWAY_API_URL || "https://dockitt-api-production.up.railway.app";

    const jobRes = await fetch(`${RAILWAY_API_URL}/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storageKey, toolSlug, processingParams }),
    });

    if (!jobRes.ok) {
      await updateFileStatus(storageKey, "failed");
      const err = await jobRes.json().catch(() => ({ error: "Processing failed" }));
      return NextResponse.json(err, { status: 500 });
    }

    const result = await jobRes.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("uploads/complete error:", error);
    return NextResponse.json({ error: "Failed to complete upload" }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { getSignedUploadUrl, generateStorageKey } from "@/lib/r2";
import { createFileRecord } from "@/lib/db";

const MAX_SIZE_FREE = 10 * 1024 * 1024;      // 10MB
const MAX_SIZE_PAY = 50 * 1024 * 1024;       // 50MB
const MAX_SIZE_PREMIUM = 100 * 1024 * 1024;  // 100MB

export async function POST(req: NextRequest) {
  try {
    const { filename, mimeType, sizeBytes, toolSlug } = await req.json();

    if (!filename || !mimeType || !sizeBytes || !toolSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Na razie wszyscy są free
    const maxSize = MAX_SIZE_FREE;

    if (sizeBytes > maxSize) {
      return NextResponse.json({
        error: `File too large. Maximum size is ${maxSize / 1024 / 1024}MB.`,
        code: "FILE_TOO_LARGE",
      }, { status: 413 });
    }

    const storageKey = generateStorageKey("uploads", filename);
    const uploadUrl = await getSignedUploadUrl(storageKey, mimeType);

    await createFileRecord({
      storageKey,
      kind: "input",
      contentType: mimeType,
      originalFilename: filename,
      sizeBytes,
      toolSlug,
    });

    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    return NextResponse.json({ uploadUrl, storageKey, expiresAt });
  } catch (error) {
    console.error("uploads/create error:", error);
    return NextResponse.json({ error: "Failed to create upload URL" }, { status: 500 });
  }
}
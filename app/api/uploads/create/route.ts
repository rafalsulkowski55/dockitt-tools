import { NextRequest, NextResponse } from "next/server";
import { createFileRecord } from "@/lib/db";
import { getSignedUploadUrl, generateStorageKey } from "@/lib/r2";
import { createClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const { filename, contentType, sizeBytes, toolSlug } = await req.json();

    if (!filename || !contentType || !sizeBytes || !toolSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Sprawdź sesję usera i tier
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let maxFileSizeMB = 10; // default dla niezalogowanych i free

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("tier, pay_per_use_expires_at")
        .eq("id", user.id)
        .single();

      if (profile) {
        if (profile.tier === "pay_per_use" && profile.pay_per_use_expires_at) {
          if (new Date(profile.pay_per_use_expires_at) > new Date()) {
            maxFileSizeMB = 50;
          } else {
            // Wygasł — cofnij do free
            await supabase.from("profiles").update({ tier: "free" }).eq("id", user.id);
          }
        } else if (profile.tier === "premium") {
          maxFileSizeMB = 100;
        }
      }
    }

    // Sprawdź rozmiar pliku
    const sizeMB = sizeBytes / (1024 * 1024);
    if (sizeMB > maxFileSizeMB) {
      return NextResponse.json(
        { error: "FILE_TOO_LARGE", maxFileSizeMB },
        { status: 413 }
      );
    }

    // Generuj klucz i signed URL
    const storageKey = generateStorageKey("uploads", filename);
    const uploadUrl = await getSignedUploadUrl(storageKey, contentType);

    // Zapisz rekord w DB
    await createFileRecord({
      storageKey,
      kind: "input",
      contentType,
      originalFilename: filename,
      sizeBytes,
      toolSlug,
      userId: user?.id ?? undefined,
    });

    return NextResponse.json({ uploadUrl, storageKey });
  } catch (error) {
    console.error("uploads/create error:", error);
    return NextResponse.json({ error: "Failed to create upload" }, { status: 500 });
  }
}
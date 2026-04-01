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

    // Sprawdź sesję usera
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Pobierz profil i sprawdź tier
    let tier = "free";
    let maxFileSizeMB = 10;

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("tier, pay_per_use_expires_at, daily_conversions_count, daily_conversions_date")
        .eq("id", user.id)
        .single();

      if (profile) {
        if (profile.tier === "pay_per_use" && profile.pay_per_use_expires_at) {
          if (new Date(profile.pay_per_use_expires_at) < new Date()) {
            await supabase
              .from("profiles")
              .update({ tier: "free" })
              .eq("id", user.id);
          } else {
            tier = "pay_per_use";
            maxFileSizeMB = 50;
          }
        } else if (profile.tier === "premium") {
          tier = "premium";
          maxFileSizeMB = 100;
        }

        if (tier === "free") {
          const today = new Date().toISOString().split("T")[0];
          const lastDate = profile.daily_conversions_date;
          const count = lastDate === today ? profile.daily_conversions_count : 0;

          if (count >= 1) {
            return NextResponse.json({ error: "LIMIT_REACHED", tier: "free" }, { status: 403 });
          }
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
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { storageKey, accessToken } = await req.json();

    if (!storageKey || !accessToken) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Sprawdź tier usera
    const { data: profile } = await supabase
      .from("profiles")
      .select("tier")
      .eq("id", user.id)
      .single();

    const isPremium = profile?.tier === "premium";
    const newExpiresAt = isPremium
      ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      : new Date(Date.now() + 30 * 60 * 1000);

    await pool.query(
      `UPDATE stored_files 
       SET user_id = $1, expires_at = $2
       WHERE storage_key = $3 AND user_id IS NULL`,
      [user.id, newExpiresAt, storageKey]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("files/claim error:", error);
    return NextResponse.json({ error: "Failed to claim file" }, { status: 500 });
  }
}
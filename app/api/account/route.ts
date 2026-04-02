import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Pobierz profil
    const { data: profile } = await supabase
      .from("profiles")
      .select("tier, pay_per_use_expires_at, stripe_customer_id, created_at")
      .eq("id", user.id)
      .single();

    // Pobierz historię konwersji z Railway DB
    const result = await pool.query(
      `SELECT tool_slug, original_filename, created_at, status
       FROM stored_files
       WHERE user_id = $1 AND kind = 'input'
       ORDER BY created_at DESC
       LIMIT 20`,
      [user.id]
    );

    return NextResponse.json({
      email: user.email,
      profile,
      history: result.rows,
    });
  } catch (error) {
    console.error("account route error:", error);
    return NextResponse.json({ error: "Failed to load account data" }, { status: 500 });
  }
}
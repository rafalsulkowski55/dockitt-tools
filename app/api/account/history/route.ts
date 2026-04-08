import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createAdminClient();
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await pool.query(
      `SELECT tool_slug, original_filename, created_at, storage_key, expires_at, deleted_at
       FROM stored_files
       WHERE user_id = $1 AND kind = 'output' AND deleted_at IS NULL
       ORDER BY created_at DESC
       LIMIT 20`,
      [user.id]
    );

    return NextResponse.json({ history: result.rows });
  } catch (error) {
    console.error("account/history error:", error);
    return NextResponse.json({ error: "Failed to load history" }, { status: 500 });
  }
}
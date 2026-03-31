import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { deleteObject } from "@/lib/r2";

async function runCleanup() {
  const { rows } = await pool.query(
    `SELECT id, storage_key FROM stored_files 
     WHERE expires_at < NOW() 
     AND deleted_at IS NULL 
     LIMIT 200`
  );

  const results = { deleted: 0, failed: 0, already_missing: 0 };

  for (const row of rows) {
    try {
      await deleteObject(row.storage_key);
      results.deleted++;
    } catch (err: any) {
      if (err?.Code === "NoSuchKey") {
        results.already_missing++;
      } else {
        console.error(`Failed to delete ${row.storage_key}:`, err);
        results.failed++;
        continue;
      }
    }

    await pool.query(
      `UPDATE stored_files 
       SET deleted_at = NOW(), status = 'deleted' 
       WHERE id = $1`,
      [row.id]
    );
  }

  console.log("Cleanup results:", results);
  return { success: true, ...results, total: rows.length };
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CLEANUP_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runCleanup();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CLEANUP_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runCleanup();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}
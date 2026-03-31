import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default pool;

export async function createFileRecord(params: {
  storageKey: string;
  kind: "input" | "output";
  contentType: string;
  originalFilename: string;
  sizeBytes: number;
  toolSlug: string;
  sessionToken?: string;
  userId?: string;
}) {
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minut
  const result = await pool.query(
    `INSERT INTO stored_files 
     (storage_key, kind, content_type, original_filename, size_bytes, tool_slug, session_token, user_id, status, expires_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'uploaded', $9)
     RETURNING *`,
    [
      params.storageKey,
      params.kind,
      params.contentType,
      params.originalFilename,
      params.sizeBytes,
      params.toolSlug,
      params.sessionToken ?? null,
      params.userId ?? null,
      expiresAt,
    ]
  );
  return result.rows[0];
}

export async function getFileRecord(storageKey: string) {
  const result = await pool.query(
    "SELECT * FROM stored_files WHERE storage_key = $1 AND deleted_at IS NULL",
    [storageKey]
  );
  return result.rows[0] ?? null;
}

export async function updateFileStatus(storageKey: string, status: string) {
  await pool.query(
    "UPDATE stored_files SET status = $1 WHERE storage_key = $2",
    [status, storageKey]
  );
}
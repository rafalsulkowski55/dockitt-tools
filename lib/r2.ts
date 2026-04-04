import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export const BUCKET = process.env.R2_BUCKET_NAME!;

export async function getSignedUploadUrl(key: string, contentType: string, expiresIn = 300) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(r2Client, command, { expiresIn });
}

export async function getSignedDownloadUrl(key: string, expiresIn = 300, filename?: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ResponseContentDisposition: filename
      ? `attachment; filename="${encodeURIComponent(filename)}"`
      : "attachment",
  });
  return getSignedUrl(r2Client, command, { expiresIn });
}

export async function deleteObject(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  return r2Client.send(command);
}

export function generateStorageKey(type: "uploads" | "outputs", filename: string): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const uuid = crypto.randomUUID();
  const suffix = type === "uploads" ? "input" : "output";
  return `${type}/${yyyy}/${mm}/${dd}/${uuid}-${suffix}.pdf`;
}
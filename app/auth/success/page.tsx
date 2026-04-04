"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPendingDownload, clearPendingDownload } from "@/lib/conversion-limit";

export default function AuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const pending = getPendingDownload();

    if (pending) {
      clearPendingDownload();
      const toolPath = pending.toolPath ?? `/tools/${pending.toolSlug}`;

      if (pending.storageKey) {
        router.replace(`${toolPath}?download=true&storageKey=${encodeURIComponent(pending.storageKey)}&filename=${encodeURIComponent(pending.filename)}`);
      } else {
        router.replace(`${toolPath}?reprocess=true`);
      }
    } else {
      router.replace("/");
    }
  }, [router]);

  return (
    <div style={{
      minHeight: "100vh", background: "#f9fafb",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <p style={{ fontSize: "15px", color: "#6b7280" }}>Signing you in...</p>
    </div>
  );
}
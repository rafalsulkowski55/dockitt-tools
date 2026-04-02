"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPendingDownload, clearPendingDownload } from "@/lib/conversion-limit";

export default function AuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const pending = getPendingDownload();

    if (pending) {
      // Jest pending download — redirect na tool z parametrem
      clearPendingDownload();
      const toolPath = `/tools/${pending.toolSlug}`;
      router.replace(`${toolPath}?download=true&storageKey=${encodeURIComponent(pending.storageKey)}&filename=${encodeURIComponent(pending.filename)}`);
    } else {
      // Brak pending download — idź na stronę główną
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
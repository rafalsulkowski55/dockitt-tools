"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function DownloadHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const shouldDownload = searchParams.get("download");
    const storageKey = searchParams.get("storageKey");
    const filename = searchParams.get("filename");

    if (shouldDownload !== "true" || !storageKey) return;

    async function autoDownload() {
      try {
        const res = await fetch(`/api/files/download?storageKey=${encodeURIComponent(storageKey!)}`);
        const data = await res.json();

        if (!res.ok) {
          if (data.error === "FILE_EXPIRED") {
            alert("Your file has expired. Please process it again.");
          }
          return;
        }

        const a = document.createElement("a");
        a.href = data.downloadUrl;
        a.download = filename ?? "file.pdf";
        a.click();

        // Wyczyść URL params
        const url = new URL(window.location.href);
        url.searchParams.delete("download");
        url.searchParams.delete("storageKey");
        url.searchParams.delete("filename");
        window.history.replaceState({}, "", url.toString());
      } catch (err) {
        console.error("Auto-download failed:", err);
      }
    }

    autoDownload();
  }, [searchParams]);

  return null;
}
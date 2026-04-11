import { useEffect } from "react";

export function usePendingFile(onFile: (file: File) => void) {
  useEffect(() => {
    const pendingFile = sessionStorage.getItem("pendingFile");
    const pendingFileName = sessionStorage.getItem("pendingFileName");
    const pendingFileSize = sessionStorage.getItem("pendingFileSize");

    if (pendingFile && pendingFileName) {
      sessionStorage.removeItem("pendingFile");
      sessionStorage.removeItem("pendingFileName");
      sessionStorage.removeItem("pendingFileSize");

      try {
        const byteString = atob(pendingFile.split(",")[1]);
        const mimeString = pendingFile.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], pendingFileName, { type: mimeString });
        onFile(file);
      } catch {
        // ignore parse errors
      }
    }
  }, []);
}
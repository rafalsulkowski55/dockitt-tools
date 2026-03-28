export function trackEvent(
  eventName: string,
  params: Record<string, string>
) {
  if (typeof window === "undefined") return;
  if (typeof (window as any).gtag !== "function") return;
  (window as any).gtag("event", eventName, params);
}

export const ToolTracking = {
  viewTool: (toolName: string, processingType: "browser" | "server") =>
    trackEvent("view_tool", { tool_name: toolName, processing_type: processingType }),

  uploadStarted: (toolName: string, processingType: "browser" | "server") =>
    trackEvent("upload_started", { tool_name: toolName, processing_type: processingType }),

  processStarted: (toolName: string, processingType: "browser" | "server") =>
    trackEvent("process_started", { tool_name: toolName, processing_type: processingType }),

  processSuccess: (toolName: string, processingType: "browser" | "server") =>
    trackEvent("process_success", { tool_name: toolName, processing_type: processingType }),

  downloadClicked: (toolName: string, processingType: "browser" | "server") =>
    trackEvent("download_clicked", { tool_name: toolName, processing_type: processingType }),
};
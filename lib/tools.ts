import { compressPdfTool } from "@/data/tools/compress-pdf";
import { mergePdfTool } from "@/data/tools/merge-pdf";
import { splitPdfTool } from "@/data/tools/split-pdf";

export const tools = [
  compressPdfTool,
  mergePdfTool,
  splitPdfTool,
];

export function getAllTools() {
  return tools;
}

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
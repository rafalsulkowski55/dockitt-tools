import { mergePdfTool } from "@/data/tools/merge-pdf";
import { splitPdfTool } from "@/data/tools/split-pdf";
import { rotatePdfTool } from "@/data/tools/rotate-pdf";
import { deletePdfPagesTool } from "@/data/tools/delete-pdf-pages";
import { watermarkPdfTool } from "@/data/tools/watermark-pdf";
import { signPdfTool } from "@/data/tools/sign-pdf";
import { cropPdfTool } from "@/data/tools/crop-pdf";
import { extractPdfPagesTool } from "@/data/tools/extract-pdf-pages";
import { reorderPdfPagesTool } from "@/data/tools/reorder-pdf-pages";
import { pdfWordCountTool } from "@/data/tools/pdf-word-count";

export const tools = [
  // Organize
  mergePdfTool,
  splitPdfTool,
  rotatePdfTool,
  deletePdfPagesTool,
  extractPdfPagesTool,
  reorderPdfPagesTool,
  // Edit & Protect
  watermarkPdfTool,
  signPdfTool,
  cropPdfTool,
  // Utility
  pdfWordCountTool,
];

export function getAllTools() {
  return tools;
}

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getRelatedTools(slugs: string[]) {
  return slugs
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter(Boolean);
}

export function getToolsByCategory(category: string) {
  return tools.filter((tool) => tool.category === category);
}

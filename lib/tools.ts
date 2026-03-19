import { compressPdfTool } from "@/data/tools/compress-pdf";
import { mergePdfTool } from "@/data/tools/merge-pdf";
import { splitPdfTool } from "@/data/tools/split-pdf";
import { rotatePdfTool } from "@/data/tools/rotate-pdf";
import { deletePdfPagesTool } from "@/data/tools/delete-pdf-pages";
import { protectPdfTool } from "@/data/tools/protect-pdf";
import { unlockPdfTool } from "@/data/tools/unlock-pdf";
import { watermarkPdfTool } from "@/data/tools/watermark-pdf";
import { signPdfTool } from "@/data/tools/sign-pdf";
import { cropPdfTool } from "@/data/tools/crop-pdf";
import { repairPdfTool } from "@/data/tools/repair-pdf";
import { ocrPdfTool } from "@/data/tools/ocr-pdf";
import { extractPdfPagesTool } from "@/data/tools/extract-pdf-pages";
import { reorderPdfPagesTool } from "@/data/tools/reorder-pdf-pages";

export const tools = [
  // Core
  compressPdfTool,
  mergePdfTool,
  splitPdfTool,
  rotatePdfTool,
  deletePdfPagesTool,
  // Security / Edit
  protectPdfTool,
  unlockPdfTool,
  watermarkPdfTool,
  signPdfTool,
  // Utility
  cropPdfTool,
  repairPdfTool,
  ocrPdfTool,
  extractPdfPagesTool,
  reorderPdfPagesTool,
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
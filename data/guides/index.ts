import { howToCompressPdf } from './how-to-compress-pdf'
import { howToMergePdf } from './how-to-merge-pdf'
import { howToSplitPdf } from './how-to-split-pdf'
import { howToRotatePdf } from './how-to-rotate-pdf'
import { howToDeletePdfPages } from './how-to-delete-pdf-pages'
import { howToProtectPdf } from './how-to-protect-pdf'
import { howToUnlockPdf } from './how-to-unlock-pdf'
import { howToWatermarkPdf } from './how-to-watermark-pdf'
import { howToSignPdf } from './how-to-sign-pdf'
import { howToCropPdf } from './how-to-crop-pdf'
import { howToRepairPdf } from './how-to-repair-pdf'
import { howToOcrPdf } from './how-to-ocr-pdf'
import { howToExtractPdfPages } from './how-to-extract-pdf-pages'
import { howToReorderPdfPages } from './how-to-reorder-pdf-pages'
import { howToConvertPdfToJpg } from './how-to-convert-pdf-to-jpg'
import { howToConvertPdfToPng } from './how-to-convert-pdf-to-png'
import { howToConvertPdfToWord } from './how-to-convert-pdf-to-word'
import { howToConvertJpgToPdf } from './how-to-convert-jpg-to-pdf'
import { howToConvertPngToPdf } from './how-to-convert-png-to-pdf'
import { howToConvertWordToPdf } from './how-to-convert-word-to-pdf'
import { howToEditPdfPages } from './how-to-edit-pdf-pages'

export const guides = [
  howToEditPdfPages, 
  howToCompressPdf,
  howToMergePdf,
  howToCompressPdf,
  howToMergePdf,
  howToSplitPdf,
  howToRotatePdf,
  howToDeletePdfPages,
  howToProtectPdf,
  howToUnlockPdf,
  howToWatermarkPdf,
  howToSignPdf,
  howToCropPdf,
  howToRepairPdf,
  howToOcrPdf,
  howToExtractPdfPages,
  howToReorderPdfPages,
  howToConvertPdfToJpg,
  howToConvertPdfToPng,
  howToConvertPdfToWord,
  howToConvertJpgToPdf,
  howToConvertPngToPdf,
  howToConvertWordToPdf,
]

export function getAllGuides() {
  return guides
}

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}
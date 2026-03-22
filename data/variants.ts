export type ToolVariant = {
  slug: string
  toolSlug: string
  title: string
  description: string
  h1: string
  intro: string
}

export const toolVariants: ToolVariant[] = [
  // compress-pdf
  {
    slug: 'compress-pdf-online',
    toolSlug: 'compress-pdf',
    title: 'Compress PDF Online — Free PDF Compressor',
    description: 'Compress PDF files online for free. No sign-up, no installation. Reduce PDF size instantly in your browser.',
    h1: 'Compress PDF Online',
    intro: 'Need to reduce a PDF file size right now, without installing anything? Upload your file and compress it instantly — directly in your browser. No account needed, no limits.',
  },
  {
    slug: 'compress-pdf-free',
    toolSlug: 'compress-pdf',
    title: 'Compress PDF Free — Reduce PDF Size at No Cost',
    description: 'Compress PDF files for free with no limits. Reduce PDF file size online without losing quality.',
    h1: 'Compress PDF for Free',
    intro: 'Compress any PDF file completely free — no subscription, no watermarks, no hidden limits. Just upload, compress, and download.',
  },
  {
    slug: 'reduce-pdf-size',
    toolSlug: 'compress-pdf',
    title: 'Reduce PDF Size Online — Free PDF Size Reducer',
    description: 'Reduce the size of any PDF file online for free. Make PDF files smaller for email, upload, or storage.',
    h1: 'Reduce PDF File Size Online',
    intro: 'Large PDF files are a hassle — too big to email, too slow to upload. Use this free tool to reduce your PDF size in seconds, without losing content or quality.',
  },
  {
    slug: 'compress-pdf-for-email',
    toolSlug: 'compress-pdf',
    title: 'Compress PDF for Email — Reduce PDF Size to Send',
    description: 'Compress a PDF to send by email. Reduce PDF file size below 10MB or 25MB attachment limits for free.',
    h1: 'Compress PDF for Email',
    intro: 'Most email services have attachment limits of 10MB or 25MB. If your PDF is too large to send, compress it here in seconds — no sign-up, no software required.',
  },
  // merge-pdf
  {
    slug: 'merge-pdf-online',
    toolSlug: 'merge-pdf',
    title: 'Merge PDF Online — Combine PDF Files Free',
    description: 'Merge PDF files online for free. Combine multiple PDFs into one document instantly, no sign-up required.',
    h1: 'Merge PDF Files Online',
    intro: 'Combine multiple PDF files into a single document directly in your browser. No software to install, no account required — just upload, arrange, and merge.',
  },
  {
    slug: 'merge-pdf-free',
    toolSlug: 'merge-pdf',
    title: 'Merge PDF Free — Combine PDFs at No Cost',
    description: 'Merge PDF files for free with no limits. Combine PDFs online without watermarks or sign-up.',
    h1: 'Merge PDF Files for Free',
    intro: 'Combine as many PDF files as you need — completely free, with no watermarks added to your document and no limit on the number of files.',
  },
  {
    slug: 'combine-pdf',
    toolSlug: 'merge-pdf',
    title: 'Combine PDF Files Online — Free PDF Combiner',
    description: 'Combine multiple PDF files into one online for free. Fast, easy PDF combining without any software.',
    h1: 'Combine PDF Files Online',
    intro: 'Whether you\'re combining a cover letter with a CV, assembling a report from multiple chapters, or consolidating scanned pages — this free tool combines your PDFs into one clean document.',
  },
  {
    slug: 'join-pdf',
    toolSlug: 'merge-pdf',
    title: 'Join PDF Files Online — Free PDF Joiner',
    description: 'Join multiple PDF files into one document online. Free PDF joiner with no sign-up required.',
    h1: 'Join PDF Files Online',
    intro: 'Join any number of PDF files into a single document in seconds. Upload your files, set the order, and download the combined result — all in your browser.',
  },
  // split-pdf
  {
    slug: 'split-pdf-online',
    toolSlug: 'split-pdf',
    title: 'Split PDF Online — Free PDF Splitter',
    description: 'Split PDF files online for free. Extract pages from a PDF and download as a new document instantly.',
    h1: 'Split PDF Online',
    intro: 'Extract a specific range of pages from any PDF file, directly in your browser. No software, no account — just upload, set the page range, and download.',
  },
  {
    slug: 'split-pdf-free',
    toolSlug: 'split-pdf',
    title: 'Split PDF Free — Extract PDF Pages at No Cost',
    description: 'Split PDF files for free with no limits. Extract pages from any PDF online without watermarks.',
    h1: 'Split PDF for Free',
    intro: 'Split any PDF file completely free — extract the pages you need without any watermarks, sign-up, or usage limits.',
  },
  {
    slug: 'extract-pages-from-pdf',
    toolSlug: 'split-pdf',
    title: 'Extract Pages from PDF Online — Free Tool',
    description: 'Extract specific pages from a PDF file online for free. Save selected pages as a new PDF document.',
    h1: 'Extract Pages from PDF',
    intro: 'Need just a few pages from a larger document? Extract exactly the pages you need and download them as a new PDF — free and without any sign-up.',
  },
  // rotate-pdf
  {
    slug: 'rotate-pdf-online',
    toolSlug: 'rotate-pdf',
    title: 'Rotate PDF Online — Fix PDF Page Orientation Free',
    description: 'Rotate PDF pages online for free. Fix upside-down or sideways PDF pages instantly without any software.',
    h1: 'Rotate PDF Pages Online',
    intro: 'Fix sideways or upside-down PDF pages in seconds. Rotate all pages by 90, 180, or 270 degrees — directly in your browser, no software needed.',
  },
  {
    slug: 'rotate-pdf-free',
    toolSlug: 'rotate-pdf',
    title: 'Rotate PDF Free — Turn PDF Pages at No Cost',
    description: 'Rotate PDF pages for free online. Turn PDF pages 90 or 180 degrees without any sign-up.',
    h1: 'Rotate PDF for Free',
    intro: 'Rotate the pages in any PDF file completely free. No watermarks, no account required — just upload, choose the rotation angle, and download.',
  },
  {
    slug: 'flip-pdf-pages',
    toolSlug: 'rotate-pdf',
    title: 'Flip PDF Pages Online — Rotate and Fix PDF Orientation',
    description: 'Flip and rotate PDF pages online for free. Correct page orientation in any PDF without software.',
    h1: 'Flip PDF Pages Online',
    intro: 'Scanned documents often come out with incorrect page orientation. Flip your PDF pages 90° or 180° to correct the orientation — free and instant.',
  },
  // delete-pdf-pages
  {
    slug: 'delete-pdf-pages-online',
    toolSlug: 'delete-pdf-pages',
    title: 'Delete PDF Pages Online — Remove Pages from PDF Free',
    description: 'Delete pages from a PDF online for free. Remove unwanted pages from any PDF without software.',
    h1: 'Delete PDF Pages Online',
    intro: 'Remove specific pages from a PDF file directly in your browser. Enter the page numbers you want to delete and download the updated document — no sign-up required.',
  },
  {
    slug: 'remove-pages-from-pdf',
    toolSlug: 'delete-pdf-pages',
    title: 'Remove Pages from PDF Online — Free Tool',
    description: 'Remove unwanted pages from a PDF file online for free. Delete single or multiple pages instantly.',
    h1: 'Remove Pages from PDF',
    intro: 'Whether it\'s a blank page at the end, a cover sheet you don\'t need, or confidential pages that shouldn\'t be shared — remove any pages from your PDF instantly and for free.',
  },
  {
    slug: 'delete-pages-from-pdf-free',
    toolSlug: 'delete-pdf-pages',
    title: 'Delete Pages from PDF Free — No Sign-Up Required',
    description: 'Delete pages from any PDF for free. No watermarks, no sign-up — remove PDF pages online instantly.',
    h1: 'Delete Pages from PDF for Free',
    intro: 'Delete any pages from a PDF file completely free. No account, no watermarks, no limits on the number of pages you can remove.',
  },
  // protect-pdf
  {
    slug: 'protect-pdf-online',
    toolSlug: 'protect-pdf',
    title: 'Password Protect PDF Online — Free PDF Protection',
    description: 'Add a password to a PDF online for free. Protect your PDF with 128-bit encryption instantly.',
    h1: 'Password Protect PDF Online',
    intro: 'Add a password to any PDF file directly in your browser. Your document is encrypted with 128-bit security and returned to you immediately — no sign-up, no storage.',
  },
  {
    slug: 'add-password-to-pdf',
    toolSlug: 'protect-pdf',
    title: 'Add Password to PDF Online — Free PDF Encryption',
    description: 'Add a password to your PDF file online for free. Encrypt PDF with 128-bit security without software.',
    h1: 'Add Password to PDF Online',
    intro: 'Secure any PDF with a password in seconds. Upload your file, set a password, and download the encrypted document — completely free with no account required.',
  },
  {
    slug: 'encrypt-pdf',
    toolSlug: 'protect-pdf',
    title: 'Encrypt PDF Online — Free PDF Encryption Tool',
    description: 'Encrypt a PDF file online for free. Add 128-bit password protection to any PDF without software.',
    h1: 'Encrypt PDF Online',
    intro: 'Encrypt any PDF with 128-bit AES encryption in seconds. A strong password combined with proper encryption keeps your document secure when sharing.',
  },
  // unlock-pdf
  {
    slug: 'unlock-pdf-online',
    toolSlug: 'unlock-pdf',
    title: 'Unlock PDF Online — Remove PDF Password Free',
    description: 'Unlock a password-protected PDF online for free. Remove PDF password instantly without any software.',
    h1: 'Unlock PDF Online',
    intro: 'Remove password protection from a PDF you own directly in your browser. Enter the current password to unlock the file and download a version that opens without restriction.',
  },
  {
    slug: 'remove-password-from-pdf',
    toolSlug: 'unlock-pdf',
    title: 'Remove Password from PDF Online — Free Tool',
    description: 'Remove a password from a PDF file online for free. Unlock protected PDFs without any software.',
    h1: 'Remove Password from PDF',
    intro: 'Tired of entering a password every time you open a PDF? Remove the password from any PDF you have access to — free, instant, and without any software.',
  },
  {
    slug: 'decrypt-pdf',
    toolSlug: 'unlock-pdf',
    title: 'Decrypt PDF Online — Remove PDF Encryption Free',
    description: 'Decrypt and unlock a password-protected PDF online for free. Remove encryption from PDF files instantly.',
    h1: 'Decrypt PDF Online',
    intro: 'Remove encryption from a PDF file you own. You\'ll need the current password — this tool removes the protection after you authenticate, not bypass it.',
  },
  // watermark-pdf
  {
    slug: 'watermark-pdf-online',
    toolSlug: 'watermark-pdf',
    title: 'Add Watermark to PDF Online — Free Watermark Tool',
    description: 'Add a text watermark to a PDF online for free. Watermark PDF files with custom text instantly.',
    h1: 'Add Watermark to PDF Online',
    intro: 'Add a custom text watermark to every page of your PDF — directly in your browser. Mark documents as Draft, Confidential, or add your own text, free and without sign-up.',
  },
  {
    slug: 'add-watermark-to-pdf',
    toolSlug: 'watermark-pdf',
    title: 'Add Watermark to PDF — Free Online Watermark Tool',
    description: 'Add custom text watermark to PDF files online for free. No software needed, no sign-up required.',
    h1: 'Add Watermark to PDF',
    intro: 'Protect your documents and assert ownership by adding a text watermark to every page of your PDF. Fast, free, and no account needed.',
  },
  {
    slug: 'stamp-pdf',
    toolSlug: 'watermark-pdf',
    title: 'Stamp PDF Online — Add Text Stamp to PDF Free',
    description: 'Add a text stamp to your PDF pages online for free. Stamp PDF with DRAFT, CONFIDENTIAL, or any custom text.',
    h1: 'Stamp PDF Pages Online',
    intro: 'Add a text stamp to every page of your PDF — use it to mark documents as DRAFT, CONFIDENTIAL, APPROVED, or any other label your workflow requires.',
  },
  // sign-pdf
  {
    slug: 'sign-pdf-online',
    toolSlug: 'sign-pdf',
    title: 'Sign PDF Online — Add Signature to PDF Free',
    description: 'Sign a PDF online for free. Draw your signature and embed it into any PDF without printing or software.',
    h1: 'Sign PDF Online',
    intro: 'Add your handwritten signature to any PDF directly in your browser. Draw with your mouse or finger, position it on the page, and download the signed document — no printing required.',
  },
  {
    slug: 'add-signature-to-pdf',
    toolSlug: 'sign-pdf',
    title: 'Add Signature to PDF Online — Free Signature Tool',
    description: 'Add your handwritten signature to a PDF online for free. No printing, no scanning, no software needed.',
    h1: 'Add Signature to PDF',
    intro: 'Skip the print-sign-scan workflow. Draw your signature directly on any PDF page and download the signed file in seconds — completely free.',
  },
  {
    slug: 'esign-pdf',
    toolSlug: 'sign-pdf',
    title: 'eSign PDF Online — Electronic Signature for PDF Free',
    description: 'Electronically sign a PDF online for free. Add an e-signature to any PDF without software or sign-up.',
    h1: 'eSign PDF Online',
    intro: 'Add an electronic signature to any PDF file — draw your signature in the browser, place it on the correct page, and download the signed document instantly.',
  },
  // crop-pdf
  {
    slug: 'crop-pdf-online',
    toolSlug: 'crop-pdf',
    title: 'Crop PDF Online — Trim PDF Pages Free',
    description: 'Crop PDF pages online for free. Remove margins and trim PDF page borders without any software.',
    h1: 'Crop PDF Pages Online',
    intro: 'Trim the margins from any PDF page directly in your browser. Set the crop area, preview the result, and download the cropped PDF — free and without sign-up.',
  },
  {
    slug: 'trim-pdf-margins',
    toolSlug: 'crop-pdf',
    title: 'Trim PDF Margins Online — Remove PDF White Space Free',
    description: 'Trim and remove margins from PDF pages online for free. Crop white space and borders from PDF files.',
    h1: 'Trim PDF Margins Online',
    intro: 'Remove oversized margins and white space from scanned documents, academic papers, or any PDF with unnecessary borders. Crop all pages at once — free and instant.',
  },
  {
    slug: 'remove-pdf-margins',
    toolSlug: 'crop-pdf',
    title: 'Remove PDF Margins Online — Crop PDF Borders Free',
    description: 'Remove margins from PDF pages online for free. Crop and trim PDF page borders without software.',
    h1: 'Remove PDF Margins',
    intro: 'Scanned documents and PDFs from certain sources often have large empty margins. Remove them instantly to make the content fill the page properly.',
  },
  // repair-pdf
  {
    slug: 'repair-pdf-online',
    toolSlug: 'repair-pdf',
    title: 'Repair PDF Online — Fix Corrupted PDF Free',
    description: 'Repair a corrupted or damaged PDF online for free. Fix PDF files that won\'t open without any software.',
    h1: 'Repair PDF Online',
    intro: 'Got a PDF that won\'t open or shows an error? Upload it here and let Ghostscript attempt to rebuild the file structure. Works best on mildly damaged files — no software needed.',
  },
  {
    slug: 'fix-corrupted-pdf',
    toolSlug: 'repair-pdf',
    title: 'Fix Corrupted PDF Online — Free PDF Repair Tool',
    description: 'Fix a corrupted or damaged PDF file online for free. Recover PDFs that fail to open or display errors.',
    h1: 'Fix Corrupted PDF Online',
    intro: 'A corrupted PDF can happen after a failed download, a storage error, or a crash during saving. This free tool attempts to rebuild the PDF structure and recover the content.',
  },
  {
    slug: 'recover-pdf',
    toolSlug: 'repair-pdf',
    title: 'Recover PDF File Online — Fix Damaged PDF Free',
    description: 'Recover and repair a damaged PDF file online for free. Rebuild corrupted PDF structure without software.',
    h1: 'Recover PDF File Online',
    intro: 'Try to recover a damaged or partially corrupted PDF file. The tool rebuilds the internal structure using Ghostscript and returns the best possible version of your document.',
  },
  // ocr-pdf
  {
    slug: 'ocr-pdf-online',
    toolSlug: 'ocr-pdf',
    title: 'OCR PDF Online — Make Scanned PDF Searchable Free',
    description: 'Run OCR on a PDF online for free. Make scanned PDFs searchable and selectable without any software.',
    h1: 'OCR PDF Online',
    intro: 'Convert a scanned PDF into a searchable document using OCR. The tool adds an invisible text layer to your PDF so you can search, copy, and select text — all in your browser.',
  },
  {
    slug: 'make-pdf-searchable',
    toolSlug: 'ocr-pdf',
    title: 'Make PDF Searchable Online — Free OCR PDF Tool',
    description: 'Make a scanned PDF searchable online for free. Add a text layer to scanned PDFs using OCR technology.',
    h1: 'Make PDF Searchable Online',
    intro: 'If you can\'t search or select text in your PDF, it\'s a scanned image. Use this free OCR tool to add a searchable text layer — making the document fully searchable in any PDF viewer.',
  },
  {
    slug: 'scanned-pdf-to-searchable',
    toolSlug: 'ocr-pdf',
    title: 'Convert Scanned PDF to Searchable PDF — Free OCR Tool',
    description: 'Convert a scanned PDF to a searchable PDF online for free. Add OCR text layer to any scanned document.',
    h1: 'Convert Scanned PDF to Searchable PDF',
    intro: 'Turn any scanned document into a fully searchable PDF using Tesseract OCR. After processing, you can search for text, copy passages, and use screen readers on the document.',
  },
  // extract-pdf-pages
  {
    slug: 'extract-pdf-pages-online',
    toolSlug: 'extract-pdf-pages',
    title: 'Extract PDF Pages Online — Free Page Extractor',
    description: 'Extract specific pages from a PDF online for free. Pick individual pages in any order and save as a new PDF.',
    h1: 'Extract PDF Pages Online',
    intro: 'Pick specific pages from any PDF and save them as a new document — in any order you choose. Free, instant, and no sign-up required.',
  },
  {
    slug: 'extract-pages-pdf-free',
    toolSlug: 'extract-pdf-pages',
    title: 'Extract PDF Pages Free — Save Specific Pages from PDF',
    description: 'Extract and save specific pages from a PDF for free. No sign-up, no watermarks — pick any pages from any PDF.',
    h1: 'Extract PDF Pages for Free',
    intro: 'Extract any combination of pages from a PDF completely free. No account, no watermarks — just select the pages you need and download.',
  },
  {
    slug: 'save-pdf-pages',
    toolSlug: 'extract-pdf-pages',
    title: 'Save Specific PDF Pages — Extract and Download PDF Pages Free',
    description: 'Save specific pages from a PDF file online for free. Extract and download individual PDF pages instantly.',
    h1: 'Save Specific Pages from PDF',
    intro: 'Don\'t need the whole document? Save just the pages you want. Select individual page numbers in any order and download them as a clean new PDF.',
  },
  // reorder-pdf-pages
  {
    slug: 'reorder-pdf-pages-online',
    toolSlug: 'reorder-pdf-pages',
    title: 'Reorder PDF Pages Online — Rearrange PDF Free',
    description: 'Reorder and rearrange PDF pages online for free. Drag and drop pages into the right order without software.',
    h1: 'Reorder PDF Pages Online',
    intro: 'Rearrange the pages in any PDF using a drag-and-drop interface. See thumbnail previews of each page, move them into the right order, and download the result — free.',
  },
  {
    slug: 'rearrange-pdf-pages',
    toolSlug: 'reorder-pdf-pages',
    title: 'Rearrange PDF Pages Online — Free Page Organizer',
    description: 'Rearrange pages in a PDF online for free. Drag and drop PDF pages into any order without any software.',
    h1: 'Rearrange PDF Pages Online',
    intro: 'Got a PDF where the pages are in the wrong order? Drag and drop the page thumbnails into the correct sequence and download the rearranged document — completely free.',
  },
  {
    slug: 'reorganize-pdf',
    toolSlug: 'reorder-pdf-pages',
    title: 'Reorganize PDF Pages Online — Free PDF Page Organizer',
    description: 'Reorganize and reorder pages in any PDF online for free. Sort and arrange PDF pages without software.',
    h1: 'Reorganize PDF Pages',
    intro: 'Reorganize the page order of any PDF document. Upload your file, drag the page thumbnails into the sequence you need, and download the result — no software, no sign-up.',
  },
]

export function getAllVariants() {
  return toolVariants
}

export function getVariantBySlug(slug: string) {
  return toolVariants.find((v) => v.slug === slug)
}
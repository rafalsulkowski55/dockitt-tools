export const ocrPdfTool = {
  slug: "ocr-pdf",
  name: "OCR PDF",
  title: "OCR PDF Online",
  description: "Make scanned PDFs searchable with OCR — add a text layer to any scanned document for free.",
  longDescription: `When you scan a physical document, the result is a PDF that looks like text but is actually just an image of text. You cannot search it, you cannot copy text from it, and screen readers cannot read it aloud. This is where OCR, which stands for Optical Character Recognition, comes in. OCR analyses the image of each page and identifies the characters, words, and sentences, then adds an invisible text layer on top of the image. The result is a PDF that looks identical to the original scan but now behaves like a proper text document. Dockitt uses ocrmypdf with the Tesseract engine, one of the most accurate open-source OCR systems available, to process your scanned PDFs.`,
  shortDescription: "Make scanned PDF files searchable online for free.",
  category: "utility",
  type: "process",
  primaryKeyword: "ocr pdf",
  secondaryKeywords: [
    "ocr pdf online",
    "make pdf searchable",
    "scanned pdf to searchable",
    "ocr pdf free",
    "add text layer to pdf",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["repair-pdf", "compress-pdf", "split-pdf", "merge-pdf"],
  howTo: [
    "Click 'Choose PDF' and select your scanned PDF document.",
    "Click 'Run OCR' and wait while Tesseract analyses each page and adds an invisible text layer to the document.",
    "Download the OCR-processed PDF.",
    "Open the file and press Ctrl+F on Windows or Cmd+F on Mac to search for text and verify the OCR worked correctly.",
  ],
  faqs: [
    {
      question: "How do I know if my PDF needs OCR?",
      answer: "Open your PDF and try to select or highlight any text on the page. If you cannot select text, or if selecting text produces garbled characters, the PDF is image-based and OCR will help. If you can select and copy text normally, the document already has a text layer and OCR is not needed. Another way to check is to use Ctrl+F to search for a word you can see on the page. If the search finds nothing, the document needs OCR.",
    },
    {
      question: "What affects OCR accuracy?",
      answer: "OCR accuracy depends heavily on the quality of the scan. High-resolution scans of at least 300 DPI with good contrast, straight pages, and clear printed text produce the best results. Low-resolution scans, pages with heavy shadows or creases, skewed text, faded ink, or unusual fonts will produce less accurate results. The OCR text layer is invisible in most viewers, so errors in the text layer do not affect the visual appearance of the document, but they do affect search accuracy.",
    },
    {
      question: "Can OCR handle handwritten text?",
      answer: "Standard OCR engines including Tesseract are optimised for printed text and struggle significantly with handwriting, especially cursive. Handwriting recognition requires specialised models that are not part of this tool. For handwritten documents, results will be unreliable and the tool is not recommended for that use case.",
    },
    {
      question: "Will OCR change how my PDF looks?",
      answer: "No. The visual appearance of the PDF remains identical to the original scan. OCR adds an invisible text layer underneath the page images. The scanned images themselves are not altered in any way. When you open the processed PDF, it looks exactly the same as before, but now supports text search, copy-paste, and screen reader access.",
    },
    {
      question: "After OCR, the file is much larger than the original. Why?",
      answer: "Adding a text layer increases the file size, particularly for high-resolution scans where the page images themselves are large. After OCR processing, run the file through the Dockitt Compress PDF tool to reduce the size. The compression will not remove the text layer, so the document will remain fully searchable after compression.",
    },
    {
      question: "Can I run OCR on a PDF that already has some text?",
      answer: "It is not recommended. If your PDF already contains selectable text on some pages, running OCR again may create overlapping text layers that cause issues with text selection and search. The OCR tool is designed for PDFs that are purely image-based scans with no existing text layer.",
    },
  ],
};
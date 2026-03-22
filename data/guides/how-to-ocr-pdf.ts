export const howToOcrPdf = {
  slug: "how-to-ocr-pdf",
  title: "How to Make a Scanned PDF Searchable with OCR",
  description: "Learn how to use OCR to add a searchable text layer to a scanned PDF — free and without any software.",
  intro: "When you scan a physical document, the result is a PDF that looks like text but is actually just an image of text. You can't search it, you can't copy text from it, and screen readers can't read it aloud. This is where OCR — Optical Character Recognition — comes in. OCR analyses the image of each page and identifies the characters, words, and sentences, then adds an invisible text layer on top of the image. The result is a PDF that looks identical to the original scan but now behaves like a proper text document — fully searchable, selectable, and accessible. Dockitt uses ocrmypdf with the Tesseract engine, one of the most accurate open-source OCR systems available, to process your scanned PDFs.",
  steps: [
    "Go to the Dockitt OCR PDF tool.",
    "Click 'Choose PDF' and upload your scanned PDF document.",
    "Click 'Run OCR' and wait while Tesseract analyses each page and adds the text layer.",
    "Download the OCR-processed PDF.",
    "Open the file in any PDF viewer and try using Ctrl+F (or Cmd+F on Mac) to search for text — it should now work.",
  ],
  commonProblems: [
    {
      problem: "The OCR result contains lots of errors and garbled text.",
      solution: "OCR accuracy depends heavily on scan quality. Low-resolution scans (below 150 DPI), pages with heavy shadows, skewed text, or faded ink will produce poor results. If possible, re-scan the document at 300 DPI or higher with good lighting and straight pages. The OCR text layer is invisible in most viewers, so errors in the text layer won't affect the visual appearance — but they will affect search accuracy.",
    },
    {
      problem: "The OCR process is very slow.",
      solution: "OCR is computationally intensive — Tesseract analyses every pixel on every page. A 50-page document may take a minute or more to process. This is normal. If the tool times out on very large files, try splitting the PDF into smaller sections and running OCR on each part separately.",
    },
    {
      problem: "The text is in a language other than English and OCR is inaccurate.",
      solution: "Tesseract supports over 100 languages but defaults to English. The current Dockitt implementation uses the English language model. For documents in other languages, accuracy may be reduced for characters or words that differ significantly from English patterns. Support for additional languages is planned.",
    },
    {
      problem: "After OCR, the file is much larger than the original.",
      solution: "Adding a text layer increases the file size, especially for high-resolution scans. After OCR processing, run the file through the Dockitt Compress PDF tool to reduce the size without losing the text layer.",
    },
    {
      problem: "The PDF already has text but OCR added a duplicate layer.",
      solution: "If your PDF already contains selectable text, running OCR again is unnecessary and may create overlapping text layers. Only use the OCR tool on PDFs that are purely image-based scans where text selection and search don't work.",
    },
  ],
  relatedTool: "ocr-pdf",
  relatedGuides: ["how-to-compress-pdf", "how-to-repair-pdf"],
  faqs: [
    {
      question: "What is OCR and how does it work?",
      answer: "OCR stands for Optical Character Recognition. It is a technology that analyses images containing text and identifies individual characters using pattern matching and machine learning models. Dockitt uses Tesseract, an open-source OCR engine originally developed by HP and now maintained by Google, combined with ocrmypdf to integrate the text layer cleanly into your PDF.",
    },
    {
      question: "Will OCR change how my PDF looks?",
      answer: "No. The visual appearance of the PDF remains identical to the original scan. OCR adds an invisible text layer underneath the page images — the scanned images themselves are not altered. When you open the processed PDF, it looks exactly the same as before, but now supports text search, copy-paste, and screen reader access.",
    },
    {
      question: "Can OCR handle handwritten text?",
      answer: "Standard OCR engines including Tesseract are optimised for printed text and struggle significantly with handwriting, especially cursive. Handwriting recognition requires specialised models that are not currently part of this tool. For handwritten documents, results will be unreliable.",
    },
    {
      question: "Does OCR work on PDFs with multiple columns or complex layouts?",
      answer: "Tesseract handles multi-column layouts reasonably well for simple two-column documents, but complex magazine-style layouts, tables, or mixed text-and-image pages may produce text that is out of order in the text layer. The visual appearance remains correct — only the order of text in the hidden layer may be inconsistent for complex layouts.",
    },
    {
      question: "Is the OCR text layer used for anything besides searching?",
      answer: "Yes. The text layer enables copy-pasting text from the PDF, makes the document accessible to screen readers for visually impaired users, allows text extraction for further processing, and improves the document's indexability by search engines if it is published online.",
    },
  ],
}
export const ocrPdfTool = {
  slug: "ocr-pdf",
  name: "OCR PDF",
  title: "OCR PDF — Make PDF Searchable Online",
  description: "Convert scanned PDF files into searchable and selectable text — free and without any sign-up.",
  longDescription: `OCR (Optical Character Recognition) converts scanned documents and image-based PDFs into searchable, selectable text. This is useful when you have a scanned contract, invoice, or any document where the text is actually an image and cannot be copied or searched. Our free OCR tool processes your PDF and returns a version where the text is fully selectable and searchable. No account required, and your file is deleted from our servers immediately after processing.`,
  shortDescription: "Make scanned PDF files searchable online for free.",
  category: "utility",
  type: "process",
  primaryKeyword: "ocr pdf",
  secondaryKeywords: [
    "ocr pdf online",
    "make pdf searchable",
    "pdf ocr free",
    "scanned pdf to text",
    "searchable pdf online",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["repair-pdf", "compress-pdf", "split-pdf"],
  howTo: [
    "Upload your scanned PDF file.",
    "Click Make Searchable.",
    "Download the searchable PDF.",
  ],
  faqs: [
    {
      question: "What is OCR?",
      answer: "OCR stands for Optical Character Recognition. It converts images of text into actual selectable and searchable text.",
    },
    {
      question: "Which languages are supported?",
      answer: "Our OCR tool supports English and most major European languages.",
    },
    {
      question: "Is this OCR tool free?",
      answer: "Yes, you can use OCR on PDF files online for free with no limits.",
    },
  ],
};
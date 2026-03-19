export const compressPdfTool = {
  slug: "compress-pdf",
  name: "Compress PDF",
  title: "Compress PDF Online",
  description: "Reduce PDF file size quickly with our free online PDF compressor.",
  longDescription: `Compressing a PDF reduces its file size, making it easier to share via email, upload to websites, or store on your device. Our free PDF compressor works by optimizing the structure of your PDF file removing redundant data and streamlining the document without affecting its content. This approach works best on text-heavy PDFs such as reports, contracts, presentations, and forms. If your PDF contains high-resolution images, the reduction in size may be smaller, as image data requires more advanced processing. No sign-up is required, and your file is deleted from our servers immediately after processing.`,
  shortDescription: "Compress PDF files online for free.",
  category: "core",
  type: "process",
  primaryKeyword: "compress pdf",
  secondaryKeywords: [
    "compress pdf online",
    "compress pdf free",
    "reduce pdf size",
    "compress pdf for email",
    "compress pdf to 1mb",
    "compress pdf to 100kb",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["merge-pdf", "split-pdf"],
  howTo: [
    "Upload your PDF file.",
    "Click Compress PDF.",
    "Download the compressed PDF.",
  ],
  faqs: [
    {
      question: "How do I compress a PDF?",
      answer: "Upload your PDF, click Compress PDF, and download the smaller file.",
    },
    {
      question: "Is this PDF compressor free?",
      answer: "Yes, you can compress PDF files online for free with no limits.",
    },
    {
      question: "What types of PDFs does this work best for?",
      answer: "This tool works best for text-based PDFs such as documents, forms, and presentations. PDFs that consist mostly of images may see a smaller reduction in file size.",
    },
    {
      question: "Why is my compressed file not much smaller?",
      answer: "If your PDF contains mostly images, the file size reduction may be limited. This tool optimizes the PDF structure, which works best on text-heavy files.",
    },
  ],
};
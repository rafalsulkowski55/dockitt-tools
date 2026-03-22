export const compressPdfTool = {
  slug: "compress-pdf",
  name: "Compress PDF",
  title: "Compress PDF Online",
  description: "Reduce PDF file size quickly with our free online PDF compressor.",
  longDescription: `Compressing a PDF reduces its file size, making it easier to share via email, upload to websites, or store on your device. Our free PDF compressor works by optimizing the structure of your PDF file, removing redundant data and streamlining the document without affecting its content. This approach works best on text-heavy PDFs such as reports, contracts, presentations, and forms. If your PDF contains high-resolution images, the reduction in size may be smaller, as image data requires more advanced processing. No sign-up is required, and your file is deleted from our servers immediately after processing.`,
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
      question: "How does PDF compression work?",
      answer: "PDF compression works by optimizing the internal structure of the file, removing redundant metadata, streamlining object references, and cleaning up file overhead that accumulates over time. Dockitt's compressor does not re-encode or degrade the visual content of your document. The result is a smaller file that looks and reads identically to the original.",
    },
    {
      question: "Why is my PDF not much smaller after compression?",
      answer: "If your PDF consists mostly of high-resolution images such as scanned documents or photo-heavy presentations, the compression gains will be modest. This is because the bulk of the file size comes from the image data itself, which this tool does not re-compress. For image-heavy PDFs, a tool that specifically re-encodes images at lower quality would be needed. For text-based PDFs, the reduction is typically more significant.",
    },
    {
      question: "Will compression affect the quality of my PDF?",
      answer: "No. The compression method used here optimizes the file structure without touching the visual content. Text remains sharp, images remain at their original resolution, and the document layout is fully preserved. What changes is only the internal overhead, not anything visible.",
    },
    {
      question: "What is the maximum file size I can compress?",
      answer: "Files up to 4.5MB can be processed directly. This limit is set by the server infrastructure used to process the file. If your PDF is larger than 4.5MB, try splitting it into smaller sections first, compressing each section, then merging them back together.",
    },
    {
      question: "Is it free to compress a PDF online?",
      answer: "Yes. Dockitt's PDF compressor is completely free to use with no sign-up, no subscription, and no limits on the number of files you can process.",
    },
    {
      question: "Is my file safe when I upload it for compression?",
      answer: "Yes. Your file is sent over an encrypted connection and processed on a secure server. It is deleted immediately after the compressed version is returned to you. Dockitt does not store, read, or share your files.",
    },
  ],
};
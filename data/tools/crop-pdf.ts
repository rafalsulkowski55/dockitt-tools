export const cropPdfTool = {
  slug: "crop-pdf",
  name: "Crop PDF",
  title: "Crop PDF Pages Online",
  description: "Crop pages in your PDF file online — free and without any sign-up.",
  longDescription: `Cropping a PDF removes unwanted margins or areas from your pages. This is useful for removing white borders, trimming scanned documents, or adjusting the visible area of a page. Our free tool lets you crop all pages in your PDF and download the result instantly. No account required, and your file is deleted from our servers immediately after processing.`,
  shortDescription: "Crop PDF pages online for free.",
  category: "utility",
  type: "process",
  primaryKeyword: "crop pdf",
  secondaryKeywords: [
    "crop pdf online",
    "crop pdf free",
    "crop pdf pages",
    "trim pdf margins",
    "remove pdf margins",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["rotate-pdf", "compress-pdf", "split-pdf"],
  howTo: [
    "Upload your PDF file.",
    "Set the crop margins.",
    "Download the cropped PDF.",
  ],
  faqs: [
    {
      question: "How do I crop a PDF?",
      answer: "Upload your PDF, set the crop margins, and download the cropped file.",
    },
    {
      question: "Can I crop individual pages?",
      answer: "Currently this tool crops all pages equally. Per-page cropping is coming soon.",
    },
    {
      question: "Is this PDF crop tool free?",
      answer: "Yes, you can crop PDF files online for free with no limits.",
    },
  ],
};
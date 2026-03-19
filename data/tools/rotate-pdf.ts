export const rotatePdfTool = {
  slug: "rotate-pdf",
  name: "Rotate PDF",
  title: "Rotate PDF Pages Online",
  description: "Rotate pages in your PDF file online — free and without any sign-up.",
  longDescription: `Sometimes PDF pages end up in the wrong orientation — scanned documents, exported files, or converted PDFs can all have pages that are sideways or upside down. Our free PDF rotation tool lets you rotate all pages in your PDF by 90 or 180 degrees and download the corrected file instantly. No account required, and your file is deleted immediately after processing.`,
  shortDescription: "Rotate PDF pages online for free.",
  category: "core",
  type: "process",
  primaryKeyword: "rotate pdf",
  secondaryKeywords: [
    "rotate pdf online",
    "rotate pdf free",
    "rotate pdf pages",
    "flip pdf pages",
    "turn pdf pages",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["compress-pdf", "merge-pdf", "split-pdf"],
  howTo: [
    "Upload your PDF file.",
    "Choose the rotation angle — 90°, 180°, or 270°.",
    "Download the rotated PDF.",
  ],
  faqs: [
    {
      question: "How do I rotate a PDF?",
      answer: "Upload your PDF, choose the rotation angle, and download the corrected file.",
    },
    {
      question: "Can I rotate just one page?",
      answer: "Currently this tool rotates all pages in the PDF. Per-page rotation is coming soon.",
    },
    {
      question: "Is this PDF rotation tool free?",
      answer: "Yes, you can rotate PDF files online for free with no limits.",
    },
  ],
};
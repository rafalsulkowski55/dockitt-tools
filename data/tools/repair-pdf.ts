export const repairPdfTool = {
  slug: "repair-pdf",
  name: "Repair PDF",
  title: "Repair PDF Online",
  description: "Fix corrupted or damaged PDF files online — free and without any sign-up.",
  longDescription: `A corrupted PDF can be frustrating — it may fail to open, display incorrectly, or cause errors in PDF readers. Our free repair tool attempts to fix common PDF issues by rebuilding the file structure and recovering as much content as possible. This works best for mildly corrupted files. No account required, and your file is deleted from our servers immediately after processing.`,
  shortDescription: "Repair corrupted PDF files online for free.",
  category: "utility",
  type: "process",
  primaryKeyword: "repair pdf",
  secondaryKeywords: [
    "repair pdf online",
    "fix corrupted pdf",
    "repair pdf free",
    "recover pdf file",
    "fix damaged pdf",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["compress-pdf", "split-pdf", "merge-pdf"],
  howTo: [
    "Upload your corrupted or damaged PDF file.",
    "Click Repair PDF.",
    "Download the repaired PDF.",
  ],
  faqs: [
    {
      question: "How do I repair a corrupted PDF?",
      answer: "Upload your PDF, click Repair PDF, and download the fixed file.",
    },
    {
      question: "Can all corrupted PDFs be repaired?",
      answer: "Not always. Severely corrupted files may not be fully recoverable. This tool works best for mildly damaged files.",
    },
    {
      question: "Is this PDF repair tool free?",
      answer: "Yes, you can repair PDF files online for free with no limits.",
    },
  ],
};
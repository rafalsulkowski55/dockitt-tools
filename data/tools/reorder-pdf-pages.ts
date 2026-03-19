export const reorderPdfPagesTool = {
  slug: "reorder-pdf-pages",
  name: "Reorder PDF Pages",
  title: "Reorder PDF Pages Online",
  description: "Change the order of pages in your PDF file online — free and without any sign-up.",
  longDescription: `Reordering pages in a PDF lets you reorganize a document without having to recreate it from scratch. This is useful when pages are in the wrong order after scanning, merging, or converting a document. Our free tool lets you drag and drop pages into the correct order and download the reorganized PDF instantly. No account required, and your file is deleted from our servers immediately after processing.`,
  shortDescription: "Reorder pages in PDF files online for free.",
  category: "utility",
  type: "process",
  primaryKeyword: "reorder pdf pages",
  secondaryKeywords: [
    "reorder pdf pages online",
    "rearrange pdf pages",
    "reorder pdf free",
    "change page order pdf",
    "reorganize pdf pages",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["merge-pdf", "split-pdf", "delete-pdf-pages"],
  howTo: [
    "Upload your PDF file.",
    "Drag and drop pages into the desired order.",
    "Download the reordered PDF.",
  ],
  faqs: [
    {
      question: "How do I reorder pages in a PDF?",
      answer: "Upload your PDF, drag and drop pages into the correct order, and download the result.",
    },
    {
      question: "Can I move multiple pages at once?",
      answer: "Currently you can move pages one at a time. Batch reordering is coming soon.",
    },
    {
      question: "Is this tool free?",
      answer: "Yes, you can reorder PDF pages online for free with no limits.",
    },
  ],
};
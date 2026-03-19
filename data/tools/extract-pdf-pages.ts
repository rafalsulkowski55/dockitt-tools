export const extractPdfPagesTool = {
  slug: "extract-pdf-pages",
  name: "Extract PDF Pages",
  title: "Extract Pages from PDF Online",
  description: "Extract specific pages from your PDF file and save them as a new document — free and without any sign-up.",
  longDescription: `Extracting pages from a PDF lets you save specific pages as a separate document without modifying the original file. This is useful when you need to share just one section of a larger document, pull out specific pages for review, or create a new document from selected pages. Our free tool lets you specify which pages to extract and download them as a new PDF instantly. No account required, and your file is deleted from our servers immediately after processing.`,
  shortDescription: "Extract pages from PDF files online for free.",
  category: "utility",
  type: "process",
  primaryKeyword: "extract pdf pages",
  secondaryKeywords: [
    "extract pages from pdf",
    "extract pdf pages online",
    "extract pdf pages free",
    "save pdf pages",
    "pull pages from pdf",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["split-pdf", "delete-pdf-pages", "merge-pdf"],
  howTo: [
    "Upload your PDF file.",
    "Enter the page numbers you want to extract.",
    "Download the new PDF with extracted pages.",
  ],
  faqs: [
    {
      question: "How do I extract pages from a PDF?",
      answer: "Upload your PDF, enter the page numbers you want to extract, and download the result.",
    },
    {
      question: "What is the difference between extract and split?",
      answer: "Split divides a PDF by page range. Extract lets you pick specific pages that don't have to be consecutive.",
    },
    {
      question: "Is this tool free?",
      answer: "Yes, you can extract pages from PDF files online for free with no limits.",
    },
  ],
};
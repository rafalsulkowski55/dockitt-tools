export const splitPdfTool = {
  slug: "split-pdf",
  name: "Split PDF",
  title: "Split PDF Online",
  description: "Split a PDF file into separate pages or extract a range of pages for free.",
  longDescription: `Splitting a PDF lets you extract specific pages or sections from a larger document. This is useful when you need to share only part of a file, separate chapters, or extract a single page from a multi-page document. Our free PDF splitter lets you specify a page range and download just the pages you need without touching the rest of the file. No account is required, and your file is deleted from our servers immediately after processing.`,
  shortDescription: "Split PDF files into separate pages online for free.",
  category: "core",
  type: "process",
  primaryKeyword: "split pdf",
  secondaryKeywords: [
    "split pdf online",
    "split pdf free",
    "extract pages from pdf",
    "split pdf into pages",
    "separate pdf pages",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["merge-pdf", "compress-pdf"],
  howTo: [
    "Upload your PDF file.",
    "Enter the page range you want to extract.",
    "Download the new PDF with selected pages.",
  ],
  faqs: [
    {
      question: "How do I split a PDF?",
      answer: "Upload your PDF, enter the page range you want to extract, and download the result.",
    },
    {
      question: "Is this PDF splitter free?",
      answer: "Yes, you can split PDF files online for free with no limits.",
    },
    {
      question: "Can I extract specific pages?",
      answer: "Yes, you can specify a page range to extract from your PDF.",
    },
  ],
};
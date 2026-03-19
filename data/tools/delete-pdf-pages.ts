export const deletePdfPagesTool = {
  slug: "delete-pdf-pages",
  name: "Delete PDF Pages",
  title: "Delete Pages from PDF Online",
  description: "Remove unwanted pages from your PDF file online — free and without any sign-up.",
  longDescription: `Removing pages from a PDF is useful when you need to clean up a document, remove a cover page, or delete blank or unwanted pages before sharing. Our free tool lets you specify which pages to remove and download the cleaned-up PDF instantly. No account required, and your file is deleted from our servers immediately after processing.`,
  shortDescription: "Delete pages from PDF files online for free.",
  category: "core",
  type: "process",
  primaryKeyword: "delete pdf pages",
  secondaryKeywords: [
    "delete pages from pdf",
    "remove pages from pdf",
    "delete pdf pages online",
    "remove pdf pages free",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["split-pdf", "extract-pdf-pages", "compress-pdf"],
  howTo: [
    "Upload your PDF file.",
    "Enter the page numbers you want to delete.",
    "Download the updated PDF.",
  ],
  faqs: [
    {
      question: "How do I delete pages from a PDF?",
      answer: "Upload your PDF, enter the page numbers you want to remove, and download the result.",
    },
    {
      question: "Can I delete multiple pages at once?",
      answer: "Yes, you can specify multiple page numbers to delete in one go.",
    },
    {
      question: "Is this tool free?",
      answer: "Yes, you can delete pages from PDF files online for free with no limits.",
    },
  ],
};
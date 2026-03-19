export const mergePdfTool = {
  slug: "merge-pdf",
  name: "Merge PDF",
  title: "Merge PDF Files Online",
  description: "Combine multiple PDF files into one document quickly and for free.",
  longDescription: `Merging PDF files lets you combine multiple documents into a single, organized file. This is useful when you need to send several documents together, create a combined report, or simply keep related files in one place. Our free PDF merger lets you upload as many files as you need, arrange them in the right order, and download the result instantly. No account is required, and your files are deleted from our servers immediately after processing.`,
  shortDescription: "Merge multiple PDF files into one online for free.",
  category: "core",
  type: "process",
  primaryKeyword: "merge pdf",
  secondaryKeywords: [
    "merge pdf online",
    "merge pdf free",
    "combine pdf files",
    "join pdf files",
    "merge pdf files into one",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["split-pdf", "compress-pdf"],
  howTo: [
    "Upload two or more PDF files.",
    "Arrange them in the desired order.",
    "Download the merged PDF.",
  ],
  faqs: [
    {
      question: "How do I merge PDF files?",
      answer: "Upload your PDF files, arrange them in order, and download the combined file.",
    },
    {
      question: "Is this PDF merger free?",
      answer: "Yes, you can merge PDF files online for free with no limits.",
    },
    {
      question: "How many files can I merge?",
      answer: "You can merge multiple PDF files at once.",
    },
  ],
};
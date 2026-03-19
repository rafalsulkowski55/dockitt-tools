export const protectPdfTool = {
  slug: "protect-pdf",
  name: "Protect PDF",
  title: "Protect PDF with Password Online",
  description: "Add a password to your PDF file online — free and without any sign-up.",
  longDescription: `Password protecting a PDF prevents unauthorized access to sensitive documents. This is useful for contracts, financial reports, personal documents, or any file you want to keep private. Our free tool lets you add a password to your PDF and download the protected file instantly. No account required, and your file is deleted from our servers immediately after processing.`,
  shortDescription: "Password protect PDF files online for free.",
  category: "security",
  type: "process",
  primaryKeyword: "protect pdf",
  secondaryKeywords: [
    "password protect pdf",
    "protect pdf online",
    "lock pdf file",
    "add password to pdf",
    "protect pdf free",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["unlock-pdf", "compress-pdf", "watermark-pdf"],
  howTo: [
    "Upload your PDF file.",
    "Enter the password you want to set.",
    "Download the password-protected PDF.",
  ],
  faqs: [
    {
      question: "How do I password protect a PDF?",
      answer: "Upload your PDF, enter your chosen password, and download the protected file.",
    },
    {
      question: "Is this PDF protection tool free?",
      answer: "Yes, you can password protect PDF files online for free with no limits.",
    },
    {
      question: "Can I remove the password later?",
      answer: "Yes, you can use our Unlock PDF tool to remove the password if you know it.",
    },
  ],
};
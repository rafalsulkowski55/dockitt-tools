export const unlockPdfTool = {
  slug: "unlock-pdf",
  name: "Unlock PDF",
  title: "Unlock PDF Online",
  description: "Remove password protection from your PDF file online — free and without any sign-up.",
  longDescription: `If you have a password-protected PDF and know the password, our free tool lets you remove the protection and download an unlocked version of the file. This is useful when you need to edit, print, or share a document that has been locked. You must know the original password to unlock the file. No account required, and your file is deleted from our servers immediately after processing.`,
  shortDescription: "Remove password from PDF files online for free.",
  category: "security",
  type: "process",
  primaryKeyword: "unlock pdf",
  secondaryKeywords: [
    "unlock pdf online",
    "remove pdf password",
    "unlock pdf free",
    "decrypt pdf",
    "pdf password remover",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["protect-pdf", "compress-pdf", "watermark-pdf"],
  howTo: [
    "Upload your password-protected PDF file.",
    "Enter the current password.",
    "Download the unlocked PDF.",
  ],
  faqs: [
    {
      question: "How do I unlock a PDF?",
      answer: "Upload your PDF, enter the password, and download the unlocked file.",
    },
    {
      question: "Do I need to know the password?",
      answer: "Yes, you must know the original password to unlock the file. This tool cannot crack or bypass passwords.",
    },
    {
      question: "Is this PDF unlock tool free?",
      answer: "Yes, you can unlock PDF files online for free with no limits.",
    },
  ],
};
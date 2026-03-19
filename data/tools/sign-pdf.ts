export const signPdfTool = {
  slug: "sign-pdf",
  name: "Sign PDF",
  title: "Sign PDF Online",
  description: "Add your signature to a PDF file online — free and without any sign-up.",
  longDescription: `Signing a PDF digitally saves time and eliminates the need to print, sign, and scan documents. Our free tool lets you draw or type your signature and place it anywhere on your PDF. This is useful for contracts, agreements, forms, and any document that requires a signature. No account required, and your file is deleted from our servers immediately after processing.`,
  shortDescription: "Sign PDF files online for free.",
  category: "security",
  type: "process",
  primaryKeyword: "sign pdf",
  secondaryKeywords: [
    "sign pdf online",
    "sign pdf free",
    "add signature to pdf",
    "digital signature pdf",
    "electronic signature pdf",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["protect-pdf", "watermark-pdf", "compress-pdf"],
  howTo: [
    "Upload your PDF file.",
    "Draw or type your signature.",
    "Place the signature on the page and download the signed PDF.",
  ],
  faqs: [
    {
      question: "How do I sign a PDF online?",
      answer: "Upload your PDF, draw or type your signature, place it on the page, and download the signed file.",
    },
    {
      question: "Is this a legally valid signature?",
      answer: "Electronic signatures are legally valid in many countries. Check your local laws for specific requirements.",
    },
    {
      question: "Is this PDF signing tool free?",
      answer: "Yes, you can sign PDF files online for free with no limits.",
    },
  ],
};
export const howToSignPdf = {
  slug: "how-to-sign-pdf",
  title: "How to Sign a PDF Online",
  description: "Learn how to draw and add your signature to a PDF file online — free, fast, and without printing anything.",
  intro: "Printing a document just to sign it and scan it back is one of the most unnecessary steps in modern document workflows. If you've received a contract, an agreement, or a form that needs your signature, you can sign it directly in your browser using Dockitt — no printing, no scanning, no PDF editor required. You draw your signature with your mouse or finger, and it gets embedded directly into the PDF page at the position you choose.",
  steps: [
    "Go to the Dockitt Sign PDF tool.",
    "Click 'Choose PDF' and upload the document you need to sign.",
    "The tool will render a preview of the first page. Use your mouse or finger to draw your signature in the signature area.",
    "Position the signature on the page where it needs to appear.",
    "Click 'Apply Signature' to embed it into the document.",
    "Download the signed PDF.",
  ],
  commonProblems: [
    {
      problem: "My signature looks messy or shaky when drawn with a mouse.",
      solution: "Drawing with a mouse is harder than with a stylus or finger on a touchscreen. Try drawing slowly and deliberately. On a phone or tablet, use your finger or a stylus for a much cleaner result. You can also try multiple times — clear the canvas and redraw until you're happy with it.",
    },
    {
      problem: "The signature is placed on the wrong page.",
      solution: "The current tool places the signature on the page shown in the preview. If your signature needs to go on a different page, use the Split PDF tool to separate that page, sign it, then merge it back with the rest of the document.",
    },
    {
      problem: "The recipient says the PDF is not legally signed.",
      solution: "A drawn signature embedded in a PDF is a visual signature, not a cryptographic digital signature with a certificate. For legally binding electronic signatures with audit trails, you need a dedicated e-signature platform such as DocuSign or Adobe Sign. Dockitt's sign tool is suitable for informal agreements, internal documents, and situations where a visual signature is sufficient.",
    },
    {
      problem: "The signature background is white and covers the text behind it.",
      solution: "The tool embeds the signature as a transparent PNG overlay where possible. If you notice a white background, try re-signing — make sure not to fill the signature canvas with any background colour.",
    },
  ],
  relatedTool: "sign-pdf",
  relatedGuides: ["how-to-protect-pdf", "how-to-watermark-pdf"],
  faqs: [
    {
      question: "Is a drawn signature on a PDF legally valid?",
      answer: "In many countries, a handwritten signature image embedded in a PDF is considered a valid signature for informal and internal documents. However, for legally binding contracts that may be disputed, a certified electronic signature platform with identity verification and audit trails provides stronger legal standing. Check the legal requirements in your jurisdiction before relying on a drawn signature for high-stakes documents.",
    },
    {
      question: "Can I save my signature and reuse it?",
      answer: "Currently the signature canvas is cleared each session. Reusable saved signatures are planned for a future update.",
    },
    {
      question: "Can I sign on a mobile device?",
      answer: "Yes — and it works better on mobile. Using your finger or a stylus on a touchscreen produces a much more natural-looking signature than drawing with a mouse on a desktop.",
    },
    {
      question: "Does the signature get embedded permanently into the PDF?",
      answer: "Yes. Once applied, the signature is embedded into the page content of the PDF. It cannot be removed without a professional PDF editor.",
    },
    {
      question: "Can I add my signature to multiple pages?",
      answer: "The tool currently supports signing one page at a time. For multi-page signing, apply the signature to each page separately or use a dedicated e-signature service.",
    },
  ],
}
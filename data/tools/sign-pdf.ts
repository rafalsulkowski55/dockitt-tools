export const signPdfTool = {
  slug: "sign-pdf",
  name: "Sign PDF",
  title: "Sign PDF Online",
  description: "Add your handwritten signature to a PDF file online — free, without printing or scanning.",
  longDescription: `Printing a document just to sign it and scan it back is one of the most unnecessary steps in modern document workflows. If you have received a contract, an agreement, or a form that needs your signature, you can sign it directly in your browser using Dockitt. Draw your signature with your mouse or finger, position it on the page, and download the signed PDF in seconds. No printing, no scanning, no PDF editor required. The signature is embedded directly into the page content of the document and cannot be moved or removed without specialist tools.`,
  shortDescription: "Sign PDF files online for free.",
  category: "security",
  type: "process",
  primaryKeyword: "sign pdf",
  secondaryKeywords: [
    "sign pdf online",
    "add signature to pdf",
    "esign pdf",
    "electronic signature pdf",
    "sign pdf free",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["protect-pdf", "watermark-pdf"],
  howTo: [
    "Upload your PDF file.",
    "Draw your signature in the signature area using your mouse or finger.",
    "Position the signature on the correct page.",
    "Click Apply Signature to embed it into the document.",
    "Download the signed PDF.",
  ],
  faqs: [
    {
      question: "Is a drawn signature on a PDF legally valid?",
      answer: "A handwritten signature drawn in a browser and embedded in a PDF is a visual signature. In many countries and for many document types, a visual signature is considered valid, particularly for internal documents, agreements between parties who have consented to electronic signing, and informal contracts. For high-stakes legal documents such as property transactions or financial agreements that may be disputed, a certified electronic signature platform with an audit trail and identity verification provides much stronger legal standing. Dockitt's Sign PDF tool is best suited for informal use cases where a visual representation of a signature is sufficient.",
    },
    {
      question: "My signature looks messy when drawn with a mouse. What can I do?",
      answer: "Drawing with a mouse is genuinely harder than with a stylus or finger on a touchscreen. On a phone or tablet, using your finger or a stylus produces a much more natural-looking signature. On a desktop, try drawing slowly and deliberately, and remember you can clear the canvas and redraw as many times as you like before applying it to the document. Taking your time with the drawing makes a significant difference to the result.",
    },
    {
      question: "Can I save my signature and reuse it?",
      answer: "Currently the signature canvas is cleared each session. If you need to sign multiple documents, you can keep the browser tab open and sign each document in sequence before closing. Reusable saved signatures are planned for a future update.",
    },
    {
      question: "Does the signature get embedded permanently into the PDF?",
      answer: "Yes. Once applied, the signature is embedded into the page content of the PDF as a permanent element. It cannot be moved, resized, or removed without a professional PDF editing application. This is intentional, as it gives the signature the same permanence as a handwritten signature on a physical document.",
    },
    {
      question: "Can I add my signature to multiple pages?",
      answer: "The tool currently supports placing a signature on one page at a time. For documents requiring signatures on multiple pages, you would need to apply the signature page by page. For multi-page signing workflows, a dedicated e-signature service would be more efficient.",
    },
    {
      question: "What is the difference between signing a PDF and adding a watermark?",
      answer: "A signature is a personal mark placed at a specific location on a specific page, indicating your agreement or approval of the document content. A watermark is a repeated text pattern applied across every page of the document, used to indicate status, ownership, or confidentiality. They serve different purposes and can be used together on the same document.",
    },
  ],
};
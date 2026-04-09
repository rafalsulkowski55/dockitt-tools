export const howToSignPdf = {
  slug: "how-to-sign-pdf",
  title: "How to Sign a PDF Online",
  description: "Learn how to draw and add your signature to a PDF file online, free, fast, and without printing anything.",
  intro: "Printing a document just to sign it and scan it back is one of the most unnecessary steps in modern document workflows. If you have received a contract, an agreement, or a form that needs your signature, you can sign it directly in your browser using Dockitt with no printing, no scanning, and no PDF editor required. You draw your signature with your mouse or finger and it gets embedded directly into the PDF page.",
  introList: [
    "Sign a contract or agreement received as a PDF without printing it",
    "Add your signature to a form before submitting it",
    "Sign an internal document or approval before sending it back",
    "Add a signature to a PDF on your phone or tablet without any apps",
    "Sign a document when you do not have access to a printer or scanner",
  ],
  introOutro: "The signature is embedded permanently into the page content of the PDF and the signed file is ready to download and send in seconds.",
  sections: [
    {
      title: "How to sign a PDF online - step by step",
      steps: [
        "Open the Dockitt Sign PDF tool in your browser.",
        "Click 'Choose PDF' or drag and drop the document you need to sign into the upload area.",
        "The tool will show a preview of the PDF page. Locate the signature area on the document.",
        "Use your mouse or finger to draw your signature in the signature canvas.",
        "If the signature does not look right, clear the canvas and draw it again.",
        "Position the signature on the page where it needs to appear.",
        "Click 'Apply Signature' to embed it into the document.",
        "Click 'Download' to save the signed PDF to your device.",
      ],
    },
    {
      title: "Tips for getting a good signature",
      intro: "The quality of a drawn signature varies significantly depending on the input device and technique. Here are the most effective approaches.",
      items: [
        "Use a touchscreen device for the best results: Drawing a signature with your finger or a stylus on a phone or tablet produces a much more natural and fluid result than drawing with a mouse on a desktop computer. If you have a phone or tablet available, use it for signing.",
        "Draw slowly and deliberately: Whether using a mouse or touch, draw slowly rather than quickly. Fast movements with a mouse tend to produce jagged lines. Slow, deliberate strokes produce smoother curves.",
        "Use a graphics tablet if available: If you regularly need to add signatures to PDFs, a low-cost graphics tablet gives much better results than a mouse and is more precise than a finger on glass.",
        "Practise on paper first: If your handwritten signature is important for the document, practise it a few times on paper to find the version you want to reproduce digitally, then draw that version on the canvas.",
        "Simplify your signature if needed: Many people use a simplified version of their signature for digital signing. A clear, consistent mark that you can reproduce reliably is more useful than a complex signature that looks different every time.",
        "Try multiple times: Clear the canvas and redraw as many times as needed. There is no limit to how many attempts you can make before applying the signature.",
      ],
    },
    {
      title: "Visual signatures vs digital signatures",
      intro: "There are two fundamentally different types of electronic signatures and understanding the difference is important before using a signed PDF for official purposes.",
      items: [
        "Visual signatures: A visual signature is an image of a handwritten signature embedded into a PDF page. It looks like a handwritten signature but has no cryptographic properties. Anyone with a PDF editor could in principle remove or replace it. Dockitt creates visual signatures.",
        "Digital signatures with certificates: A cryptographic digital signature uses a digital certificate issued by a trusted authority to create a mathematically verifiable link between the signature and the signer's identity. The signature cannot be forged or altered without detection. Platforms such as DocuSign, Adobe Sign, and HelloSign create certified digital signatures.",
        "When a visual signature is sufficient: For internal documents, informal agreements between parties who trust each other, personal forms, and situations where a visual mark is all that is expected, a visual signature is entirely appropriate and widely accepted.",
        "When a certified digital signature is required: For high-stakes legal contracts, property transactions, financial agreements, documents that may be legally disputed, or any situation where you need to prove identity and intent with a verifiable audit trail, use a certified e-signature platform.",
        "Check the requirements first: If you are unsure whether a visual signature is acceptable for a particular document, check with the other party or a legal adviser before signing. Different industries and jurisdictions have different requirements.",
      ],
    },
    {
      title: "Signing PDFs on different devices",
      intro: "The signing experience varies depending on the device you are using. Here is what to expect on each platform.",
      items: [
        "iPhone and iPad: Use Safari or Chrome. Tap the upload area to select the PDF from your Files app or Photos. Draw your signature with your finger directly on the touchscreen. The result is usually clean and natural-looking. An Apple Pencil on iPad produces excellent results.",
        "Android phone and tablet: Use Chrome. Select the PDF from your device storage or Google Drive. Draw with your finger or a stylus. The touchscreen input produces good results on most modern Android devices.",
        "Mac: Use Safari or Chrome. Drawing with a trackpad is better than a mouse but still less natural than a touchscreen. For the best results on Mac, use an iPhone or iPad to sign instead.",
        "Windows PC: Use Chrome or Edge. Drawing with a mouse is possible but produces less natural results than touch input. A touchscreen laptop or a graphics tablet significantly improves the quality.",
        "Chromebook: Use Chrome. Chromebooks with touchscreens allow finger signing. Non-touchscreen Chromebooks work with a mouse.",
      ],
    },
    {
      title: "After signing - what to check",
      intro: "Before sending a signed PDF, take a moment to verify the result.",
      items: [
        "Check the signature position: Open the downloaded PDF and confirm the signature appears in the correct location on the page. If it is misplaced, re-sign the document.",
        "Check that the signature is legible: The signature should be clear and recognisable. If it looks too faint or too jagged, consider re-signing.",
        "Check the rest of the document: Scroll through the document to confirm no other content was affected. Signing should not alter any other part of the PDF.",
        "Send through a secure channel: If the signed document is sensitive, consider sending it through a secure channel rather than unencrypted email. If required, add password protection using the Dockitt Protect PDF tool before sending.",
        "Keep a copy for your records: Save a copy of the signed PDF for your own records before sending it. Once sent, you may not be able to recover it if needed later.",
      ],
    },
    {
      title: "Signing documents that require multiple signatures",
      intro: "Some documents require signatures from multiple parties. Here is how to handle multi-party signing with a simple PDF signing tool.",
      items: [
        "Sign and pass: The first signer signs the PDF and sends it to the next signer. Each person adds their signature in turn. This works for simple documents with a small number of signers.",
        "Position matters: Each signer should place their signature in the designated area for their signature. If the document has multiple signature fields, make sure each person signs in the correct location.",
        "Limitations: This approach does not provide an audit trail or cryptographic verification of who signed and when. For legally sensitive multi-party documents, a certified e-signature platform is more appropriate.",
        "Name and date: If the document does not have printed name and date fields, consider adding them manually near each signature so it is clear who signed and when.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "My signature looks messy or shaky when drawn with a mouse.",
      solution: "Drawing with a mouse is harder than with a stylus or finger on a touchscreen. Try drawing slowly and deliberately. On a phone or tablet, use your finger or a stylus for a much cleaner result. You can clear the canvas and redraw as many times as needed.",
    },
    {
      problem: "The signature is placed on the wrong page.",
      solution: "The tool places the signature on the page shown in the preview. If your signature needs to go on a different page, use the Split PDF tool to separate that page, sign it, then merge it back with the rest of the document using the Merge PDF tool.",
    },
    {
      problem: "The recipient says the PDF is not legally signed.",
      solution: "A drawn signature embedded in a PDF is a visual signature, not a cryptographic digital signature with a certificate. For legally binding electronic signatures with audit trails, use a dedicated e-signature platform such as DocuSign or Adobe Sign. Dockitt's sign tool is suitable for informal agreements, internal documents, and situations where a visual signature is accepted.",
    },
    {
      problem: "The signature background is white and covers the text behind it.",
      solution: "The tool embeds the signature as a transparent overlay. If you see a white background, try re-signing and make sure not to fill the signature canvas with any background strokes outside the signature itself.",
    },
    {
      problem: "The PDF is password protected and cannot be signed.",
      solution: "Unlock the PDF first using the Dockitt Unlock PDF tool, then sign the unlocked file. Re-protect it with a password after signing if needed.",
    },
  ],
  relatedTools: [
    { name: "Protect PDF", slug: "protect-pdf", description: "Add a password to the signed PDF before sending." },
    { name: "Watermark PDF", slug: "watermark-pdf", description: "Add a watermark in addition to a signature." },
    { name: "Merge PDF", slug: "merge-pdf", description: "Merge signed pages back into the full document." },
  ],
  relatedTool: "sign-pdf",
  relatedGuides: ["how-to-protect-pdf", "how-to-watermark-pdf"],
  faqs: [
    {
      question: "Is a drawn signature on a PDF legally valid?",
      answer: "In many countries, a handwritten signature image embedded in a PDF is considered a valid signature for informal and internal documents. For legally binding contracts that may be disputed, a certified electronic signature platform with identity verification and audit trails provides stronger legal standing. Check the legal requirements in your jurisdiction before relying on a drawn signature for high-stakes documents.",
    },
    {
      question: "Can I save my signature and reuse it?",
      answer: "Currently the signature canvas is cleared each session. Reusable saved signatures are planned for a future update.",
    },
    {
      question: "Can I sign on a mobile device?",
      answer: "Yes, and it works better on mobile. Using your finger or a stylus on a touchscreen produces a much more natural-looking signature than drawing with a mouse on a desktop.",
    },
    {
      question: "Does the signature get embedded permanently into the PDF?",
      answer: "Yes. Once applied, the signature is embedded into the page content of the PDF. It cannot be removed without a professional PDF editor.",
    },
    {
      question: "Can I add my signature to multiple pages?",
      answer: "The tool currently supports signing one page at a time. For multi-page signing, apply the signature to each page separately or use a dedicated e-signature service.",
    },
    {
      question: "What is the difference between a visual signature and a digital signature?",
      answer: "A visual signature is an image of a handwritten signature embedded into the PDF. It has no cryptographic properties. A digital signature uses a certificate to create a mathematically verifiable link between the signature and the signer's identity. For informal documents a visual signature is sufficient. For legally sensitive documents requiring proof of identity, use a certified e-signature platform.",
    },
    {
      question: "Can I sign a PDF on my phone without installing any app?",
      answer: "Yes. The Dockitt Sign PDF tool works directly in mobile browsers on both iPhone and Android. No app installation is required. Open the tool in Safari or Chrome, upload the PDF, draw your signature, and download the signed file.",
    },
  ],
  ctaText: "Ready to sign your PDF without printing? Use the free Dockitt tool below.",
  ctaLinks: [
    { name: "Sign PDF", slug: "sign-pdf", description: "Add your signature to a PDF online for free" },
  ],
}
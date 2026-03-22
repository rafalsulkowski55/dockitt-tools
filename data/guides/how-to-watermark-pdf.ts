export const howToWatermarkPdf = {
  slug: "how-to-watermark-pdf",
  title: "How to Add a Watermark to a PDF Online",
  description: "Learn how to add a text watermark to a PDF file online — protect your documents and mark them as draft, confidential, or your own.",
  intro: "Watermarks serve several practical purposes — marking a document as 'Draft' before it's finalised, stamping 'Confidential' on sensitive files before sharing, or adding your name or company to documents you've created to deter unauthorised copying. Unlike image watermarks that can sometimes be cropped out, a text watermark embedded directly into a PDF's page content is much harder to remove without dedicated tools. Dockitt lets you add a custom text watermark to every page of your PDF in seconds, without any software.",
  steps: [
    "Go to the Dockitt Watermark PDF tool.",
    "Click 'Choose PDF' and upload the file you want to watermark.",
    "Enter the watermark text — for example 'CONFIDENTIAL', 'DRAFT', or your name.",
    "Click 'Add Watermark' and wait for the tool to process.",
    "Download the watermarked PDF.",
  ],
  commonProblems: [
    {
      problem: "The watermark text is too small or too large.",
      solution: "The current tool applies a standard size watermark optimised for A4 documents. If the size doesn't suit your needs, consider adjusting the text itself — shorter text appears larger, longer text appears smaller relative to the page.",
    },
    {
      problem: "The watermark is covering important content and making the document hard to read.",
      solution: "Watermarks are intentionally semi-transparent so the underlying content remains visible. If the overlap is causing readability issues, try using a shorter watermark text or position your content with margins in mind when creating future documents.",
    },
    {
      problem: "I need to remove a watermark from a PDF.",
      solution: "Removing a watermark that has been embedded into a PDF's page content requires a professional PDF editor such as Adobe Acrobat Pro. Simple online tools cannot reliably remove embedded text watermarks — which is exactly what makes them effective as a protection measure.",
    },
    {
      problem: "The watermark appears on some pages but not others.",
      solution: "The Dockitt watermark tool applies the watermark to every page in the document equally. If the watermark appears inconsistent, it may be due to varying page sizes or orientations within the PDF. Try rotating all pages to the same orientation first.",
    },
  ],
  relatedTool: "watermark-pdf",
  relatedGuides: ["how-to-protect-pdf", "how-to-sign-pdf"],
  faqs: [
    {
      question: "Can I add an image watermark instead of text?",
      answer: "Currently Dockitt supports text watermarks only. Image watermarks — such as a company logo — are on our roadmap for a future update.",
    },
    {
      question: "Will the watermark appear on every page?",
      answer: "Yes. The watermark is applied to every page in the document. There is no option to apply it to selected pages only at this time.",
    },
    {
      question: "Can someone easily remove the watermark I've added?",
      answer: "A text watermark embedded into the page content of a PDF is significantly harder to remove than a simple annotation or overlay. While professional PDF editors can attempt removal, the process is time-consuming and often imperfect, especially on pages with complex backgrounds.",
    },
    {
      question: "Does adding a watermark change the file size significantly?",
      answer: "No. A text watermark adds very little data to the file. The increase in file size is negligible — typically less than 1% of the original file size.",
    },
    {
      question: "Can I watermark a scanned PDF?",
      answer: "Yes. Scanned PDFs are treated the same as regular PDFs — the watermark text is added as a layer on top of each page image. The result looks clean and professional regardless of whether the original was scanned or digitally created.",
    },
  ],
}
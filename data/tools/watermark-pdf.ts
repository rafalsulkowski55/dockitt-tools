export const watermarkPdfTool = {
  slug: "watermark-pdf",
  name: "Watermark PDF",
  title: "Add Watermark to PDF Online",
  description: "Add a custom text watermark to your PDF file online — without any software.",
  longDescription: `Watermarks serve several practical purposes in professional document workflows. Marking a document as Draft before it is finalised prevents recipients from treating it as the final version. Stamping Confidential on sensitive files before sharing sets clear expectations about how the document should be handled. Adding your name or company to documents you have created deters unauthorised copying and establishes ownership. Unlike a watermark added as a simple annotation, Dockitt embeds the text directly into the page content of the PDF, making it significantly harder to remove without specialist tools. The watermark is applied to every page of the document in seconds, directly in your browser.`,
  shortDescription: "Add watermark to PDF files online .",
  category: "security",
  type: "process",
  primaryKeyword: "watermark pdf",
  secondaryKeywords: [
    "add watermark to pdf",
    "watermark pdf online",
    "watermark pdf free",
    "stamp pdf",
    "add text to pdf",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["protect-pdf", "sign-pdf", "compress-pdf", "merge-pdf"],
  howTo: [
   "Click 'Choose PDF' and select the file you want to watermark.",
   "Enter the watermark text you want to add. Common choices include DRAFT, CONFIDENTIAL, SAMPLE, or your name and company.",
   "Click 'Add Watermark' to embed the text into every page of the document.",
   "Download the watermarked PDF. The watermark is embedded directly into the page content.",
  ],
  faqs: [
    {
      question: "Can someone easily remove the watermark I have added?",
      answer: "A text watermark embedded directly into the page content of a PDF is significantly harder to remove than a simple annotation or overlay. While professional PDF editors like Adobe Acrobat Pro can attempt watermark removal, the process is time-consuming, often imperfect on pages with complex backgrounds, and leaves traces. For most use cases including marking documents as draft or confidential, deterring casual copying, or asserting ownership, an embedded text watermark is an effective deterrent.",
    },
    {
      question: "Can I add an image watermark instead of text?",
      answer: "Currently Dockitt supports text watermarks only. You can use any text you like, including your company name, a logo text equivalent, or any label that suits your workflow. Image watermarks such as a company logo are planned for a future update.",
    },
    {
      question: "Will the watermark appear on every page?",
      answer: "Yes. The watermark is applied to every page in the document uniformly. There is currently no option to apply it to selected pages only. If you need to watermark only specific pages, split those pages out using the Split PDF tool, watermark them, then merge everything back using the Merge PDF tool.",
    },
    {
      question: "Does adding a watermark change the file size significantly?",
      answer: "No. A text watermark adds very little data to the file. The increase in file size is negligible, typically less than one percent of the original file size, regardless of how many pages the document contains.",
    },
    {
      question: "Can I watermark a scanned PDF?",
      answer: "Yes. Scanned PDFs are fully supported. The watermark text is added as a layer on top of each scanned page image. The result looks clean and professional regardless of whether the original was a scanned document or a digitally created PDF.",
    },
    {
      question: "What text should I use for my watermark?",
      answer: "Common choices include DRAFT, CONFIDENTIAL, SAMPLE, COPY, FOR REVIEW ONLY, and DO NOT DISTRIBUTE. For ownership marking, your name, company name, or website URL work well. Keep the text short and clear so it is readable when displayed diagonally across the page. Very long watermark text may be harder to read at the size it is rendered.",
    },
  ],
};
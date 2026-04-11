export const mergePdfTool = {
  slug: "merge-pdf",
  name: "Merge PDF",
  title: "Merge PDF Files Online",
  description: "Combine multiple PDF files into one document quickly and .",
  longDescription: `Merging PDF files lets you combine multiple documents into a single, organized file. Whether you need to send a contract with attachments, compile a report from several sources, or consolidate scanned pages from different documents, merging is the fastest way to keep everything together. Our PDF merger lets you upload as many files as you need, arrange them in the right order, and download the result instantly. No account is required, and your files are deleted from our servers immediately after processing.`,
  shortDescription: "Merge multiple PDF files into one online .",
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
  relatedTools: ["split-pdf", "compress-pdf", "reorder-pdf-pages", "extract-pdf-pages"],
  howTo: [
  "Click 'Choose PDFs' and select all the PDF files you want to combine. You can select multiple files at once from your device.",
  "Arrange the files in the order you want them to appear in the final document. The pages will follow the sequence shown.",
  "Click 'Merge PDFs' to combine the files into a single document.",
  "Download the merged PDF once processing is complete.",
  ],
  faqs: [
    {
      question: "How many PDF files can I merge at once?",
      answer: "You can merge as many files as you need in a single operation. There is no hard limit on the number of files. Keep in mind that very large uploads may take longer to process, and the total size of all files combined should stay within reasonable limits for your browser to handle comfortably.",
    },
    {
      question: "Will the formatting and fonts be preserved after merging?",
      answer: "Yes. Merging PDFs does not alter the content of individual files in any way. Text, images, fonts, page layouts, and embedded elements are all preserved exactly as they appear in the source documents. The merge operation simply joins the pages together into a single file.",
    },
    {
      question: "Can I merge a scanned PDF with a regular PDF?",
      answer: "Yes. Scanned PDFs and digitally created PDFs can be merged together without any issues. The resulting file will contain all pages from both documents in the order you specified. The scanned pages will remain as images and the digital pages will remain as text, exactly as they were in the originals.",
    },
    {
      question: "What should I do if one of my PDFs is password protected?",
      answer: "Password-protected PDFs cannot be merged until the protection is removed. Use the Dockitt Unlock PDF tool to remove the password first, then merge the unlocked file with your other documents. You will need the current password to unlock it.",
    },
    {
      question: "Can I control the order of pages in the merged file?",
      answer: "Yes. The order of pages in the merged PDF follows the order in which you arrange the files before merging. You can drag and drop the uploaded files into the sequence you want before clicking Merge.",
    },
    {
      question: "Is it free to merge PDF files online?",
      answer: "Yes. Dockitt's PDF merger is  with no sign-up required, no watermarks added to your document, and no limit on how many files you can merge.",
    },
  ],
};
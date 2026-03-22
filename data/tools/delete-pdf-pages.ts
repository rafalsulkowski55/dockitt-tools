export const deletePdfPagesTool = {
  slug: "delete-pdf-pages",
  name: "Delete PDF Pages",
  title: "Delete Pages from PDF Online",
  description: "Remove unwanted pages from a PDF file online — free and without any software.",
  longDescription: `Sometimes a PDF contains pages you simply do not need. A blank page at the end of a scanned document, a cover sheet you do not want to include when sharing, or confidential pages that should not be sent to a particular recipient. Rather than rebuilding the entire document from scratch, you can remove specific pages in seconds using Dockitt's Delete PDF Pages tool. Upload your file, enter the page numbers you want to remove, and download the updated document. The tool runs directly in your browser and your file is never stored on any server.`,
  shortDescription: "Delete pages from PDF files online for free.",
  category: "core",
  type: "process",
  primaryKeyword: "delete pdf pages",
  secondaryKeywords: [
    "delete pdf pages online",
    "remove pages from pdf",
    "delete pages from pdf free",
    "remove pdf pages",
    "delete page from pdf",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["split-pdf", "extract-pdf-pages"],
  howTo: [
    "Click 'Choose PDF' and select the file you want to edit.",
    "Enter the page numbers you want to delete, separated by commas. For example: 2, 5, 8 will remove those three pages.",
    "Click 'Delete Pages' to remove the selected pages from the document.",
    "Download the updated PDF with the specified pages removed.",
  ],
  faqs: [
    {
      question: "Can I delete multiple pages at once?",
      answer: "Yes. Enter all the page numbers you want to remove, separated by commas. For example, entering 2, 5, 8 will remove all three pages in a single operation. The remaining pages will be renumbered automatically in the output file.",
    },
    {
      question: "What is the difference between Delete PDF Pages and Split PDF?",
      answer: "Delete PDF Pages removes specific pages from a document and gives you back the rest. Split PDF extracts a specific range of pages as a new document, discarding everything outside that range. Use Delete when you want to keep most of the document and remove a few pages. Use Split when you want to isolate a specific section and discard the rest.",
    },
    {
      question: "Can I undo a page deletion after downloading?",
      answer: "The tool creates a new PDF with the selected pages removed. It does not modify your original file. If you delete the wrong pages, simply re-upload the original file and start again. This is why it is always a good idea to keep a copy of the original document before making any changes.",
    },
    {
      question: "Will deleting pages affect the quality of the remaining content?",
      answer: "No. Removing pages does not re-process or compress the remaining content in any way. Text, images, fonts, and formatting on the pages that remain are preserved exactly as they were in the original document.",
    },
    {
      question: "Can I delete pages from a password-protected PDF?",
      answer: "No. The file must be unlocked before pages can be deleted. Use the Dockitt Unlock PDF tool to remove the password first. You will need to know the current password to do this.",
    },
    {
      question: "Is there a limit on how many pages I can delete?",
      answer: "You can delete as many pages as you need, as long as at least one page remains in the document. A PDF must contain at least one page to be valid.",
    },
  ],
};
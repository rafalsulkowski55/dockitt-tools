export const howToDeletePdfPages = {
  slug: "how-to-delete-pdf-pages",
  title: "How to Delete Pages from a PDF Online",
  description: "Learn how to remove unwanted pages from a PDF file online — free and without any software.",
  intro: "Sometimes a PDF contains pages you simply don't need — a blank page at the end, a cover sheet you don't want to share, or confidential pages that shouldn't be included when sending the document to someone else. Rather than rebuilding the entire file, you can remove specific pages in seconds using Dockitt's Delete PDF Pages tool. Everything runs in your browser — no installation, no sign-up.",
  steps: [
    "Go to the Dockitt Delete PDF Pages tool.",
    "Click 'Choose PDF' and upload the file you want to edit.",
    "Enter the page numbers you want to delete — separated by commas if deleting multiple pages.",
    "Click 'Delete Pages' and wait for the tool to process.",
    "Download the updated PDF with the selected pages removed.",
  ],
  commonProblems: [
    {
      problem: "I accidentally deleted the wrong pages.",
      solution: "Download the file and check the result. If pages are missing that shouldn't be, go back and re-upload the original file — the tool never modifies your original, so it's always safe to start over.",
    },
    {
      problem: "The tool says the page number is out of range.",
      solution: "Make sure you're entering page numbers that actually exist in the document. Page numbers start at 1 and go up to the total number of pages in the file.",
    },
    {
      problem: "After deleting pages, the remaining pages are in the wrong order.",
      solution: "Deleting pages preserves the original order of the remaining pages. If the order looks wrong, use the Reorder PDF Pages tool to rearrange them after deletion.",
    },
    {
      problem: "I need to delete a large range of pages, not individual ones.",
      solution: "If you need to keep only a small section of a large document, it may be easier to use the Split PDF tool to extract just the pages you want to keep, rather than deleting everything else one by one.",
    },
  ],
  relatedTool: "delete-pdf-pages",
  relatedGuides: ["how-to-split-pdf", "how-to-extract-pdf-pages"],
  faqs: [
    {
      question: "Can I delete multiple pages at once?",
      answer: "Yes. Enter all the page numbers you want to remove, separated by commas — for example: 2, 5, 8. All listed pages will be removed in a single operation.",
    },
    {
      question: "What is the difference between Delete PDF Pages and Split PDF?",
      answer: "Delete PDF Pages removes specific pages from a document and gives you back the rest. Split PDF extracts a specific range of pages as a new document. Use Delete when you want to keep most of the file, and Split when you want to isolate a section.",
    },
    {
      question: "Will deleting pages affect the quality of the remaining content?",
      answer: "No. Removing pages does not re-process or compress the remaining content in any way. Text, images, and formatting are preserved exactly as they were.",
    },
    {
      question: "Can I undo a page deletion?",
      answer: "The tool does not modify your original file — it creates a new PDF with the selected pages removed. If you need to undo, simply re-upload the original file and start again.",
    },
    {
      question: "Is there a limit on how many pages I can delete?",
      answer: "No. You can delete as many pages as you need, as long as at least one page remains in the document.",
    },
  ],
}
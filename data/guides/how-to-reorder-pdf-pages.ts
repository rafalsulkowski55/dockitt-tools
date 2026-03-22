export const howToReorderPdfPages = {
  slug: "how-to-reorder-pdf-pages",
  title: "How to Reorder Pages in a PDF Online",
  description: "Learn how to rearrange and reorder pages in a PDF file online — drag and drop pages into the right order, free and without any software.",
  intro: "Page order matters more than people realise until something goes wrong. A scanned multi-page document where the pages came out in the wrong order, a report assembled from multiple sources where sections ended up out of sequence, a presentation PDF where slides need rearranging before sharing — these are all situations where being able to reorder PDF pages quickly saves real time. Dockitt's Reorder PDF Pages tool gives you a visual drag-and-drop interface where you can see thumbnail previews of each page and rearrange them until the order is exactly right, then download the result.",
  steps: [
    "Go to the Dockitt Reorder PDF Pages tool.",
    "Click 'Choose PDF' and upload the file whose pages you want to rearrange.",
    "The tool will display thumbnail previews of all pages in the document.",
    "Drag and drop the page thumbnails into the order you want.",
    "Once the order looks correct, click 'Save Order' to generate the reordered PDF.",
    "Download the reordered PDF file.",
  ],
  commonProblems: [
    {
      problem: "The thumbnails are too small to see the page content clearly.",
      solution: "The thumbnail size is optimised for navigating page order rather than reading content. If you need to verify the content of a specific page before placing it, open the original PDF alongside the tool in your browser and cross-reference by page number.",
    },
    {
      problem: "After reordering, the downloaded PDF is in the original order.",
      solution: "Make sure you clicked 'Save Order' after finishing your rearrangement — simply dragging the thumbnails without confirming will not apply the changes. If the issue persists, try a hard refresh of the page (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows) and repeat the process.",
    },
    {
      problem: "The PDF has too many pages for the drag-and-drop interface to be practical.",
      solution: "For very long documents, consider using the Extract PDF Pages tool first to pull out the sections that need reordering, rearrange those, then merge everything back in the correct sequence using the Merge PDF tool.",
    },
    {
      problem: "I need to both reorder pages and delete some at the same time.",
      solution: "Do the operations in two steps: first use the Delete PDF Pages tool to remove the pages you don't need, then use the Reorder PDF Pages tool to arrange the remaining pages in the correct order.",
    },
  ],
  relatedTool: "reorder-pdf-pages",
  relatedGuides: ["how-to-extract-pdf-pages", "how-to-delete-pdf-pages"],
  faqs: [
    {
      question: "Can I move a page from the end of a document to the beginning?",
      answer: "Yes. You can move any page to any position in the document. The drag-and-drop interface has no restrictions on where pages can be placed.",
    },
    {
      question: "Does reordering pages affect the content of the pages themselves?",
      answer: "No. Reordering only changes the sequence in which pages appear in the document. The content, formatting, images, and text on each page remain completely unchanged.",
    },
    {
      question: "Can I reorder pages in a scanned PDF?",
      answer: "Yes. Scanned PDFs are fully supported. Each scanned page appears as a thumbnail and can be dragged to any position. The output file maintains the same image quality as the original scan.",
    },
    {
      question: "Is there a limit on the number of pages I can reorder?",
      answer: "There is no hard page limit. However, very large documents with many high-resolution pages may take longer to generate thumbnails and process. For documents over 100 pages, splitting into sections and reordering each section separately is often more practical.",
    },
    {
      question: "Can I use this tool to reverse the page order of an entire document?",
      answer: "Yes — though it requires manually dragging each page. If you need to reverse a long document, a more efficient approach is to extract pages in reverse order using the Extract PDF Pages tool, entering the page numbers from last to first.",
    },
  ],
}
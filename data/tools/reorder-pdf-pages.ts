export const reorderPdfPagesTool = {
  slug: "reorder-pdf-pages",
  name: "Reorder PDF Pages",
  title: "Reorder PDF Pages Online",
  description: "Rearrange pages in a PDF file online — drag and drop pages into the right order for free.",
  longDescription: `Page order matters more than people realise until something goes wrong. A scanned multi-page document where the pages came out in the wrong order, a report assembled from multiple sources where sections ended up out of sequence, a presentation PDF where slides need rearranging before sharing. These are all situations where being able to reorder PDF pages quickly saves real time. Dockitt's Reorder PDF Pages tool gives you a visual drag-and-drop interface where you can see thumbnail previews of each page and rearrange them until the order is exactly right, then download the result immediately.`,
  shortDescription: "Reorder pages in PDF files online for free.",
  category: "utility",
  type: "process",
  primaryKeyword: "reorder pdf pages",
  secondaryKeywords: [
    "reorder pdf pages online",
    "rearrange pdf pages",
    "reorganize pdf",
    "reorder pdf free",
    "change pdf page order",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["merge-pdf", "delete-pdf-pages", "extract-pdf-pages", "split-pdf"],
  howTo: [
    "Click 'Choose PDF' and select the file whose pages you want to reorder.",
    "The tool will display thumbnail previews of all pages. Drag and drop the thumbnails into the order you want.",
    "Double-check the sequence by reviewing the thumbnails before confirming.",
    "Click 'Save Order' to generate the reordered PDF, then download the result.",
  ],
  faqs: [
    {
      question: "Can I move a page from the end of a document to the beginning?",
      answer: "Yes. You can move any page to any position in the document. The drag-and-drop interface has no restrictions on where pages can be placed. You can completely reverse the order of the document, move the last page to the first position, or any other arrangement you need.",
    },
    {
      question: "Does reordering pages affect the content of the pages themselves?",
      answer: "No. Reordering only changes the sequence in which pages appear in the document. The content, formatting, images, and text on each individual page remain completely unchanged. Only the order of the pages in the final document is different.",
    },
    {
      question: "The thumbnails are too small to see the page content clearly.",
      answer: "The thumbnail size is optimised for navigating page order rather than reading content. If you need to verify the content of a specific page before placing it, open the original PDF alongside the tool in your browser and cross-reference by page number. The page numbers shown below each thumbnail correspond to the original page numbers in the uploaded document.",
    },
    {
      question: "After reordering, the downloaded PDF is still in the original order.",
      answer: "Make sure you clicked Save Order after finishing your rearrangement. Simply dragging the thumbnails without confirming will not apply the changes to the downloaded file. If the issue persists, try a hard refresh of the page using Cmd+Shift+R on Mac or Ctrl+Shift+R on Windows, and repeat the process.",
    },
    {
      question: "Can I reorder pages in a scanned PDF?",
      answer: "Yes. Scanned PDFs are fully supported. Each scanned page appears as a thumbnail and can be dragged to any position. The output file maintains the same image quality as the original scan. The reordering process does not alter the scanned images in any way.",
    },
    {
      question: "Can I use this tool to reverse the entire page order of a document?",
      answer: "Yes, though it requires manually dragging each page to its new position. For short documents this is quick. For longer documents, a more efficient approach is to use the Extract PDF Pages tool, entering the page numbers from last to first, which will produce a new document with the pages in reverse order without requiring drag-and-drop for each page.",
    },
  ],
};
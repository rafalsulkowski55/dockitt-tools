export const howToReorderPdfPages = {
  slug: "how-to-reorder-pdf-pages",
  title: "How to Reorder Pages in a PDF Online",
  description: "Learn how to rearrange and reorder pages in a PDF file online. Drag and drop pages into the right order, free and without any software.",
  intro: "Page order matters more than people realise until something goes wrong. A scanned multi-page document where the pages came out in the wrong order, a report assembled from multiple sources where sections ended up out of sequence, a presentation PDF where slides need rearranging before sharing. These are all situations where being able to reorder PDF pages quickly saves real time.",
  introList: [
    "Fix a scanned document where pages came out in the wrong order",
    "Rearrange slides in a PDF presentation before sharing it",
    "Correct the page sequence in a report assembled from multiple files",
    "Move an appendix or cover page to a different position in the document",
    "Organise extracted pages into the correct order after combining files",
  ],
  introOutro: "Dockitt gives you a visual drag-and-drop interface where you can see thumbnail previews of each page and rearrange them until the order is exactly right.",
  sections: [
    {
      title: "How to reorder pages in a PDF online - step by step",
      steps: [
        "Open the Dockitt Reorder PDF Pages tool in your browser.",
        "Click 'Choose PDF' or drag and drop your file into the upload area.",
        "The tool will display thumbnail previews of all pages in the document.",
        "Drag and drop the page thumbnails into the order you want. You can move any page to any position.",
        "Review the order carefully by scrolling through all the thumbnails.",
        "Once the order is correct, click 'Save Order' to generate the reordered PDF.",
        "Click 'Download' to save the reordered PDF to your device.",
        "Open the downloaded file to confirm all pages are in the correct sequence.",
      ],
    },
    {
      title: "When you need to reorder PDF pages",
      intro: "Reordering comes up in several predictable situations. Knowing the most common ones helps you recognise when this tool is the right choice.",
      items: [
        "Scanning errors: Flatbed and automatic document feeder scanners can introduce page order errors in different ways. With a flatbed scanner, pages are sometimes placed on the glass in the wrong sequence. With an ADF scanner, pages can be fed in reverse order or get out of sequence if the feeder jams. The result is a multi-page PDF where the pages are not in the right order.",
        "Documents assembled from multiple sources: When a report or proposal is built by merging sections created by different people, the merged result sometimes has sections in the wrong order. Reordering lets you fix this without re-merging.",
        "Presentation PDFs: Presentations often need revision before they are shared. If you have a PDF version of a presentation and need to move a slide earlier or later in the deck, reordering is faster than going back to the original file.",
        "After extracting and merging: If you extracted pages from multiple documents and merged them, the resulting order may need adjustment. Reordering lets you fine-tune the sequence.",
        "Reversing a document: Some workflows require a document to be in reverse order, for example for certain printing setups. Reordering lets you reverse the page sequence manually.",
      ],
    },
    {
      title: "How to use the drag-and-drop interface effectively",
      intro: "The visual thumbnail interface is the most intuitive way to reorder pages, but there are some techniques that make it faster and more accurate.",
      items: [
        "Check thumbnails against the original: Thumbnails are small by design for navigability. If you need to verify the content of a specific page before placing it, open the original PDF in a separate browser tab and cross-reference by page number.",
        "Work in sections for long documents: For documents with many pages, reordering is more manageable if you work section by section. Identify the correct position for each section rather than trying to arrange every page individually.",
        "Drag slowly and deliberately: Fast drags can sometimes cause pages to jump to unexpected positions. Drag slowly and confirm the page lands in the right spot before releasing.",
        "Scroll before confirming: After finishing your rearrangement, scroll through all the thumbnails from beginning to end to verify the complete sequence before clicking Save Order.",
        "Click Save Order before navigating away: The reordering is not applied until you click Save Order. If you navigate away from the page, your rearrangement will be lost.",
      ],
    },
    {
      title: "Combining reordering with other tools",
      intro: "Reordering is often used as the final step in a multi-tool workflow. Here are the most common combinations.",
      items: [
        "Delete then reorder: If you need to both remove pages and rearrange the remaining ones, delete the unwanted pages first using the Delete PDF Pages tool, then reorder the result.",
        "Merge then reorder: If you merged multiple PDFs and the page order is not quite right, use the Reorder tool to fix the sequence after merging.",
        "Extract then reorder: If you extracted pages from a document and want them in a different order than they appeared in the original, reorder them after extracting.",
        "Reorder then merge: If you need to assemble a document from several sources with a specific page order, reorder each source document's pages first, then merge them in the correct sequence.",
      ],
    },
    {
      title: "Reversing the page order of a document",
      intro: "Reversing the entire page order of a document is a specific use case that comes up occasionally, particularly for certain printing workflows.",
      items: [
        "Using the drag-and-drop interface: You can reverse the order manually by dragging pages one at a time. For short documents of 5 to 10 pages this is practical. For longer documents it is time-consuming.",
        "Using Extract PDF Pages: A faster method for reversing a document is to use the Extract PDF Pages tool and enter all page numbers in reverse order. For a 10-page document, enter 10, 9, 8, 7, 6, 5, 4, 3, 2, 1. The output will be the document in reverse order.",
        "Partial reversal: If you only need to reverse a section of a document, split out that section first, reverse it using the Extract method, then merge it back into the correct position.",
      ],
    },
    {
      title: "After reordering - what to check",
      intro: "Before using or sharing the reordered document, take a moment to verify the result.",
      items: [
        "Check the first and last pages: Confirm the document starts and ends on the correct pages.",
        "Scroll through all pages: Do not just check the pages you moved. Scroll through the entire document to confirm the complete sequence is correct.",
        "Check for duplicate pages: If a page appears twice in the output, you may have accidentally dropped it in two positions during the drag-and-drop process. Re-upload and repeat if needed.",
        "Check content continuity: For text-heavy documents, check that the text flows logically from one page to the next at the key transitions.",
        "Compress if needed: Reordering does not affect file size meaningfully, but if the file is large, run it through the Compress PDF tool.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "The thumbnails are too small to see the page content clearly.",
      solution: "Thumbnail size is optimised for navigating page order rather than reading content. If you need to verify the content of a specific page, open the original PDF in a separate browser tab and cross-reference by page number.",
    },
    {
      problem: "After reordering, the downloaded PDF is in the original order.",
      solution: "Make sure you clicked Save Order after finishing your rearrangement. Simply dragging the thumbnails without confirming does not apply the changes. If the issue persists, try refreshing the page and repeating the process.",
    },
    {
      problem: "The PDF has too many pages for the drag-and-drop interface to be practical.",
      solution: "For very long documents, split out the sections that need reordering using the Split PDF tool, reorder each section separately, then merge everything back in the correct sequence using the Merge PDF tool.",
    },
    {
      problem: "I need to both reorder pages and delete some at the same time.",
      solution: "Do the operations in two steps. First use the Delete PDF Pages tool to remove the pages you do not need, then use the Reorder PDF Pages tool to arrange the remaining pages in the correct order.",
    },
    {
      problem: "The file is password protected and cannot be processed.",
      solution: "Unlock the PDF first using the Dockitt Unlock PDF tool, then reorder the pages in the unlocked file.",
    },
  ],
  relatedTools: [
    { name: "Merge PDF", slug: "merge-pdf", description: "Combine multiple PDFs before reordering." },
    { name: "Delete PDF Pages", slug: "delete-pdf-pages", description: "Remove unwanted pages before reordering." },
    { name: "Extract PDF Pages", slug: "extract-pdf-pages", description: "Pick specific pages before reordering them." },
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
      answer: "There is no hard page limit. Very large documents with many high-resolution pages may take longer to generate thumbnails and process. For documents over 100 pages, splitting into sections and reordering each section separately is often more practical.",
    },
    {
      question: "Can I use this tool to reverse the page order of an entire document?",
      answer: "Yes, but dragging each page manually is time-consuming for long documents. A faster method is to use the Extract PDF Pages tool and enter all page numbers in reverse order, for example 10, 9, 8, 7, 6 for a 10-page document.",
    },
    {
      question: "Can I reorder pages on my phone?",
      answer: "Yes. The Reorder PDF Pages tool works on mobile browsers on both iPhone and Android. You can drag and drop page thumbnails using touch input on a touchscreen device.",
    },
    {
      question: "What should I do if I accidentally drop a page in the wrong position?",
      answer: "Simply drag it back to the correct position. You can rearrange as many times as needed before clicking Save Order. The changes are only applied when you confirm by clicking Save Order.",
    },
  ],
  ctaText: "Ready to rearrange the pages in your PDF? Use the free Dockitt tool below.",
  ctaLinks: [
    { name: "Reorder PDF Pages", slug: "reorder-pdf-pages", description: "Rearrange PDF pages online for free" },
  ],
}
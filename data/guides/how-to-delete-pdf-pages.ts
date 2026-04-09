export const howToDeletePdfPages = {
  slug: "how-to-delete-pdf-pages",
  title: "How to Delete Pages from a PDF Online",
  description: "Learn how to remove unwanted pages from a PDF file online, free and without any software.",
  intro: "Sometimes a PDF contains pages you simply do not need. A blank page at the end, a cover sheet you do not want to share, confidential pages that should not be included when sending the document externally, or repeated pages from a scanning error. Rather than rebuilding the entire document, you can remove specific pages in seconds using Dockitt's Delete PDF Pages tool.",
  introList: [
    "Remove a blank page at the end or beginning of a document",
    "Delete a cover page before sharing a report internally",
    "Remove confidential pages before sending a document to an external party",
    "Delete duplicate pages created by a scanning error",
    "Remove an outdated section from a document without rebuilding the whole file",
  ],
  introOutro: "Everything runs in your browser with no installation and no account required.",
  sections: [
    {
      title: "How to delete pages from a PDF online - step by step",
      steps: [
        "Open the Dockitt Delete PDF Pages tool in your browser.",
        "Click 'Choose PDF' or drag and drop your file into the upload area.",
        "Enter the page numbers you want to delete in the input field. Separate multiple page numbers with commas, for example 2, 5, 8.",
        "Click 'Delete Pages' and wait a few seconds while the tool processes your file.",
        "Click 'Download' to save the updated PDF to your device.",
        "Open the downloaded file to confirm the correct pages were removed and the remaining pages look correct.",
      ],
    },
    {
      title: "Delete PDF Pages vs Split PDF vs Extract PDF Pages",
      intro: "Dockitt has three tools that all involve working with specific pages from a PDF. Understanding which one to use saves time.",
      items: [
        "Delete PDF Pages: Use this when you want to keep most of the document and remove a small number of specific pages. You specify the pages to remove and get back the rest of the document.",
        "Split PDF: Use this when you want to extract a consecutive range of pages as a new document. You specify a start page and an end page. This is the right tool when you need a chapter, a section, or a block of pages from a larger document.",
        "Extract PDF Pages: Use this when you want to keep specific non-consecutive pages. You specify individual page numbers in any order and get back only those pages. This is the right tool when the pages you need are scattered throughout the document.",
        "The overlap: Delete Pages and Extract Pages can sometimes achieve the same result from different directions. If a 10-page document has 3 pages you want to keep, it is easier to extract those 3 pages than to delete the other 7. If it has 8 pages you want to keep and 2 to remove, deleting is simpler.",
      ],
    },
    {
      title: "Working with page numbers",
      intro: "Entering the correct page numbers is the most important part of using this tool correctly. Here is what you need to know.",
      items: [
        "Physical page numbers: The tool uses physical page numbers starting from 1. Page 1 is always the first page in the file, regardless of what is printed on the page.",
        "Printed page numbers: These are the numbers visible on the pages themselves. A document might start with a cover page, a table of contents, and an executive summary before printed page 1. In this case, printed page 1 might be physical page 4 or 5.",
        "How to find physical page numbers: Open the PDF in your browser or a PDF viewer. The page counter in the viewer toolbar shows the physical page number. Count from the beginning of the file.",
        "Entering multiple pages: Separate multiple page numbers with commas. For example, to delete pages 3, 7, and 12, enter 3, 7, 12. The order you enter them does not matter.",
        "Checking the total page count: The total number of pages is shown in most PDF viewers. Make sure you do not enter a page number higher than the total page count.",
      ],
    },
    {
      title: "What happens to the remaining pages",
      intro: "When you delete pages from a PDF, the remaining pages close the gap left by the deleted pages and renumber accordingly.",
      items: [
        "Page order is preserved: The remaining pages stay in their original order. Deleting page 5 from a 10-page document produces a 9-page document where the original page 6 becomes the new page 5.",
        "Content is unchanged: The tool does not re-process, re-compress, or alter the remaining pages in any way. Text, images, fonts, and formatting are preserved exactly as they were in the original.",
        "No quality loss: Removing pages is a non-destructive operation on the remaining content. There is no degradation of any kind.",
        "The original file is not modified: The tool creates a new PDF with the selected pages removed. The original file on your device is unchanged. If you make a mistake, you can re-upload the original and start again.",
      ],
    },
    {
      title: "Deleting large numbers of pages",
      intro: "If you need to remove many pages from a document, consider whether Delete Pages is the most efficient approach.",
      items: [
        "When keeping fewer pages than deleting: If you want to keep only a small portion of a large document, it is faster to extract the pages you want to keep using the Extract PDF Pages tool than to delete all the unwanted pages individually.",
        "When deleting a consecutive range: If the pages you want to remove are all consecutive, consider using the Split PDF tool to extract the sections you want to keep, then merge them back together. This is faster than entering a long list of individual page numbers.",
        "When deleting scattered pages: For non-consecutive pages to delete, enter them all as a comma-separated list in the Delete Pages tool. You can enter as many page numbers as needed in a single operation.",
      ],
    },
    {
      title: "After deleting pages - what to check",
      intro: "After downloading the updated PDF, take a moment to verify the result.",
      items: [
        "Check the page count: Open the file and confirm the total number of pages matches what you expect. Count the original pages minus the deleted pages.",
        "Check the page order: Scroll through the document to confirm the remaining pages flow correctly without any gaps or ordering issues.",
        "Check the content: Verify that the pages you wanted to keep are all present and intact.",
        "Check the deleted pages are gone: Confirm that the pages you deleted are no longer present.",
        "Compress if needed: If the file size is larger than needed after deletion, run it through the Compress PDF tool. Removing pages reduces the file size proportionally, but additional compression may help further.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "I accidentally deleted the wrong pages.",
      solution: "The tool never modifies your original file. It creates a new PDF with the selected pages removed. Re-upload the original file and start again with the correct page numbers.",
    },
    {
      problem: "The tool says the page number is out of range.",
      solution: "Make sure you are entering page numbers that exist in the document. Page numbers start at 1 and go up to the total number of pages. Check the page count in your PDF viewer before entering numbers.",
    },
    {
      problem: "After deleting pages, the remaining pages are in the wrong order.",
      solution: "Deleting pages preserves the original order of the remaining pages. If the order looks wrong, use the Reorder PDF Pages tool to rearrange them after deletion.",
    },
    {
      problem: "I need to delete a large range of pages.",
      solution: "If you need to keep only a small section of a large document, it may be easier to use the Extract PDF Pages tool to extract just the pages you want to keep, rather than deleting everything else.",
    },
    {
      problem: "The file is password protected and cannot be processed.",
      solution: "Unlock the PDF first using the Dockitt Unlock PDF tool, then delete the pages from the unlocked file.",
    },
  ],
  relatedTools: [
    { name: "Extract PDF Pages", slug: "extract-pdf-pages", description: "Keep specific pages instead of deleting the rest." },
    { name: "Split PDF", slug: "split-pdf", description: "Extract a consecutive page range from a document." },
    { name: "Reorder PDF Pages", slug: "reorder-pdf-pages", description: "Fix page order after deleting pages." },
  ],
  relatedTool: "delete-pdf-pages",
  relatedGuides: ["how-to-split-pdf", "how-to-extract-pdf-pages"],
  faqs: [
    {
      question: "Can I delete multiple pages at once?",
      answer: "Yes. Enter all the page numbers you want to remove separated by commas, for example 2, 5, 8. All listed pages will be removed in a single operation.",
    },
    {
      question: "What is the difference between Delete PDF Pages and Split PDF?",
      answer: "Delete PDF Pages removes specific pages and gives you back the rest of the document. Split PDF extracts a consecutive page range as a new document. Use Delete when you want to keep most of the file and remove a few specific pages. Use Split when you want to isolate a section.",
    },
    {
      question: "Will deleting pages affect the quality of the remaining content?",
      answer: "No. Removing pages does not re-process or compress the remaining content in any way. Text, images, and formatting are preserved exactly as they were in the original.",
    },
    {
      question: "Can I undo a page deletion?",
      answer: "The tool creates a new PDF with the selected pages removed. Your original file is not modified. If you need to undo, re-upload the original file and start again.",
    },
    {
      question: "Is there a limit on how many pages I can delete?",
      answer: "No. You can delete as many pages as needed as long as at least one page remains in the document.",
    },
    {
      question: "Can I delete pages from a PDF on my phone?",
      answer: "Yes. The Delete PDF Pages tool works on mobile browsers on both iPhone and Android. Upload the file, enter the page numbers to delete, and download the result directly from your phone.",
    },
    {
      question: "Does deleting pages change the file size?",
      answer: "Yes. Removing pages reduces the file size proportionally to the content on the deleted pages. A page with many images contributes more to the file size than a simple text page.",
    },
  ],
  ctaText: "Ready to remove unwanted pages from your PDF? Use the free Dockitt tool below.",
  ctaLinks: [
    { name: "Delete PDF Pages", slug: "delete-pdf-pages", description: "Remove specific pages from a PDF online for free" },
  ],
}
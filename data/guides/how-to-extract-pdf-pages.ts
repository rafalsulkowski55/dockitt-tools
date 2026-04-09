export const howToExtractPdfPages = {
  slug: "how-to-extract-pdf-pages",
  title: "How to Extract Pages from a PDF Online",
  description: "Learn how to extract specific pages from a PDF file online. Pick individual pages in any order, free and without any software.",
  intro: "Extracting pages from a PDF means selecting specific individual pages and saving them as a new, separate document. Unlike splitting, which works with consecutive page ranges, extracting lets you pick any combination of pages regardless of their position in the document. You can pick page 3, page 7, and page 14 from a 50-page document and get a new PDF containing just those three pages in the order you choose.",
  introList: [
    "Extract specific appendices or annexures from a long report",
    "Pull out the relevant pages from a reference document to share with a specific person",
    "Create a focused subset of a multi-topic PDF for a particular audience",
    "Extract evidence pages from a legal document before sharing it",
    "Pull individual pages from a scanned multi-page form",
  ],
  introOutro: "Dockitt lets you extract any combination of pages directly in your browser with no software and no account required.",
  sections: [
    {
      title: "How to extract pages from a PDF online - step by step",
      steps: [
        "Open the Dockitt Extract PDF Pages tool in your browser.",
        "Click 'Choose PDF' or drag and drop your file into the upload area.",
        "Enter the page numbers you want to extract in the input field, separated by commas. For example, enter 1, 4, 7, 12 to extract those four pages.",
        "To control the order of pages in the output, enter them in the order you want them to appear. For example, entering 7, 3, 1 produces a PDF with page 7 first, then page 3, then page 1.",
        "Click 'Extract Pages' and wait a few seconds while the tool creates the new document.",
        "Click 'Download' to save the extracted PDF to your device.",
        "Open the downloaded file to confirm it contains the correct pages in the correct order.",
      ],
    },
    {
      title: "Extract PDF Pages vs Split PDF vs Delete PDF Pages",
      intro: "Three different Dockitt tools all involve working with specific pages. Here is how they differ and when to use each one.",
      items: [
        "Extract PDF Pages: Pick any combination of individual pages in any order. The output contains only the pages you specified. Use this when the pages you need are scattered throughout the document and not in a simple consecutive range.",
        "Split PDF: Define a start page and an end page. The output contains all pages in that consecutive range. Use this when you need a chapter, a section, or any unbroken sequence of pages.",
        "Delete PDF Pages: Specify pages to remove. The output contains everything except the pages you deleted. Use this when you want to keep most of the document and only remove a small number of specific pages.",
        "Choosing between Extract and Delete: If a 20-page document has 15 pages you want and 5 you do not want, deleting the 5 unwanted pages is simpler than extracting the 15 you want. If the document has 3 pages you want and 17 you do not want, extracting the 3 is simpler than deleting the 17.",
      ],
    },
    {
      title: "Controlling page order in the extracted document",
      intro: "One of the most useful features of the Extract PDF Pages tool is that you can control the order of pages in the output by the order in which you enter the page numbers.",
      items: [
        "Original order: To keep pages in their original document order, enter the page numbers in ascending order. For example, enter 2, 5, 9, 14 to get those pages in the same sequence as they appear in the original.",
        "Custom order: To rearrange the pages, enter the numbers in the order you want them to appear. Entering 14, 2, 9, 5 produces a PDF with page 14 first, page 2 second, page 9 third, and page 5 last.",
        "Combining with Reorder PDF Pages: If you are unsure of the order you want before extracting, extract the pages in any order and then use the Reorder PDF Pages tool to drag them into the exact sequence you need.",
        "Duplicate pages: You can extract the same page number more than once to include it multiple times in the output. This is occasionally useful for template documents or repeated reference pages.",
      ],
    },
    {
      title: "Finding the right page numbers",
      intro: "The most common source of errors when extracting pages is using the wrong page numbers. Here is how to find the correct ones.",
      items: [
        "Physical vs printed page numbers: The tool uses physical page numbers starting from 1. Physical page 1 is always the first page in the file. Printed page numbers on the pages themselves may be different, for example a document might have a cover page, table of contents, and executive summary before printed page 1.",
        "How to check physical page numbers: Open the PDF in any viewer. The page counter in the viewer toolbar shows the physical page number. Count from the beginning of the file to find the physical number of any page.",
        "Pages with Roman numerals: Academic documents and books often use Roman numerals for front matter. These pages still have physical page numbers starting from 1. A document with a Roman numeral preface followed by a main body might have its first Arabic numeral page at physical page 5 or 6.",
        "Double-checking before extracting: For complex documents with important page selections, note down the physical page numbers of the pages you need before starting the extraction.",
      ],
    },
    {
      title: "Extracting pages from large documents",
      intro: "For large documents, a few additional considerations apply.",
      items: [
        "File size limits: The tool supports files up to 10MB. If your PDF is larger, compress it first using the Dockitt Compress PDF tool to bring it under the limit.",
        "Large page selections: There is no hard limit on the number of pages you can extract in a single operation. You can specify a few pages or nearly all of them. For very large selections, double-check your comma-separated list before submitting.",
        "Alternative for mostly keeping pages: If you want to keep most of the pages in a large document and only remove a few, it is more efficient to use the Delete PDF Pages tool to remove the unwanted pages rather than listing all the pages you want to keep.",
      ],
    },
    {
      title: "After extracting - what to check",
      intro: "After downloading the extracted PDF, verify the result before using or sharing it.",
      items: [
        "Check the page count: Confirm the total number of pages in the extracted file matches the number of pages you specified.",
        "Check page order: Scroll through the document to confirm the pages appear in the correct sequence.",
        "Check content completeness: Verify that the content on each extracted page is complete and identical to the original.",
        "Check for missing pages: If a page appears blank or is missing content, compare it with the same page in the original document.",
        "Compress if needed: The extracted file will be roughly proportional in size to the number of pages extracted from the original. If the file size is larger than needed, run it through the Compress PDF tool.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "The extracted pages appear in the wrong order.",
      solution: "Pages are extracted in the order you enter them. To get them in the original document order, enter the page numbers in ascending order. To get them in a custom order, enter the numbers in the sequence you want them to appear.",
    },
    {
      problem: "I need to extract a large number of non-consecutive pages.",
      solution: "Enter all page numbers separated by commas. There is no limit on how many individual pages you can specify. For very large selections, write out your list carefully before entering it to avoid mistakes.",
    },
    {
      problem: "The extracted PDF is missing content that was on the original pages.",
      solution: "Extraction preserves each page exactly as it appears in the original document. If content appears missing, check whether the original PDF has layers or annotations that may not be visible in your viewer. Try opening both files side by side for comparison.",
    },
    {
      problem: "I want to extract pages and rearrange them in a different order.",
      solution: "Enter the page numbers in the order you want them to appear in the output. Alternatively, extract the pages first and then use the Reorder PDF Pages tool to drag them into the exact sequence you need.",
    },
    {
      problem: "The file is too large to upload.",
      solution: "Files up to 10MB can be processed. If your PDF is larger, compress it first using the Dockitt Compress PDF tool to bring it under the limit.",
    },
  ],
  relatedTools: [
    { name: "Split PDF", slug: "split-pdf", description: "Extract a consecutive page range from a document." },
    { name: "Delete PDF Pages", slug: "delete-pdf-pages", description: "Remove specific pages and keep the rest." },
    { name: "Reorder PDF Pages", slug: "reorder-pdf-pages", description: "Rearrange extracted pages into the correct order." },
  ],
  relatedTool: "extract-pdf-pages",
  relatedGuides: ["how-to-split-pdf", "how-to-reorder-pdf-pages"],
  faqs: [
    {
      question: "What is the difference between Extract PDF Pages and Split PDF?",
      answer: "Split PDF extracts a consecutive range of pages such as pages 5 through 10. Extract PDF Pages lets you specify individual page numbers in any order such as pages 2, 5, 9, and 14. Use Split for chapters or sections and Extract when you need non-consecutive pages.",
    },
    {
      question: "Can I extract pages and reorder them at the same time?",
      answer: "Yes. Enter the page numbers in the order you want them to appear in the output. Entering 10, 5, 1 produces a PDF with page 10 first, page 5 second, and page 1 last.",
    },
    {
      question: "Does extracting pages affect the quality of the content?",
      answer: "No. Each page is copied from the original file without any re-compression or alteration. Text, images, fonts, and formatting are preserved exactly as they appear in the source document.",
    },
    {
      question: "Can I extract pages from a password-protected PDF?",
      answer: "No. You need to unlock the PDF first using the Dockitt Unlock PDF tool, then extract the pages from the unlocked version.",
    },
    {
      question: "Is there a maximum number of pages I can extract at once?",
      answer: "There is no hard limit on the number of pages you can specify. You can extract a single page or nearly every page in the document.",
    },
    {
      question: "Can I extract the same page more than once?",
      answer: "Yes. Entering the same page number more than once includes that page multiple times in the output. This is occasionally useful for template documents or repeated reference pages.",
    },
    {
      question: "Can I extract pages from a PDF on my phone?",
      answer: "Yes. The Extract PDF Pages tool works on mobile browsers on both iPhone and Android. Upload the file, enter the page numbers, and download the result directly from your phone.",
    },
  ],
  ctaText: "Ready to extract specific pages from your PDF? Use the free Dockitt tool below.",
  ctaLinks: [
    { name: "Extract PDF Pages", slug: "extract-pdf-pages", description: "Pick and extract individual pages from a PDF for free" },
  ],
}
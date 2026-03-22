export const howToExtractPdfPages = {
  slug: "how-to-extract-pdf-pages",
  title: "How to Extract Pages from a PDF Online",
  description: "Learn how to extract specific pages from a PDF file online — pick individual pages in any order, free and without any software.",
  intro: "Sometimes you don't need a consecutive range of pages — you need page 3, page 7, and page 12 from a 30-page document. That's the difference between Split PDF and Extract PDF Pages. Splitting works with ranges; extracting lets you pick individual pages in any order and pull them out as a new document. This is particularly useful when working with reports that have appendices scattered throughout, reference documents where you need specific sections, or multi-topic PDFs where you want to create a focused subset for a particular audience.",
  steps: [
    "Go to the Dockitt Extract PDF Pages tool.",
    "Click 'Choose PDF' and upload the file you want to extract pages from.",
    "Enter the page numbers you want to extract, separated by commas — for example: 1, 4, 7, 12.",
    "Click 'Extract Pages' and wait for the tool to create the new document.",
    "Download the extracted PDF containing only the pages you selected.",
  ],
  commonProblems: [
    {
      problem: "The extracted pages appear in the wrong order.",
      solution: "Pages are extracted in the order you enter them. If you enter '7, 3, 1', the resulting PDF will have page 7 first, then page 3, then page 1. To get them in the original document order, enter the numbers in ascending order: '1, 3, 7'.",
    },
    {
      problem: "I need to extract a large number of non-consecutive pages.",
      solution: "Enter all page numbers separated by commas. There is no limit on how many individual pages you can specify. For very large selections, double-check your list before submitting to avoid mistakes.",
    },
    {
      problem: "The extracted PDF is missing content that was on the original pages.",
      solution: "Extraction preserves each page exactly as it appears in the original document. If content appears missing, check whether the original PDF has layers or annotations that may not be visible in your viewer. Try opening the original file and the extracted file side by side for comparison.",
    },
    {
      problem: "I want to extract pages and rearrange them in a different order.",
      solution: "You can control the output order by entering page numbers in the order you want them to appear. Alternatively, extract the pages first, then use the Reorder PDF Pages tool to drag them into the exact sequence you need.",
    },
  ],
  relatedTool: "extract-pdf-pages",
  relatedGuides: ["how-to-split-pdf", "how-to-reorder-pdf-pages"],
  faqs: [
    {
      question: "What is the difference between Extract PDF Pages and Split PDF?",
      answer: "Split PDF extracts a consecutive range of pages — for example, pages 5 through 10. Extract PDF Pages lets you specify individual page numbers in any order — for example, pages 2, 5, 9, and 14. Use Split for chapters or sections, and Extract when you need non-consecutive pages.",
    },
    {
      question: "Can I extract pages and reorder them at the same time?",
      answer: "Yes. Enter the page numbers in the order you want them to appear in the output. If you enter '10, 5, 1', the resulting PDF will have page 10 first, page 5 second, and page 1 last.",
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
      answer: "There is no hard limit on the number of pages you can specify. You can extract a single page or nearly every page in the document. The only requirement is that the resulting PDF contains at least one page.",
    },
  ],
}
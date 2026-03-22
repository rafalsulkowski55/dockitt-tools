export const extractPdfPagesTool = {
  slug: "extract-pdf-pages",
  name: "Extract PDF Pages",
  title: "Extract PDF Pages Online",
  description: "Extract specific pages from a PDF file online — pick individual pages in any order for free.",
  longDescription: `Sometimes you do not need a consecutive range of pages. You need page 3, page 7, and page 12 from a 30-page document. That is the difference between Split PDF and Extract PDF Pages. Splitting works with ranges. Extracting lets you pick individual pages in any order and pull them out as a new document. This is particularly useful when working with reports that have appendices scattered throughout, reference documents where you need specific sections, or multi-topic PDFs where you want to create a focused subset for a particular audience. Dockitt processes the extraction in your browser and the result is available to download immediately.`,
  shortDescription: "Extract pages from PDF files online for free.",
  category: "utility",
  type: "process",
  primaryKeyword: "extract pdf pages",
  secondaryKeywords: [
    "extract pdf pages online",
    "extract pages from pdf",
    "extract pdf pages free",
    "save pdf pages",
    "pick pages from pdf",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["split-pdf", "reorder-pdf-pages"],
  howTo: [
    "Click 'Choose PDF' and select the file you want to extract pages from.",
    "Enter the individual page numbers you want to extract, separated by commas. For example: 1, 4, 7, 12.",
    "Click 'Extract Pages' to create a new document containing only the pages you specified.",
    "Download the extracted PDF. Pages will appear in the order you entered them.",
  ],
  faqs: [
    {
      question: "What is the difference between Extract PDF Pages and Split PDF?",
      answer: "Split PDF extracts a consecutive range of pages, for example pages 5 through 10. Extract PDF Pages lets you specify individual page numbers in any order, for example pages 2, 5, 9, and 14. The extracted PDF will contain only those pages, in the order you entered them. Use Split for chapters or sections, and Extract when you need non-consecutive pages scattered throughout the document.",
    },
    {
      question: "Can I control the order of pages in the extracted document?",
      answer: "Yes. Pages are extracted in the order you enter them. If you enter 7, 3, 1 the resulting PDF will have page 7 first, then page 3, then page 1. To get them in the original document order, enter the numbers in ascending order. This means you can use the Extract tool not just to pick pages but also to reorder them at the same time.",
    },
    {
      question: "Is there a limit on how many pages I can extract at once?",
      answer: "There is no hard limit on the number of pages you can specify. You can extract a single page or nearly every page in the document. The only requirement is that at least one valid page number is entered and that all specified page numbers exist within the document.",
    },
    {
      question: "Can I extract pages from a password-protected PDF?",
      answer: "No. The file must be unlocked before pages can be extracted. Use the Dockitt Unlock PDF tool to remove the password first, then extract the pages from the unlocked version. You will need to know the current password to unlock the file.",
    },
    {
      question: "Does extracting pages affect the quality of the content on those pages?",
      answer: "No. Each page is copied from the original file without any re-compression or alteration. Text, images, fonts, and formatting are preserved exactly as they appear in the source document. The extracted pages look identical to how they appeared in the original PDF.",
    },
    {
      question: "What happens to the pages I do not extract?",
      answer: "Nothing. The original file is not modified in any way. The tool creates a new PDF containing only the pages you specified. Your original document remains exactly as it was, and only the extracted pages are available in the download.",
    },
  ],
};
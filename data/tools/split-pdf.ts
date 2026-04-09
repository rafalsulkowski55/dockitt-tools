export const splitPdfTool = {
  slug: "split-pdf",
  name: "Split PDF",
  title: "Split PDF Files Online",
  description: "Split PDF files into separate pages or smaller documents online for free.",
  longDescription: `Splitting a PDF lets you extract a specific range of pages from a larger document and save them as a new, separate file. This is useful when you need to share only part of a report, extract a chapter from a long document, or separate a multi-page scan into individual sections. Our free PDF splitter lets you define the exact page range you want to keep, processes the file in your browser, and lets you download the result immediately. No account needed, and nothing is stored on our servers.`,
  shortDescription: "Split PDF files into separate pages online for free.",
  category: "core",
  type: "process",
  primaryKeyword: "split pdf",
  secondaryKeywords: [
    "split pdf online",
    "split pdf free",
    "extract pages from pdf",
    "separate pdf pages",
    "split pdf into pages",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["merge-pdf", "extract-pdf-pages"],
  howTo: [
  "Click 'Choose PDF' and select the PDF file you want to split.",
  "Enter the page range you want to extract. For example, enter 1 and 5 to get pages 1 through 5 as a new document.",
  "Click 'Split PDF' to extract the selected pages.",
  "Download the new PDF containing only the pages you specified.",
  ],
  faqs: [
    {
      question: "What is the difference between Split PDF and Extract PDF Pages?",
      answer: "Split PDF works with consecutive page ranges. You define a start page and an end page, and the tool extracts everything in between as a new document. Extract PDF Pages lets you pick individual non-consecutive page numbers in any order, which is useful when the pages you need are scattered throughout the document. Use Split for chapters or sections, and Extract when you need specific pages that are not next to each other.",
    },
    {
      question: "Can I split a PDF into individual single pages?",
      answer: "The Split PDF tool extracts a range of pages rather than splitting into every individual page at once. To get a single page, set both the start and end of the range to the same number. For example, entering page 7 to page 7 will extract just that one page. If you need every page as a separate file, you would need to repeat this process for each page.",
    },
    {
      question: "Will splitting a PDF affect the quality of the content?",
      answer: "No. Splitting only separates pages from the original document. It does not re-compress or alter any text, images, fonts, or formatting. The extracted pages look identical to how they appeared in the original file.",
    },
    {
      question: "Can I split a password-protected PDF?",
      answer: "No. The file must be unlocked before it can be split. Use the Dockitt Unlock PDF tool to remove the password first, then split the unlocked version. You will need to know the current password to remove the protection.",
    },
    {
      question: "What happens to the pages I do not extract?",
      answer: "Nothing. The original file is not modified. The tool creates a new PDF containing only the pages you specified. Your original file remains exactly as it was, and the extracted pages are available as a separate download.",
    },
    {
      question: "Is there a page limit for splitting?",
      answer: "There is no limit on the number of pages you can extract, as long as the page range falls within the total number of pages in the document. The only file size constraint is the10MB upload limit. If your file is larger, try compressing it first before splitting.",
    },
  ],
};
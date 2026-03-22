export const howToSplitPdf = {
  slug: "how-to-split-pdf",
  title: "How to Split a PDF File Online",
  description: "Learn how to split a PDF into separate pages or smaller documents online — free and without any software.",
  intro: "Splitting a PDF is useful when you need to extract just a few pages from a large document, separate chapters, or send only part of a file to someone. Instead of sharing an entire report when only one section is relevant, you can split the PDF and share exactly what's needed. Dockitt lets you split any PDF directly in your browser — no account, no installation required.",
  steps: [
    "Go to the Dockitt Split PDF tool.",
    "Click 'Choose PDF' and upload the file you want to split.",
    "Enter the page range you want to extract — for example, pages 1 to 3.",
    "Click 'Split PDF' and wait for the tool to process your file.",
    "Download the extracted pages as a new PDF file.",
  ],
  commonProblems: [
    {
      problem: "I only need one specific page, not a range.",
      solution: "Enter the same number for both the start and end of the range — for example, page 5 to page 5. This will extract just that single page.",
    },
    {
      problem: "The split PDF is blank or corrupted.",
      solution: "This can happen with damaged PDF files. Try using the Dockitt Repair PDF tool first, then split the repaired file.",
    },
    {
      problem: "I need to split the PDF into many individual pages.",
      solution: "Split the file in multiple passes, extracting different page ranges each time. Full batch splitting into individual pages is on our roadmap.",
    },
    {
      problem: "The page numbers in the tool don't match what I see in the PDF viewer.",
      solution: "The tool counts physical pages starting from 1, regardless of any page numbering printed inside the document. Count the pages from the beginning of the file.",
    },
  ],
  relatedTool: "split-pdf",
  relatedGuides: ["how-to-merge-pdf", "how-to-extract-pdf-pages"],
  faqs: [
    {
      question: "What is the difference between Split PDF and Extract PDF Pages?",
      answer: "Split PDF lets you define a page range to extract as a new document. Extract PDF Pages lets you pick individual pages in any order, which is useful when the pages you need are not consecutive.",
    },
    {
      question: "Will splitting a PDF affect the quality of the content?",
      answer: "No. Splitting only separates pages — it does not re-compress or alter any text, images, or formatting inside the document.",
    },
    {
      question: "Can I split a scanned PDF?",
      answer: "Yes. Scanned PDFs are treated the same as regular PDFs — each scanned page is extracted as-is into the new file.",
    },
    {
      question: "Is there a file size limit for splitting?",
      answer: "Files up to 4.5MB can be processed directly. For larger files, try compressing the PDF first to bring it under the limit.",
    },
    {
      question: "Can I split a PDF on mobile?",
      answer: "Yes. The Dockitt Split PDF tool works on mobile browsers. Upload your file, set the page range, and download the result — all from your phone.",
    },
  ],
}
export const howToSplitPdf = {
  slug: "how-to-split-pdf",
  title: "How to Split a PDF File Online",
  description: "Learn how to split a PDF into separate pages or smaller documents online, without any software.",
  intro: "Splitting a PDF means extracting a specific set of pages from a larger document and saving them as a new, separate file. It is one of the most practical PDF tasks because it solves a very common problem: you have a large document but only need to share, submit, or work with part of it.",
  introList: [
    "Extract a single chapter from a long report before sharing it with a colleague",
    "Separate an invoice from a combined statement before uploading it to an accounting system",
    "Pull out a few relevant pages from a contract before sending them for review",
    "Split a scanned multi-page document into individual sections",
    "Remove the first or last pages from a document before sharing it",
  ],
  introOutro: "Dockitt lets you split any PDF directly in your browser with no account and no software required.",
  sections: [
    {
      title: "How to split a PDF online - step by step",
      steps: [
        "Open the Dockitt Split PDF tool in your browser.",
        "Click 'Choose PDF' or drag and drop your file into the upload area.",
        "Enter the page range you want to extract. For example, enter 3 to 7 to get pages 3 through 7 as a new document.",
        "Click 'Split PDF' and wait a few seconds while the tool processes your file.",
        "Click 'Download' to save the extracted pages as a new PDF file.",
        "Open the downloaded file to confirm it contains the correct pages.",
      ],
    },
    {
      title: "Split PDF vs Extract PDF Pages - which one to use",
      intro: "Dockitt has two tools that both involve pulling pages out of a PDF. They serve slightly different needs.",
      items: [
        "Split PDF is designed for consecutive page ranges. You define a start page and an end page, and the tool extracts everything in between as a new document. This is the right tool when you need pages 5 through 12, or pages 1 through 3, or any uninterrupted sequence of pages.",
        "Extract PDF Pages is designed for non-consecutive selections. You can pick individual page numbers in any order, such as pages 2, 7, and 14 from a 30-page document. The resulting PDF contains only those specific pages in the order you specified.",
        "When to use Split PDF: Use it when you need a contiguous section of a document, such as a chapter, a section, or the first few pages of a report.",
        "When to use Extract PDF Pages: Use it when the pages you need are scattered throughout the document and not in a simple consecutive range.",
      ],
    },
    {
      title: "Understanding page numbers when splitting",
      intro: "One of the most common sources of confusion when splitting PDFs is the difference between the physical page number and the printed page number.",
      items: [
        "Physical page numbers: These are what the PDF tool uses. Page 1 is always the first page in the file, page 2 is the second page, and so on, regardless of what is printed on the page.",
        "Printed page numbers: These are the numbers that appear on the pages themselves. A PDF might start with a cover page, then a table of contents, then the main content beginning at printed page 1. But that first page of main content is actually physical page 3 or 4 in the file.",
        "How to find the right physical page numbers: Open the PDF in your browser or a PDF viewer and count the pages from the beginning of the file. The page counter in most PDF viewers shows the physical page number.",
        "Roman numerals and front matter: Academic documents and books often use Roman numerals for front matter and Arabic numerals for the main text. The physical page count always starts from 1 regardless of this printed numbering.",
      ],
      outro: "When in doubt, open the PDF and count from the first page to find the physical page numbers you need.",
    },
    {
      title: "Splitting a PDF into multiple parts",
      intro: "Sometimes you need to split a single PDF into several separate documents, not just one extract. For example, you might have a combined annual report and need to create separate files for each quarter.",
      items: [
        "Split in multiple passes: Use the Split PDF tool once for each section you need. Upload the original file, extract the first range, download it, then upload again and extract the next range.",
        "Plan your ranges before starting: Write down the page ranges for each section you need before you begin. For example: Section 1 is pages 1 to 15, Section 2 is pages 16 to 30, Section 3 is pages 31 to 45.",
        "Name your files clearly as you download them: When downloading each split file, rename it immediately so you can tell them apart. Most browsers let you rename the file during the download prompt.",
        "Use Delete PDF Pages as an alternative: If you only need to remove a few pages rather than extract a specific range, the Delete PDF Pages tool lets you specify which pages to remove and saves the rest as a new document.",
      ],
    },
    {
      title: "Splitting large PDFs",
      intro: "Large PDF files are one of the most common reasons people split PDFs. A 200-page technical manual, a combined year of bank statements, or a scanned archive can all be impractically large to work with as a single file.",
      items: [
        "File size limits: The Split PDF tool supports files up to 10MB. If your PDF is larger than this, try compressing it first using the Dockitt Compress PDF tool. Structural compression often reduces file size significantly without any visible change to the content.",
        "Splitting for email: If you need to email a large PDF but it exceeds the attachment limit, split it into smaller sections and send them separately. Let the recipient know the document is split across multiple files and number the files clearly.",
        "Splitting scanned documents: Scanned PDFs are often large because each page is essentially a high-resolution photograph. Splitting a scanned PDF works the same as any other PDF. The tool extracts the specified pages as-is without re-compressing the images.",
        "Compressing after splitting: If the split file is still larger than needed, run it through the Compress PDF tool after splitting to reduce the size further.",
      ],
    },
    {
      title: "What splitting does and does not do",
      intro: "It helps to be clear about what the split operation actually changes in your document.",
      items: [
        "What it does: Creates a new PDF file containing only the pages you specified. The content of those pages is identical to the original.",
        "What it does not do: It does not modify the original file. The original PDF remains unchanged. You are creating a new document, not editing the existing one.",
        "Quality: Splitting does not re-compress or re-render any content. Text remains selectable, images stay at their original resolution, and fonts are preserved.",
        "Bookmarks and links: Page-level hyperlinks within the extracted pages are preserved. Document-level bookmarks pointing to pages outside the extracted range will no longer be valid in the new file.",
        "Page size: Each extracted page retains its original dimensions. If the original PDF had mixed page sizes, the split file will also have mixed page sizes.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "I only need one specific page, not a range.",
      solution: "Enter the same number for both the start and end of the range. For example, enter 5 to 5 to extract just page 5 as a new document.",
    },
    {
      problem: "The split PDF is blank or corrupted.",
      solution: "This can happen with damaged PDF files. Try using the Dockitt Repair PDF tool first, then split the repaired file.",
    },
    {
      problem: "The page numbers in the tool do not match what I see in the PDF viewer.",
      solution: "The tool uses physical page numbers starting from 1, regardless of any printed page numbers inside the document. Count the pages from the very beginning of the file to find the correct physical page numbers.",
    },
    {
      problem: "I need non-consecutive pages, not a range.",
      solution: "Use the Extract PDF Pages tool instead. It lets you specify individual page numbers in any order, such as pages 2, 5, and 9, rather than requiring a consecutive range.",
    },
    {
      problem: "The file is too large to upload.",
      solution: "The tool supports files up to 10MB. If your PDF is larger, compress it first using the Dockitt Compress PDF tool to bring it under the limit.",
    },
  ],
  relatedTools: [
    { name: "Merge PDF", slug: "merge-pdf", description: "Combine split sections back into one document." },
    { name: "Extract PDF Pages", slug: "extract-pdf-pages", description: "Pick individual non-consecutive pages from a PDF." },
    { name: "Delete PDF Pages", slug: "delete-pdf-pages", description: "Remove specific pages instead of extracting a range." },
    { name: "Compress PDF", slug: "compress-pdf", description: "Reduce file size before or after splitting." },
  ],
  relatedTool: "split-pdf",
  relatedGuides: ["how-to-merge-pdf", "how-to-extract-pdf-pages"],
  faqs: [
    {
      question: "What is the difference between Split PDF and Extract PDF Pages?",
      answer: "Split PDF extracts a consecutive page range, such as pages 3 to 8. Extract PDF Pages lets you pick individual non-consecutive pages in any order, such as pages 2, 7, and 14. Use Split PDF for sections and chapters, and Extract PDF Pages when the pages you need are scattered throughout the document.",
    },
    {
      question: "Will splitting a PDF affect the quality of the content?",
      answer: "No. Splitting only separates pages without re-compressing or altering any text, images, or formatting inside the document. The extracted pages are identical to the originals.",
    },
    {
      question: "Can I split a scanned PDF?",
      answer: "Yes. Scanned PDFs are treated the same as regular PDFs. Each scanned page is extracted as-is into the new file with no quality loss.",
    },
    {
      question: "Is there a file size limit for splitting?",
      answer: "Files up to 10MB can be processed. For larger files, compress the PDF first using the Dockitt Compress PDF tool to bring it under the limit.",
    },
    {
      question: "Can I split a PDF on mobile?",
      answer: "Yes. The Split PDF tool works on mobile browsers on both iPhone and Android. Upload your file, set the page range, and download the result directly from your phone.",
    },
    {
      question: "Does splitting a PDF remove the original file?",
      answer: "No. Splitting creates a new file containing the pages you specified. The original file on your device is not affected in any way.",
    },
    {
      question: "Can I split a password-protected PDF?",
      answer: "No. The PDF must be unlocked before it can be processed. Use the Dockitt Unlock PDF tool to remove the password first, then split the unlocked file.",
    },
    {
      question: "How do I split a PDF into multiple separate files?",
      answer: "Process the file multiple times, once for each section you need. Each pass extracts a different page range and produces a separate download. Plan your page ranges before you start so you know exactly which pages go into each output file.",
    },
  ],
  ctaText: "Ready to split your PDF? Use the free Dockitt tool below.",
  ctaLinks: [
    { name: "Split PDF", slug: "split-pdf", description: "Extract pages from a PDF online " },
  ],
}
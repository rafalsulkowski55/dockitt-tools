export const howToConvertWordToPdf = {
  slug: "how-to-convert-word-to-pdf",
  title: "How to Convert a Word Document to PDF Online",
  description: "Learn how to convert a Word document (.docx) to PDF online — preserve your formatting and share documents that look the same on every device.",
  intro: "Converting a Word document to PDF is one of the most common document tasks in professional and personal life — and for good reason. A PDF looks identical on every device and operating system, regardless of whether the recipient has Microsoft Word installed, which version they're using, or which fonts are available on their system. When you send a Word document, there's always a risk that it opens with different fonts, shifted layouts, or broken formatting on the other end. When you send a PDF, what you see is what they get. Dockitt uses LibreOffice on the server to convert your .docx file to PDF, producing a clean, accurate output that preserves your formatting.",
  steps: [
    "Go to the Dockitt Word to PDF tool.",
    "Click 'Choose Word file' and upload your .doc or .docx document.",
    "Click 'Convert to PDF' and wait while LibreOffice processes the conversion.",
    "Download the PDF file.",
    "Open it to verify the formatting looks as expected before sharing.",
  ],
  commonProblems: [
    {
      problem: "The PDF looks different from the Word document — fonts have changed.",
      solution: "If your Word document uses fonts that are not installed on the conversion server, LibreOffice will substitute them with available alternatives, which can affect the layout. For most standard fonts like Arial, Times New Roman, Calibri, and similar system fonts, conversion is clean. If you use custom or licensed fonts, the safest approach is to convert the document to PDF directly from Microsoft Word on your own computer using File > Save As > PDF, as your fonts are available locally.",
    },
    {
      problem: "Tables in the PDF look misaligned or broken.",
      solution: "Complex table layouts, especially those using merged cells, nested tables, or precise column widths, can sometimes shift during conversion. For important documents with complex tables, verify the PDF output carefully and adjust the Word document's table structure if needed. Simpler table structures generally convert more reliably.",
    },
    {
      problem: "Headers and footers are missing or positioned incorrectly.",
      solution: "LibreOffice handles most standard Word headers and footers correctly. If yours are missing, check whether they were set as 'Different first page' or 'Different odd and even pages' in Word — these settings can sometimes cause issues in conversion. Also verify that the header and footer are within the standard margin boundaries.",
    },
    {
      problem: "The converted PDF has extra blank pages.",
      solution: "Extra blank pages in the PDF usually come from extra blank pages or section breaks in the Word document itself. Open the original document, enable formatting marks (Ctrl+Shift+8 in Word), and look for empty paragraphs or page breaks at the end of the document or between sections. Remove them and reconvert.",
    },
    {
      problem: "Images in the Word document are missing or low quality in the PDF.",
      solution: "Images embedded in Word documents should convert cleanly in most cases. If images appear low quality, check the original Word document — Word sometimes compresses images when they're inserted. Go to File > Options > Advanced > Image Size and Quality and disable image compression before reconverting.",
    },
  ],
  relatedTool: "convert-pdf",
  relatedToolUrl: "/convert-pdf/word-to-pdf",
  relatedGuides: ["how-to-convert-pdf-to-word", "how-to-compress-pdf"],
  faqs: [
    {
      question: "Why should I convert a Word document to PDF instead of just sending the .docx file?",
      answer: "PDFs are universally viewable without any additional software and look identical on every device. Word documents can look different depending on the recipient's version of Word, their operating system, and the fonts installed on their computer. For professional documents, contracts, CVs, reports, and anything where visual consistency matters, PDF is always the safer choice.",
    },
    {
      question: "Does the conversion preserve hyperlinks in the document?",
      answer: "Yes. Hyperlinks embedded in the Word document are preserved as clickable links in the PDF output. This includes both web URLs and internal document links.",
    },
    {
      question: "Can I convert a .doc file as well as .docx?",
      answer: "Yes. Both the older .doc format and the newer .docx format are accepted by the tool. LibreOffice handles both formats.",
    },
    {
      question: "Is there a file size limit for Word to PDF conversion?",
      answer: "Files up to 4.5MB can be processed. If your document is larger — for example because it contains many high-resolution images — try compressing the images within Word before converting, or split the document into smaller sections.",
    },
    {
      question: "Will the PDF be editable after conversion?",
      answer: "The resulting PDF is a standard, unprotected PDF — it can be viewed, printed, and further processed with PDF tools. It is not editable as a text document without converting it back to Word. If you want to prevent others from editing or copying the content, use the Dockitt Protect PDF tool to add a password after conversion.",
    },
  ],
}
export const howToConvertWordToPdf = {
  slug: "how-to-convert-word-to-pdf",
  title: "How to Convert a Word Document to PDF Online",
  description: "Learn how to convert a Word document to PDF online. Preserve your formatting and share documents that look the same on every device.",
  intro: "Converting a Word document to PDF is one of the most common document tasks in professional and personal life. A PDF looks identical on every device and operating system, regardless of whether the recipient has Microsoft Word installed, which version they are using, or which fonts are available on their system. When you send a Word document, there is always a risk that it opens with different fonts, shifted layouts, or broken formatting on the other end. When you send a PDF, what you see is what they get.",
  introList: [
    "Send a CV or resume that looks identical on every device",
    "Submit a report or proposal without worrying about formatting differences",
    "Share a contract or agreement in a format that cannot be accidentally edited",
    "Upload a document to a portal or form that requires PDF format",
    "Archive a Word document in a stable format that will open correctly years from now",
  ],
  introOutro: "Dockitt uses LibreOffice on the server to convert your .docx file to PDF, producing a clean, accurate output that preserves your formatting.",
  sections: [
    {
      title: "How to convert a Word document to PDF online - step by step",
      steps: [
        "Open the Dockitt Word to PDF tool in your browser.",
        "Click 'Choose Word file' or drag and drop your .doc or .docx document into the upload area.",
        "Click 'Convert to PDF' and wait while LibreOffice processes the conversion on the server. This typically takes 10 to 30 seconds.",
        "Once complete, click 'Download' to save the PDF file to your device.",
        "Open the downloaded PDF to verify the formatting looks correct before sharing or submitting it.",
      ],
    },
    {
      title: "Why Word documents look different on different devices",
      intro: "Understanding why PDFs are more reliable than Word documents for sharing helps explain why conversion is worth doing.",
      items: [
        "Font substitution: If the recipient does not have the same fonts installed as you, their computer substitutes a different font. Even a small difference in font metrics can cause text to reflow, headings to shift, and carefully laid out pages to break.",
        "Word version differences: Microsoft Word has changed significantly over the years. A document created in Word 2019 may look different when opened in Word 2010 or in an older version of LibreOffice.",
        "Operating system differences: Word on Windows and Word on Mac can render the same document differently, particularly for documents with complex formatting or non-standard fonts.",
        "Page size and margin settings: If the recipient's default printer or page setup differs from yours, Word may reflow the entire document to fit different page dimensions.",
        "PDF eliminates all of these problems: A PDF is a fixed-layout format. Every page looks exactly as it was when the PDF was created, on every device, in every PDF viewer, forever.",
      ],
    },
    {
      title: "What converts well from Word to PDF",
      intro: "Most Word documents convert cleanly to PDF. Here is what to expect for different types of content.",
      items: [
        "Standard text and paragraphs: Convert perfectly. Font, size, colour, bold, italic, underline, and paragraph spacing are all preserved.",
        "Headings and styles: Heading styles defined in Word are converted correctly and create a proper document structure in the PDF.",
        "Bullet points and numbered lists: Convert correctly in almost all cases.",
        "Tables: Simple tables with clear borders and standard column widths convert well. Complex tables with merged cells, nested tables, or heavily customised formatting may have minor alignment differences.",
        "Images: Embedded images convert cleanly in most cases. Very high resolution images are preserved at their original quality.",
        "Hyperlinks: Web URLs and internal document links are preserved as clickable links in the PDF.",
        "Headers and footers: Standard headers and footers convert correctly. Section-specific headers and footers with complex settings occasionally need to be checked after conversion.",
        "Custom fonts: Fonts installed on the conversion server convert correctly. If your document uses a custom or licensed font that is not available on the server, LibreOffice will substitute a similar font, which can affect the layout.",
      ],
    },
    {
      title: "Converting a Word document to PDF on different platforms",
      intro: "Dockitt converts Word to PDF via a server-side process using LibreOffice, which works the same regardless of your device. However, there are also native methods on each platform worth knowing about.",
      items: [
        "Using Dockitt online: Upload the file, convert, download. Works from any device and any browser. No software needed.",
        "Using Microsoft Word on Windows: Go to File, then Save As, select PDF from the format dropdown, and click Save. This is the most accurate method because your fonts are available locally.",
        "Using Microsoft Word on Mac: Go to File, then Export, then Export as PDF. Alternatively, use File, Print, then click the PDF dropdown in the bottom left of the print dialog.",
        "Using Google Docs: Open the .docx file in Google Docs, go to File, then Download, then PDF Document. Note that Google Docs may alter the formatting slightly when it interprets the Word file.",
        "Using LibreOffice Writer: Open the file, go to File, then Export as PDF. LibreOffice gives you detailed control over PDF export settings.",
      ],
      outro: "For documents with standard formatting and common fonts, any of these methods will produce a good result. For documents with custom fonts or complex layouts, converting directly from Microsoft Word on your own computer gives the most accurate output because all your fonts are available locally.",
    },
    {
      title: "Checking the converted PDF before sharing",
      intro: "Before sending or submitting a converted PDF, it is worth taking a minute to check the output.",
      items: [
        "Scroll through every page: Look for any pages that appear blank, have text cut off at the edges, or have unexpected layout changes.",
        "Check tables: Tables are the most common source of conversion differences. Verify that all columns and rows are intact and that text is not overflowing cells.",
        "Check images: Confirm that all images are present and positioned correctly.",
        "Check headers and footers: Verify that page numbers and any header or footer content appear on every page they should.",
        "Check the last page: Extra blank pages at the end of the document are a common conversion artefact. If there is an unwanted blank page at the end, delete it in the original Word document and reconvert.",
        "Check hyperlinks: Click any important links in the PDF to confirm they are active and point to the correct destinations.",
      ],
    },
    {
      title: "Protecting the converted PDF",
      intro: "A converted PDF is a standard, unprotected document by default. Anyone who receives it can open, view, and print it. If you need to restrict access or prevent copying, you can add protection after conversion.",
      items: [
        "Password protection: Use the Dockitt Protect PDF tool to add a password to the converted PDF. Recipients will need the password to open the file.",
        "Preventing editing: A PDF is not editable as a document by default, but it can be further processed with PDF tools. If you want to prevent any modification, password protection with an owner password restricts what others can do with the file.",
        "Adding a watermark: If you are sharing a draft or a confidential document, use the Dockitt Watermark PDF tool to add a visible watermark such as DRAFT or CONFIDENTIAL to every page.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "The PDF looks different from the Word document and the fonts have changed.",
      solution: "If your Word document uses fonts that are not installed on the conversion server, LibreOffice will substitute them with available alternatives, which can affect the layout. For most standard fonts including Arial, Times New Roman, and Calibri, conversion is clean. If you use custom or licensed fonts, convert the document to PDF directly from Microsoft Word on your own computer using File, Save As, PDF, as your fonts are available locally.",
    },
    {
      problem: "Tables in the PDF look misaligned or broken.",
      solution: "Complex table layouts with merged cells, nested tables, or precise column widths can sometimes shift during conversion. For important documents with complex tables, verify the PDF output carefully. Simpler table structures generally convert more reliably.",
    },
    {
      problem: "The converted PDF has extra blank pages.",
      solution: "Extra blank pages usually come from empty paragraphs or section breaks in the Word document. Open the original document, enable formatting marks with Ctrl+Shift+8 in Word, and look for empty paragraphs or page breaks at the end of the document or between sections. Remove them and reconvert.",
    },
    {
      problem: "Images in the Word document are missing or low quality in the PDF.",
      solution: "Images embedded in Word documents should convert cleanly in most cases. If images appear low quality, check whether Word has compressed them. Go to File, Options, Advanced, Image Size and Quality, and disable image compression before reconverting.",
    },
    {
      problem: "The conversion fails or the download does not appear.",
      solution: "Try refreshing the page and uploading the file again. Check that the file is a valid .doc or .docx file and not corrupted. If the file is very large, try splitting it into smaller sections before converting.",
    },
  ],
  relatedTools: [
    { name: "Protect PDF", slug: "protect-pdf", description: "Add a password to the converted PDF before sharing." },
    { name: "Compress PDF", slug: "compress-pdf", description: "Reduce the size of the converted PDF." },
    { name: "Watermark PDF", slug: "watermark-pdf", description: "Add a watermark to the converted PDF." },
    { name: "PDF to Word", slug: "convert-pdf/pdf-to-word", description: "Convert back from PDF to an editable Word document." },
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
      answer: "Yes. Hyperlinks embedded in the Word document are preserved as clickable links in the PDF output. This includes both web URLs and internal document links such as links between sections or to footnotes.",
    },
    {
      question: "Can I convert a .doc file as well as .docx?",
      answer: "Yes. Both the older .doc format and the newer .docx format are accepted. LibreOffice handles both formats and the conversion process is the same for either.",
    },
    {
      question: "Is there a file size limit for Word to PDF conversion?",
      answer: "Files up to 10MB can be processed. If your document is larger because it contains many high-resolution images, try compressing the images within Word before converting, or split the document into smaller sections.",
    },
    {
      question: "Will the PDF be editable after conversion?",
      answer: "The resulting PDF is a standard, unprotected PDF. It can be viewed, printed, and processed with PDF tools. It is not editable as a text document without converting it back to Word. If you want to prevent others from editing or copying the content, use the Dockitt Protect PDF tool to add a password after conversion.",
    },
    {
      question: "How long does the conversion take?",
      answer: "Most Word documents convert in 10 to 30 seconds. Larger files or documents with many images may take up to a minute. The conversion runs on the server using LibreOffice so the speed does not depend on your device.",
    },
    {
      question: "Why does the converted PDF have a slightly different layout than the Word document?",
      answer: "Minor layout differences can occur when the conversion server does not have the exact same fonts as your computer. LibreOffice substitutes a similar font, which can cause text to reflow slightly. For documents where precise layout is critical, convert directly from Microsoft Word on your own computer using File, Save As, PDF.",
    },
    {
      question: "Can I convert a password-protected Word document to PDF?",
      answer: "Password-protected Word documents cannot be converted until the password protection is removed. Open the document in Microsoft Word, remove the password protection via File, Info, Protect Document, and save the file before uploading for conversion.",
    },
  ],
  ctaText: "Ready to convert your Word document to PDF? Use the free Dockitt converter below.",
  ctaLinks: [
    { name: "Word to PDF", slug: "convert-pdf/word-to-pdf", description: "Convert Word documents to PDF online for free" },
  ],
}
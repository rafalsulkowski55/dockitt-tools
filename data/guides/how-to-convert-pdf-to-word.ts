export const howToConvertPdfToWord = {
  slug: "how-to-convert-pdf-to-word",
  title: "How to Convert a PDF to Word Online",
  description: "Learn how to convert a PDF to an editable Word document online — get a .docx file you can edit in Microsoft Word or Google Docs, free.",
  intro: "PDF files are designed for viewing, not editing. Once a document is saved as a PDF, changing even a single word requires either a professional PDF editor or converting it back to an editable format. Converting a PDF to a Word document (.docx) is the most common way to make a PDF editable again — you get a file you can open in Microsoft Word, Google Docs, LibreOffice, or any other word processor, and edit freely. Dockitt uses LibreOffice on the server side to handle the conversion, which produces clean, well-structured Word documents for most standard PDF types. The result is a .docx file you can download and start editing immediately.",
  steps: [
    "Go to the Dockitt PDF to Word tool.",
    "Click 'Choose PDF' and upload the file you want to convert.",
    "Click 'Convert to Word' and wait while LibreOffice processes the conversion on the server.",
    "Download the .docx file.",
    "Open the file in Microsoft Word, Google Docs, or LibreOffice Writer to edit it.",
  ],
  commonProblems: [
    {
      problem: "The formatting in the Word document looks different from the PDF.",
      solution: "PDF to Word conversion is an inherently imperfect process. PDFs store content as positioned elements on a page — they don't store semantic structure like 'this is a heading' or 'this is a paragraph'. LibreOffice does its best to reconstruct the document structure, but complex layouts with multiple columns, text boxes, tables, or custom fonts may not convert perfectly. Simple, text-heavy PDFs convert much more cleanly than complex formatted layouts.",
    },
    {
      problem: "The converted Word document has each line as a separate paragraph.",
      solution: "This happens when the PDF was created from a layout application that treats each line as an independent text element, rather than flowing paragraphs. In the Word document, you can fix this by selecting all text (Ctrl+A), then using Find & Replace to replace single newlines with spaces — the exact method varies by word processor.",
    },
    {
      problem: "Images from the PDF are missing in the Word document.",
      solution: "LibreOffice extracts embedded images during conversion, but some PDFs embed images in formats or with encodings that don't transfer cleanly. If images are critical, consider extracting them from the PDF separately using the PDF to JPG or PDF to PNG tools, then inserting them manually into the Word document.",
    },
    {
      problem: "The file is taking a long time to convert.",
      solution: "PDF to Word conversion runs on the server and involves LibreOffice processing your file. Large PDFs or documents with complex formatting take longer. Files up to 4.5MB are supported — if your file is larger, try compressing it first using the Dockitt Compress PDF tool.",
    },
    {
      problem: "The converted document contains garbled text or strange characters.",
      solution: "This usually means the PDF uses a custom or embedded font that LibreOffice cannot map to standard text characters. It can also happen with PDFs that were scanned — if the PDF is a scan without an OCR text layer, there is no text to extract, only images. Run the Dockitt OCR PDF tool on your scanned document first, then convert it to Word.",
    },
  ],
  relatedTool: "convert-pdf",
  relatedToolUrl: "/convert-pdf/pdf-to-word",
  relatedGuides: ["how-to-ocr-pdf", "how-to-convert-word-to-pdf"],
  faqs: [
    {
      question: "Will the converted Word document look exactly like the PDF?",
      answer: "For simple, text-based PDFs, the conversion is usually very close to the original. For PDFs with complex layouts, multiple columns, custom fonts, or heavy use of tables and text boxes, some differences in formatting are expected. The text content should be preserved accurately even when the layout differs.",
    },
    {
      question: "Can I convert a scanned PDF to Word?",
      answer: "Not directly — a scanned PDF contains images of text, not actual text data. Before converting a scan to Word, you need to run OCR on it first using the Dockitt OCR PDF tool, which adds a text layer to the scanned images. Once the PDF has a text layer, the conversion to Word will work properly.",
    },
    {
      question: "What word processors can open the converted .docx file?",
      answer: "The output is a standard .docx file compatible with Microsoft Word (2007 and later), Google Docs, LibreOffice Writer, Apple Pages, and any other modern word processor that supports the .docx format.",
    },
    {
      question: "Is my document content safe when converting to Word?",
      answer: "Your file is sent to a secure server where LibreOffice performs the conversion. The file is deleted immediately after the converted document is returned to you. Dockitt does not store, read, or share your document content.",
    },
    {
      question: "Can I convert a password-protected PDF to Word?",
      answer: "No. The PDF must be unlocked before it can be processed. Use the Dockitt Unlock PDF tool to remove the password first, then convert the unlocked file to Word.",
    },
  ],
}
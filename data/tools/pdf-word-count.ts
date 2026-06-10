export const pdfWordCountTool = {
  slug: "pdf-word-count",
  name: "PDF Word Count",
  title: "Count Words in PDF Online",
  description: "Count the words, characters, and pages in any PDF file instantly in your browser.",
  longDescription: `Knowing exactly how many words are in a PDF is useful in more situations than you might expect. Translators charge by word count. Editors need to know the scope of a document before quoting. Students need to verify they have met a word count requirement. Publishers check length before accepting a manuscript. Lawyers count words in contracts and filings. This tool extracts the text from your PDF and counts every word, character, and page instantly. Because the entire process runs in your browser using PDF.js, your file never leaves your device. There is nothing to upload and no waiting for server processing. The results appear as soon as the PDF is loaded.`,
  shortDescription: "Count words and characters in PDF files instantly in your browser.",
  category: "utility",
  type: "process",
  primaryKeyword: "pdf word count",
  secondaryKeywords: [
    "count words in pdf",
    "pdf character count",
    "pdf word counter online",
    "how many words in pdf",
    "pdf page count",
  ],
  inputOutput: { input: "pdf", output: "result" },
  relatedTools: ["pdf-to-text", "ocr-pdf", "split-pdf", "compress-pdf"],
  howTo: [
    "Click 'Choose PDF' and select the PDF file you want to count words in.",
    "The tool extracts the text and counts words, characters, and pages instantly in your browser.",
    "View the word count, character count, and page count results on the page.",
  ],
  faqs: [
    {
      question: "Does this tool work on scanned PDFs?",
      answer: "Scanned PDFs contain images of text rather than actual text data, so the word count will be zero or very low. To count words in a scanned PDF, run it through the Dockitt OCR PDF tool first to add a searchable text layer, then use the word count tool on the OCR-processed version.",
    },
    {
      question: "Is my file uploaded to a server?",
      answer: "No. This tool runs entirely in your browser using PDF.js. Your file is never uploaded anywhere and never leaves your device. The word count is calculated locally on your computer.",
    },
    {
      question: "What counts as a word?",
      answer: "Words are counted using standard word boundary detection. A word is any sequence of characters separated by spaces or punctuation. Numbers count as words. Hyphenated words are typically counted as one word. Headers, footers, captions, and all other text visible in the document are included in the count.",
    },
    {
      question: "Does the character count include spaces?",
      answer: "The tool shows both the total character count including spaces and the character count excluding spaces, so you can use whichever figure is relevant to your needs.",
    },
    {
      question: "Why does the word count differ from what Microsoft Word shows?",
      answer: "Different tools use slightly different rules for what constitutes a word boundary. Differences are usually small and related to how hyphenated words, numbers with punctuation, or text in tables and footnotes are handled. For most purposes the counts will be very close to identical.",
    },
    {
      question: "Can I count words in a specific section of a PDF?",
      answer: "Currently the tool counts words across the entire document. To count words in a specific section, use the Split PDF or Extract Pages tool to isolate the pages you need, then run the word count on that portion.",
    },
  ],
};
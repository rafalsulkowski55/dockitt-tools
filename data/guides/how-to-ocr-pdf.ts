export const howToOcrPdf = {
  slug: "how-to-ocr-pdf",
  title: "How to Make a Scanned PDF Searchable with OCR",
  description: "Learn how to use OCR to add a searchable text layer to a scanned PDF, without any software.",
  intro: "When you scan a physical document, the result is a PDF that looks like text but is actually just an image of text. You cannot search it, you cannot copy text from it, and screen readers cannot read it aloud. This is where OCR comes in. OCR analyses the image of each page, identifies the characters and words, and adds an invisible text layer on top of the image. The result is a PDF that looks identical to the original scan but now behaves like a proper text document.",
  introList: [
    "Make a scanned contract or legal document searchable",
    "Enable copy-paste from a scanned report or invoice",
    "Add a text layer to a scanned form before converting it to Word",
    "Make scanned pages accessible to screen readers",
    "Prepare a scanned document for indexing or archiving",
  ],
  introOutro: "Dockitt uses ocrmypdf with the Tesseract engine, one of the most accurate open-source OCR systems available, to process your scanned PDFs.",
  sections: [
    {
      title: "How to run OCR on a scanned PDF online - step by step",
      steps: [
        "Open the Dockitt OCR PDF tool in your browser.",
        "Click 'Choose PDF' or drag and drop your scanned PDF into the upload area.",
        "Click 'Run OCR' and wait while Tesseract analyses each page and adds the text layer. This may take 30 seconds to a few minutes depending on the number of pages.",
        "Click 'Download' to save the OCR-processed PDF to your device.",
        "Open the file in any PDF viewer and press Ctrl+F on Windows or Cmd+F on Mac to search for text. If OCR worked correctly, the search should find words on the page.",
      ],
    },
    {
      title: "What OCR does and does not do",
      intro: "Understanding exactly what OCR changes in your PDF helps set the right expectations for the result.",
      items: [
        "What OCR does: It adds an invisible text layer to your PDF. This layer contains the text that Tesseract recognised from the page images. The text layer is what enables search, copy-paste, and screen reader access.",
        "What OCR does not do: It does not change the visual appearance of the PDF in any way. The scanned page images remain exactly as they were. If your scan has a coffee stain, a skewed page, or a shadow in the corner, those will still be visible. OCR only adds text on top of the existing images.",
        "The text layer is invisible: When you open the OCR-processed PDF in a standard viewer, you see the original scan. The text layer is hidden underneath. You only interact with it when you use search, copy-paste, or a screen reader.",
        "OCR accuracy is not perfect: The text layer may contain errors, especially for low-quality scans or unusual fonts. These errors affect search accuracy but do not change the visual appearance of the document.",
        "The file size increases: Adding a text layer increases the file size. For a high-resolution scan, the increase can be significant. After OCR, run the file through the Compress PDF tool if size is a concern.",
      ],
    },
    {
      title: "What affects OCR accuracy",
      intro: "OCR accuracy varies significantly depending on the quality of the original scan and the nature of the content. Here is what has the most impact.",
      items: [
        "Scan resolution: This is the single biggest factor. A scan at 300 DPI produces much better OCR results than a scan at 150 DPI. Most modern scanners default to 300 DPI for document scanning. If you are scanning specifically for OCR, 300 DPI is the minimum and 400 DPI gives better results for small text.",
        "Page orientation: Tesseract works best on pages that are upright and straight. Tilted or skewed pages reduce accuracy. If your scan is rotated, use the Dockitt Rotate PDF tool to correct the orientation before running OCR.",
        "Image contrast: Pages with good contrast between dark text and a white or light background produce better results than pages with faded ink, yellowed paper, or heavy shadows from the binding.",
        "Font type: Standard printed fonts in common sizes are recognised with very high accuracy. Unusual fonts, decorative text, very small text, and handwriting are harder for Tesseract to recognise accurately.",
        "Language: Tesseract supports over 100 languages but the current Dockitt implementation uses the English language model. Documents in other languages that use the Latin alphabet will usually produce reasonable results. Documents in non-Latin scripts may produce poor results.",
        "Mixed content: Pages that mix text with diagrams, photos, or complex tables are harder to process than pages with plain text. Tesseract focuses on the text regions and generally ignores images.",
      ],
    },
    {
      title: "OCR vs text-based PDFs",
      intro: "Not all PDFs need OCR. Understanding the difference between a scanned PDF and a text-based PDF helps you decide whether OCR is the right tool for your situation.",
      items: [
        "Text-based PDFs: These are PDFs that were created digitally, for example exported from Word, generated by accounting software, or saved as PDF from a web page. They already contain a text layer. You can click on text, select it, and copy it. Search works immediately without any OCR processing.",
        "Scanned PDFs without OCR: These are PDFs created by scanning physical paper. Each page is an image. You cannot select text, search does not find words on the page, and screen readers see a blank document. These need OCR.",
        "Scanned PDFs with OCR already applied: These are scanned PDFs that have already been processed with OCR at some point. They have both the scanned page images and a text layer. Search and copy-paste already work. Running OCR again is unnecessary and may create overlapping text layers.",
        "How to tell the difference: Open the PDF and try to click on and select a word. If you can select text, the PDF already has a text layer and does not need OCR. If you cannot select any text, it is an image-based scan and OCR will help.",
      ],
    },
    {
      title: "Using OCR before converting to Word",
      intro: "One of the most common reasons to run OCR is to prepare a scanned PDF for conversion to an editable Word document.",
      items: [
        "Why OCR is required first: The PDF to Word conversion tool extracts text from the PDF text layer to create the Word document. If there is no text layer, the conversion produces an empty or image-only Word document that cannot be edited as text.",
        "The correct order: Run OCR on the scanned PDF first, then convert the OCR-processed file to Word using the Dockitt PDF to Word tool.",
        "Accuracy expectations: The quality of the Word document depends on the accuracy of the OCR. If the OCR text layer contains errors, those errors will appear in the Word document. High-quality scans at 300 DPI or above produce much better Word documents.",
        "After converting: The Word document will likely need some cleanup. OCR errors, line breaks that do not match paragraph breaks, and image positioning may need manual correction.",
      ],
    },
    {
      title: "Processing large scanned documents",
      intro: "OCR is computationally intensive. Large scanned documents take significantly longer to process than small ones.",
      items: [
        "Expected processing times: A 10-page document typically takes 30 to 60 seconds. A 50-page document may take 3 to 5 minutes. A 100-page document can take 10 minutes or more.",
        "If the tool times out: Try splitting the PDF into smaller sections using the Split PDF tool and running OCR on each section separately. Then merge the processed sections back together using the Merge PDF tool.",
        "Keep the browser tab open: OCR processing runs on the server. Keep the browser tab open while processing is in progress. Closing the tab or navigating away will interrupt the process.",
        "Compress after OCR: OCR-processed files are larger than the originals. After processing, run the file through the Compress PDF tool to reduce the size without losing the text layer.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "The OCR result contains lots of errors and garbled text.",
      solution: "OCR accuracy depends heavily on scan quality. Low-resolution scans, pages with heavy shadows, skewed text, or faded ink produce poor results. If possible, re-scan the document at 300 DPI or higher with good lighting and straight pages. OCR errors affect search accuracy but do not change the visual appearance of the document.",
    },
    {
      problem: "The OCR process is very slow.",
      solution: "OCR is computationally intensive. A 50-page document may take several minutes to process. This is normal. If the tool times out on very large files, split the PDF into smaller sections and run OCR on each part separately, then merge the results.",
    },
    {
      problem: "After OCR, the file is much larger than the original.",
      solution: "Adding a text layer increases the file size, especially for high-resolution scans. After OCR processing, run the file through the Dockitt Compress PDF tool to reduce the size without losing the text layer.",
    },
    {
      problem: "The PDF already has text but OCR added a duplicate layer.",
      solution: "Only use the OCR tool on PDFs that are purely image-based scans where text selection and search do not work. If your PDF already has selectable text, running OCR again is unnecessary.",
    },
    {
      problem: "Search still does not work after OCR.",
      solution: "Try opening the processed file in a different PDF viewer such as Adobe Acrobat Reader. Some PDF viewers do not support text layer search. Also confirm the OCR actually processed by trying to click on and select text on the page.",
    },
  ],
  relatedTools: [
    { name: "PDF to Word", slug: "convert-pdf/pdf-to-word", description: "Convert an OCR-processed PDF to an editable Word document." },
    { name: "Compress PDF", slug: "compress-pdf", description: "Reduce file size after OCR processing." },
    { name: "Rotate PDF", slug: "rotate-pdf", description: "Fix page orientation before running OCR." },
    { name: "Split PDF", slug: "split-pdf", description: "Split large documents before OCR processing." },
  ],
  relatedTool: "ocr-pdf",
  relatedGuides: ["how-to-compress-pdf", "how-to-repair-pdf"],
  faqs: [
    {
      question: "What is OCR and how does it work?",
      answer: "OCR stands for Optical Character Recognition. It is a technology that analyses images containing text and identifies individual characters using pattern matching and machine learning models. Dockitt uses Tesseract, an open-source OCR engine originally developed by HP and now maintained by Google, combined with ocrmypdf to integrate the text layer cleanly into your PDF.",
    },
    {
      question: "Will OCR change how my PDF looks?",
      answer: "No. The visual appearance of the PDF remains identical to the original scan. OCR adds an invisible text layer underneath the page images. The scanned images themselves are not altered. When you open the processed PDF it looks exactly the same as before, but now supports text search, copy-paste, and screen reader access.",
    },
    {
      question: "Can OCR handle handwritten text?",
      answer: "Standard OCR engines including Tesseract are optimised for printed text and struggle significantly with handwriting, especially cursive. Handwriting recognition requires specialised models that are not part of this tool. For handwritten documents, results will be unreliable.",
    },
    {
      question: "Does OCR work on PDFs with multiple columns or complex layouts?",
      answer: "Tesseract handles multi-column layouts reasonably well for simple two-column documents. Complex magazine-style layouts, tables, or mixed text-and-image pages may produce text that is out of order in the text layer. The visual appearance remains correct, only the order of text in the hidden layer may be inconsistent for complex layouts.",
    },
    {
      question: "Is the OCR text layer used for anything besides searching?",
      answer: "Yes. The text layer enables copy-pasting text from the PDF, makes the document accessible to screen readers for visually impaired users, allows text extraction for further processing, and improves the document's indexability by search engines if it is published online.",
    },
    {
      question: "How long does OCR processing take?",
      answer: "Processing time depends on the number of pages and the resolution of the scanned images. A 10-page document typically takes 30 to 60 seconds. A 50-page document may take several minutes. Keep the browser tab open while processing is in progress.",
    },
    {
      question: "Can I run OCR on a PDF that already has some text pages and some scanned pages?",
      answer: "Yes. ocrmypdf is designed to skip pages that already have a text layer and only process image-based pages. Running OCR on a mixed PDF is safe and will add text layers only to the pages that need them.",
    },
  ],
  ctaText: "Ready to make your scanned PDF searchable? Use the free Dockitt OCR tool below.",
  ctaLinks: [
    { name: "OCR PDF", slug: "ocr-pdf", description: "Add a searchable text layer to scanned PDFs " },
  ],
}
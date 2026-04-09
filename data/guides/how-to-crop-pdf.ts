export const howToCropPdf = {
  slug: "how-to-crop-pdf",
  title: "How to Crop PDF Pages Online",
  description: "Learn how to crop and trim PDF pages online. Remove unwanted margins, borders, and whitespace free and without any software.",
  intro: "Cropping a PDF removes the visible edges of each page, trimming away margins, whitespace, or unwanted content around the perimeter. It is a simple operation but it solves several common document problems that come up regularly in professional and personal workflows.",
  introList: [
    "Remove large white margins from scanned documents that make the content look small",
    "Trim crop marks and bleed areas from PDFs exported from design tools",
    "Remove oversized margins from academic papers to make better use of the printed page",
    "Crop a PDF to a specific area before inserting it into a presentation or report",
    "Remove a header or footer band from every page of a document",
  ],
  introOutro: "Dockitt lets you crop all pages in a PDF directly in your browser with no software and no account required.",
  sections: [
    {
      title: "How to crop PDF pages online - step by step",
      steps: [
        "Open the Dockitt Crop PDF tool in your browser.",
        "Click 'Choose PDF' or drag and drop your file into the upload area.",
        "Use the interactive crop frame to set the area you want to keep, or enter specific margin values for each side of the page.",
        "Check the preview to confirm the crop area includes all the content you need.",
        "Click 'Crop PDF' to apply the crop to all pages in the document.",
        "Click 'Download' to save the cropped PDF to your device.",
        "Open the downloaded file to verify the result looks correct on all pages.",
      ],
    },
    {
      title: "How PDF cropping works",
      intro: "PDF cropping works differently from cropping an image, and understanding the difference helps explain some of the behaviour you might notice.",
      items: [
        "The CropBox: PDFs have several internal boxes that define different areas of the page. The most important for cropping is the CropBox, which defines the visible area of the page. When you crop a PDF, the tool sets the CropBox to the area you specify.",
        "Content outside the CropBox is hidden, not deleted: This is the key difference from image cropping. In image editing, cropping removes the pixels outside the selected area. In a PDF, cropping sets the CropBox so that content outside it is not displayed, but the underlying data is still present in the file.",
        "Implications for file size: Because the content is hidden rather than deleted, cropping does not significantly reduce the file size. For a smaller file after cropping, run it through the Compress PDF tool.",
        "Implications for text search: Text in the cropped-out areas is still present in the file and may still be found by search. Only the visual display of the page is affected by the CropBox.",
        "The crop is applied to all pages: The crop margins are applied uniformly to every page in the document. If pages have different sizes, the same margin values will trim different proportions from each page.",
      ],
    },
    {
      title: "Common reasons to crop a PDF",
      intro: "Understanding the typical use cases helps you decide the right crop values for your situation.",
      items: [
        "Scanned document margins: Flatbed scanners often capture the white edges of the scanner bed beyond the paper. This creates large white margins around the actual document content. Cropping removes this whitespace and makes the content fill the page properly.",
        "Design and print production files: PDFs created for professional printing often include crop marks, bleed areas, and registration marks outside the printable area. These are useful during the print production process but look cluttered and unprofessional in a shared document. Cropping removes them.",
        "Academic papers and reports: Some publishers and institutions format PDFs with very large margins, sometimes to accommodate annotations or simply as a house style. Cropping can make these documents more readable on screen and more efficient when printed.",
        "Removing headers and footers: If a document has a header or footer that you want to remove, you can crop it away by reducing the top or bottom margin. This works for uniform headers and footers that appear at the same position on every page.",
        "Preparing content for presentations: If you want to insert a page from a PDF into a presentation, cropping it to just the relevant content produces a cleaner result than using the full page with its margins.",
      ],
    },
    {
      title: "Setting crop margins accurately",
      intro: "Getting the crop values right the first time saves you from having to redo the process. Here are some approaches for setting accurate margins.",
      items: [
        "Use the visual preview: The preview in the Crop PDF tool shows you exactly what will be visible after cropping. Adjust the crop frame until the preview shows the content you want to keep with comfortable margins.",
        "Measure from a reference: If you know the target dimensions for your cropped page, measure the current page dimensions and calculate the margin values needed. For example, if the page is 210mm wide and you want 20mm of content removed from each side, set the left and right margins to 20mm each.",
        "Start conservatively: If you are unsure, start with smaller crop margins and increase them if the result still has too much whitespace. It is easier to crop more than to undo an over-cropped file.",
        "Check multiple pages: After downloading the cropped file, check several pages throughout the document to confirm the crop is consistent. Pages with different content layouts may look different even with the same crop values.",
      ],
    },
    {
      title: "Cropping specific pages only",
      intro: "The Crop PDF tool applies the crop to all pages in the document. If you only need to crop specific pages, you need to combine it with other tools.",
      steps: [
        "Use the Split PDF tool to extract the pages you want to crop into a separate file.",
        "Upload that file to the Crop PDF tool and apply the crop.",
        "Download the cropped pages.",
        "Use the Merge PDF tool to combine the cropped pages with the remaining pages of the original document.",
        "Use the Reorder PDF Pages tool if needed to put the pages back in the correct sequence.",
      ],
    },
    {
      title: "After cropping - what to check",
      intro: "Once you have the cropped PDF, verify the result before using or sharing it.",
      items: [
        "Check all pages: Scroll through the entire document to confirm the crop looks correct on every page. Pages with different content positions may look different from the page shown in the preview.",
        "Check for cut-off content: Confirm that no important content has been accidentally removed. Pay particular attention to page numbers, footnotes, and content near the edges of pages.",
        "Check in print preview: If you plan to print the document, open the print dialog and check the preview. Some printers add their own margins on top of the page content. If the printed output looks different from the screen, adjust the print settings rather than re-cropping the file.",
        "Compress if needed: If the file size is a concern after cropping, run the file through the Compress PDF tool. The file size will not have decreased from cropping alone.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "After cropping, the content I want to keep is cut off.",
      solution: "Reduce the crop margin on the side where content is being cut. Use the preview to verify the crop area covers all the content you need before downloading.",
    },
    {
      problem: "The crop looks correct in the preview but the downloaded file looks different.",
      solution: "This can happen with PDFs that have different page sizes within the same document. The crop margins are applied uniformly, so the same values trim different proportions from pages of different sizes. Check the downloaded file and adjust if needed.",
    },
    {
      problem: "I only want to crop one specific page, not all of them.",
      solution: "Split that page out using the Dockitt Split PDF tool, crop it separately, then merge it back into the document using the Merge PDF tool.",
    },
    {
      problem: "The cropped PDF still shows the same margins when printed.",
      solution: "Some printers and PDF viewers add their own margins on top of the page content. Check your print settings and disable any fit to page or automatic margin options. The crop values in the PDF file itself are correct.",
    },
    {
      problem: "The file size did not decrease after cropping.",
      solution: "This is expected. Cropping hides content outside the crop area but does not delete it from the file, so the file size remains similar. For a smaller file, run the cropped PDF through the Compress PDF tool.",
    },
  ],
  relatedTools: [
    { name: "Split PDF", slug: "split-pdf", description: "Extract specific pages before cropping them separately." },
    { name: "Merge PDF", slug: "merge-pdf", description: "Combine cropped pages back into the full document." },
    { name: "Rotate PDF", slug: "rotate-pdf", description: "Fix page orientation before cropping." },
    { name: "Compress PDF", slug: "compress-pdf", description: "Reduce file size after cropping." },
  ],
  relatedTool: "crop-pdf",
  relatedGuides: ["how-to-rotate-pdf", "how-to-split-pdf"],
  faqs: [
    {
      question: "Does cropping a PDF permanently remove the hidden content?",
      answer: "No. Cropping sets a CropBox that hides content outside the crop area but does not delete it. The hidden content is still technically in the file but is not visible or accessible in normal PDF viewers.",
    },
    {
      question: "Can I crop pages to a specific size such as A4 or Letter?",
      answer: "The tool works by setting margins rather than targeting a specific paper size. If you need to crop to an exact dimension, measure the difference between the current page size and your target size and set the margins accordingly.",
    },
    {
      question: "Will cropping reduce the file size?",
      answer: "Not significantly. Since the content outside the crop area is hidden rather than deleted, the file size remains similar. For a smaller file, run the cropped PDF through the Compress PDF tool afterwards.",
    },
    {
      question: "Can I crop a landscape PDF?",
      answer: "Yes. The tool works with both portrait and landscape pages. If your PDF contains a mix of orientations, the crop margins are applied to each page based on its own dimensions.",
    },
    {
      question: "Does cropping affect text searchability or copy-paste?",
      answer: "No. Cropping only changes the visible area of each page. Text in the cropped-out areas is still present in the file and may still be found by search or copy-paste.",
    },
    {
      question: "Can I crop a PDF on my phone?",
      answer: "Yes. The Crop PDF tool works on mobile browsers on both iPhone and Android. Upload your file, set the crop area, and download the result directly from your phone.",
    },
    {
      question: "Why does the crop look different on different pages?",
      answer: "If your PDF has pages of different sizes or different content layouts, the same crop margin values will produce visually different results on different pages. The margins are applied in absolute units, not as a proportion of the page, so they trim more from smaller pages relative to their content.",
    },
  ],
  ctaText: "Ready to crop your PDF pages? Use the free Dockitt tool below.",
  ctaLinks: [
    { name: "Crop PDF", slug: "crop-pdf", description: "Trim and crop PDF pages online for free" },
  ],
}
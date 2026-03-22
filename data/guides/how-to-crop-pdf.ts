export const howToCropPdf = {
  slug: "how-to-crop-pdf",
  title: "How to Crop PDF Pages Online",
  description: "Learn how to crop and trim PDF pages online — remove unwanted margins, borders, and whitespace free and without any software.",
  intro: "Cropping a PDF is useful in more situations than you might expect. Scanned documents often have large white margins from the scanner bed that make the actual content look small on screen. PDFs exported from design tools sometimes have crop marks or bleed areas that look unprofessional when shared. Academic papers downloaded from certain platforms have oversized margins that waste space when printed. Dockitt's Crop PDF tool lets you trim the visible area of every page by setting crop margins, removing exactly as much as you need from each side.",
  steps: [
    "Go to the Dockitt Crop PDF tool.",
    "Click 'Choose PDF' and upload the file whose pages you want to crop.",
    "Use the interactive crop frame to set the area you want to keep, or enter specific margin values for each side.",
    "Preview the result on the page shown.",
    "Click 'Crop PDF' to apply the crop to all pages.",
    "Download the cropped PDF.",
  ],
  commonProblems: [
    {
      problem: "After cropping, the content I want to keep is cut off.",
      solution: "The crop margins remove content from the edges of each page. If important content is being cut, reduce the crop margin on that side. Use the preview to verify the crop area before downloading.",
    },
    {
      problem: "The crop looks correct in the preview but the downloaded file looks different.",
      solution: "This can happen with PDFs that have different page sizes within the same document. The crop is applied uniformly — if some pages are a different size, the same margin values will cut more or less relative to the page dimensions. Check the downloaded file and adjust if needed.",
    },
    {
      problem: "I only want to crop one specific page, not all of them.",
      solution: "Split that page out using the Dockitt Split PDF tool, crop it separately, then merge it back into the document using the Merge PDF tool.",
    },
    {
      problem: "The cropped PDF still shows the same margins when printed.",
      solution: "Some printers and PDF viewers add their own margins on top of the page content. Check your print settings and disable any 'fit to page' or automatic margin options. The crop values in the PDF file itself are correct.",
    },
  ],
  relatedTool: "crop-pdf",
  relatedGuides: ["how-to-rotate-pdf", "how-to-split-pdf"],
  faqs: [
    {
      question: "Does cropping a PDF permanently remove the hidden content?",
      answer: "In most PDF editors, cropping sets a CropBox that hides content outside the crop area but doesn't delete it — the hidden content is still technically in the file. Dockitt sets the CropBox on each page, which is the standard approach. The hidden content outside the crop area is not visible and not accessible in normal PDF viewers.",
    },
    {
      question: "Can I crop pages to a specific size, such as A4 or Letter?",
      answer: "Currently the tool works by setting margins rather than targeting a specific paper size. If you need to crop to an exact dimension, measure the difference between the current page size and your target size, and set the margins accordingly.",
    },
    {
      question: "Will cropping reduce the file size?",
      answer: "Not significantly. Since the content outside the crop area is hidden rather than deleted from the file data, the file size remains similar. For a smaller file, run the cropped PDF through the Compress PDF tool afterward.",
    },
    {
      question: "Can I crop a landscape PDF?",
      answer: "Yes. The tool works with both portrait and landscape pages. If your PDF contains a mix of orientations, the crop margins are applied to each page based on its own dimensions.",
    },
    {
      question: "Does cropping affect text searchability or copy-paste?",
      answer: "No. Cropping only changes the visible area of each page. Any text inside the PDF — including text in the cropped-out areas — remains searchable and selectable.",
    },
  ],
}
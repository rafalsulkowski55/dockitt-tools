export const cropPdfTool = {
  slug: "crop-pdf",
  name: "Crop PDF",
  title: "Crop PDF Pages Online",
  description: "Crop and trim PDF pages online — remove unwanted margins and borders without any software.",
  longDescription: `Cropping a PDF is useful in more situations than it might initially seem. Scanned documents often have large white margins from the scanner bed that make the actual content look small on screen. PDFs exported from design tools sometimes have crop marks or bleed areas that look unprofessional when shared. Academic papers downloaded from certain platforms have oversized margins that waste space when printed. Dockitt's Crop PDF tool lets you trim the visible area of every page by setting crop margins, removing exactly as much as you need from each side. The crop is applied to all pages at once and the result is available to download immediately.`,
  shortDescription: "Crop PDF pages online .",
  category: "utility",
  type: "process",
  primaryKeyword: "crop pdf",
  secondaryKeywords: [
    "crop pdf online",
    "crop pdf free",
    "crop pdf pages",
    "trim pdf margins",
    "remove pdf margins",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["rotate-pdf", "compress-pdf", "split-pdf", "delete-pdf-pages"],
  howTo: [
   "Click 'Choose PDF' and select the file whose pages you want to crop.",
   "Use the interactive crop frame to set the area you want to keep, or enter specific margin values for each side of the page.",
   "Preview the result on the page shown to verify the crop looks correct.",
   "Click 'Crop PDF' to apply the crop to all pages, then download the result.",
  ],
  faqs: [
    {
      question: "Does cropping a PDF permanently delete the content outside the crop area?",
      answer: "In the PDF format, cropping sets a property called the CropBox, which defines the visible area of each page. Content outside the CropBox is hidden from view but technically remains in the file. This means the file size does not decrease significantly after cropping. In theory the hidden content could be made visible again by changing the CropBox in a PDF editor. If you need to permanently and irreversibly remove content from the edges of pages for privacy reasons, a dedicated PDF redaction tool would provide a stronger guarantee.",
    },
    {
      question: "Can I crop only specific pages rather than all pages at once?",
      answer: "The tool applies the same crop margins to every page in the document. If you need to crop only specific pages, split those pages out using the Dockitt Split PDF tool, crop them separately, then merge everything back together using the Merge PDF tool. This takes a few extra steps but gives you full control over which pages are cropped.",
    },
    {
      question: "Will cropping reduce the file size of my PDF?",
      answer: "Not significantly. Since the content outside the crop area is hidden rather than deleted from the file data, the file size remains similar to the original. For a smaller file after cropping, run the result through the Dockitt Compress PDF tool.",
    },
    {
      question: "The cropped PDF still shows the same margins when I print it.",
      answer: "Some printers and PDF viewers add their own margins on top of the page content when printing. Check your print settings and disable any fit to page or automatic margin options. The crop values in the PDF file itself are correct. The issue is with how the printer or viewer is handling the output, not with the file.",
    },
    {
      question: "Can I crop a landscape PDF?",
      answer: "Yes. The tool works with both portrait and landscape pages. If your PDF contains a mix of orientations, the crop margins are applied to each page based on its own dimensions, so a margin value that removes a small amount from a portrait page will remove a proportionally different amount from a landscape page.",
    },
    {
      question: "Does cropping affect text searchability or copy-paste functionality?",
      answer: "No. Cropping only changes the visible area of each page. Any text inside the PDF, including text in the cropped-out areas, remains part of the file and is technically still searchable and selectable. The visual crop does not affect the underlying text layer in any way.",
    },
  ],
};
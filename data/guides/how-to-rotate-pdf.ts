export const howToRotatePdf = {
  slug: "how-to-rotate-pdf",
  title: "How to Rotate PDF Pages Online",
  description: "Learn how to rotate pages in a PDF file online — fix upside-down or sideways pages free and without any software.",
  intro: "Scanned documents often come out rotated the wrong way — a page that should be portrait ends up landscape, or an entire document is upside down. Manually fixing this in a PDF editor can be frustrating. Dockitt's Rotate PDF tool lets you rotate all pages in your PDF by 90, 180, or 270 degrees in seconds, directly in your browser. No software needed, no account required.",
  steps: [
    "Go to the Dockitt Rotate PDF tool.",
    "Click 'Choose PDF' and upload the file with pages you want to rotate.",
    "Select the rotation angle — 90° clockwise, 90° counter-clockwise, or 180°.",
    "Click 'Rotate PDF' and wait for the tool to process.",
    "Download the rotated PDF file.",
  ],
  commonProblems: [
    {
      problem: "Only some pages need to be rotated, not all of them.",
      solution: "The current tool rotates all pages equally. If you need to rotate only specific pages, split the PDF into parts first, rotate each part separately, then merge them back together.",
    },
    {
      problem: "After rotating, the text appears blurry.",
      solution: "Rotation does not affect text quality in regular PDFs. If the text looks blurry, the original file likely contains low-resolution scanned images — the rotation itself is not the cause.",
    },
    {
      problem: "The rotation didn't save — the file still opens sideways.",
      solution: "Some PDF viewers override the rotation stored in the file and display pages based on their own settings. Try opening the downloaded file in a different PDF viewer such as Adobe Acrobat or your browser's built-in PDF viewer.",
    },
  ],
  relatedTool: "rotate-pdf",
  relatedGuides: ["how-to-split-pdf", "how-to-merge-pdf"],
  faqs: [
    {
      question: "Can I rotate just one page in a PDF?",
      answer: "The tool currently rotates all pages at once. To rotate a single page, split it out first using the Split PDF tool, rotate it, then merge it back with the rest of the document.",
    },
    {
      question: "Does rotating a PDF change the file size?",
      answer: "No. Rotating pages only updates the orientation metadata in the file. The content and file size remain essentially the same.",
    },
    {
      question: "What rotation angles are supported?",
      answer: "You can rotate pages by 90 degrees clockwise, 90 degrees counter-clockwise, or 180 degrees.",
    },
    {
      question: "Will rotating affect the text or images inside the PDF?",
      answer: "No. Rotation is a non-destructive operation — all text, images, and formatting remain intact.",
    },
    {
      question: "Can I rotate a PDF on my phone or tablet?",
      answer: "Yes. The Rotate PDF tool works on any modern mobile browser. Upload your file, choose the angle, and download the result.",
    },
  ],
}
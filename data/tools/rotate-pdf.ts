export const rotatePdfTool = {
  slug: "rotate-pdf",
  name: "Rotate PDF",
  title: "Rotate PDF Pages Online",
  description: "Rotate pages in your PDF file online — fix upside-down or sideways pages free and without any software.",
  longDescription: `Scanned documents often come out rotated the wrong way. A page that should be portrait ends up landscape, or an entire document is upside down because the paper was fed into the scanner incorrectly. Fixing this manually in a PDF editor can be time-consuming. Dockitt's Rotate PDF tool lets you rotate all pages in your PDF by 90, 180, or 270 degrees in seconds, directly in your browser. The rotation is saved permanently into the file, so it opens correctly in any PDF viewer without needing to be adjusted again.`,
  shortDescription: "Rotate PDF pages online for free.",
  category: "core",
  type: "process",
  primaryKeyword: "rotate pdf",
  secondaryKeywords: [
    "rotate pdf online",
    "rotate pdf free",
    "rotate pdf pages",
    "flip pdf pages",
    "turn pdf pages",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["crop-pdf", "reorder-pdf-pages", "delete-pdf-pages", "merge-pdf"],
  howTo: [
  "Click 'Choose PDF' and select the PDF file with pages you want to rotate.",
  "Select the rotation angle: 90 degrees clockwise, 90 degrees counter-clockwise, or 180 degrees.",
  "Click 'Rotate PDF' to apply the rotation to all pages in the document.",
  "Download the rotated PDF. The orientation is saved permanently into the file.",
  ],
  faqs: [
    {
      question: "Can I rotate only specific pages instead of the entire document?",
      answer: "The tool currently rotates all pages in the document by the same angle. If you need to rotate only specific pages, the workaround is to split the document into sections using the Split PDF tool, rotate the relevant section separately, and then merge everything back together using the Merge PDF tool. This takes a few extra steps but gives you full control over which pages are rotated.",
    },
    {
      question: "Will the rotation be saved permanently in the PDF?",
      answer: "Yes. The rotation is embedded into the page orientation data of the PDF file itself. When you open the downloaded file in any PDF viewer, the pages will display at the correct orientation without needing any manual adjustment. This is different from a viewer-only rotation that some PDF apps apply temporarily without saving it to the file.",
    },
    {
      question: "Why does the PDF still look sideways after I download it?",
      answer: "Some PDF viewers override the rotation stored in the file and display pages based on their own settings. If the downloaded file appears incorrectly rotated in one viewer, try opening it in a different application such as Adobe Acrobat Reader or your browser's built-in PDF viewer. The rotation data in the file itself is correct.",
    },
    {
      question: "Does rotating a PDF change the file size?",
      answer: "No. Rotating pages only updates the orientation metadata stored in the file. The content of each page, including text, images, and fonts, is not altered in any way. The file size remains essentially the same after rotation.",
    },
    {
      question: "Can I rotate a scanned PDF?",
      answer: "Yes. Scanned PDFs are fully supported. Each scanned page is treated as an image within the PDF structure, and the rotation is applied to the page orientation just as it would be for any other PDF. The scanned content remains at its original resolution and quality.",
    },
    {
      question: "What rotation angles are available?",
      answer: "You can rotate pages by 90 degrees clockwise, 90 degrees counter-clockwise, or 180 degrees. Applying 90 degrees clockwise twice is equivalent to 180 degrees, and applying it three times is equivalent to 90 degrees counter-clockwise.",
    },
  ],
};
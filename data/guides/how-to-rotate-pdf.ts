export const howToRotatePdf = {
  slug: "how-to-rotate-pdf",
  title: "How to Rotate PDF Pages Online",
  description: "Learn how to rotate pages in a PDF file online. Fix upside-down or sideways pages free and without any software.",
  intro: "A PDF with pages in the wrong orientation is one of the most common and most frustrating document problems. Scanned documents frequently come out rotated incorrectly because the paper was fed into the scanner sideways or upside down. PDFs exported from certain applications sometimes have landscape pages mixed in with portrait pages. Whatever the cause, rotating PDF pages is a quick fix when you have the right tool.",
  introList: [
    "Fix a scanned document where all pages came out sideways",
    "Correct a single upside-down page in an otherwise correct document",
    "Rotate a landscape page to portrait or vice versa",
    "Fix a PDF received from someone else that opens in the wrong orientation",
    "Correct orientation before printing so pages come out the right way up",
  ],
  introOutro: "Dockitt lets you rotate all pages in your PDF directly in your browser with no software and no account required.",
  sections: [
    {
      title: "How to rotate PDF pages online - step by step",
      steps: [
        "Open the Dockitt Rotate PDF tool in your browser.",
        "Click 'Choose PDF' or drag and drop your file into the upload area.",
        "Select the rotation angle: 90 degrees clockwise, 90 degrees counter-clockwise, or 180 degrees.",
        "Click 'Rotate PDF' and wait a few seconds while the tool processes your file.",
        "Click 'Download' to save the rotated PDF to your device.",
        "Open the downloaded file to confirm the pages are now in the correct orientation.",
      ],
    },
    {
      title: "Understanding PDF rotation",
      intro: "Rotation in a PDF works differently from what you might expect. Understanding this helps explain some of the behaviour you might encounter.",
      items: [
        "Rotation is stored as metadata: When you rotate a PDF page, the actual page content is not redrawn. Instead, the PDF file stores a rotation value that tells PDF viewers to display the page at a certain angle. The underlying content remains unchanged.",
        "This is why rotation is non-destructive: Because the content is not modified, rotating a PDF page does not reduce quality, blur text, or affect images in any way. You can rotate a PDF multiple times without any degradation.",
        "Some PDF viewers override rotation: Certain PDF viewers, particularly some built-in browser viewers and older desktop applications, may display pages based on their own settings rather than the rotation stored in the file. If the rotated file still appears sideways in one viewer, try opening it in a different application such as Adobe Acrobat Reader or your browser's built-in PDF viewer.",
        "Rotation affects printing: When you print a rotated PDF, the pages should print in the rotated orientation. If they do not, check the print dialog settings to ensure the page orientation is set to automatic or to match the document.",
      ],
    },
    {
      title: "Common rotation scenarios",
      intro: "Most rotation problems fall into a few predictable categories. Here is how to handle each one.",
      items: [
        "All pages are rotated the same wrong way: This is the simplest case. Select the correct rotation angle and apply it to the whole document. If all pages are sideways clockwise, rotate 90 degrees counter-clockwise. If all pages are upside down, rotate 180 degrees.",
        "Only some pages are rotated incorrectly: The Rotate PDF tool rotates all pages by the same angle. If only specific pages need rotation, you need to split the document first. Split out the incorrectly rotated pages, rotate them, and merge everything back together in the correct order.",
        "The document has a mix of portrait and landscape pages: Some documents legitimately have both orientations, for example a report with a wide table on a landscape page. In this case, rotating the whole document is not the right approach. Split out the pages that need rotation, rotate them individually, and merge back.",
        "A scanned document is consistently rotated: Scanners sometimes feed pages at a consistent incorrect angle. Rotating the whole document by the same amount fixes this in one step.",
        "The PDF opens correctly on one device but sideways on another: This is the viewer override issue described above. The rotation metadata is correct but one viewer is ignoring it. Try a different PDF viewer on the problematic device.",
      ],
    },
    {
      title: "Rotating only specific pages",
      intro: "If you need to rotate only some pages rather than the entire document, you need to combine several tools. Here is the process.",
      steps: [
        "Identify which pages need to be rotated and note their page numbers.",
        "Use the Split PDF tool to extract the pages that need rotation into a separate file. If the pages are not consecutive, use the Extract PDF Pages tool instead.",
        "Upload the extracted pages to the Rotate PDF tool and apply the correct rotation.",
        "Download the rotated pages.",
        "Use the Merge PDF tool to combine the rotated pages with the remaining pages of the original document.",
        "Use the Reorder PDF Pages tool if necessary to put the pages back in the correct sequence.",
      ],
    },
    {
      title: "Rotation angles explained",
      intro: "Choosing the right rotation angle is straightforward once you know what each option does.",
      items: [
        "90 degrees clockwise: Rotates each page a quarter turn to the right. Use this when pages appear to be rotated 90 degrees to the left and need to be turned right to correct them.",
        "90 degrees counter-clockwise: Rotates each page a quarter turn to the left. Use this when pages appear to be rotated 90 degrees to the right and need to be turned left to correct them.",
        "180 degrees: Rotates each page a half turn, which is the same as turning it upside down and back again. Use this when pages appear completely upside down.",
        "How to decide which angle to use: Look at the page and ask yourself which direction it needs to turn to be correct. If the top of the page is on the right side, you need to rotate counter-clockwise. If the top is on the left side, rotate clockwise. If the page is upside down, rotate 180 degrees.",
      ],
    },
    {
      title: "After rotating - what to check",
      intro: "Once you have downloaded the rotated PDF, take a moment to verify the result before using or sharing it.",
      items: [
        "Check every page: Scroll through the entire document to confirm all pages are now in the correct orientation. If you only needed some pages rotated, check that the unaffected pages are still correct.",
        "Check the print preview: If you plan to print the document, open the print dialog and check the preview to confirm pages will print in the correct orientation.",
        "Check in a second viewer: If the orientation looks wrong in one PDF viewer, try opening the file in a different application before assuming the rotation did not work.",
        "File size: Rotation does not change the file size in any meaningful way. The file size before and after should be essentially identical.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "Only some pages need to be rotated, not all of them.",
      solution: "The Rotate PDF tool rotates all pages equally. To rotate only specific pages, split the PDF into parts first using the Split PDF tool, rotate the relevant part, and merge everything back together using the Merge PDF tool.",
    },
    {
      problem: "After rotating, the text appears blurry.",
      solution: "Rotation does not affect text quality in regular PDFs. If the text looks blurry, the original file contains low-resolution scanned images and the blurriness was present before rotation. The rotation itself is not the cause.",
    },
    {
      problem: "The rotation did not save and the file still opens sideways.",
      solution: "Some PDF viewers override the rotation stored in the file. Try opening the downloaded file in a different PDF viewer such as Adobe Acrobat Reader or your browser's built-in PDF viewer. The rotation is stored correctly in the file even if one viewer ignores it.",
    },
    {
      problem: "The pages rotated in the wrong direction.",
      solution: "Try the opposite rotation angle. If you rotated clockwise and the result is worse, rotate the corrected file counter-clockwise, or start fresh with the original file and select counter-clockwise instead.",
    },
    {
      problem: "The file is password protected and cannot be rotated.",
      solution: "Password-protected PDFs cannot be processed until they are unlocked. Use the Dockitt Unlock PDF tool to remove the password first, then rotate the unlocked file.",
    },
  ],
  relatedTools: [
    { name: "Split PDF", slug: "split-pdf", description: "Extract specific pages before rotating them separately." },
    { name: "Merge PDF", slug: "merge-pdf", description: "Combine rotated pages back into the full document." },
    { name: "Reorder PDF Pages", slug: "reorder-pdf-pages", description: "Fix page order after splitting and merging." },
  ],
  relatedTool: "rotate-pdf",
  relatedGuides: ["how-to-split-pdf", "how-to-merge-pdf"],
  faqs: [
    {
      question: "Can I rotate just one page in a PDF?",
      answer: "The tool rotates all pages at once. To rotate a single page, split it out first using the Split PDF tool, rotate it, then merge it back with the rest of the document using the Merge PDF tool.",
    },
    {
      question: "Does rotating a PDF change the file size?",
      answer: "No. Rotating pages only updates the orientation metadata in the file. The content and file size remain essentially unchanged.",
    },
    {
      question: "What rotation angles are supported?",
      answer: "You can rotate pages by 90 degrees clockwise, 90 degrees counter-clockwise, or 180 degrees.",
    },
    {
      question: "Will rotating affect the text or images inside the PDF?",
      answer: "No. Rotation is a non-destructive operation. All text, images, and formatting remain intact and at full quality.",
    },
    {
      question: "Can I rotate a PDF on my phone or tablet?",
      answer: "Yes. The Rotate PDF tool works on any modern mobile browser on both iPhone and Android. Upload your file, choose the angle, and download the result.",
    },
    {
      question: "Why does the rotated PDF still appear sideways in my PDF viewer?",
      answer: "Some PDF viewers ignore the rotation metadata stored in the file and display pages based on their own settings. Try opening the file in a different PDF viewer such as Adobe Acrobat Reader or your browser's built-in PDF viewer.",
    },
    {
      question: "Can I undo a rotation after downloading the file?",
      answer: "You cannot undo it in the downloaded file, but you can correct it by uploading the rotated file and applying the opposite rotation. If you rotated 90 degrees clockwise by mistake, upload the result and rotate 90 degrees counter-clockwise to return to the original orientation.",
    },
  ],
  ctaText: "Ready to fix your PDF orientation? Use the free Dockitt tool below.",
  ctaLinks: [
    { name: "Rotate PDF", slug: "rotate-pdf", description: "Fix sideways or upside-down PDF pages online for free" },
  ],
}
export const howToEditPdfPages = {
  slug: "how-to-edit-pdf-pages",
  title: "How to Edit PDF Pages Online",
  description: "Learn how to edit PDF pages online. Rotate, delete, reorder, extract and crop pages without installing any software.",
  intro: "Editing PDF pages is one of the most common document tasks, but many people do not realise it can be done entirely in a browser without installing any software. Whether pages are in the wrong order, rotated incorrectly, or your document contains pages you do not need, the right tool handles each situation in seconds.",
  introList: [
    "Rotate pages that came out sideways or upside down after scanning",
    "Delete blank pages, duplicate pages, or pages you do not want to share",
    "Reorder pages that are in the wrong sequence",
    "Extract specific pages to create a focused subset of a larger document",
    "Crop away large margins or whitespace from scanned documents",
  ],
  introOutro: "All of these operations run directly in your browser with no software required and no account needed.",
  toolLinks: [
    { name: "Rotate PDF", slug: "rotate-pdf" },
    { name: "Delete PDF Pages", slug: "delete-pdf-pages" },
    { name: "Reorder PDF Pages", slug: "reorder-pdf-pages" },
    { name: "Extract PDF Pages", slug: "extract-pdf-pages" },
    { name: "Crop PDF", slug: "crop-pdf" },
  ],
  sections: [
    {
      title: "How to rotate PDF pages",
      intro: "Rotation fixes pages that are sideways or upside down. This is the most common problem with scanned documents, where pages are fed into the scanner at the wrong angle.",
      steps: [
        "Open the Dockitt Rotate PDF tool.",
        "Upload your PDF file.",
        "Select the rotation angle: 90 degrees clockwise, 90 degrees counter-clockwise, or 180 degrees.",
        "Click Rotate PDF and download the corrected file.",
      ],
      outro: "Rotation is non-destructive. The content and quality of the pages are not affected. If only some pages need rotation, split those pages out first, rotate them, and merge them back.",
    },
    {
      title: "How to delete pages from a PDF",
      intro: "Deleting pages removes specific pages from a document and gives you back the rest. Use this when you want to keep most of the document and remove a small number of unwanted pages.",
      steps: [
        "Open the Dockitt Delete PDF Pages tool.",
        "Upload your PDF.",
        "Enter the page numbers you want to delete, separated by commas.",
        "Click Delete Pages and download the updated file.",
      ],
      outro: "The tool creates a new file with the selected pages removed. Your original file is not modified. If you delete the wrong pages, re-upload the original and start again.",
    },
    {
      title: "How to reorder pages in a PDF",
      intro: "Reordering lets you change the sequence of pages in a document using a visual drag-and-drop interface. This is useful when a document was assembled from multiple sources and the page order needs adjustment.",
      steps: [
        "Open the Dockitt Reorder PDF Pages tool.",
        "Upload your PDF.",
        "Drag and drop the page thumbnails into the correct order.",
        "Click Save Order and download the reordered file.",
      ],
      outro: "Review all thumbnails carefully before clicking Save Order to confirm the complete sequence is correct.",
    },
    {
      title: "How to extract specific pages from a PDF",
      intro: "Extracting pages creates a new document containing only the pages you specify. Use this when you need a focused subset of a larger document to share with a specific person or for a specific purpose.",
      steps: [
        "Open the Dockitt Extract PDF Pages tool.",
        "Upload your PDF.",
        "Enter the page numbers you want to extract, separated by commas.",
        "Click Extract Pages and download the new file containing only those pages.",
      ],
      outro: "You can control the order of pages in the output by entering page numbers in the order you want them to appear.",
    },
    {
      title: "How to crop PDF pages",
      intro: "Cropping removes the visible edges of each page. This is useful for removing large white margins from scanned documents, trimming crop marks from design files, or reducing oversized margins from academic papers.",
      steps: [
        "Open the Dockitt Crop PDF tool.",
        "Upload your PDF.",
        "Set the crop margins using the interactive crop frame or by entering specific values.",
        "Click Crop PDF and download the trimmed file.",
      ],
      outro: "Cropping hides content outside the crop area rather than deleting it, so the file size does not decrease significantly after cropping.",
    },
    {
      title: "Combining multiple page editing operations",
      intro: "Many document editing tasks require more than one operation. Here are the most common multi-step workflows.",
      items: [
        "Scan, rotate, and reorder: After scanning a multi-page document, some pages may be rotated incorrectly and the overall page order may be wrong. Rotate all pages first to fix the orientation, then reorder them into the correct sequence.",
        "Delete then reorder: If you need to both remove pages and fix the remaining page order, delete the unwanted pages first, then reorder the result.",
        "Extract then merge: If you need to assemble a document from specific pages of multiple source files, extract the relevant pages from each source and then merge the extracted PDFs in the correct order.",
        "Edit then compress: After any editing operation, the file size may be suboptimal. Run the final document through the Compress PDF tool to reduce the size without affecting the content.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "Pages rotate but the downloaded file still appears wrong.",
      solution: "Make sure you download the file after clicking the rotate button. Some PDF viewers also override rotation metadata. Try opening the file in a different PDF viewer such as Adobe Acrobat Reader.",
    },
    {
      problem: "The PDF layout looks different after editing.",
      solution: "Basic page operations such as rotate, delete, and reorder do not alter page content. If the layout appears different, check whether the original PDF had unusual formatting that is rendering differently in a different viewer.",
    },
    {
      problem: "The file is too large to upload.",
      solution: "Files up to 10MB can be processed. If your PDF is larger, compress it first using the Dockitt Compress PDF tool to bring it under the limit.",
    },
    {
      problem: "I need to edit both the page order and page content.",
      solution: "The Dockitt page editing tools handle page-level operations such as rotation, deletion, and reordering. For editing text or images within a page, a dedicated PDF editor such as Adobe Acrobat is required.",
    },
  ],
  relatedTools: [
    { name: "Compress PDF", slug: "compress-pdf", description: "Reduce file size before or after editing." },
    { name: "Merge PDF", slug: "merge-pdf", description: "Combine files before organising pages." },
    { name: "Split PDF", slug: "split-pdf", description: "Separate pages into multiple files." },
  ],
  faqs: [
    {
      question: "Can I edit PDF pages without software?",
      answer: "Yes. All page-level operations including rotating, deleting, reordering, extracting, and cropping can be done directly in your browser using Dockitt's free online tools. No software installation is required.",
    },
    {
      question: "Does editing a PDF reduce quality?",
      answer: "No. Page-level operations such as rotate, reorder, delete, and extract do not re-compress or alter the content of the pages. Text, images, and formatting are preserved exactly as they were in the original.",
    },
    {
      question: "Can I edit scanned PDFs?",
      answer: "Yes. Scanned PDFs are supported by all Dockitt page editing tools. You can rotate, delete, reorder, extract, and crop pages from scanned documents just like any other PDF.",
    },
    {
      question: "Is it safe to upload PDF files for editing?",
      answer: "Yes. Most Dockitt tools process files entirely in your browser without uploading them to any server. For server-side tools, files are processed securely and deleted immediately after the result is returned to you.",
    },
    {
      question: "Can I undo an edit after downloading the file?",
      answer: "The editing tools create new files and never modify your original. If you need to undo an edit, re-upload the original file and start again.",
    },
    {
      question: "Can I edit PDF pages on my phone?",
      answer: "Yes. All Dockitt page editing tools work on mobile browsers on both iPhone and Android. Upload your file, make your changes, and download the result directly on your phone.",
    },
  ],
  relatedTool: "rotate-pdf",
  ctaText: "Ready to edit your PDF pages? Choose the tool you need below.",
  ctaLinks: [
    { name: "Rotate PDF", slug: "rotate-pdf", description: "Fix sideways or upside-down pages" },
    { name: "Delete PDF Pages", slug: "delete-pdf-pages", description: "Remove unwanted or blank pages" },
    { name: "Reorder PDF Pages", slug: "reorder-pdf-pages", description: "Rearrange pages into the correct order" },
    { name: "Extract PDF Pages", slug: "extract-pdf-pages", description: "Get only the pages you need" },
    { name: "Crop PDF", slug: "crop-pdf", description: "Remove margins and whitespace" },
  ],
}
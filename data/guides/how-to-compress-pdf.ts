export const howToCompressPdf = {
  slug: "how-to-compress-pdf",
  title: "How to Compress a PDF File",
  description: "Learn how to reduce the size of a PDF file online — free, without software, and without losing quality.",
  intro: "A large PDF file can be a real problem. Email providers reject attachments over 10MB or 25MB. File upload forms on websites often have strict size limits. Sharing a 50MB report over a messaging app is slow and eats up storage. Compressing a PDF reduces the file size so it becomes easier to share, upload, and store without changing how the document looks or reads.",
  introList: [
    "Compress a PDF for email when the file is too large to attach",
    "Reduce a PDF file size before uploading to a portal or form",
    "Make a PDF lighter for sharing on messaging apps or cloud storage",
    "Compress scanned PDFs that are unnecessarily large",
  ],
  introOutro: "All of these can be done in under a minute using a free online PDF compressor with no software required.",
  sections: [
    {
      title: "How to compress a PDF online - step by step",
      steps: [
        "Open the Dockitt Compress PDF tool in your browser.",
        "Click 'Choose PDF' or drag and drop your file into the upload area.",
        "Select a compression preset if available. 'Email' is the default and works well for most cases.",
        "Click 'Compress PDF' and wait a few seconds while the tool processes your file.",
        "Once complete, click 'Download' to save the compressed PDF to your device.",
        "Open the downloaded file to verify it looks correct before sharing or uploading it.",
      ],
    },
    {
      title: "What actually happens when you compress a PDF",
      intro: "PDF compression is often misunderstood. Many people assume it works like ZIP compression, squashing the file and then restoring it later. PDF compression works differently, and understanding what it does helps you set realistic expectations.",
      items: [
        "Structure optimisation: A PDF file accumulates internal overhead over time, including redundant object references, duplicate data streams, and metadata left over from editing. Compression cleans this up and rebuilds the file structure more efficiently.",
        "Content stream compression: The raw data that describes text, fonts, and vector graphics inside a PDF can be compressed using standard algorithms. Well-built PDFs already do this, but older or poorly exported PDFs often do not.",
        "Image re-compression: Some PDF compressors also reduce the resolution of embedded images, for example downscaling photos from 300 DPI to 150 DPI. This produces the most dramatic size reductions but does reduce visual quality. Dockitt's compressor focuses on structural optimisation without degrading image resolution.",
        "Removing unused resources: Fonts, colour profiles, and embedded scripts that are defined but never used in the document can be stripped out safely.",
      ],
      outro: "The result is a smaller file that is visually identical to the original, or very close to it depending on the compression method used.",
    },
    {
      title: "How much smaller will my PDF get?",
      intro: "The size reduction you can expect depends almost entirely on what is inside your PDF. There is no universal answer, but here are realistic benchmarks:",
      items: [
        "Text-heavy PDFs such as contracts, reports, and invoices: Often 20 to 60 percent smaller after structural optimisation. These files have a lot of overhead that can be cleaned up without any visible change.",
        "Presentation PDFs exported from PowerPoint or Keynote: 10 to 40 percent smaller, depending on how many images are embedded and at what resolution.",
        "Scanned PDFs from photographed or scanned pages: 5 to 20 percent smaller with structural compression alone. Scanned PDFs are essentially image files and most of the file size comes from the images themselves, which are not re-encoded by a structural compressor.",
        "Already-compressed PDFs: 0 to 10 percent smaller. If a PDF was already exported with good compression settings, there is little overhead left to remove.",
      ],
      outro: "If your PDF barely shrinks after compression, it likely means the file was already well-optimised, or that it is image-heavy. In that case, try splitting it into smaller parts or consider whether you need all pages.",
    },
    {
      title: "Compressing a PDF for email",
      intro: "Email is the most common reason people compress PDFs. Most email services including Gmail, Outlook, and Yahoo Mail have attachment size limits between 10MB and 25MB. If your PDF is larger than that, the email will bounce or the attachment will be rejected before it is sent.",
      items: [
        "Gmail: 25MB limit per email. Files over 25MB must be sent via Google Drive link instead of as a direct attachment.",
        "Outlook: 20MB limit for most accounts, though this varies by organisation settings.",
        "Yahoo Mail: 25MB limit per email.",
        "Corporate email servers: Often set to 10MB or lower by the IT department, regardless of what the email client shows.",
      ],
      outro: "Compressing your PDF before attaching it avoids the problem entirely. Even if your file is under the limit, a smaller attachment loads faster for the recipient and takes up less space in both inboxes.",
    },
    {
      title: "When compression is not enough",
      intro: "Sometimes a PDF is simply too large to compress down to a usable size. This typically happens with scanned documents where every page is a high-resolution photograph. In these cases, compression alone will not get the file small enough and you need a different approach.",
      items: [
        "Split the PDF: If you only need to share specific pages, use the Split PDF tool to extract just those pages. A 50-page scanned document compressed to 40MB might only need 5 relevant pages, which might be 4MB.",
        "Re-scan at lower resolution: If you have access to the original paper document, scanning at 150 DPI instead of 300 DPI produces a much smaller file with quality that is still perfectly readable on screen and in print.",
        "Use cloud storage instead: If the file must remain large, share it via Google Drive, Dropbox, or OneDrive and send a link rather than an attachment.",
        "Convert to a different format: For documents that are mostly text with a few images, converting to a Word document and then re-exporting as PDF sometimes produces a smaller file than the original.",
      ],
    },
    {
      title: "Compressing multiple PDFs at once",
      intro: "If you have many PDFs to compress, processing them one by one is time-consuming. Here are a few approaches depending on your situation.",
      items: [
        "Merge first, then compress: If the PDFs are related parts of the same document, merge them into one file using the Merge PDF tool and then compress the combined file. This is often more efficient than compressing each file separately.",
        "Compress each file individually: For unrelated files, use the Compress PDF tool on each one. The process takes only a few seconds per file.",
        "Check whether compression is needed: Before compressing every file in a batch, check the file sizes. Files under 1MB rarely need compression and the gains will be negligible.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "The file is still too large after compression.",
      solution: "The PDF likely contains high-resolution images that are not re-encoded by structural compression. Try splitting the PDF into smaller sections and sharing only the pages you need, or use cloud storage to share the full file as a link.",
    },
    {
      problem: "The compressed PDF looks different from the original.",
      solution: "This can happen if the compressor re-encodes images at lower resolution. Check that you are using the correct compression setting. For quality-sensitive documents, use a lighter compression preset.",
    },
    {
      problem: "The compressed file is larger than the original.",
      solution: "This occasionally happens with very small or already well-compressed PDFs. The compression process adds a small amount of overhead, which can outweigh the savings on files that are already optimised. In this case, use the original file.",
    },
    {
      problem: "The download button does not appear after processing.",
      solution: "Try refreshing the page and uploading the file again. If the problem persists, try a different browser. Chrome and Firefox work best with browser-based PDF tools.",
    },
  ],
  relatedTools: [
    { name: "Split PDF", slug: "split-pdf", description: "Break a large PDF into smaller parts before compressing." },
    { name: "Merge PDF", slug: "merge-pdf", description: "Combine multiple compressed PDFs into one document." },
    { name: "Repair PDF", slug: "repair-pdf", description: "Fix corrupted or damaged PDF files." },
  ],
  relatedTool: "compress-pdf",
  relatedGuides: ["how-to-split-pdf", "how-to-merge-pdf"],
  faqs: [
    {
      question: "How much can I reduce a PDF file size?",
      answer: "It depends on the content. Text-heavy PDFs such as reports, contracts, and presentations can often be reduced by 20 to 60 percent. PDFs that consist mostly of scanned images or high-resolution photos will compress much less, typically 5 to 20 percent, because the image data itself is not re-encoded.",
    },
    {
      question: "Will compression affect the quality of my PDF?",
      answer: "For text-based PDFs, quality is not affected at all. The document will look identical to the original. For PDFs with embedded images, it depends on the compression method. Dockitt uses structural optimisation which does not degrade image quality, so the visual output should be identical to the original.",
    },
    {
      question: "Is it free to compress a PDF online?",
      answer: "Yes. Dockitt's PDF compressor is  to use with no sign-up and no limits on the number of files you can compress.",
    },
    {
      question: "What is the maximum file size I can compress?",
      answer: "Files up to 10MB can be processed directly. If your PDF is larger than 10MB, try splitting it into smaller sections first, compressing each section, and then merging them back together.",
    },
    {
      question: "Is my file safe when I upload it for compression?",
      answer: "Yes. Your file is sent over an encrypted connection and processed on a secure server. It is deleted immediately after the compressed version is returned to you. Dockitt does not store, read, or share your files.",
    },
    {
      question: "Why is my compressed PDF larger than the original?",
      answer: "This occasionally happens with files that are already well-optimised. The compression process itself adds a small amount of structural overhead, which can slightly exceed the savings on very small or already-efficient PDFs. In this case, simply use the original file.",
    },
    {
      question: "Can I compress a password-protected PDF?",
      answer: "Not directly. The PDF must be unlocked before it can be processed. Use the Dockitt Unlock PDF tool to remove the password first, then compress the unlocked file, and re-protect it with a password afterwards if needed.",
    },
    {
      question: "Does compressing a PDF remove the text so it can no longer be searched?",
      answer: "No. Compression only affects the file structure and optionally image resolution. Text content, fonts, and the ability to search, copy, or highlight text are fully preserved after compression.",
    },
  ],
  ctaText: "Ready to reduce your PDF file size? Use the free Dockitt compressor below.",
  ctaLinks: [
    { name: "Compress PDF", slug: "compress-pdf", description: "Reduce PDF file size online " },
  ],
}
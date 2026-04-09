export const howToConvertPdfToJpg = {
  slug: "how-to-convert-pdf-to-jpg",
  title: "How to Convert a PDF to JPG Online",
  description: "Learn how to convert PDF pages to JPG images online. Extract every page as a separate image, free and without any software.",
  intro: "Converting a PDF to JPG images is useful in more situations than it might initially seem. You need to embed a page from a PDF into a Word document or PowerPoint presentation and inserting the PDF directly is not working cleanly. You want to share a single page on social media or in a messaging app where PDFs do not preview well. A client needs images of your designs but you only have the PDF version. Whatever the reason, Dockitt converts each page of your PDF into a separate JPG image directly in your browser using PDF.js with no server upload and no software to install.",
  introList: [
    "Extract a PDF page as an image to embed in a Word document or presentation",
    "Share a single PDF page as an image on social media or in a messaging app",
    "Get JPG versions of design pages from a PDF file",
    "Convert PDF pages to images for use in a website or app",
    "Extract pages as images before inserting them into another application",
  ],
  introOutro: "The conversion runs entirely in your browser. Your file is never uploaded to any server.",
  sections: [
    {
      title: "How to convert a PDF to JPG online - step by step",
      steps: [
        "Open the Dockitt PDF to JPG tool in your browser.",
        "Click 'Choose PDF' or drag and drop your file into the upload area.",
        "The tool will render each page of the PDF and convert it to a JPG image.",
        "Once complete, download each JPG image. Each page of the PDF becomes a separate file.",
        "If the PDF has multiple pages, download each page image individually.",
      ],
    },
    {
      title: "How PDF to JPG conversion works",
      intro: "Understanding the conversion process helps set accurate expectations for the quality and behaviour of the output.",
      items: [
        "Rendering, not extracting: Converting a PDF page to a JPG is a rendering process, not an extraction. The tool uses PDF.js to draw each page onto an HTML canvas element at a specific resolution, then saves the canvas as a JPEG image. This means the output quality depends on the rendering resolution, not the original PDF quality.",
        "Each page becomes a separate image: A 10-page PDF produces 10 separate JPG files, one for each page. There is no option to combine all pages into a single image file.",
        "Vector content becomes raster: PDFs store text and vector graphics as mathematical descriptions that scale perfectly at any size. When converted to JPG, this content is rendered at a fixed pixel resolution. The result looks sharp at normal viewing size but will appear pixelated if zoomed in significantly.",
        "JPEG compression: JPG uses lossy compression. A small amount of quality is traded for a smaller file size. For most documents this is imperceptible, but it can cause subtle artifacts around sharp edges such as text.",
        "Transparency is not supported: JPEG does not support transparency. If a PDF page has a transparent background, that area will be filled with a solid colour during conversion, usually white or black depending on the rendering context.",
      ],
    },
    {
      title: "JPG vs PNG for PDF conversion",
      intro: "Both JPG and PNG are common choices for converting PDF pages to images. Choosing the right format for your use case produces better results.",
      items: [
        "Use JPG for photographic content: PDFs that are mostly photographs, illustrations with gradients, or pages with rich colour content produce good results as JPG. The lossy compression is barely noticeable on photographic material and keeps file sizes smaller.",
        "Use PNG for text and diagrams: PDFs with sharp text, technical drawings, charts, logos, and line art produce better results as PNG. PNG uses lossless compression that preserves hard edges and crisp text without the subtle blurring that JPEG compression can introduce.",
        "Use PNG for transparent backgrounds: If a PDF page has a transparent background that you need to preserve, use PNG. JPEG fills transparency with a solid colour.",
        "File size: JPG files are smaller than PNG for the same content. If you need to share many pages and file size matters, JPG is more efficient.",
        "Quality for presentation use: For inserting PDF pages into PowerPoint or Google Slides, PNG generally looks sharper, especially for text-heavy slides.",
      ],
    },
    {
      title: "Getting the best quality output",
      intro: "The quality of the JPG output depends on several factors you can influence.",
      items: [
        "Start with a high-quality PDF: The output can only be as good as the input. A PDF with low-resolution images will produce low-resolution JPG output regardless of the rendering settings. A PDF with sharp vector content will produce clean JPG images.",
        "Use the correct tool for the content type: For text-heavy pages, consider using PDF to PNG instead of PDF to JPG. PNG lossless compression preserves text edges better than JPEG.",
        "Check the output at actual size: Open the downloaded JPG and view it at 100 percent zoom to assess the actual quality. Images that look acceptable in a thumbnail may appear blurry or compressed at full size.",
        "For single pages, extract first: If you only need one specific page from a multi-page PDF, extract it first using the Split PDF tool, then convert the single-page PDF to JPG. This is faster than processing the entire document.",
      ],
    },
    {
      title: "Using JPG images from PDFs in other applications",
      intro: "Once you have JPG images of your PDF pages, here is how to use them in common applications.",
      items: [
        "Microsoft Word: Insert the JPG using Insert, Pictures, and choose the file. Set the text wrapping to In Line with Text or Square for the best positioning control.",
        "PowerPoint and Google Slides: Insert the image using Insert, Image. Resize and position it on the slide. For sharp results on high-resolution screens, use PNG instead of JPG.",
        "Google Docs: Insert using Insert, Image, Upload from computer. Images in Google Docs are placed inline by default.",
        "Social media: Most platforms accept JPG images directly. Instagram, LinkedIn, and Twitter all display JPG images cleanly.",
        "Email: JPG images can be attached to emails or embedded inline in the email body depending on your email client.",
      ],
    },
    {
      title: "Converting specific pages only",
      intro: "The PDF to JPG tool converts all pages in the document. If you only need certain pages as images, it is more efficient to extract those pages first.",
      steps: [
        "Use the Split PDF tool to extract the pages you need as a smaller PDF.",
        "Or use the Extract PDF Pages tool if the pages are non-consecutive.",
        "Upload the smaller PDF to the PDF to JPG tool.",
        "Convert and download only the images you need.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "The JPG images look blurry or low resolution.",
      solution: "If the original PDF contains low-resolution images, the JPG output will also be low resolution. The tool renders at a quality suitable for screen and standard print use. For very high resolution output required for large-format printing, a desktop application with configurable DPI settings gives more control.",
    },
    {
      problem: "Text in the JPG images is not sharp.",
      solution: "JPEG compression can introduce subtle blurring around sharp text edges. For documents where sharp readable text is critical, use the PDF to PNG tool instead. PNG lossless compression preserves text edges more cleanly.",
    },
    {
      problem: "The PDF has many pages and the conversion is taking a long time.",
      solution: "Each page must be individually rendered to a canvas and saved as an image, which is computationally intensive for long documents. For PDFs with many pages, split the document into smaller sections first and convert each section separately.",
    },
    {
      problem: "The background of the JPG is black instead of white.",
      solution: "This happens with PDFs that have transparent backgrounds. JPEG does not support transparency and fills transparent areas with a solid colour. Try the PDF to PNG conversion instead, as PNG supports transparency and preserves it correctly.",
    },
    {
      problem: "I only need one specific page as a JPG, not the entire document.",
      solution: "Use the Dockitt Split PDF tool to extract just the page you need as a single-page PDF, then convert that to JPG. This is faster and gives you exactly the image you need.",
    },
  ],
  relatedTools: [
    { name: "Split PDF", slug: "split-pdf", description: "Extract specific pages before converting to JPG." },
    { name: "PDF to PNG", slug: "convert-pdf/pdf-to-png", description: "Convert PDF pages to lossless PNG images." },
    { name: "Compress PDF", slug: "compress-pdf", description: "Reduce PDF size before converting." },
  ],
  relatedTool: "convert-pdf",
  relatedToolUrl: "/convert-pdf/pdf-to-jpg",
  relatedGuides: ["how-to-convert-pdf-to-png", "how-to-split-pdf"],
  faqs: [
    {
      question: "What is the difference between converting a PDF to JPG versus PNG?",
      answer: "JPG uses lossy compression which produces smaller files but introduces subtle quality loss, particularly around sharp text edges. PNG uses lossless compression which preserves quality perfectly but produces larger files. For photographic content use JPG. For text, diagrams, and sharp graphics use PNG. PNG also supports transparency while JPG does not.",
    },
    {
      question: "Will each page of the PDF become a separate JPG file?",
      answer: "Yes. Each page is converted to its own individual JPG image. A 10-page PDF produces 10 separate JPG files, each named after the page number.",
    },
    {
      question: "Can I convert a password-protected PDF to JPG?",
      answer: "No. The PDF must be unlocked before it can be rendered and converted. Use the Dockitt Unlock PDF tool first, then convert the unlocked file to JPG.",
    },
    {
      question: "What resolution are the output JPG images?",
      answer: "The tool renders pages at a resolution suitable for screen use and standard printing. For use cases requiring very high resolution output such as large-format printing, a dedicated desktop application with configurable DPI settings gives more control.",
    },
    {
      question: "Can I convert just one page of a multi-page PDF to JPG?",
      answer: "The tool converts all pages. To get a single page as a JPG, extract that page first using the Split PDF or Extract PDF Pages tool, then convert the single-page PDF to JPG.",
    },
    {
      question: "Is the conversion done in my browser or on a server?",
      answer: "The PDF to JPG conversion runs entirely in your browser using PDF.js. Your file is not uploaded to any server and stays on your device throughout the process.",
    },
    {
      question: "Can I convert a PDF to JPG on my phone?",
      answer: "Yes. The PDF to JPG tool works on mobile browsers on both iPhone and Android. Upload your file, wait for conversion, and download the JPG images directly to your phone.",
    },
  ],
  ctaText: "Ready to convert your PDF pages to JPG images? Use the free Dockitt tool below.",
  ctaLinks: [
    { name: "PDF to JPG", slug: "convert-pdf/pdf-to-jpg", description: "Convert PDF pages to JPG images online for free" },
  ],
}
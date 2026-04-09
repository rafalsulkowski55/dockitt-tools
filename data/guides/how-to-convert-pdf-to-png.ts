export const howToConvertPdfToPng = {
  slug: "how-to-convert-pdf-to-png",
  title: "How to Convert a PDF to PNG Online",
  description: "Learn how to convert PDF pages to PNG images online. Get lossless, high-quality images from any PDF, free and without any software.",
  intro: "PNG is the format of choice when image quality and sharpness matter more than file size. Unlike JPG, which uses lossy compression that subtly degrades image quality, PNG uses lossless compression. What you see is exactly what was rendered, with no compression artifacts. This makes PNG the right choice when converting PDF pages that contain sharp text, technical diagrams, line drawings, charts, or any content where crisp edges are important. PNG also supports full transparency, which means pages with transparent backgrounds will convert correctly without being filled with a solid colour.",
  introList: [
    "Convert PDF pages to PNG for use in presentations or documents",
    "Extract a PDF page as a lossless image for design work",
    "Get PNG versions of diagrams, charts, or technical drawings from a PDF",
    "Convert PDF pages to PNG to preserve transparency for use on websites",
    "Extract pages as sharp images for documentation or reporting",
  ],
  introOutro: "Dockitt converts your PDF pages to PNG directly in your browser using PDF.js. Your file is never uploaded to any server.",
  sections: [
    {
      title: "How to convert a PDF to PNG online - step by step",
      steps: [
        "Open the Dockitt PDF to PNG tool in your browser.",
        "Click 'Choose PDF' or drag and drop your file into the upload area.",
        "The tool renders each page at high quality and saves it as a PNG image.",
        "Download the PNG images. Each page of the PDF becomes a separate PNG file.",
      ],
    },
    {
      title: "Why PNG produces better results than JPG for many documents",
      intro: "The choice between PNG and JPG for PDF conversion is not just about preference. The content of your PDF determines which format produces the better output.",
      items: [
        "Lossless compression: PNG uses lossless compression, meaning every pixel in the output is exactly as rendered from the PDF. No quality is sacrificed at any stage of the conversion. This is fundamentally different from JPEG, which applies lossy compression that discards some image data to reduce file size.",
        "Sharp text and edges: JPEG compression introduces subtle blurring and ringing artifacts around high-contrast edges, which is most visible on sharp text and line art. PNG preserves these edges perfectly. For documents with small text, technical diagrams, or clean line drawings, PNG is always the better choice.",
        "Transparency support: JPEG cannot store transparent pixels. Transparent areas in a PDF are filled with a solid background colour when converted to JPEG. PNG supports full alpha channel transparency. If a PDF page has a transparent background that you need to preserve for use on a website or in a design application, PNG is the only suitable format.",
        "Larger file size: The trade-off for lossless quality is larger files. PNG files are typically larger than JPEG for the same content. For photographic content with many colour gradients, the size difference can be significant. For text-heavy documents and diagrams, the difference is smaller.",
      ],
    },
    {
      title: "When to use PNG vs JPG for PDF conversion",
      intro: "Both formats have their appropriate use cases. Here is a practical guide for choosing between them.",
      items: [
        "Use PNG for: Sharp text documents, technical drawings, architectural plans, charts and graphs, logos and branded materials, diagrams with hard edges, pages with transparent backgrounds, content that will be used in design applications.",
        "Use JPG for: Photographic content, pages dominated by full-colour photographs, content where file size is more important than pixel-perfect quality, images that will be compressed further anyway such as social media uploads.",
        "Use PNG for presentations: When inserting PDF pages into PowerPoint, Google Slides, or Keynote, PNG images look sharper than JPG on high-resolution screens, particularly for text and diagrams.",
        "Use PNG for web use: When using PDF page images on a website, PNG images look crisper on retina and high-DPI screens. They also support transparency for placing images over coloured backgrounds.",
        "File size consideration: If you are creating many PNG images from a long PDF and need to keep the total size manageable, JPG may be more practical despite the quality trade-off.",
      ],
    },
    {
      title: "Using PNG images from PDFs in other applications",
      intro: "PNG images from PDF pages are widely compatible. Here is how to use them in common applications.",
      items: [
        "Microsoft Word and PowerPoint: Insert using Insert, Pictures, and select the PNG file. PNG images with transparency display correctly in Office applications.",
        "Google Docs and Slides: Insert using Insert, Image, Upload from computer. PNG transparency is supported and renders correctly.",
        "Figma and design tools: PNG images can be imported directly into Figma, Sketch, Adobe XD, and similar tools. Transparent PNG files are particularly useful in design workflows.",
        "Web development: PNG images can be used directly as img elements in HTML. For images with transparency that need to sit over coloured backgrounds, PNG is essential.",
        "Email: PNG images can be attached to emails or embedded inline. Note that some email clients compress images, which may affect quality. For critical quality, attach the PNG as a file rather than embedding it.",
      ],
    },
    {
      title: "Converting specific pages to PNG",
      intro: "The PDF to PNG tool converts all pages in the document. For converting only specific pages, combine it with a page extraction tool.",
      steps: [
        "Use the Split PDF tool to extract a consecutive range of pages as a new PDF.",
        "Or use the Extract PDF Pages tool to pick specific non-consecutive pages.",
        "Upload the smaller PDF to the PDF to PNG tool.",
        "Convert and download only the PNG images you need.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "The PNG files are very large.",
      solution: "PNG lossless compression produces larger files than JPG, especially for pages with complex colour content. If file size is a concern and the content does not require transparency or pixel-perfect sharpness, consider using the PDF to JPG conversion instead for smaller output files.",
    },
    {
      problem: "The PNG images look pixelated when zoomed in.",
      solution: "PNG is a raster format with a fixed pixel resolution. Zooming in beyond 100 percent will show individual pixels regardless of the format. If you need content to remain sharp at any zoom level, work with the original PDF which stores text and vectors in a scalable format.",
    },
    {
      problem: "I only need PNG images of certain pages.",
      solution: "Extract the specific pages you need using the Split PDF or Extract PDF Pages tool first, then convert that smaller PDF to PNG. This is more efficient than converting the whole document and discarding most of the images.",
    },
    {
      problem: "The colours in the PNG look different from the PDF.",
      solution: "PDF files can use different colour spaces including CMYK for print. When rendering to PNG, colours are converted to RGB for screen display. If colours appear different, the original PDF likely uses CMYK colour profiles intended for print, which look slightly different when converted to screen RGB.",
    },
  ],
  relatedTools: [
    { name: "PDF to JPG", slug: "convert-pdf/pdf-to-jpg", description: "Convert PDF pages to smaller JPG images." },
    { name: "Split PDF", slug: "split-pdf", description: "Extract specific pages before converting to PNG." },
    { name: "Compress PDF", slug: "compress-pdf", description: "Reduce PDF size before converting." },
  ],
  relatedTool: "convert-pdf",
  relatedToolUrl: "/convert-pdf/pdf-to-png",
  relatedGuides: ["how-to-convert-pdf-to-jpg", "how-to-split-pdf"],
  faqs: [
    {
      question: "When should I use PDF to PNG instead of PDF to JPG?",
      answer: "Use PNG when your PDF contains sharp text, technical drawings, charts, logos, or any content with hard edges. PNG is lossless and preserves quality perfectly. Use JPG when the PDF is mostly photographic content and smaller file sizes are more important than pixel-perfect quality.",
    },
    {
      question: "Does PNG support transparency?",
      answer: "Yes. PNG fully supports alpha channel transparency. If your PDF pages have transparent backgrounds, the PNG output will preserve that transparency correctly, unlike JPG which fills transparent areas with a solid colour.",
    },
    {
      question: "Will each page become a separate PNG file?",
      answer: "Yes. Each page of the PDF is exported as an individual PNG image. A 5-page PDF produces 5 separate PNG files.",
    },
    {
      question: "Can I use the PNG images in presentations or documents?",
      answer: "Yes. PNG is one of the most universally supported image formats. You can insert the resulting images into Microsoft Word, PowerPoint, Google Docs, Google Slides, Keynote, Figma, or any other application that accepts images.",
    },
    {
      question: "Is the conversion done in my browser or on a server?",
      answer: "The PDF to PNG conversion runs entirely in your browser using PDF.js. Your file is not uploaded to any server and stays on your device throughout the process.",
    },
    {
      question: "Can I convert a password-protected PDF to PNG?",
      answer: "No. The PDF must be unlocked before it can be rendered. Use the Dockitt Unlock PDF tool first, then convert the unlocked file to PNG.",
    },
    {
      question: "Can I convert a PDF to PNG on my phone?",
      answer: "Yes. The PDF to PNG tool works on mobile browsers on both iPhone and Android. Upload your file, wait for conversion, and download the PNG images directly to your phone.",
    },
  ],
  ctaText: "Ready to convert your PDF pages to PNG images? Use the free Dockitt tool below.",
  ctaLinks: [
    { name: "PDF to PNG", slug: "convert-pdf/pdf-to-png", description: "Convert PDF pages to PNG images online for free" },
  ],
}
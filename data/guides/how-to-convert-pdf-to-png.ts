export const howToConvertPdfToPng = {
  slug: "how-to-convert-pdf-to-png",
  title: "How to Convert a PDF to PNG Online",
  description: "Learn how to convert PDF pages to PNG images online — get lossless, high-quality images from any PDF, free and without any software.",
  intro: "PNG is the format of choice when image quality and sharpness matter more than file size. Unlike JPG, which uses lossy compression that subtly degrades image quality with every save, PNG uses lossless compression — what you see is exactly what was rendered, with no compression artefacts. This makes PNG the right choice when converting PDF pages that contain sharp text, technical diagrams, line drawings, charts, or any content where crisp edges are important. It also supports full transparency, which means pages with transparent backgrounds will convert correctly without being filled with a black or white background. Dockitt converts your PDF pages to PNG directly in your browser using PDF.js.",
  steps: [
    "Go to the Dockitt PDF to PNG tool.",
    "Click 'Choose PDF' and upload the document you want to convert.",
    "The tool renders each page at high quality and saves it as a PNG image.",
    "Download the PNG images — one file per page.",
  ],
  commonProblems: [
    {
      problem: "The PNG files are very large.",
      solution: "PNG lossless compression produces larger files than JPG, especially for pages with complex colour content or large dimensions. If file size is a concern and the content doesn't require transparency or pixel-perfect sharpness, consider using the PDF to JPG conversion instead for a smaller output size.",
    },
    {
      problem: "The PNG images look pixelated when I zoom in.",
      solution: "PNG is a raster format — it has a fixed pixel resolution. Zooming in beyond 100% will always show individual pixels. If you need the content to remain sharp at any zoom level, you need to work with the original PDF (which stores text and vectors) rather than a raster image export.",
    },
    {
      problem: "I only need PNG images of certain pages.",
      solution: "Extract the specific pages you need using the Dockitt Split PDF or Extract PDF Pages tool first, then convert that smaller PDF to PNG. This is more efficient than converting the whole document and discarding most of the images.",
    },
    {
      problem: "The colours in the PNG look different from the PDF.",
      solution: "PDF files can use different colour spaces — RGB, CMYK, or others. When rendering to PNG, the colours are converted to RGB, which is the standard for screen display. If the colours appear different, it may be because the original PDF uses CMYK colour profiles intended for print, which look slightly different when converted to screen RGB.",
    },
  ],
  relatedTool: "convert-pdf",
  relatedToolUrl: "/convert-pdf/pdf-to-png",
  relatedGuides: ["how-to-convert-pdf-to-jpg", "how-to-split-pdf"],
  faqs: [
    {
      question: "When should I use PDF to PNG instead of PDF to JPG?",
      answer: "Use PNG when your PDF contains sharp text, technical drawings, charts, logos, or any content with hard edges and solid colours. Use JPG when your PDF is mostly photographic content and you need smaller file sizes. PNG is lossless — every pixel is preserved exactly. JPG is lossy — a small amount of quality is sacrificed for a smaller file.",
    },
    {
      question: "Does PNG support transparency?",
      answer: "Yes. PNG fully supports alpha channel transparency. If your PDF pages have transparent backgrounds, the PNG output will preserve that transparency correctly — unlike JPG, which fills transparent areas with a solid colour.",
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
      answer: "The PDF to PNG conversion is handled entirely in your browser using PDF.js. Your file is not uploaded to any server — it stays on your device throughout the process. This makes it faster for most files and means your document content is never transmitted over the internet.",
    },
  ],
}
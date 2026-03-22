export const howToConvertPdfToJpg = {
  slug: "how-to-convert-pdf-to-jpg",
  title: "How to Convert a PDF to JPG Online",
  description: "Learn how to convert PDF pages to JPG images online — extract every page as a separate image, free and without any software.",
  intro: "Converting a PDF to JPG images is more useful than it might initially seem. Maybe you need to embed a page from a PDF into a Word document or a PowerPoint presentation, and inserting a PDF directly isn't working cleanly. Maybe you want to share a single page on social media or in a messaging app where PDFs don't preview well. Maybe a client needs images of your designs but you only have the PDF version. Whatever the reason, Dockitt converts each page of your PDF into a separate high-quality JPG image directly in your browser — using PDF.js to render each page to a canvas element, then saving the result as JPEG. No server upload needed for most files, and no software to install.",
  steps: [
    "Go to the Dockitt PDF to JPG tool.",
    "Click 'Choose PDF' and upload the file you want to convert.",
    "The tool will render each page of the PDF and convert it to a JPG image.",
    "Download the JPG images — each page becomes a separate file.",
    "If there are multiple pages, the images will be provided as individual downloads or a ZIP archive.",
  ],
  commonProblems: [
    {
      problem: "The JPG images look blurry or low resolution.",
      solution: "JPG quality depends on the resolution at which the PDF pages are rendered. If the output looks blurry, the original PDF may contain low-resolution images or the rendering scale may be lower than ideal for your use case. For sharp results, make sure your source PDF contains high-resolution content. The tool renders at a quality suitable for screen and standard print use.",
    },
    {
      problem: "Text in the JPG images is not sharp.",
      solution: "Unlike a PDF where text is stored as vector data that scales perfectly at any size, a JPG is a raster image — text is rendered at a fixed pixel resolution. For documents where sharp, readable text is critical, consider whether a PNG conversion might suit better, as PNG uses lossless compression that preserves text edges more cleanly than JPEG.",
    },
    {
      problem: "The PDF has many pages and the conversion is taking a long time.",
      solution: "Each page must be individually rendered to a canvas and saved as an image, which is computationally intensive for long documents. For PDFs with many pages, consider splitting the document into smaller sections first and converting each section separately.",
    },
    {
      problem: "I only need one specific page as a JPG, not the entire document.",
      solution: "Use the Dockitt Split PDF tool to extract just the page you need as a single-page PDF, then convert that to JPG. This is faster and gives you exactly the image you need without processing the whole document.",
    },
    {
      problem: "The background of the JPG is black instead of white.",
      solution: "This can happen with PDFs that have transparent backgrounds. JPEG does not support transparency, so transparent areas are filled with a solid colour during conversion. If the background appears black, the PDF page had a transparent background that was filled incorrectly. Try the PDF to PNG conversion instead — PNG supports transparency and will preserve it correctly.",
    },
  ],
  relatedTool: "convert-pdf",
  relatedToolUrl: "/convert-pdf/pdf-to-jpg",
  relatedGuides: ["how-to-convert-pdf-to-png", "how-to-split-pdf"],
  faqs: [
    {
      question: "What is the difference between converting a PDF to JPG versus PNG?",
      answer: "JPG uses lossy compression, which means some image quality is sacrificed to achieve smaller file sizes. It works well for photos and pages with lots of colour gradients. PNG uses lossless compression — no quality is lost, but file sizes are larger. PNG also supports transparency. For documents with sharp text, diagrams, or transparent elements, PNG generally produces better results. For photographic content where file size matters more than pixel-perfect sharpness, JPG is the better choice.",
    },
    {
      question: "Will each page of the PDF become a separate JPG file?",
      answer: "Yes. Each page is converted to its own individual JPG image. A 10-page PDF will produce 10 separate JPG files.",
    },
    {
      question: "Can I convert a password-protected PDF to JPG?",
      answer: "No. The PDF must be unlocked before it can be rendered and converted. Use the Dockitt Unlock PDF tool first, then convert the unlocked file to JPG.",
    },
    {
      question: "What resolution are the output JPG images?",
      answer: "The tool renders pages at a resolution suitable for screen use and standard printing. For use cases requiring very high resolution output — such as large-format printing — a dedicated desktop application with configurable DPI settings would give you more control.",
    },
    {
      question: "Can I convert just one page of a multi-page PDF to JPG?",
      answer: "The tool converts all pages. To get a single page as a JPG, extract that page first using the Split PDF or Extract PDF Pages tool, then convert the single-page PDF to JPG.",
    },
  ],
}
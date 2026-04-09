export const howToConvertPngToPdf = {
  slug: "how-to-convert-png-to-pdf",
  title: "How to Convert PNG Images to PDF Online",
  description: "Learn how to convert PNG images to a PDF file online. Combine screenshots, graphics, and designs into a single document, free.",
  intro: "PNG images are everywhere in digital work. Screenshots, exported designs from Figma or Sketch, diagrams from documentation tools, charts exported from spreadsheets, illustrations created in image editors. When you need to compile several of these into a single shareable document, converting them to PDF is the cleanest solution. PDF preserves the image quality exactly, displays consistently on every device, and can be shared with anyone without worrying about whether they have the right software to open it.",
  introList: [
    "Compile screenshots into a single PDF for a bug report or documentation",
    "Convert exported design screens from Figma or Sketch into a shareable PDF",
    "Combine diagrams and charts into a PDF report",
    "Turn a set of PNG images into a PDF to email as a single attachment",
    "Convert PNG graphics into a PDF before inserting them into a larger document",
  ],
  introOutro: "Dockitt converts PNG images to PDF directly in your browser. Your files stay on your device and are never uploaded to a server.",
  sections: [
    {
      title: "How to convert PNG images to PDF online - step by step",
      steps: [
        "Open the Dockitt PNG to PDF tool in your browser.",
        "Click 'Choose PNG' or drag and drop one or more PNG images into the upload area.",
        "If you selected multiple images, verify that they are in the correct order.",
        "Click 'Convert to PDF' and wait a few seconds while the tool creates the document.",
        "Click 'Download' to save the PDF to your device.",
        "Open the downloaded file to confirm all images are present and in the correct order.",
      ],
    },
    {
      title: "How PNG to PDF conversion works",
      intro: "Understanding the conversion process helps set the right expectations for the output.",
      items: [
        "Each image becomes one page: Every PNG you include becomes a single page in the PDF. A set of 8 images produces an 8-page PDF. The page dimensions match the image dimensions.",
        "Images are embedded without re-compression: PNG images are embedded into the PDF as-is. No additional compression is applied and no quality is lost. The images in the PDF look identical to the originals.",
        "Transparency handling: PNG supports transparency, but PDF pages have a default white background. When a PNG with a transparent background is embedded in a PDF, the transparent areas appear white. This is the expected behaviour. If you need a different background colour, edit the PNG to add the desired background before converting.",
        "Processing happens in the browser: The conversion runs entirely in your browser using pdf-lib. Your images are not uploaded to any server.",
        "File size: The PDF will be similar in size to the combined size of the original PNG images plus a small amount of PDF overhead. PNGs are lossless and can be large, so the resulting PDF may be large for high-resolution images.",
      ],
    },
    {
      title: "Common uses for PNG to PDF conversion",
      intro: "PNG to PDF conversion comes up in several predictable situations across different types of work.",
      items: [
        "Software documentation: Screenshots of a user interface are typically saved as PNG. Converting them to PDF creates clean documentation that can be shared with anyone without requiring the recipient to have the original application or files.",
        "Design handoffs: Exported screens from design tools are often PNG files. Converting them to PDF creates a single document that clients can review and annotate without needing access to Figma, Sketch, or other design software.",
        "Bug reports and QA: QA testers often capture PNG screenshots of issues. Converting them to a single PDF makes the report easier to share, review, and archive than a folder of individual images.",
        "Data visualisation: Charts and graphs exported from spreadsheets or data tools are typically PNG files. Converting them to PDF creates a shareable report.",
        "Portfolio and samples: Designers and creatives often share their work as a PDF portfolio. Converting PNG exports of their work into a single PDF is a common final step.",
      ],
    },
    {
      title: "Getting the page order right",
      intro: "The order of pages in the PDF follows the order in which you selected or added the images.",
      items: [
        "Select files in order on desktop: On Windows, hold Ctrl while clicking files to select them in order. On Mac, hold Cmd while clicking. Files are added to the upload list in the order you click them.",
        "Name files with numbers: If you regularly convert the same set of PNG files, naming them with a numeric prefix such as 01-screen.png, 02-screen.png makes it easy to select them in the right order.",
        "Fix order after converting: If the pages end up in the wrong order, use the Reorder PDF Pages tool to drag individual pages into the correct sequence.",
        "On mobile: On iPhone, when selecting multiple images, the selection order determines the page order in the PDF.",
      ],
    },
    {
      title: "Managing file size after conversion",
      intro: "PNG files use lossless compression and can be large, particularly for high-resolution screenshots or design exports. Here is how to manage the file size of the converted PDF.",
      items: [
        "Compress after converting: Use the Dockitt Compress PDF tool after converting to reduce the file size. Structural compression can reduce the PDF size without any visible quality change.",
        "Screenshots compress well: Screenshots and diagrams with large areas of solid colour compress particularly well. A PDF of screenshots may reduce significantly after compression.",
        "Consider JPG for photographic content: If your PNG images are photographic in nature rather than screenshots or diagrams, consider converting them to JPG first and then to PDF. JPG images are smaller for photographic content and the quality difference is minimal.",
      ],
    },
    {
      title: "Combining PNG images with existing PDF content",
      intro: "If you need to insert PNG images into an existing PDF document rather than creating a new one from scratch, the process takes two steps.",
      steps: [
        "Convert the PNG images to a PDF using the PNG to PDF tool.",
        "Use the Merge PDF tool to combine the new PDF with your existing document.",
        "Use the Reorder PDF Pages tool to position the images in the correct place within the merged document.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "The transparent background in my PNG appears white in the PDF.",
      solution: "PDF pages have a white background by default. When a PNG with a transparent background is embedded, the transparency is replaced with white. This is expected behaviour. If you need a different background colour, edit the PNG to add the desired background before converting.",
    },
    {
      problem: "The PDF file size is much larger than the original PNG files.",
      solution: "PNG lossless compression may not transfer efficiently to PDF compression. After conversion, run the PDF through the Dockitt Compress PDF tool to reduce the size. This is especially effective for screenshots and diagrams with large areas of solid colour.",
    },
    {
      problem: "Text in the PNG images is not searchable in the PDF.",
      solution: "Images embedded in a PDF contain pixel data only. Text visible in images is not real selectable text. If you need searchable text in the PDF, the original source documents should be exported directly as PDF rather than as PNG images.",
    },
    {
      problem: "I need to combine PNG images with existing PDF pages.",
      solution: "Convert your PNG images to PDF first using this tool, then use the Dockitt Merge PDF tool to combine the resulting PDF with your existing document in the correct order.",
    },
  ],
  relatedTools: [
    { name: "JPG to PDF", slug: "convert-pdf/jpg-to-pdf", description: "Convert JPG images to PDF." },
    { name: "Compress PDF", slug: "compress-pdf", description: "Reduce file size after converting PNG images to PDF." },
    { name: "Merge PDF", slug: "merge-pdf", description: "Combine the converted PDF with an existing document." },
    { name: "Reorder PDF Pages", slug: "reorder-pdf-pages", description: "Fix page order after conversion." },
  ],
  relatedTool: "convert-pdf",
  relatedToolUrl: "/convert-pdf/png-to-pdf",
  relatedGuides: ["how-to-convert-jpg-to-pdf", "how-to-compress-pdf"],
  faqs: [
    {
      question: "What is the difference between converting PNG to PDF versus JPG to PDF?",
      answer: "The conversion process is the same but the source image format differs. PNG images support transparency and use lossless compression, making them ideal for screenshots, designs, and graphics with sharp edges. JPG images are better suited to photographs. Both formats are fully supported for PDF conversion.",
    },
    {
      question: "Will the PNG image quality be preserved in the PDF?",
      answer: "Yes. PNG images are embedded into the PDF without any additional compression or quality reduction. The visual output in the PDF is identical to the original PNG files.",
    },
    {
      question: "Can I convert screenshots to PDF using this tool?",
      answer: "Yes. Screenshots saved as PNG are one of the most common use cases for this tool. You can convert any number of screenshots into a single, well-organised PDF document.",
    },
    {
      question: "Is there a maximum image size or resolution?",
      answer: "There is no strict resolution limit. Very large high-resolution images may take longer to process and produce larger PDF files. For most use cases including screenshots, exported designs, and standard graphics, processing is fast.",
    },
    {
      question: "Can I reorder the pages in the PDF after converting?",
      answer: "Yes. If the page order is not right after conversion, use the Dockitt Reorder PDF Pages tool to drag the pages into the correct sequence.",
    },
    {
      question: "Does the conversion work on mobile devices?",
      answer: "Yes. The PNG to PDF tool runs entirely in the browser and works on both iPhone and Android. You can select images from your device, convert them, and download the PDF directly on your phone.",
    },
    {
      question: "Why does my transparent PNG have a white background in the PDF?",
      answer: "PDF pages have a white background by default. Transparent areas in PNG images are replaced with white when embedded in a PDF. If you need a different background, add it to the PNG before converting.",
    },
  ],
  ctaText: "Ready to convert your PNG images to PDF? Use the free Dockitt tool below.",
  ctaLinks: [
    { name: "PNG to PDF", slug: "convert-pdf/png-to-pdf", description: "Convert PNG images to PDF online for free" },
  ],
}
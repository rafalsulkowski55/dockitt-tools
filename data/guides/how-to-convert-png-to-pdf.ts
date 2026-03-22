export const howToConvertPngToPdf = {
  slug: "how-to-convert-png-to-pdf",
  title: "How to Convert PNG Images to PDF Online",
  description: "Learn how to convert PNG images to a PDF file online — combine screenshots, graphics, and designs into a single document, free.",
  intro: "PNG images are everywhere in digital work — screenshots, exported designs from Figma or Sketch, diagrams from documentation tools, charts exported from spreadsheets, and illustrations created in image editors. When you need to compile several of these into a single shareable document, converting them to PDF is the cleanest solution. PDF preserves the image quality exactly, displays consistently on every device, and can be shared with anyone without worrying about whether they have the right software to open it. Dockitt converts PNG images to PDF directly in your browser — your files stay on your device and are never uploaded to a server.",
  steps: [
    "Go to the Dockitt PNG to PDF tool.",
    "Click 'Choose PNG' and select one or more PNG images.",
    "Verify the order of the images if you've selected multiple files.",
    "Click 'Convert to PDF' to create the document.",
    "Download the PDF — each PNG image becomes one page.",
  ],
  commonProblems: [
    {
      problem: "The transparent background in my PNG appears white in the PDF.",
      solution: "PDF pages have a white background by default. When a PNG with a transparent background is embedded into a PDF, the transparency is replaced with white — which is the expected behaviour. If you need the background to be a different colour, edit the PNG to add the desired background colour before converting.",
    },
    {
      problem: "The PDF file size is much larger than the original PNG files.",
      solution: "PNG files use lossless compression internally, but when embedded in a PDF the compression method may differ, resulting in larger files. After conversion, run the PDF through the Dockitt Compress PDF tool to reduce the size. This is especially effective for screenshots and diagrams that have large areas of solid colour.",
    },
    {
      problem: "Text in the PNG images is not searchable in the PDF.",
      solution: "When images are embedded in a PDF, any text visible in those images is just pixels — it is not real, selectable text. The PDF to Word and OCR tools only work on PDFs that already contain a text layer. If you need searchable text, the original source documents should be exported as PDF directly rather than as PNG images.",
    },
    {
      problem: "I need to combine PNG images with existing PDF pages.",
      solution: "Convert your PNG images to PDF first using this tool, then use the Dockitt Merge PDF tool to combine the resulting PDF with your existing document in the correct order.",
    },
  ],
  relatedTool: "convert-pdf",
  relatedToolUrl: "/convert-pdf/png-to-pdf",
  relatedGuides: ["how-to-convert-jpg-to-pdf", "how-to-compress-pdf"],
  faqs: [
    {
      question: "What is the difference between converting PNG to PDF versus JPG to PDF?",
      answer: "The conversion process is the same, but the source image format differs. PNG images support transparency and use lossless compression, making them ideal for screenshots, designs, and graphics with sharp edges. JPG images are better suited to photographs. Both formats are fully supported for PDF conversion.",
    },
    {
      question: "Will the PNG image quality be preserved in the PDF?",
      answer: "Yes. PNG images are embedded into the PDF without any additional compression or quality reduction. The visual output in the PDF will be identical to the original PNG files.",
    },
    {
      question: "Can I convert screenshots to PDF using this tool?",
      answer: "Yes. Screenshots saved as PNG are one of the most common use cases for this tool. Whether you're documenting software, compiling a bug report, or creating a visual reference document, you can convert any number of screenshots into a single, well-organised PDF.",
    },
    {
      question: "Is there a maximum image size or resolution?",
      answer: "There is no strict resolution limit, but very large high-resolution images may take longer to process and will produce larger PDF files. For most use cases — screenshots, exported designs, and standard graphics — processing is fast and the output file size is manageable.",
    },
    {
      question: "Can I reorder the pages in the PDF after converting?",
      answer: "Yes. If the page order isn't quite right after conversion, use the Dockitt Reorder PDF Pages tool to drag the pages into the correct sequence.",
    },
  ],
}
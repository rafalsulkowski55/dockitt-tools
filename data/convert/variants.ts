export type ConvertVariant = {
  slug: string;
  name: string;
  title: string;
  description: string;
  longDescription: string;
  primaryKeyword: string;
  inputFormat: string;
  outputFormat: string;
  inputLabel: string;
  accept: string;
  howTo: string[];
  faqs: { question: string; answer: string }[];
};

export const convertVariants: ConvertVariant[] = [
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    title: "Convert PDF to JPG Online",
    description: "Convert PDF pages to JPG images online without any sign-up.",
    longDescription: "Converting a PDF to JPG images is useful when you need to share individual pages as images, embed PDF content into a presentation, or use PDF pages on a website. Maybe you need to insert a page from a report into a Word document and inserting the PDF directly is not working cleanly. Maybe a client needs images of your designs but you only have the PDF version. Dockitt converts each page of your PDF into a separate high-quality JPG image directly in your browser using PDF.js, without uploading anything to a server.",
    primaryKeyword: "pdf to jpg",
    inputFormat: "pdf",
    outputFormat: "jpg",
    inputLabel: "Choose PDF",
    accept: ".pdf",
    howTo: [
      "Click 'Choose PDF' and select the PDF file you want to convert to images.",
      "Click 'Convert to JPG' and wait while each page is rendered as a separate image.",
      "Download the JPG images. Each page of the PDF becomes one individual JPG file.",
    ],
    faqs: [
      {
        question: "Will each page of the PDF become a separate JPG file?",
        answer: "Yes. Each page is converted to its own individual JPG image. A 10-page PDF will produce 10 separate JPG files, each named after the page number.",
      },
      {
        question: "What is the difference between converting a PDF to JPG versus PNG?",
        answer: "JPG uses lossy compression, which means some image quality is sacrificed to achieve smaller file sizes. It works well for pages with lots of colour and photographic content. PNG uses lossless compression, so no quality is lost but file sizes are larger. PNG also supports transparency. For documents with sharp text, diagrams, or transparent elements, PNG generally produces better results. For photographic content where file size matters more than pixel-perfect sharpness, JPG is the better choice.",
      },
      {
        question: "The JPG images look blurry. What can I do?",
        answer: "JPG quality depends on the resolution at which the PDF pages are rendered. If the output looks blurry, the original PDF may contain low-resolution images or the content was created at a low resolution. The tool renders pages at a quality suitable for screen use and standard printing. If the source PDF has sharp content, the JPG output will also be sharp.",
      },
      {
        question: "The background of the JPG is black instead of white.",
        answer: "This happens with PDFs that have transparent backgrounds. JPEG does not support transparency, so transparent areas are filled with a solid colour during conversion. If the background appears black, try the PDF to PNG conversion instead. PNG supports transparency and will preserve it correctly rather than filling it with a background colour.",
      },
      {
        question: "Can I convert a password-protected PDF to JPG?",
        answer: "No. The PDF must be unlocked before it can be rendered and converted. Use the Dockitt Unlock PDF tool to remove the password first, then convert the unlocked file to JPG.",
      },
      {
        question: "Is the conversion done in my browser or on a server?",
        answer: "The PDF to JPG conversion is handled entirely in your browser using PDF.js. Your file is not uploaded to any server. It stays on your device throughout the entire process, which also makes it faster for most files.",
      },
    ],
  },
  {
    slug: "pdf-to-png",
    name: "PDF to PNG",
    title: "Convert PDF to PNG Online",
    description: "Convert PDF pages to PNG images online without any sign-up.",
    longDescription: "PNG is the format of choice when image quality and sharpness matter more than file size. Unlike JPG, which uses lossy compression that subtly degrades image quality, PNG uses lossless compression. This makes PNG the right choice when converting PDF pages that contain sharp text, technical diagrams, line drawings, charts, or any content where crisp edges are important. PNG also supports full transparency, which means pages with transparent backgrounds will convert correctly without being filled with a background colour. Dockitt converts your PDF pages to PNG directly in your browser using PDF.js.",
    primaryKeyword: "pdf to png",
    inputFormat: "pdf",
    outputFormat: "png",
    inputLabel: "Choose PDF",
    accept: ".pdf",
    howTo: [
      "Click 'Choose PDF' and select the PDF file you want to convert to PNG images.",
      "Click 'Convert to PNG' and wait while each page is rendered at full quality.",
      "Download the PNG images. Each page becomes a separate lossless PNG file.",
    ],
    faqs: [
      {
        question: "When should I use PDF to PNG instead of PDF to JPG?",
        answer: "Use PNG when your PDF contains sharp text, technical drawings, charts, logos, or any content with hard edges and solid colours. PNG is lossless, meaning every pixel is preserved exactly as rendered. Use JPG when your PDF is mostly photographic content and you need smaller file sizes. The visual difference is most noticeable on text and line art, where JPG compression can create subtle blurring around edges.",
      },
      {
        question: "Does PNG support transparency?",
        answer: "Yes. PNG fully supports alpha channel transparency. If your PDF pages have transparent backgrounds, the PNG output will preserve that transparency correctly. This is one of the main advantages of PNG over JPG for certain types of content, particularly graphics and designs that need to be placed on different backgrounds.",
      },
      {
        question: "The PNG files are very large. Is this normal?",
        answer: "PNG lossless compression produces larger files than JPG, especially for pages with complex colour content or large dimensions. This is a natural trade-off for the higher quality. If file size is a concern and the content does not require transparency or pixel-perfect sharpness, consider using the PDF to JPG conversion instead for a smaller output size.",
      },
      {
        question: "Will each page become a separate PNG file?",
        answer: "Yes. Each page of the PDF is exported as an individual PNG image. A 5-page PDF produces 5 separate PNG files. There is currently no option to combine all pages into a single image file.",
      },
      {
        question: "Can I use the PNG images in presentations or documents?",
        answer: "Yes. PNG is one of the most universally supported image formats. You can insert the resulting images into Microsoft Word, PowerPoint, Google Docs, Google Slides, Keynote, Figma, or any other application that accepts images. The images will display at full quality in any of these applications.",
      },
      {
        question: "Is the conversion done in my browser or on a server?",
        answer: "The PDF to PNG conversion is handled entirely in your browser using PDF.js. Your file is not uploaded to any server and stays on your device throughout the process. This makes it faster for most files and means your document content is never transmitted over the internet.",
      },
    ],
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    title: "Convert JPG to PDF Online",
    description: "Convert JPG images to PDF files online without any sign-up.",
    longDescription: "There are plenty of situations where you have JPG images that need to become a PDF. You have photographed a multi-page paper document with your phone and need to send it as a single file. You have product photos that need to be compiled into a PDF catalogue. You have scanned receipts or invoices as images and need to submit them as a PDF. Dockitt converts one or multiple JPG images to a PDF document directly in your browser using pdf-lib. No server upload needed, no account required.",
    primaryKeyword: "jpg to pdf",
    inputFormat: "jpg",
    outputFormat: "pdf",
    inputLabel: "Choose JPG",
    accept: ".jpg,.jpeg",
    howTo: [
      "Click 'Choose JPG' and select one or more JPG images you want to combine into a PDF.",
      "Check that the images are in the correct order before converting.",
      "Click 'Convert to PDF' to create the document.",
      "Download the PDF. Each image becomes one page in the document.",
    ],
    faqs: [
      {
        question: "How many JPG images can I convert to PDF at once?",
        answer: "You can select multiple images in one go. There is no hard limit on the number of images. Very large numbers of high-resolution photos may take longer to process and will produce larger PDF files, but there is no enforced maximum.",
      },
      {
        question: "Can I mix JPG and JPEG files in the same conversion?",
        answer: "Yes. JPG and JPEG are the same format. JPEG is the full name of the format while JPG is the three-letter file extension used on older systems. Both file extensions are accepted by the tool and treated identically.",
      },
      {
        question: "The images appear in the wrong order in the PDF.",
        answer: "The order of pages in the PDF follows the order in which you selected or uploaded the images. On most operating systems, holding Ctrl on Windows or Cmd on Mac while clicking files lets you select them in a specific order. If the order is wrong in the output, use the Dockitt Reorder PDF Pages tool to rearrange the pages after conversion.",
      },
      {
        question: "Will the image quality be reduced when converting to PDF?",
        answer: "No. The JPG images are embedded into the PDF as-is, without any additional compression or quality reduction. The images in the resulting PDF will look identical to the original files.",
      },
      {
        question: "Can I convert photos taken on my phone to PDF?",
        answer: "Yes. Photos from iPhone and Android devices are typically saved as JPG or HEIC. JPG photos can be converted directly. If your phone saves photos as HEIC, you will need to convert them to JPG first. Most phones have an option to save in JPG format in the camera settings, or you can use a free HEIC to JPG converter before uploading.",
      },
      {
        question: "The PDF file is very large after conversion.",
        answer: "JPG images embedded in a PDF can produce large files, especially if the original photos are high resolution from a modern smartphone camera. After converting, run the PDF through the Dockitt Compress PDF tool to reduce the file size significantly, often without any visible quality loss for standard viewing and printing.",
      },
    ],
  },
  {
    slug: "png-to-pdf",
    name: "PNG to PDF",
    title: "Convert PNG to PDF Online",
    description: "Convert PNG images to PDF files online without any sign-up.",
    longDescription: "PNG images are everywhere in digital work. Screenshots, exported designs from Figma or Sketch, diagrams from documentation tools, charts exported from spreadsheets, and illustrations created in image editors. When you need to compile several of these into a single shareable document, converting them to PDF is the cleanest solution. PDF preserves the image quality exactly, displays consistently on every device, and can be shared with anyone without worrying about whether they have the right software to open it. Dockitt converts PNG images to PDF directly in your browser using pdf-lib.",
    primaryKeyword: "png to pdf",
    inputFormat: "png",
    outputFormat: "pdf",
    inputLabel: "Choose PNG",
    accept: ".png",
    howTo: [
      "Click 'Choose PNG' and select one or more PNG images you want to combine into a PDF.",
      "Check that the images are in the correct order before converting.",
      "Click 'Convert to PDF' to create the document.",
      "Download the PDF. Each image becomes one page in the document.",
    ],
    faqs: [
      {
        question: "What is the difference between converting PNG to PDF versus JPG to PDF?",
        answer: "The conversion process is the same, but the source image format differs. PNG images support transparency and use lossless compression, making them ideal for screenshots, designs, and graphics with sharp edges. JPG images are better suited to photographs. Both formats are fully supported for PDF conversion and the resulting PDF will preserve the quality of whichever format you use.",
      },
      {
        question: "The transparent background in my PNG appears white in the PDF.",
        answer: "PDF pages have a white background by default. When a PNG with a transparent background is embedded into a PDF, the transparency is replaced with white. This is the expected behaviour. If you need the background to be a different colour, edit the PNG to add the desired background colour before converting.",
      },
      {
        question: "Will the PNG image quality be preserved in the PDF?",
        answer: "Yes. PNG images are embedded into the PDF without any additional compression or quality reduction. The visual output in the PDF will be identical to the original PNG files. Since PNG itself is lossless, there is no quality degradation at any stage of the process.",
      },
      {
        question: "Can I convert screenshots to PDF using this tool?",
        answer: "Yes. Screenshots saved as PNG are one of the most common use cases for this tool. Whether you are documenting software, compiling a bug report, or creating a visual reference document, you can convert any number of screenshots into a single, well-organised PDF.",
      },
      {
        question: "The PDF file size is much larger than the original PNG files.",
        answer: "PNG files use lossless compression internally, but when embedded in a PDF the overall file size can increase. After conversion, run the PDF through the Dockitt Compress PDF tool to reduce the size. This is especially effective for screenshots and diagrams that have large areas of solid colour.",
      },
      {
        question: "Can I reorder the pages in the PDF after converting?",
        answer: "Yes. If the page order is not quite right after conversion, use the Dockitt Reorder PDF Pages tool to drag the pages into the correct sequence. You can also control the order before converting by selecting your PNG files in the order you want them to appear.",
      },
    ],
  },
];

export function getConvertVariant(slug: string) {
  return convertVariants.find((v) => v.slug === slug);
}

export function getAllConvertVariants() {
  return convertVariants;
}

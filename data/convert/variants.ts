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
  // ── new tools ──────────────────────────────────────────────────────────────
  {
    slug: "pdf-to-webp",
    name: "PDF to WebP",
    title: "Convert PDF to WebP Online",
    description: "Convert PDF pages to WebP images online without any sign-up.",
    longDescription: "WebP is the modern image format developed by Google that delivers superior compression compared to both JPG and PNG while maintaining excellent visual quality. Converting PDF pages to WebP is particularly useful when you need to display PDF content on a modern website — WebP files are significantly smaller than equivalent JPG or PNG files, which means faster page loads and lower bandwidth usage. WebP supports both lossy and lossless compression as well as transparency, making it a versatile replacement for both JPG and PNG in web contexts. Dockitt converts each page of your PDF to a separate WebP file directly in your browser using PDF.js, with no server upload required.",
    primaryKeyword: "pdf to webp",
    inputFormat: "pdf",
    outputFormat: "webp",
    inputLabel: "Choose PDF",
    accept: ".pdf",
    howTo: [
      "Click 'Choose PDF' and select the PDF file you want to convert to WebP images.",
      "Click 'Convert to WebP' and wait while each page is rendered and encoded.",
      "Download the WebP images. Each page of the PDF becomes one individual WebP file.",
    ],
    faqs: [
      {
        question: "Why convert PDF to WebP instead of JPG or PNG?",
        answer: "WebP typically produces files that are 25–35% smaller than equivalent JPG images and 26% smaller than PNG, at comparable visual quality. If you are embedding PDF pages on a website or web application, WebP is the most efficient format for modern browsers. All major browsers have supported WebP since 2020. For desktop or print use cases, JPG or PNG are still more universally compatible.",
      },
      {
        question: "Will each page of the PDF become a separate WebP file?",
        answer: "Yes. Each page is converted to its own individual WebP image. A 10-page PDF will produce 10 separate WebP files, each named after the page number. If you need all pages in a single image, you would need to combine them after downloading.",
      },
      {
        question: "Does WebP support transparency?",
        answer: "Yes. WebP supports alpha channel transparency for both lossy and lossless compression modes. If your PDF pages have transparent backgrounds, the WebP output will preserve that transparency correctly, unlike JPG which cannot represent transparency at all.",
      },
      {
        question: "The WebP images look blurry. What can I do?",
        answer: "The sharpness of the output depends on the resolution of the source PDF. The tool renders pages at 2× scale to produce clear output for standard use cases. If the original PDF was created from low-resolution raster images, the WebP output will also appear soft. For vector-based PDFs such as those exported from Illustrator or InDesign, the output will be crisp regardless of output size.",
      },
      {
        question: "Can I open WebP files on my computer?",
        answer: "Modern operating systems support WebP natively. On Windows 10 and later, the Photos app can open WebP files. On macOS 11 Big Sur and later, Preview supports WebP. On Linux, most image viewers have added WebP support in recent years. If you need compatibility with older software, consider converting to PNG instead.",
      },
      {
        question: "Is the conversion done in my browser or on a server?",
        answer: "The PDF to WebP conversion is handled entirely in your browser using PDF.js. Your file is not uploaded to any server. It stays on your device throughout the entire process, which also makes it faster for most files since there is no upload or download round trip.",
      },
    ],
  },
  {
    slug: "pdf-to-bmp",
    name: "PDF to BMP",
    title: "Convert PDF to BMP Online",
    description: "Convert PDF pages to BMP images online without any sign-up.",
    longDescription: "BMP (Bitmap) is one of the oldest and most straightforward image formats, storing pixel colour data with no lossy compression. This makes BMP files very large compared to modern formats, but also means the image data is completely uncompressed and lossless. BMP is still used in some legacy systems, industrial applications, and document management workflows that expect uncompressed bitmap files. If you need to extract PDF pages as BMP images for compatibility with such a system, Dockitt converts each page directly in your browser using PDF.js and a built-in BMP encoder, with no server upload required.",
    primaryKeyword: "pdf to bmp",
    inputFormat: "pdf",
    outputFormat: "bmp",
    inputLabel: "Choose PDF",
    accept: ".pdf",
    howTo: [
      "Click 'Choose PDF' and select the PDF file you want to convert to BMP images.",
      "Click 'Convert to BMP' and wait while each page is rendered and encoded.",
      "Download the BMP images. Each page of the PDF becomes one individual BMP file.",
    ],
    faqs: [
      {
        question: "When would I need a PDF page as a BMP file?",
        answer: "BMP is most commonly required in legacy software environments, industrial imaging systems, and some document management systems that only accept uncompressed bitmap files. If a specific piece of software or a workflow requires BMP input and you only have a PDF, this tool is the quickest way to extract the pages in the right format.",
      },
      {
        question: "Why are the BMP files so large?",
        answer: "BMP stores every pixel as raw colour data with no compression. A single A4 page rendered at standard screen resolution can easily be 5–20 megabytes as a BMP file, compared to a fraction of that as a JPG or PNG. This is inherent to the format. If file size is a concern and the receiving software can accept PNG, use the PDF to PNG converter instead, which provides the same lossless quality at dramatically smaller file sizes.",
      },
      {
        question: "Will each page become a separate BMP file?",
        answer: "Yes. Each page of the PDF is exported as an individual BMP image. A 5-page PDF produces 5 separate BMP files. There is no option to combine pages into a single BMP file, as BMP is a single-image format.",
      },
      {
        question: "Does BMP support transparency?",
        answer: "Standard 24-bit BMP does not support transparency. Transparent areas in the source PDF will be rendered with a white background in the BMP output. If you need transparency preserved, use PDF to PNG instead, which fully supports alpha channel transparency.",
      },
      {
        question: "The conversion seems slower than other formats. Why?",
        answer: "BMP files for high-resolution pages can be very large — sometimes tens of megabytes per page. The browser needs to encode and process this data in memory. For PDFs with many pages, this can take a noticeable amount of time compared to JPG or WebP. If speed is a priority, consider using JPG or WebP, which are much smaller and faster to encode.",
      },
      {
        question: "Is the conversion done in my browser or on a server?",
        answer: "The PDF to BMP conversion is handled entirely in your browser using PDF.js for rendering and a built-in BMP encoder for producing the output files. Your PDF is not uploaded to any server at any point. The entire process happens locally on your device.",
      },
    ],
  },
  {
    slug: "pdf-to-txt",
    name: "PDF to Text",
    title: "Extract Text from PDF Online",
    description: "Extract all text from a PDF file and save it as a plain text file.",
    longDescription: "Extracting text from a PDF is useful when you need to copy the content into a word processor, run it through a spell checker, search it with command-line tools, feed it into a script or language model, or simply store the words without the PDF structure. Not all PDFs are created equal — PDFs created from text-based documents such as Word files or InDesign layouts contain embedded text that can be extracted cleanly. Scanned documents saved as PDFs, however, are essentially images and do not contain extractable text; an OCR tool would be needed for those. Dockitt extracts text from searchable PDFs directly in your browser using PDF.js.",
    primaryKeyword: "pdf to text",
    inputFormat: "pdf",
    outputFormat: "txt",
    inputLabel: "Choose PDF",
    accept: ".pdf",
    howTo: [
      "Click 'Choose PDF' and select the PDF file you want to extract text from.",
      "Click 'Extract Text' and wait while each page is processed.",
      "Download the TXT file. All text from all pages is combined into a single file with page markers.",
    ],
    faqs: [
      {
        question: "Why does the extracted text look garbled or out of order?",
        answer: "PDF does not store text in reading order — it stores text fragments positioned on a page, and the reading order depends on how the PDF was created. PDFs with complex multi-column layouts, tables, or non-standard text flow may produce text that is out of order when extracted. This is a fundamental limitation of the PDF format, not a bug in the tool. For structured data like tables, a dedicated PDF table extractor would be more appropriate.",
      },
      {
        question: "The output file is empty. What went wrong?",
        answer: "If the output is empty, the PDF is likely a scanned document — one that was created by scanning paper pages and saving them as a PDF image. Scanned PDFs contain images of text, not actual text characters. To extract text from a scanned PDF, you need an OCR (Optical Character Recognition) tool that can read the image and convert it to text. This tool only works with PDFs that contain embedded text.",
      },
      {
        question: "How are the pages separated in the output file?",
        answer: "Each page is preceded by a separator line in the format '--- Page N ---', where N is the page number. This makes it easy to find content from a specific page in the output file. You can search for '--- Page' in any text editor to jump between page boundaries.",
      },
      {
        question: "Does the tool preserve formatting like bold, italics, or headings?",
        answer: "No. Plain text does not support rich formatting. All text is extracted as flat, unformatted characters. Bold, italics, font size differences, and any other visual formatting are not preserved in the TXT output. If you need to preserve formatting, consider using a Word or PDF editor tool instead.",
      },
      {
        question: "Can I extract text from a password-protected PDF?",
        answer: "No. The PDF must be unlocked before text can be extracted. If your PDF is password-protected, use the Dockitt Unlock PDF tool to remove the password first, then run the unlocked file through the text extraction tool.",
      },
      {
        question: "Is my document content kept private?",
        answer: "Yes. Text extraction is done entirely in your browser using PDF.js. The content of your PDF is never sent to any server. The file is processed locally on your device, and the extracted text file is created and downloaded directly in your browser without any data leaving your machine.",
      },
    ],
  },
  {
    slug: "text-to-pdf",
    name: "Text to PDF",
    title: "Convert Text File to PDF Online",
    description: "Convert a plain text file (.txt) to a PDF document in your browser.",
    longDescription: "Sometimes you have a plain text file that needs to be shared as a PDF — a script, a readme, a log file, a code snippet, or any other plain text content. Converting it to PDF gives it a fixed layout, makes it easy to print, and ensures anyone can open it without needing a specific text editor. Dockitt converts your TXT file to a clean PDF document directly in your browser using pdf-lib, applying standard margins and line wrapping so the content is readable on screen and in print, with no server upload required.",
    primaryKeyword: "text to pdf",
    inputFormat: "txt",
    outputFormat: "pdf",
    inputLabel: "Choose TXT",
    accept: ".txt",
    howTo: [
      "Click 'Choose TXT' and select the plain text file you want to convert to PDF.",
      "Click 'Convert to PDF' and wait while the document is laid out.",
      "Download the PDF file. All text from your file is formatted into pages with standard margins.",
    ],
    faqs: [
      {
        question: "What font and layout is used in the output PDF?",
        answer: "The output PDF uses Helvetica at 12pt with 40pt margins on all sides and a standard letter page size (8.5 × 11 inches). Lines longer than 80 characters are automatically wrapped to fit within the margins. A new page is added whenever the content exceeds the available space. These values are fixed and optimised for readability.",
      },
      {
        question: "Will the formatting from my text file be preserved?",
        answer: "The basic structure of the text is preserved — line breaks, blank lines, and paragraph spacing appear in the PDF as they do in the text file. However, rich formatting such as bold or italic text, headings, bullet points, or tabular alignment is not possible in a plain text file, so none of those elements are present in the output.",
      },
      {
        question: "What happens to very long lines?",
        answer: "Lines that exceed 80 characters are automatically wrapped at the nearest word boundary. If a single word is longer than 80 characters, it is broken at the 80-character limit to prevent overflow. The wrapped text is still readable and flows naturally down the page.",
      },
      {
        question: "Can I convert a code file or log file to PDF?",
        answer: "Yes, as long as the file has a .txt extension or you rename it to .txt before uploading. Code and log files are plain text and will be converted correctly. Keep in mind that the fixed-width character grid that terminal and code editor fonts provide is not replicated — Helvetica is a proportional font, so code indentation may look slightly different than in a dedicated code viewer.",
      },
      {
        question: "The output PDF has many pages. Is that expected?",
        answer: "Yes. A standard letter page holds approximately 44 lines of text at 12pt with the default margins. If your text file is long, the PDF will have many pages. If you want a more compact output, consider editing your text file to remove blank lines or use a narrower margin setting — though those are not configurable in this tool.",
      },
      {
        question: "Is the conversion done in my browser or on a server?",
        answer: "The conversion is done entirely in your browser using pdf-lib. Your text file is never uploaded to any server. The PDF is generated locally on your device and downloaded directly from the browser.",
      },
    ],
  },
  {
    slug: "webp-to-pdf",
    name: "WebP to PDF",
    title: "Convert WebP to PDF Online",
    description: "Convert one or more WebP images to a PDF document in your browser.",
    longDescription: "WebP images are widely used on the web, and there are many situations where you might need to compile one or more WebP files into a PDF — for sharing with someone who expects a document rather than individual image files, for archiving, for printing, or for including web screenshots in a report. Dockitt converts WebP images to PDF directly in your browser using a canvas intermediate and pdf-lib, without uploading anything to a server. Each image becomes one page in the output PDF, with the page sized to match the image dimensions exactly.",
    primaryKeyword: "webp to pdf",
    inputFormat: "webp",
    outputFormat: "pdf",
    inputLabel: "Choose WebP",
    accept: ".webp",
    howTo: [
      "Click 'Choose WebP' and select one or more WebP image files you want to combine into a PDF.",
      "Check that the files are in the correct order before converting.",
      "Click 'Convert to PDF' and download the resulting PDF file.",
    ],
    faqs: [
      {
        question: "Can I combine multiple WebP images into one PDF?",
        answer: "Yes. You can select multiple WebP files in one go. Each image becomes one page in the output PDF, in the order you selected them. A 5-image selection produces a 5-page PDF.",
      },
      {
        question: "Will the image quality be preserved in the PDF?",
        answer: "The conversion uses a PNG intermediate step, which is lossless. The visual content of your WebP images is preserved without any additional quality loss. The original WebP compression may have introduced some quality reduction when the WebP was first created, but the PDF conversion itself does not degrade the image further.",
      },
      {
        question: "The transparent background in my WebP appears white in the PDF.",
        answer: "PDF pages have a white background by default. When a WebP image with transparency is embedded into a PDF, the transparent areas are replaced with white. This is expected behaviour. If you need a different background colour, edit the WebP to add the desired background before converting.",
      },
      {
        question: "What page size is used in the output PDF?",
        answer: "Each page in the output PDF is sized to match the exact pixel dimensions of the corresponding WebP image. A 1920×1080 WebP image produces a 1920×1080 point PDF page. The image fills the entire page without any borders or margins.",
      },
      {
        question: "Can I control the order of images in the PDF?",
        answer: "The page order in the PDF matches the order in which you selected the files. On most operating systems, holding Ctrl on Windows or Cmd on Mac while clicking lets you select files in a specific order. If the order is wrong after conversion, use the Dockitt Reorder PDF Pages tool to rearrange the pages.",
      },
      {
        question: "Is the conversion done in my browser or on a server?",
        answer: "The conversion is done entirely in your browser using a canvas element and pdf-lib. Your WebP files are never uploaded to any server. The PDF is generated locally on your device and downloaded directly from your browser.",
      },
    ],
  },
  {
    slug: "bmp-to-pdf",
    name: "BMP to PDF",
    title: "Convert BMP to PDF Online",
    description: "Convert one or more BMP images to a PDF document in your browser.",
    longDescription: "BMP files show up most often in legacy environments — older Windows applications, industrial software, and document scanning systems that produce uncompressed bitmap output. If you need to compile BMP images into a PDF for sharing or archiving, Dockitt handles the conversion directly in your browser using a canvas intermediate and pdf-lib. Each BMP image becomes one page in the resulting PDF, sized to match the image dimensions. No server upload is needed and no account is required.",
    primaryKeyword: "bmp to pdf",
    inputFormat: "bmp",
    outputFormat: "pdf",
    inputLabel: "Choose BMP",
    accept: ".bmp",
    howTo: [
      "Click 'Choose BMP' and select one or more BMP image files you want to combine into a PDF.",
      "Check that the files are in the correct order before converting.",
      "Click 'Convert to PDF' and download the resulting PDF file.",
    ],
    faqs: [
      {
        question: "Can I combine multiple BMP images into one PDF?",
        answer: "Yes. You can select multiple BMP files in one go. Each image becomes one page in the output PDF, in the order you selected them.",
      },
      {
        question: "Will the image quality be preserved in the PDF?",
        answer: "BMP is an uncompressed format, so the source images already contain all pixel data at full quality. The conversion uses a PNG intermediate step, which is also lossless. The visual content of your BMP images is preserved without any quality degradation in the PDF.",
      },
      {
        question: "Why does the conversion take longer than other image formats?",
        answer: "BMP files are uncompressed and can be very large — a single A4 page BMP can be 10–20 megabytes. Loading and processing large uncompressed files in the browser takes more time and memory than working with compressed formats like JPG or PNG. This is inherent to the format rather than a tool limitation.",
      },
      {
        question: "What page size is used in the output PDF?",
        answer: "Each page in the output PDF is sized to match the exact pixel dimensions of the corresponding BMP image. The image fills the entire page without any borders or margins.",
      },
      {
        question: "What if my BMP files were created by a scanner?",
        answer: "Scanned BMP files work exactly the same as any other BMP. The content is treated as raster image data regardless of its origin. If the scanned images are clear and high-resolution, the resulting PDF pages will be readable. If the scans are low-resolution or contain distortion, that will be reflected in the PDF.",
      },
      {
        question: "Is the conversion done in my browser or on a server?",
        answer: "The conversion is done entirely in your browser using a canvas element and pdf-lib. Your BMP files are never uploaded to any server. The PDF is generated locally and downloaded directly from your browser.",
      },
    ],
  },
  {
    slug: "gif-to-pdf",
    name: "GIF to PDF",
    title: "Convert GIF to PDF Online",
    description: "Convert one or more GIF images to a PDF document in your browser.",
    longDescription: "GIF images are common in web content, email, and messaging contexts. If you need to convert GIF files to PDF — for inclusion in a report, for archiving screenshots, or for sharing with someone who expects a document — Dockitt handles the conversion directly in your browser using a canvas intermediate and pdf-lib. For animated GIFs, only the first frame is used, as PDF is a static format. Each GIF becomes one page in the resulting PDF, sized to the image dimensions. No server upload is needed.",
    primaryKeyword: "gif to pdf",
    inputFormat: "gif",
    outputFormat: "pdf",
    inputLabel: "Choose GIF",
    accept: ".gif",
    howTo: [
      "Click 'Choose GIF' and select one or more GIF image files you want to combine into a PDF.",
      "Check that the files are in the correct order before converting.",
      "Click 'Convert to PDF' and download the resulting PDF file.",
    ],
    faqs: [
      {
        question: "What happens to animated GIFs?",
        answer: "Only the first frame of an animated GIF is used in the PDF conversion. PDF is a static document format and cannot represent animations. The first frame is typically the introductory or representative frame of the animation, which is usually the most relevant for document use. If you need a specific frame, you would need to extract that frame from the GIF first using an image editor.",
      },
      {
        question: "Can I combine multiple GIF images into one PDF?",
        answer: "Yes. You can select multiple GIF files in one go. Each image (or first frame, for animated GIFs) becomes one page in the output PDF, in the order you selected them.",
      },
      {
        question: "Will the colours look different in the PDF?",
        answer: "GIF supports a maximum of 256 colours per frame due to its palette-based design. This colour limitation is present in the source image and will be reflected in the PDF output. For images with limited colour palettes such as simple graphics, logos, or diagrams, GIF is adequate. For photographic images, the 256-colour limitation can cause visible banding or dithering.",
      },
      {
        question: "The transparent areas in my GIF appear white in the PDF.",
        answer: "GIF supports binary (on/off) transparency, but PDF pages have a white background by default. Transparent pixels in the GIF will be replaced with white in the PDF. This is the expected behaviour when converting any image format with transparency to PDF.",
      },
      {
        question: "What page size is used in the output PDF?",
        answer: "Each page in the output PDF is sized to match the pixel dimensions of the corresponding GIF image. The image fills the entire page without borders or margins.",
      },
      {
        question: "Is the conversion done in my browser or on a server?",
        answer: "The conversion is done entirely in your browser using a canvas element and pdf-lib. Your GIF files are never uploaded to any server. The PDF is generated locally on your device and downloaded directly from your browser.",
      },
    ],
  },
  {
    slug: "pdf-to-markdown",
    name: "PDF to Markdown",
    title: "Convert PDF to Markdown Online",
    description: "Extract text from a PDF and export it as a Markdown .md file, with each page as a separate section.",
    longDescription: "Markdown has become the standard format for documentation, README files, static site generators, and note-taking apps. If you have content locked inside a PDF and need to get it into a Markdown workflow — whether for a wiki, a docs site, or a writing tool like Obsidian or Notion — Dockitt extracts the text page by page and formats it as clean Markdown. Each page becomes a section with a heading, making the structure easy to navigate and edit. The extraction runs entirely in your browser using PDF.js, without uploading anything to a server.",
    primaryKeyword: "pdf to markdown",
    inputFormat: "pdf",
    outputFormat: "md",
    inputLabel: "Choose PDF",
    accept: ".pdf",
    howTo: [
      "Click 'Choose PDF' and select the PDF file you want to convert to Markdown.",
      "Click 'Extract to Markdown' and wait while each page is processed.",
      "Download the .md file. Each page of the PDF becomes a ## Page N section in the output.",
    ],
    faqs: [
      {
        question: "What Markdown structure does the output use?",
        answer: "Each page of the PDF becomes a section introduced by a ## Page N heading. The extracted text from that page follows immediately below. This makes the output easy to read, edit, and split in any Markdown editor.",
      },
      {
        question: "Will formatting like bold, italics, or tables be preserved?",
        answer: "No. PDF.js extracts the raw text content of each page. Visual formatting such as bold, italics, tables, bullet lists, and column layouts is not preserved. The output is plain text structured with Markdown section headings. For complex formatted documents, manual cleanup of the Markdown will be needed after extraction.",
      },
      {
        question: "What if the PDF contains only scanned images?",
        answer: "If the PDF is a scan — meaning it contains images of text rather than actual text data — the extraction will produce empty or near-empty sections. PDF.js can only extract text that is encoded as text in the PDF. For scanned PDFs, use the OCR PDF tool on Dockitt first to create a searchable PDF, then convert that to Markdown.",
      },
      {
        question: "Can I use the output directly in a static site generator?",
        answer: "Yes, with some editing. The output is valid Markdown that any static site generator (Hugo, Jekyll, Astro, etc.) can process. You will likely need to add front matter (title, date, tags) at the top of the file and clean up any text that was oddly extracted due to the original PDF layout. Multi-column layouts in particular may produce lines in an unexpected order.",
      },
      {
        question: "Can I convert a password-protected PDF to Markdown?",
        answer: "No. The PDF must be unlocked before it can be processed. Use the Dockitt Unlock PDF tool to remove the password first, then convert the unlocked file to Markdown.",
      },
      {
        question: "Is the conversion done in my browser or on a server?",
        answer: "The conversion runs entirely in your browser using PDF.js. Your file is never uploaded to any server. It stays on your device throughout the entire process.",
      },
    ],
  },
  {
    slug: "markdown-to-pdf",
    name: "Markdown to PDF",
    title: "Convert Markdown to PDF Online",
    description: "Convert a Markdown .md file to a PDF document directly in your browser — no upload required.",
    longDescription: "Markdown is great for writing but not always practical for sharing. Clients, colleagues, and reviewers often expect a PDF. Dockitt converts your .md files to PDF entirely in your browser — no server upload, no account, no Pandoc installation needed. The tool reads your Markdown, extracts the text content, and lays it out in a clean letter-size PDF using Helvetica at 12pt with proper margins and automatic page breaks. This is a straightforward text-focused conversion designed for documentation, notes, and reports.",
    primaryKeyword: "markdown to pdf",
    inputFormat: "md",
    outputFormat: "pdf",
    inputLabel: "Choose Markdown",
    accept: ".md",
    howTo: [
      "Click 'Choose Markdown' and select the .md file you want to convert to PDF.",
      "Click 'Convert to PDF' and wait while the document is laid out.",
      "Download the PDF file.",
    ],
    faqs: [
      {
        question: "Are Markdown formatting elements like bold and headings preserved?",
        answer: "The conversion extracts the text content of your Markdown file. Markdown syntax characters such as # for headings and ** for bold are stripped from the output so the PDF contains clean readable text. This is a plain text conversion rather than a fully styled rendering. For rich styled output, consider tools like Pandoc combined with a LaTeX template.",
      },
      {
        question: "What page size and font does the PDF use?",
        answer: "The PDF uses US Letter size (612 × 792 pt), Helvetica at 12pt, 40pt margins on all sides, and an 18pt line height. Lines longer than approximately 80 characters are wrapped at word boundaries. New pages are added automatically when a page runs out of space.",
      },
      {
        question: "My Markdown file has code blocks and tables. Will they look right?",
        answer: "Code blocks and tables in Markdown are rendered as text content only. The table syntax characters (pipes, dashes) will appear as-is in the output rather than forming a visual table. For structured technical documentation, a dedicated Markdown-to-PDF renderer like Pandoc or a browser print stylesheet will give better results.",
      },
      {
        question: "Can I convert very large Markdown files?",
        answer: "Yes, the tool supports Markdown files up to 100MB. Very large files with thousands of lines will produce multi-page PDFs. The conversion happens in your browser so processing time depends on your device, but most documents complete in under a second.",
      },
      {
        question: "What encoding does the tool expect?",
        answer: "The tool expects UTF-8 encoded Markdown files, which is the standard encoding used by virtually all text editors and Markdown applications. Files saved in other encodings may display special characters incorrectly in the output.",
      },
      {
        question: "Is the conversion done in my browser or on a server?",
        answer: "The conversion runs entirely in your browser using pdf-lib. Your Markdown file is never uploaded to any server. The PDF is generated locally on your device and downloaded directly from your browser.",
      },
    ],
  },
  {
    slug: "csv-to-pdf",
    name: "CSV to PDF",
    title: "Convert CSV to PDF Online",
    description: "Convert a CSV spreadsheet to a formatted PDF table document directly in your browser.",
    longDescription: "CSV files are ubiquitous in data export workflows — almost every database, spreadsheet application, and analytics tool can produce one. But CSV files are not always easy to share or present. Converting a CSV to PDF gives you a document that opens the same way on any device, preserves column structure, and is suitable for printing or attaching to an email. Dockitt parses your CSV using PapaParse and renders it as a clean table in a PDF using pdf-lib, all within your browser without any upload.",
    primaryKeyword: "csv to pdf",
    inputFormat: "csv",
    outputFormat: "pdf",
    inputLabel: "Choose CSV",
    accept: ".csv",
    howTo: [
      "Click 'Choose CSV' and select the CSV file you want to convert to PDF.",
      "Click 'Convert to PDF' and wait while the table is laid out across pages.",
      "Download the PDF file.",
    ],
    faqs: [
      {
        question: "Does the first row become the table header?",
        answer: "Yes. The tool treats the first row of your CSV as column headers. These are rendered in bold at a slightly larger font size (13pt) to distinguish them from the data rows below. If your CSV does not have a header row, the first row of data will be treated as headers.",
      },
      {
        question: "What happens if there are many columns?",
        answer: "The tool displays up to six columns in the PDF. If your CSV has more than six columns, only the first six are included. Column widths are divided equally across the available page width. Cell values that are too long for their column are truncated with an ellipsis.",
      },
      {
        question: "Can the PDF span multiple pages?",
        answer: "Yes. When the data rows exceed the available space on a page, the layout automatically continues on the next page. Column headers are rendered on the first page only.",
      },
      {
        question: "What if my CSV uses a delimiter other than a comma?",
        answer: "The tool uses PapaParse's auto-detection, which recognises common delimiters including commas, semicolons, and tabs. Most CSV files exported from spreadsheet applications and databases will be parsed correctly without any configuration.",
      },
      {
        question: "Will special characters like accented letters display correctly?",
        answer: "The PDF uses Helvetica, which is a built-in PDF font. Helvetica covers the standard Latin character set including common accented characters used in Western European languages. Characters outside this range (Cyrillic, CJK, Arabic, etc.) may not display correctly. For documents with non-Latin scripts, a custom embedded font would be required.",
      },
      {
        question: "Is the conversion done in my browser or on a server?",
        answer: "The conversion runs entirely in your browser using PapaParse for parsing and pdf-lib for PDF generation. Your CSV file is never uploaded to any server. The PDF is generated locally on your device.",
      },
    ],
  },
  {
    slug: "json-to-pdf",
    name: "JSON to PDF",
    title: "Convert JSON to PDF Online",
    description: "Convert a JSON file to a formatted PDF document using monospace layout, directly in your browser.",
    longDescription: "JSON is the lingua franca of data exchange but it is not always easy to share or review without a code editor. Converting a JSON file to PDF gives you a document you can attach to a ticket, include in a report, or print for a review meeting. Dockitt reads your .json file, formats it with two-space indentation using JSON.stringify, and lays it out in a PDF using a monospace Courier font at 10pt. This preserves the structure and readability of the JSON while making it universally accessible as a document.",
    primaryKeyword: "json to pdf",
    inputFormat: "json",
    outputFormat: "pdf",
    inputLabel: "Choose JSON",
    accept: ".json",
    howTo: [
      "Click 'Choose JSON' and select the JSON file you want to convert to PDF.",
      "Click 'Convert to PDF' and wait while the file is formatted and laid out.",
      "Download the PDF file.",
    ],
    faqs: [
      {
        question: "What font and layout does the PDF use?",
        answer: "The PDF uses Courier (monospace) at 10pt with 40pt margins on all sides on US Letter pages (612 × 792 pt). Lines are wrapped at approximately 90 characters to fit within the page width. New pages are added automatically when content exceeds the available space.",
      },
      {
        question: "Is the JSON reformatted or does it preserve the original formatting?",
        answer: "The JSON is re-parsed and reformatted with JSON.stringify using two-space indentation. This means the output always uses consistent formatting regardless of how the original file was formatted — whether it was minified, used tabs, or had inconsistent spacing. The data structure is preserved exactly.",
      },
      {
        question: "What if the JSON file is invalid?",
        answer: "If the file cannot be parsed as valid JSON, the tool will show an error message. Make sure the file is valid JSON before attempting the conversion. You can validate JSON using any online JSON validator or by running JSON.parse in a browser console.",
      },
      {
        question: "Can I convert large JSON files?",
        answer: "Yes, the tool supports JSON files up to 100MB. Very large files with deeply nested structures or large arrays will produce multi-page PDFs. The conversion happens in your browser, so processing time depends on the size and complexity of the file.",
      },
      {
        question: "Will Unicode characters in the JSON values display correctly?",
        answer: "The PDF uses Courier, which covers the standard Latin character set. ASCII characters and common Western European characters will display correctly. Unicode characters outside the Courier character set (emoji, CJK, Arabic, Cyrillic, etc.) will not render. If your JSON values contain non-Latin characters, the text content will be present but some characters may appear as missing glyphs.",
      },
      {
        question: "Is the conversion done in my browser or on a server?",
        answer: "The conversion runs entirely in your browser using pdf-lib. Your JSON file is never uploaded to any server. The PDF is generated locally on your device and downloaded directly from your browser.",
      },
    ],
  },
  {
    slug: "svg-to-pdf",
    name: "SVG to PDF",
    title: "Convert SVG to PDF Online",
    description: "Convert SVG vector graphics to a PDF document directly in your browser — no upload required.",
    longDescription: "SVG is a powerful vector format for icons, diagrams, charts, and illustrations, but it is not universally supported outside of web browsers and vector design tools. Converting SVG to PDF gives you a document format that opens correctly in any PDF viewer, can be printed at any size, and is suitable for embedding in reports or attaching to emails. Dockitt renders your SVG through the browser's built-in SVG engine, captures it on a canvas, and embeds the result as a high-quality image in a PDF sized to match your graphic.",
    primaryKeyword: "svg to pdf",
    inputFormat: "svg",
    outputFormat: "pdf",
    inputLabel: "Choose SVG",
    accept: ".svg",
    howTo: [
      "Click 'Choose SVG' and select the SVG file you want to convert to PDF.",
      "Click 'Convert to PDF' and wait while the graphic is rendered and embedded.",
      "Download the PDF file.",
    ],
    faqs: [
      {
        question: "Is the output a vector PDF or a raster image embedded in a PDF?",
        answer: "The output is a raster image (PNG) embedded in a PDF. The SVG is rendered by the browser's SVG engine at its natural dimensions, captured to a canvas, and then embedded as a PNG image in the PDF. True vector PDF output would require a different rendering pipeline. If the original SVG has high natural dimensions, the raster image will be sharp at print sizes.",
      },
      {
        question: "What page size does the output PDF use?",
        answer: "The PDF page is sized to match the natural pixel dimensions of the SVG as rendered by the browser. There are no margins. If the SVG does not specify explicit width and height attributes, the browser may render it at a default size (typically 300 × 150 pixels). In that case, adding explicit width and height attributes to the SVG before conversion will give better results.",
      },
      {
        question: "Will external fonts and images referenced in the SVG load?",
        answer: "External resources referenced in the SVG (such as Google Fonts, external images, or CSS from a CDN) will not load during the conversion because the SVG is rendered locally in the browser without network access to those origins. Use inline styles and embedded fonts (base64-encoded) in the SVG for best results. Resources that are inlined in the SVG will render correctly.",
      },
      {
        question: "Will CSS styles and filters inside the SVG be applied?",
        answer: "Yes. Inline styles and CSS embedded within the SVG file are applied by the browser's SVG renderer before the canvas capture. Standard SVG filters (blur, drop-shadow, etc.) and transforms will be reflected in the output. Complex filter chains may render slightly differently across browsers.",
      },
      {
        question: "My SVG has a transparent background. What happens?",
        answer: "The canvas is filled with a white background before the SVG is drawn. This means transparent areas in the SVG will appear white in the PDF output. PDF pages have an opaque white background by default, so this is the expected behaviour.",
      },
      {
        question: "Is the conversion done in my browser or on a server?",
        answer: "The conversion runs entirely in your browser. The SVG is rendered using the browser's built-in SVG engine, captured via the Canvas API, and embedded in a PDF using pdf-lib. Your file is never uploaded to any server.",
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

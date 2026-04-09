export const howToConvertJpgToPdf = {
  slug: "how-to-convert-jpg-to-pdf",
  title: "How to Convert JPG Images to PDF Online",
  description: "Learn how to convert one or more JPG images to a PDF file online. Combine photos into a single document, free and without any software.",
  intro: "There are many situations where you need to turn JPG images into a PDF document. You photographed a multi-page paper document with your phone and need to send it as a single file. You have product photos that need to be compiled into a catalogue. You scanned receipts or invoices as images and need to submit them as a PDF. You simply need to send multiple images to someone in a format that preserves their order and opens on every device without issues.",
  introList: [
    "Convert phone photos of a paper document into a single PDF to email or upload",
    "Combine multiple product images into a PDF catalogue",
    "Turn scanned receipt or invoice images into a PDF for expense reporting",
    "Create a PDF from a set of images to send as a single attachment",
    "Convert JPG screenshots into a PDF document for documentation purposes",
  ],
  introOutro: "Dockitt converts one or multiple JPG images to a PDF document directly in your browser with no server upload and no account required.",
  sections: [
    {
      title: "How to convert JPG images to PDF online - step by step",
      steps: [
        "Open the Dockitt JPG to PDF tool in your browser.",
        "Click 'Choose JPG' or drag and drop one or more JPG images into the upload area.",
        "If you selected multiple images, check that they are in the correct order. The order you select them is the order they will appear in the PDF.",
        "Click 'Convert to PDF' and wait a few seconds while the tool processes your images.",
        "Click 'Download' to save the PDF to your device.",
        "Open the downloaded file to confirm all images are present and in the correct order.",
      ],
    },
    {
      title: "How JPG to PDF conversion works",
      intro: "Understanding the conversion process helps set accurate expectations for the output.",
      items: [
        "Each image becomes one page: Every JPG you include becomes a single page in the PDF. A set of 5 images produces a 5-page PDF. The page dimensions match the image dimensions.",
        "Images are embedded without re-compression: The JPG images are embedded into the PDF file as-is. No additional compression is applied and no quality is lost during the conversion. The images in the PDF look identical to the originals.",
        "Page size follows image size: Each page in the PDF is sized to match the dimensions of the corresponding image. If your images have different sizes or orientations, the pages in the PDF will also vary.",
        "Processing happens in the browser: The conversion runs entirely in your browser using pdf-lib. Your images are not uploaded to any server. They stay on your device throughout the entire process.",
        "File size: The PDF file size will be similar to the combined size of the original JPG images plus a small amount of PDF overhead. High-resolution phone photos can produce large PDFs.",
      ],
    },
    {
      title: "Getting the page order right",
      intro: "The order of pages in the converted PDF follows the order in which you selected or added the images. Getting this right before converting avoids having to reorder pages afterwards.",
      items: [
        "Select files in order on desktop: On Windows, hold Ctrl while clicking files to select them in a specific order. On Mac, hold Cmd while clicking. The files are added to the upload list in the order you click them.",
        "Check the order before converting: After selecting your images, review the list to confirm the order is correct before clicking Convert.",
        "Name files with numbers: If you regularly convert the same set of images, naming them with a numeric prefix such as 01-page.jpg, 02-page.jpg makes it easy to select them in the right order every time.",
        "Fix order after converting: If the pages end up in the wrong order, use the Reorder PDF Pages tool to drag individual pages into the correct sequence without converting again.",
        "On mobile: On iPhone, when selecting multiple photos from the Photos app, the selection order determines the page order. Tap photos in the sequence you want them to appear.",
      ],
    },
    {
      title: "Managing file size after conversion",
      intro: "JPG images, particularly high-resolution photos from modern smartphones, can produce large PDF files. Here is how to manage the file size.",
      items: [
        "Why the PDF may be large: A photo taken on a modern smartphone camera can be 3 to 8 megabytes. A 10-page PDF created from 10 such photos will be 30 to 80 megabytes. This is too large for most email attachments.",
        "Compress after converting: Use the Dockitt Compress PDF tool after converting to reduce the file size. For photo-heavy PDFs, the compression can be significant.",
        "Resize images before converting: If the original images are very high resolution and you do not need maximum quality in the PDF, resizing the JPG images before converting produces a smaller PDF from the start.",
        "Email size limits: Most email providers have attachment limits of 10MB to 25MB. If your converted PDF exceeds this, compress it first or share it via a cloud storage link.",
      ],
    },
    {
      title: "Converting phone photos to PDF",
      intro: "Converting photos taken on a phone to PDF is one of the most common use cases for this tool. Here is what to know for each platform.",
      items: [
        "iPhone: Photos are saved as HEIC by default on newer iPhones. When you select them in a browser on the phone, iOS usually converts them to JPG automatically for web uploads. If you have trouble, go to Settings, Camera, Formats, and select Most Compatible to save photos as JPG going forward.",
        "Android: Photos are saved as JPG on most Android phones by default. Select photos from your gallery or file manager and they should upload and convert without any extra steps.",
        "WhatsApp and messaging apps: Photos shared through messaging apps are often compressed. If quality matters, use the original photo from your camera roll rather than a copy saved from a chat.",
        "Google Photos: You can download photos from Google Photos as JPG files and then convert them. Go to the photo, tap the three-dot menu, and select Download.",
        "Multiple pages from a physical document: If you are photographing a paper document, try to keep the camera parallel to the page and use good lighting. Crooked or shadowed photos produce less readable PDFs.",
      ],
    },
    {
      title: "Adding JPG images to an existing PDF",
      intro: "If you need to insert a JPG image into an existing PDF rather than creating a new one from scratch, the process takes two steps.",
      steps: [
        "Convert the JPG image to a single-page PDF using the JPG to PDF tool.",
        "Use the Merge PDF tool to combine the new single-page PDF with your existing document.",
        "If the image page needs to go in a specific position within the document, use the Reorder PDF Pages tool after merging to move it to the correct location.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "The images appear in the wrong order in the PDF.",
      solution: "The page order follows the order in which you selected the images. On most operating systems, hold Ctrl on Windows or Cmd on Mac while clicking files to select them in a specific order. If the order is wrong in the output, use the Dockitt Reorder PDF Pages tool to rearrange the pages after conversion.",
    },
    {
      problem: "The PDF file is very large.",
      solution: "High-resolution phone photos produce large PDFs. After converting, run the PDF through the Dockitt Compress PDF tool to reduce the file size significantly without any visible quality loss for standard viewing and printing.",
    },
    {
      problem: "The images look stretched or distorted in the PDF.",
      solution: "Each image is placed on a page sized to match the image dimensions. If the images have unusual aspect ratios or mixed orientations, the pages will reflect that. For a more uniform result, ensure all images are the same orientation and aspect ratio before converting.",
    },
    {
      problem: "I need to add a JPG image to an existing PDF, not create a new one.",
      solution: "Convert the JPG to a single-page PDF first using this tool, then use the Dockitt Merge PDF tool to combine it with your existing document at the correct position.",
    },
    {
      problem: "My phone saves photos as HEIC and the tool does not accept them.",
      solution: "On iPhone, go to Settings, Camera, Formats, and select Most Compatible to save future photos as JPG. For existing HEIC photos, you can use a free HEIC to JPG converter before uploading, or on a Mac you can open the HEIC file in Preview and export it as JPG.",
    },
  ],
  relatedTools: [
    { name: "Compress PDF", slug: "compress-pdf", description: "Reduce file size after converting images to PDF." },
    { name: "Merge PDF", slug: "merge-pdf", description: "Combine the converted PDF with an existing document." },
    { name: "Reorder PDF Pages", slug: "reorder-pdf-pages", description: "Fix page order after conversion." },
  ],
  relatedTool: "convert-pdf",
  relatedToolUrl: "/convert-pdf/jpg-to-pdf",
  relatedGuides: ["how-to-convert-png-to-pdf", "how-to-compress-pdf"],
  faqs: [
    {
      question: "How many JPG images can I convert to PDF at once?",
      answer: "You can select multiple images in one go. There is no hard limit on the number of images, though very large numbers of high-resolution photos may take longer to process in the browser.",
    },
    {
      question: "Can I mix JPG and JPEG files in the same conversion?",
      answer: "Yes. JPG and JPEG are the same format. JPEG is the full name and JPG is the three-letter file extension used on older systems. Both are accepted by the tool.",
    },
    {
      question: "Will the image quality be reduced when converting to PDF?",
      answer: "No. The JPG images are embedded into the PDF as-is without any additional compression or quality reduction. The images in the resulting PDF look identical to the original files.",
    },
    {
      question: "Can I convert photos taken on my phone to PDF?",
      answer: "Yes. Photos from iPhone and Android devices are typically saved as JPG or HEIC. JPG photos convert directly. If your phone saves photos as HEIC, go to camera settings and select the option to save in most compatible format to get JPG files.",
    },
    {
      question: "Does the conversion work on mobile devices?",
      answer: "Yes. The JPG to PDF tool runs entirely in the browser and works on both iPhone and Android. You can select photos from your camera roll, convert them, and download the PDF directly on your phone.",
    },
    {
      question: "Can I add page numbers to the converted PDF?",
      answer: "The conversion tool creates a clean PDF from your images without adding extra elements. Page number functionality is not currently available as a separate tool on Dockitt.",
    },
    {
      question: "What is the maximum file size for the images I can upload?",
      answer: "The tool processes files in the browser and the practical limit depends on your device's available memory. Very large batches of high-resolution images may be slow to process. If you experience issues, try converting in smaller batches.",
    },
  ],
  ctaText: "Ready to convert your JPG images to PDF? Use the free Dockitt tool below.",
  ctaLinks: [
    { name: "JPG to PDF", slug: "convert-pdf/jpg-to-pdf", description: "Convert JPG images to PDF online for free" },
  ],
}
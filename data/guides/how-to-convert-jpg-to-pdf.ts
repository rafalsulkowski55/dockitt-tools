export const howToConvertJpgToPdf = {
  slug: "how-to-convert-jpg-to-pdf",
  title: "How to Convert JPG Images to PDF Online",
  description: "Learn how to convert one or more JPG images to a PDF file online — combine photos into a single document, free and without any software.",
  intro: "There are plenty of situations where you have JPG images that need to become a PDF. You've photographed a multi-page paper document with your phone and need to send it as a single file. You have product photos that need to be compiled into a PDF catalogue. You've scanned receipts or invoices as images and need to submit them as a PDF. Or you simply need to send multiple images to someone in a format that preserves their order and is universally openable. Dockitt converts one or multiple JPG images to a PDF document directly in your browser — no server upload needed, no account required.",
  steps: [
    "Go to the Dockitt JPG to PDF tool.",
    "Click 'Choose JPG' and select one or more JPG or JPEG images from your device.",
    "If you've selected multiple images, check that they're in the correct order.",
    "Click 'Convert to PDF' to generate the document.",
    "Download the PDF file — each image becomes one page in the document.",
  ],
  commonProblems: [
    {
      problem: "The images appear in the wrong order in the PDF.",
      solution: "The order of pages in the PDF follows the order in which you selected or uploaded the images. On most operating systems, holding Ctrl (Windows) or Cmd (Mac) while clicking files lets you select them in a specific order. If the order is wrong in the output, use the Dockitt Reorder PDF Pages tool to rearrange the pages after conversion.",
    },
    {
      problem: "The PDF file is very large.",
      solution: "JPG images embedded in a PDF can produce large files, especially if the original photos are high resolution from a modern smartphone camera. After converting, run the PDF through the Dockitt Compress PDF tool to reduce the file size significantly, often without any visible quality loss for standard viewing and printing.",
    },
    {
      problem: "The images look stretched or distorted in the PDF.",
      solution: "Each image is placed on a page sized to match the image dimensions. If the images have unusual aspect ratios or mixed orientations, the pages will reflect that. For a more uniform result, ensure all images are the same orientation and aspect ratio before converting.",
    },
    {
      problem: "I need to add a JPG image to an existing PDF, not create a new one.",
      solution: "Convert the JPG to a single-page PDF first using this tool, then use the Dockitt Merge PDF tool to combine it with your existing document at the correct position.",
    },
  ],
  relatedTool: "convert-pdf",
  relatedToolUrl: "/convert-pdf/jpg-to-pdf",
  relatedGuides: ["how-to-convert-png-to-pdf", "how-to-compress-pdf"],
  faqs: [
    {
      question: "How many JPG images can I convert to PDF at once?",
      answer: "You can select multiple images in one go. There is no hard limit on the number of images, though very large numbers of high-resolution photos may take longer to process.",
    },
    {
      question: "Can I mix JPG and JPEG files in the same conversion?",
      answer: "Yes. JPG and JPEG are the same format — JPEG is simply the full name of the format, while JPG is the three-letter file extension used on older systems. Both are accepted by the tool.",
    },
    {
      question: "Will the image quality be reduced when converting to PDF?",
      answer: "No. The JPG images are embedded into the PDF as-is, without any additional compression or quality reduction. The images in the resulting PDF will look identical to the original files.",
    },
    {
      question: "Can I convert photos taken on my phone to PDF?",
      answer: "Yes. Photos from iPhone and Android devices are typically saved as JPG or HEIC. JPG photos can be converted directly. If your phone saves photos as HEIC, you'll need to convert them to JPG first — most phones have an option to save in JPG format in camera settings.",
    },
    {
      question: "Can I add page numbers or a title to the converted PDF?",
      answer: "The conversion tool creates a clean PDF from your images without adding any additional elements. To add page numbers after conversion, use the Dockitt Add Page Numbers tool.",
    },
  ],
}
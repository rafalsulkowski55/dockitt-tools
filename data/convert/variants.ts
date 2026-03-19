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
    description: "Convert PDF pages to JPG images online — free and without any sign-up.",
    longDescription: "Converting a PDF to JPG images is useful when you need to share individual pages as images, embed PDF content into a presentation, or use PDF pages on a website. Each page of your PDF will be converted into a separate JPG image.",
    primaryKeyword: "pdf to jpg",
    inputFormat: "pdf",
    outputFormat: "jpg",
    inputLabel: "Choose PDF",
    accept: ".pdf",
    howTo: [
      "Upload your PDF file.",
      "Click Convert to JPG.",
      "Download your JPG images.",
    ],
    faqs: [
      { question: "How do I convert a PDF to JPG?", answer: "Upload your PDF, click Convert, and download the JPG images." },
      { question: "Will each page become a separate image?", answer: "Yes, each page of your PDF will be converted to a separate JPG file." },
      { question: "Is this PDF to JPG converter free?", answer: "Yes, you can convert PDF to JPG online for free with no limits." },
    ],
  },
  {
    slug: "pdf-to-png",
    name: "PDF to PNG",
    title: "Convert PDF to PNG Online",
    description: "Convert PDF pages to PNG images online — free and without any sign-up.",
    longDescription: "Converting a PDF to PNG is useful when you need high-quality images with transparent backgrounds. PNG format is ideal for presentations, websites, and documents where image quality matters.",
    primaryKeyword: "pdf to png",
    inputFormat: "pdf",
    outputFormat: "png",
    inputLabel: "Choose PDF",
    accept: ".pdf",
    howTo: [
      "Upload your PDF file.",
      "Click Convert to PNG.",
      "Download your PNG images.",
    ],
    faqs: [
      { question: "How do I convert a PDF to PNG?", answer: "Upload your PDF, click Convert, and download the PNG images." },
      { question: "What is the difference between JPG and PNG?", answer: "PNG supports transparency and is better for graphics and text. JPG is better for photos and produces smaller file sizes." },
      { question: "Is this PDF to PNG converter free?", answer: "Yes, you can convert PDF to PNG online for free with no limits." },
    ],
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    title: "Convert PDF to Word Online",
    description: "Convert PDF files to editable Word documents online — free and without any sign-up.",
    longDescription: "Converting a PDF to a Word document lets you edit the content, reformat text, and make changes that are not possible in a PDF. The result is a .docx file that can be opened in Microsoft Word or Google Docs.",
    primaryKeyword: "pdf to word",
    inputFormat: "pdf",
    outputFormat: "docx",
    inputLabel: "Choose PDF",
    accept: ".pdf",
    howTo: [
      "Upload your PDF file.",
      "Click Convert to Word.",
      "Download your Word document.",
    ],
    faqs: [
      { question: "How do I convert a PDF to Word?", answer: "Upload your PDF, click Convert, and download the .docx file." },
      { question: "Will the formatting be preserved?", answer: "We do our best to preserve formatting, but complex layouts may not convert perfectly." },
      { question: "Is this PDF to Word converter free?", answer: "Yes, you can convert PDF to Word online for free with no limits." },
    ],
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    title: "Convert JPG to PDF Online",
    description: "Convert JPG images to PDF files online — free and without any sign-up.",
    longDescription: "Converting JPG images to PDF is useful when you need to combine photos into a single document or send images in a more professional format. You can upload one or more JPG images and they will be combined into a single PDF.",
    primaryKeyword: "jpg to pdf",
    inputFormat: "jpg",
    outputFormat: "pdf",
    inputLabel: "Choose JPG",
    accept: ".jpg,.jpeg",
    howTo: [
      "Upload one or more JPG images.",
      "Click Convert to PDF.",
      "Download your PDF file.",
    ],
    faqs: [
      { question: "How do I convert JPG to PDF?", answer: "Upload your JPG images, click Convert, and download the PDF." },
      { question: "Can I convert multiple images at once?", answer: "Yes, you can upload multiple JPG images and they will be combined into a single PDF." },
      { question: "Is this JPG to PDF converter free?", answer: "Yes, you can convert JPG to PDF online for free with no limits." },
    ],
  },
  {
    slug: "png-to-pdf",
    name: "PNG to PDF",
    title: "Convert PNG to PDF Online",
    description: "Convert PNG images to PDF files online — free and without any sign-up.",
    longDescription: "Converting PNG images to PDF is useful when you need to share graphics, screenshots, or designs in a more universal format. You can upload one or more PNG images and they will be combined into a single PDF.",
    primaryKeyword: "png to pdf",
    inputFormat: "png",
    outputFormat: "pdf",
    inputLabel: "Choose PNG",
    accept: ".png",
    howTo: [
      "Upload one or more PNG images.",
      "Click Convert to PDF.",
      "Download your PDF file.",
    ],
    faqs: [
      { question: "How do I convert PNG to PDF?", answer: "Upload your PNG images, click Convert, and download the PDF." },
      { question: "Can I convert multiple PNG images at once?", answer: "Yes, you can upload multiple PNG images and they will be combined into a single PDF." },
      { question: "Is this PNG to PDF converter free?", answer: "Yes, you can convert PNG to PDF online for free with no limits." },
    ],
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    title: "Convert Word to PDF Online",
    description: "Convert Word documents to PDF files online — free and without any sign-up.",
    longDescription: "Converting a Word document to PDF ensures your formatting stays intact when sharing with others. PDF files look the same on every device and cannot be accidentally edited.",
    primaryKeyword: "word to pdf",
    inputFormat: "docx",
    outputFormat: "pdf",
    inputLabel: "Choose Word file",
    accept: ".doc,.docx",
    howTo: [
      "Upload your Word document (.docx).",
      "Click Convert to PDF.",
      "Download your PDF file.",
    ],
    faqs: [
      { question: "How do I convert Word to PDF?", answer: "Upload your .docx file, click Convert, and download the PDF." },
      { question: "Will the formatting be preserved?", answer: "Yes, converting to PDF preserves your formatting exactly as it appears in Word." },
      { question: "Is this Word to PDF converter free?", answer: "Yes, you can convert Word to PDF online for free with no limits." },
    ],
  },
];

export function getConvertVariant(slug: string) {
  return convertVariants.find((v) => v.slug === slug);
}

export function getAllConvertVariants() {
  return convertVariants;
}
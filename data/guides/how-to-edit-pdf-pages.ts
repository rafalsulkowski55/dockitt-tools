export const howToEditPdfPages = {
  slug: 'how-to-edit-pdf-pages',

  title: 'How to Edit PDF Pages (Rotate, Delete, Reorder & More)',

  description:
    'Learn how to edit PDF pages online — rotate, delete, reorder, extract and crop pages easily without installing any software.',

  intro:
    'Editing PDF pages can be frustrating — especially when pages are upside down, in the wrong order, or contain unwanted content.',

  introList: [
    'Rotate PDF pages',
    'Delete unwanted pages',
    'Reorder pages',
    'Extract specific pages',
    'Crop margins and whitespace',
  ],

  introOutro: 'All directly in your browser — no software required.',

  toolLinks: [
    { name: 'Rotate PDF', slug: 'rotate-pdf' },
    { name: 'Delete Pages', slug: 'delete-pdf-pages' },
    { name: 'Reorder Pages', slug: 'reorder-pdf-pages' },
  ],

  sections: [
    {
      title: 'When do you need to edit PDF pages?',
      intro: 'You may need to edit a PDF if:',
      items: [
        'Pages are upside down after scanning',
        'The document contains extra or blank pages',
        'Pages are in the wrong order',
        'You only need specific pages from a large file',
        'Margins or whitespace need trimming',
      ],
      outro: 'These are the most common real-world PDF problems.',
    },
    {
      title: 'How to rotate PDF pages',
      intro: 'If your PDF pages are sideways or upside down:',
      steps: [
        'Upload your PDF file',
        'Select the pages to rotate',
        'Choose rotation direction (90°, 180°)',
        'Download the corrected file',
      ],
      outro: 'This is common for scanned documents.',
    },
    {
      title: 'How to delete pages from a PDF',
      intro: 'To remove unwanted pages:',
      steps: [
        'Upload your PDF',
        'Select pages you want to remove',
        'Apply changes',
        'Download the cleaned file',
      ],
      outro: 'Useful when PDFs contain blank or duplicate pages.',
    },
    {
      title: 'How to reorder PDF pages',
      intro: 'If pages are in the wrong order:',
      steps: [
        'Upload your PDF',
        'Drag and rearrange pages',
        'Apply changes',
        'Download the updated file',
      ],
      outro: 'Especially useful for merged documents.',
    },
    {
      title: 'How to extract pages from a PDF',
      intro: 'To get only specific pages:',
      steps: [
        'Upload your PDF',
        'Select pages you want to keep',
        'Export as a new file',
      ],
      outro: 'Ideal for large documents or reports.',
    },
    {
      title: 'How to crop PDF pages (remove margins)',
      intro: 'To remove whitespace or borders:',
      steps: [
        'Upload your PDF',
        'Adjust crop area',
        'Apply changes',
        'Download the trimmed file',
      ],
      outro: 'Useful for printing or presentations.',
    },
  ],

  commonProblems: [
    {
      problem: 'Pages rotate but don\'t save correctly.',
      solution: 'Make sure you download the updated file — changes are not saved automatically.',
    },
    {
      problem: 'PDF layout breaks after editing.',
      solution: 'Some PDFs contain complex formatting that may shift slightly after editing.',
    },
    {
      problem: 'File is too large to edit.',
      solution: 'Try compressing the PDF first before editing.',
    },
  ],

  relatedTools: [
    { name: 'Compress PDF', slug: 'compress-pdf', description: 'Reduce file size before editing' },
    { name: 'Merge PDF', slug: 'merge-pdf', description: 'Combine files before organizing pages' },
    { name: 'Split PDF', slug: 'split-pdf', description: 'Separate pages into multiple files' },
  ],

  faqs: [
    {
      question: 'Can I edit PDF pages without software?',
      answer: 'Yes — you can edit PDF pages directly in your browser using online tools.',
    },
    {
      question: 'Does editing a PDF reduce quality?',
      answer: 'No — basic operations like rotate or reorder do not affect quality.',
    },
    {
      question: 'Can I edit scanned PDFs?',
      answer: 'Yes, but for text changes you may need OCR.',
    },
    {
      question: 'Is it safe to upload PDF files?',
      answer: 'Files are processed securely and not stored after processing.',
    },
  ],

  relatedTool: 'rotate-pdf',
  ctaText: 'Edit your PDF pages in seconds — no installation required.',

  ctaLinks: [
    { name: 'Rotate PDF', slug: 'rotate-pdf', description: 'Fix sideways or upside down pages' },
    { name: 'Delete Pages', slug: 'delete-pdf-pages', description: 'Remove unwanted or blank pages' },
    { name: 'Reorder Pages', slug: 'reorder-pdf-pages', description: 'Rearrange pages into correct order' },
    { name: 'Extract Pages', slug: 'extract-pdf-pages', description: 'Get only the pages you need' },
    { name: 'Crop PDF', slug: 'crop-pdf', description: 'Remove margins and whitespace' },
  ],
}
export const repairPdfTool = {
  slug: "repair-pdf",
  name: "Repair PDF",
  title: "Repair PDF Online",
  description: "Fix corrupted or damaged PDF files online — recover documents that won't open or display errors .",
  longDescription: `Few things are more frustrating than a PDF that simply refuses to open. You might see an error like the file is damaged and cannot be repaired, or the document opens but displays garbled text, missing images, or blank pages. PDF corruption can happen for a number of reasons including an interrupted download, a failed email attachment transfer, a storage device error, or a software crash mid-save. Dockitt's Repair PDF tool uses Ghostscript to rebuild the internal structure of damaged PDF files, recovering as much of the content as possible. It works best on mildly damaged files. Severely corrupted files where large portions of data are physically missing may not be fully recoverable, but the tool will always attempt to produce the best possible output from whatever data is readable.`,
  shortDescription: "Repair corrupted PDF files online .",
  category: "utility",
  type: "process",
  primaryKeyword: "repair pdf",
  secondaryKeywords: [
    "repair pdf online",
    "fix corrupted pdf",
    "repair pdf free",
    "recover pdf",
    "fix damaged pdf",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["compress-pdf", "unlock-pdf", "ocr-pdf", "merge-pdf"],
  howTo: [
    "Click 'Choose PDF' and select the damaged or corrupted file you want to repair.",
    "Click 'Repair PDF' and wait while Ghostscript rebuilds the internal structure of the file.",
    "Download the repaired PDF and open it in your PDF viewer to verify the content has been recovered.",
    "If the file still does not open correctly, the damage may be too severe to recover from the available data.",
  ],
  faqs: [
    {
      question: "What types of PDF corruption can this tool fix?",
      answer: "The tool is most effective on PDFs with structural issues such as damaged cross-reference tables, incomplete object streams, or minor data corruption from interrupted transfers. Ghostscript parses the file and rewrites it with a clean internal structure. It cannot recover content that has been physically overwritten or lost from the file data entirely, but it handles the most common types of corruption that prevent a PDF from opening.",
    },
    {
      question: "Why does my PDF open in some viewers but not others?",
      answer: "Different PDF viewers have different levels of tolerance for structural errors in the file. Adobe Acrobat Reader and browser-based viewers like Firefox are generally more forgiving than Preview on Mac or some mobile PDF apps. If your file opens in one viewer but not another, the Repair tool can rebuild it into a cleaner file that opens consistently across all viewers.",
    },
    {
      question: "The repaired PDF still shows blank or missing pages.",
      answer: "If specific pages appear blank after repair, it means the data for those pages was too damaged for Ghostscript to reconstruct. The repair process recovers what it can. If a page's content data was overwritten or missing at the byte level, there is no way to recover it from the file alone. In this situation, check whether you have an earlier version of the file saved elsewhere, or whether the sender can resend the original document.",
    },
    {
      question: "Can I repair a password-protected PDF?",
      answer: "No. The repair process requires reading and rewriting the file structure, which is blocked by encryption. You would need to unlock the PDF first using the Dockitt Unlock PDF tool, then repair the unlocked version. You will need to know the current password to remove the protection.",
    },
    {
      question: "How can I prevent PDF corruption in the future?",
      answer: "The most common causes of PDF corruption are interrupted downloads and unstable storage media. Always verify that a downloaded PDF opens correctly before deleting the source. For important documents, keep backups in at least two locations, such as a local drive and a cloud service. Avoid saving PDFs directly to USB drives that are removed without safely ejecting first, as this is a common cause of file corruption.",
    },
    {
      question: "The file uploads but the repair tool returns an error.",
      answer: "Some files are so severely corrupted that even reading them for repair fails. This is most common with files that were truncated mid-transfer, where the file exists on disk but is essentially incomplete. In this case the only solution is to obtain the original file again from the source. If the file came from a website, try downloading it again. If it was sent by email, ask the sender to resend it.",
    },
  ],
};
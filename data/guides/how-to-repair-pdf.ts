export const howToRepairPdf = {
  slug: "how-to-repair-pdf",
  title: "How to Repair a Corrupted PDF File Online",
  description: "Learn how to fix a damaged or corrupted PDF file online — recover documents that won't open or display errors.",
  intro: "Few things are more frustrating than a PDF that simply refuses to open. You might see an error like 'file is damaged and cannot be repaired', or the document opens but displays garbled text, missing images, or blank pages. PDF corruption can happen for a number of reasons — an interrupted download, a failed email attachment transfer, a storage device error, or a software crash mid-save. Dockitt's Repair PDF tool uses Ghostscript to rebuild the internal structure of damaged PDF files, recovering as much of the content as possible. It won't work miracles on severely corrupted files, but for mildly damaged PDFs it's often enough to get your document back.",
  steps: [
    "Go to the Dockitt Repair PDF tool.",
    "Click 'Choose PDF' and upload the damaged or corrupted file.",
    "Click 'Repair PDF' and wait while Ghostscript rebuilds the file structure.",
    "Download the repaired PDF and try opening it in your PDF viewer.",
  ],
  commonProblems: [
    {
      problem: "The repaired PDF still won't open after downloading.",
      solution: "If the file is severely corrupted — for example, the file header is damaged or large portions of the data are missing — Ghostscript may not be able to recover it. Try opening the repaired file in a different PDF viewer such as Firefox's built-in reader or Adobe Acrobat Reader, as some viewers are more tolerant of structural issues than others.",
    },
    {
      problem: "The repaired PDF opens but some pages are blank or show garbled content.",
      solution: "This typically means that specific page data within the file was too corrupted to recover. Ghostscript rebuilds what it can — if certain pages were damaged at the data level, their content cannot be restored. Check whether you have a backup copy of the file, or whether the sender can resend the original.",
    },
    {
      problem: "The file uploads but the tool returns an error.",
      solution: "Some files are so severely corrupted that even reading them for repair fails. This is more common with files that were truncated mid-transfer — the file exists but is essentially incomplete. In this case, the only solution is to obtain the original file again from the source.",
    },
    {
      problem: "The PDF was fine yesterday but is corrupted today.",
      solution: "Sudden corruption without an obvious cause can point to a storage issue — a failing hard drive, a bad sector on a USB stick, or a cloud sync error. After recovering the file, copy it to a different storage location and check your original drive for errors. On Windows, run CHKDSK. On Mac, use Disk Utility to verify the drive.",
    },
  ],
  relatedTool: "repair-pdf",
  relatedGuides: ["how-to-compress-pdf", "how-to-unlock-pdf"],
  faqs: [
    {
      question: "What types of PDF corruption can this tool fix?",
      answer: "The tool is most effective on PDFs with structural issues — damaged cross-reference tables, incomplete object streams, or minor data corruption from interrupted transfers. It works by having Ghostscript parse the file and rewrite it with a clean internal structure. It cannot recover content that has been physically overwritten or lost from the file data.",
    },
    {
      question: "Why does my PDF open in some viewers but not others?",
      answer: "Different PDF viewers have different levels of tolerance for structural errors. Adobe Acrobat Reader and Firefox's built-in viewer are generally more forgiving than Preview on Mac or some mobile PDF apps. If your file opens in one viewer but not another, the Repair tool can rebuild it into a cleaner file that opens consistently across all viewers.",
    },
    {
      question: "Will repairing a PDF change its content?",
      answer: "The repair process rebuilds the file structure without intentionally altering content. However, in cases where content data was corrupted, Ghostscript may skip unreadable sections to produce a file that opens successfully. The result is the best possible reconstruction of what was there.",
    },
    {
      question: "Can I repair a password-protected PDF?",
      answer: "No. The repair process requires reading and rewriting the file structure, which is blocked by encryption. You would need to unlock the PDF first using the Dockitt Unlock PDF tool, then repair it.",
    },
    {
      question: "How can I prevent PDF corruption in the future?",
      answer: "The most common causes of PDF corruption are interrupted downloads and unstable storage. Always verify that a downloaded PDF opens correctly before deleting the source. For important documents, keep backups in at least two locations — a local drive and a cloud service. Avoid saving PDFs to USB drives that are removed without safely ejecting first.",
    },
  ],
}
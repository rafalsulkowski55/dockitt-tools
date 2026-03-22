export const unlockPdfTool = {
  slug: "unlock-pdf",
  name: "Unlock PDF",
  title: "Unlock PDF Online",
  description: "Remove password protection from a PDF file online — free and without any software.",
  longDescription: `Sometimes a PDF you own becomes an inconvenience rather than a protection. You enter the password every time you open it, you cannot merge it with other documents, and you cannot print it without going through an extra authentication step. Removing the password from a PDF you have legitimate access to is straightforward with Dockitt. Upload the file, enter the current password, and download an unlocked version that opens freely on any device. This tool does not bypass encryption. It removes protection after you authenticate with the correct password, just as any legitimate PDF editor would.`,
  shortDescription: "Remove password from PDF files online for free.",
  category: "security",
  type: "process",
  primaryKeyword: "unlock pdf",
  secondaryKeywords: [
    "unlock pdf online",
    "remove password from pdf",
    "unlock pdf free",
    "decrypt pdf",
    "remove pdf password",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["protect-pdf", "repair-pdf"],
  howTo: [
   "Click 'Choose PDF' and select the password-protected PDF file you want to unlock.",
   "Enter the current password for the document. The tool requires the correct password to remove protection.",
   "Click 'Unlock PDF' and wait while the encryption is removed.",
   "Download the unlocked PDF. It will open on any device without requiring a password.",
  ],
  faqs: [
    {
      question: "Do I need the password to unlock a PDF?",
      answer: "Yes. Dockitt's Unlock PDF tool removes protection from files you already have access to. It requires the correct password to proceed. This is by design. The tool is meant to eliminate the inconvenience of repeated password entry for files you own, not to bypass security on files you do not have permission to access.",
    },
    {
      question: "What types of PDF protection can this tool remove?",
      answer: "The tool removes both user passwords, which are required to open the file, and owner passwords, which restrict actions like printing, copying, and editing. Both types of protection are handled in a single operation using Ghostscript. After unlocking, the document can be opened, printed, edited, and processed without any restrictions.",
    },
    {
      question: "Is it legal to unlock a PDF?",
      answer: "Unlocking a PDF you own or have received with permission is completely legal. You are simply removing a restriction from a file you have the right to access. Bypassing protection on a document you do not have authorisation to access may violate copyright law or the terms under which the document was shared. Always make sure you have the right to access the content before removing protection.",
    },
    {
      question: "The tool says my password is incorrect but I am sure it is right.",
      answer: "PDF passwords are case-sensitive. Double-check for capital letters, spaces at the beginning or end, and special characters. If you are copying and pasting the password from another application, make sure no hidden characters or line breaks are being included. Try typing the password manually rather than pasting it.",
    },
    {
      question: "Will the unlocked PDF be identical to the original?",
      answer: "Yes. The content, formatting, fonts, images, and page layout are all preserved exactly as they were in the protected version. The only change is the removal of the encryption layer. The resulting file is a standard, unprotected PDF that any viewer can open without prompting for a password.",
    },
    {
      question: "Can I re-protect the PDF after unlocking it?",
      answer: "Yes. After downloading the unlocked file, you can use the Dockitt Protect PDF tool to set a new password whenever you need to. This is useful if you want to change the password on an existing protected document.",
    },
  ],
};
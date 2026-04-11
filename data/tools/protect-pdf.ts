export const protectPdfTool = {
  slug: "protect-pdf",
  name: "Protect PDF",
  title: "Password Protect PDF Online",
  description: "Add a password to your PDF file online — secure your documents with 128-bit encryption for free.",
  longDescription: `Adding a password to a PDF is one of the most effective ways to control who can open and read your document. Whether you are sharing a contract, a financial report, medical records, or any other sensitive file, password protection ensures that only people with the correct password can access the content. Dockitt uses 128-bit encryption via Ghostscript to secure your PDF, which is the standard used by professional PDF editors and is considered strong for most professional and personal use cases. The process takes a few seconds and requires no software or account.`,
  shortDescription: "Password protect PDF files online for free.",
  category: "security",
  type: "process",
  primaryKeyword: "protect pdf",
  secondaryKeywords: [
    "password protect pdf",
    "protect pdf online",
    "add password to pdf",
    "encrypt pdf",
    "secure pdf",
  ],
  inputOutput: {
    input: "pdf",
    output: "pdf",
  },
  relatedTools: ["unlock-pdf", "watermark-pdf", "sign-pdf", "compress-pdf"],
  howTo: [
   "Click 'Choose PDF' and select the file you want to password protect.",
   "Enter the password you want to set. Use at least 12 characters combining letters, numbers, and symbols for strong protection.",
   "Click 'Protect PDF' and wait while the file is encrypted with 128-bit security.",
   "Download the protected PDF. Share the password with recipients through a separate channel, not in the same email as the file.",
  ],
  faqs: [
    {
      question: "What level of encryption does Dockitt use to protect PDFs?",
      answer: "Dockitt uses 128-bit AES encryption via Ghostscript. This is the standard encryption level for PDF password protection and is considered strong for most professional and personal use cases. A well-chosen password of at least 12 characters combining letters, numbers, and symbols makes the file extremely difficult to access without the correct password.",
    },
    {
      question: "What should I do if I forget the password I set?",
      answer: "Unfortunately, if you forget the password on an encrypted PDF and no longer have the original unprotected file, recovery is extremely difficult. The 128-bit encryption used in modern PDFs is designed to be computationally infeasible to brute-force. If you have the original source file, the simplest solution is to re-export it as a new PDF and set a new password. Going forward, storing passwords in a dedicated password manager such as 1Password, Bitwarden, or Apple Keychain prevents this situation entirely.",
    },
    {
      question: "What is the difference between a user password and an owner password?",
      answer: "A PDF can have two separate layers of protection. A user password is required to open and view the document at all. An owner password controls what actions are allowed after the document is opened, such as printing, copying text, or editing. Dockitt's Protect PDF tool sets a user password. The Unlock PDF tool removes both types of protection when given the correct password.",
    },
    {
      question: "How should I share the password with the recipient?",
      answer: "Never send the password in the same message or email as the protected PDF. If someone intercepts the email, they would have both the file and the password. Send the PDF by email and the password through a different channel, such as SMS, a phone call, or a separate messaging app. This ensures that intercepting one channel does not compromise the document.",
    },
    {
      question: "Can I add both a watermark and a password to the same PDF?",
      answer: "Yes, but you need to do it in two separate steps. First, add the watermark using the Dockitt Watermark PDF tool and download the result. Then, upload the watermarked PDF to the Protect PDF tool and set a password. The final file will have both the embedded watermark and password protection.",
    },
    {
      question: "Is it safe to upload sensitive documents to add password protection?",
      answer: "Your file is sent over an encrypted connection to a secure server where Ghostscript applies the password protection. The file is deleted immediately after the protected version is returned to you. Dockitt does not store, read, or share your documents.",
    },
  ],
};
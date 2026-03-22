export const howToProtectPdf = {
  slug: "how-to-protect-pdf",
  title: "How to Password Protect a PDF Online",
  description: "Learn how to add a password to a PDF file online — secure your documents free and without any software.",
  intro: "Adding a password to a PDF is one of the most effective ways to control who can open and read your document. Whether you're sharing a contract, a financial report, or any sensitive file, password protection ensures that only people with the correct password can access the content. Dockitt uses 128-bit encryption to secure your PDF — the same standard used by professional PDF editors. The process takes just a few seconds and requires no software or account.",
  steps: [
    "Go to the Dockitt Protect PDF tool.",
    "Click 'Choose PDF' and upload the file you want to password protect.",
    "Enter the password you want to set for the document.",
    "Click 'Protect PDF' and wait for the encryption to complete.",
    "Download your password-protected PDF file.",
  ],
  commonProblems: [
    {
      problem: "I forgot the password I set on the PDF.",
      solution: "Unfortunately there is no way to recover a forgotten password from an encrypted PDF. Make sure to store your password in a safe place — a password manager is recommended. If you have the original unencrypted file, you can simply set a new password.",
    },
    {
      problem: "The recipient can't open the protected PDF.",
      solution: "Make sure you've shared the password with the recipient separately — never in the same email as the PDF itself. Also confirm they are using a PDF viewer that supports password-protected files, such as Adobe Acrobat Reader.",
    },
    {
      problem: "The file size increased significantly after protecting.",
      solution: "Encryption adds some overhead to the file, but the increase should be minimal. If the file is much larger than expected, try compressing it after protection using the Dockitt Compress PDF tool.",
    },
    {
      problem: "I need to remove the password from a PDF I protected.",
      solution: "Use the Dockitt Unlock PDF tool. You'll need to enter the correct password to remove the protection.",
    },
  ],
  relatedTool: "protect-pdf",
  relatedGuides: ["how-to-unlock-pdf", "how-to-compress-pdf"],
  faqs: [
    {
      question: "What level of encryption does Dockitt use?",
      answer: "Dockitt uses 128-bit encryption via Ghostscript, which is the standard for PDF password protection and provides strong security for most use cases.",
    },
    {
      question: "Can I set different passwords for opening and editing a PDF?",
      answer: "The current tool sets a single password required to open the document. Advanced permission controls such as separate editing passwords are not supported at this time.",
    },
    {
      question: "Will password protection prevent someone from printing or copying text?",
      answer: "The password set by this tool controls who can open the file. It does not restrict printing or copying once the document is open. For more granular permission controls, a dedicated PDF editor like Adobe Acrobat is recommended.",
    },
    {
      question: "Is it safe to upload sensitive documents to protect them online?",
      answer: "Dockitt sends the file to a secure server for processing and deletes it immediately after the protected PDF is returned to you. We do not store, read, or share your files.",
    },
    {
      question: "What is the maximum password length?",
      answer: "You can use any combination of letters, numbers, and symbols. There is no enforced maximum length, but we recommend using a strong password of at least 12 characters.",
    },
  ],
}
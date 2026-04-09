export const howToProtectPdf = {
  slug: "how-to-protect-pdf",
  title: "How to Password Protect a PDF Online",
  description: "Learn how to add a password to a PDF file online. Secure your documents free and without any software.",
  intro: "Adding a password to a PDF is one of the most effective ways to control who can access your document. Once a PDF is password protected, anyone who tries to open it will be prompted to enter the password before the content is visible. Without the correct password, the file is unreadable. This makes password protection the right choice for any document you need to share securely.",
  introList: [
    "Protect a contract or legal document before emailing it to a client",
    "Secure a financial report or invoice before sharing it externally",
    "Add a password to a PDF containing personal information such as a passport scan or tax document",
    "Protect confidential business documents before uploading them to a shared drive",
    "Secure a document before sending it to multiple recipients, sharing the password separately",
  ],
  introOutro: "Dockitt uses 128-bit encryption to protect your PDF, the same standard used by professional PDF editors. The process takes a few seconds and requires no software or account.",
  sections: [
    {
      title: "How to password protect a PDF online - step by step",
      steps: [
        "Open the Dockitt Protect PDF tool in your browser.",
        "Click 'Choose PDF' or drag and drop your file into the upload area.",
        "Enter the password you want to set for the document. Use a strong password of at least 12 characters combining letters, numbers, and symbols.",
        "Click 'Protect PDF' and wait a few seconds while the encryption is applied.",
        "Click 'Download' to save the password-protected PDF to your device.",
        "Test the protected file by opening it to confirm the password prompt appears and the correct password unlocks it.",
        "Share the password with the recipient through a different channel than the PDF itself.",
      ],
    },
    {
      title: "How PDF password protection works",
      intro: "Understanding how PDF encryption works helps you make better decisions about when and how to use it.",
      items: [
        "Two types of PDF passwords: PDF files can have two separate passwords. A user password, also called an open password, is required to open and view the document at all. An owner password, also called a permissions password, controls what actions are allowed after the document is opened, such as printing, copying text, or editing. Dockitt sets a user password, which means the file cannot be opened without the correct password.",
        "128-bit AES encryption: Dockitt uses 128-bit AES encryption via Ghostscript. This is a strong encryption standard that makes the file computationally infeasible to access without the correct password, assuming the password itself is strong.",
        "The password is not stored anywhere: The password is embedded as part of the encryption. There is no way to retrieve a forgotten password from an encrypted PDF. The only recovery options are to try the password, use the original unencrypted file and set a new password, or use a brute-force tool if the password is simple.",
        "Encryption adds minimal file size: Applying password protection increases the file size by a small amount due to encryption overhead. The increase is typically negligible.",
      ],
    },
    {
      title: "Choosing a strong password",
      intro: "The security of a password-protected PDF depends entirely on the strength of the password. A weak password can be guessed or brute-forced relatively quickly regardless of the encryption strength.",
      items: [
        "Length matters most: A longer password is exponentially harder to crack than a shorter one. Aim for at least 12 characters. A 16-character password is significantly more secure than an 8-character one.",
        "Use a mix of character types: Combine uppercase letters, lowercase letters, numbers, and symbols. A password like Tr4ffic!Light9 is much harder to crack than traffic123.",
        "Avoid dictionary words and obvious substitutions: Password cracking tools try dictionary words first, including common substitutions like replacing a with @ or i with 1. Avoid these patterns.",
        "Avoid personal information: Do not use names, dates of birth, phone numbers, or other information that someone who knows you could guess.",
        "Use a password manager: If you need to protect multiple documents, a password manager such as Bitwarden, 1Password, or LastPass generates and stores strong passwords for you. This also solves the problem of forgetting the password later.",
        "Use a passphrase for memorability: A random sequence of four or five unrelated words such as correct-horse-battery-staple is both strong and easier to remember than a random string of characters.",
      ],
    },
    {
      title: "Sharing password-protected PDFs securely",
      intro: "A password-protected PDF is only as secure as how you share the password. Sending both the PDF and the password in the same email defeats the purpose of the protection.",
      items: [
        "Use a different channel for the password: Send the PDF by email and the password by SMS, phone call, or a separate messaging app. This way, someone who intercepts the email still cannot open the document.",
        "Do not include the password in the email subject or body: Even a hint in the email reduces security. Keep the two communications completely separate.",
        "Tell the recipient to expect a separate password: Let the recipient know in the email that the password will arrive through a different channel. This avoids confusion and prevents them from assuming the document is defective.",
        "Consider the sensitivity of the document: For highly sensitive documents, consider using a more secure sharing method such as an encrypted file sharing service or a secure document portal rather than email.",
        "Set an expiry reminder: If the document is time-sensitive, tell the recipient when they should have finished with it and remind them to delete it afterwards.",
      ],
    },
    {
      title: "Limitations of PDF password protection",
      intro: "PDF password protection is effective for most use cases, but it is worth understanding its limitations before relying on it for highly sensitive situations.",
      items: [
        "It only controls who can open the file: Once someone has the password and opens the document, they can read, screenshot, photograph, or otherwise copy the content. Password protection does not prevent someone with the password from sharing the contents.",
        "Owner password restrictions can be bypassed: The owner password restrictions that control printing and copying are not strongly enforced by all PDF viewers. A determined user can bypass these restrictions with freely available tools. Only the user password that prevents opening the file provides strong protection.",
        "Weak passwords are vulnerable: A password-protected PDF with a weak password can be cracked relatively quickly using brute-force tools. The encryption is only as strong as the password.",
        "The file can still be forwarded: Once a recipient has the password and opens the document, nothing prevents them from forwarding both the PDF and the password to others. If you need to control document distribution strictly, a dedicated document rights management system provides stronger controls.",
      ],
    },
    {
      title: "Removing password protection",
      intro: "If you need to remove the password from a PDF you previously protected, use the Dockitt Unlock PDF tool. You will need to enter the correct password to unlock it.",
      items: [
        "You must know the password: There is no way to remove protection without the correct password. If you have forgotten the password and do not have the original unencrypted file, the document cannot be unlocked.",
        "Unlock before editing: If you want to edit a protected PDF, unlock it first, make your changes, and then re-protect it with a new password.",
        "Unlock before merging or splitting: Most PDF tools cannot process password-protected files. If you want to merge, split, compress, or otherwise process a protected PDF, unlock it first and re-protect the result if needed.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "I forgot the password I set on the PDF.",
      solution: "There is no way to recover a forgotten password from an encrypted PDF. If you have the original unencrypted file, you can set a new password. Going forward, store passwords in a password manager to avoid this situation.",
    },
    {
      problem: "The recipient cannot open the protected PDF.",
      solution: "Make sure you have shared the password with the recipient through a separate channel. Also confirm they are using a PDF viewer that supports password-protected files such as Adobe Acrobat Reader. Some older or limited PDF viewers do not handle encryption correctly.",
    },
    {
      problem: "I need to remove the password from a PDF I protected.",
      solution: "Use the Dockitt Unlock PDF tool. You will need to enter the correct password to remove the protection.",
    },
    {
      problem: "The protected PDF is much larger than the original.",
      solution: "Encryption adds minimal overhead and should not significantly increase the file size. If the file is much larger than expected, compress it using the Dockitt Compress PDF tool after protecting it.",
    },
    {
      problem: "I want to restrict printing and copying, not just opening.",
      solution: "The Protect PDF tool sets a user open password. Restricting actions like printing and copying requires setting owner password permissions, which typically requires a desktop PDF editor such as Adobe Acrobat.",
    },
  ],
  relatedTools: [
    { name: "Unlock PDF", slug: "unlock-pdf", description: "Remove password protection from a PDF." },
    { name: "Watermark PDF", slug: "watermark-pdf", description: "Add a visible watermark to a PDF before sharing." },
    { name: "Compress PDF", slug: "compress-pdf", description: "Reduce file size after protecting." },
  ],
  relatedTool: "protect-pdf",
  relatedGuides: ["how-to-unlock-pdf", "how-to-watermark-pdf"],
  faqs: [
    {
      question: "What level of encryption does Dockitt use?",
      answer: "Dockitt uses 128-bit AES encryption via Ghostscript, which is the standard for PDF password protection and provides strong security for most professional and personal use cases.",
    },
    {
      question: "Can I set different passwords for opening and editing a PDF?",
      answer: "The current tool sets a single user password required to open the document. Advanced permission controls such as separate owner passwords for restricting printing or copying are not supported at this time.",
    },
    {
      question: "Will password protection prevent someone from printing or copying text?",
      answer: "The password set by this tool controls who can open the file. It does not restrict printing or copying once the document is open. For granular permission controls, a dedicated PDF editor such as Adobe Acrobat is recommended.",
    },
    {
      question: "Is it safe to upload sensitive documents to protect them online?",
      answer: "Your file is sent to a secure server for processing and deleted immediately after the protected PDF is returned to you. Dockitt does not store, read, or share your files.",
    },
    {
      question: "What is the maximum password length?",
      answer: "You can use any combination of letters, numbers, and symbols. There is no enforced maximum length. We recommend a strong password of at least 12 characters.",
    },
    {
      question: "Can I password protect a PDF on my phone?",
      answer: "Yes. The Protect PDF tool works on mobile browsers on both iPhone and Android. Upload your file, set the password, and download the protected PDF directly from your phone.",
    },
    {
      question: "Does protecting a PDF change its appearance?",
      answer: "No. The content and appearance of the PDF are unchanged. The only difference is that a password prompt appears when someone tries to open the file.",
    },
    {
      question: "Can I add a password to a PDF that already has one?",
      answer: "You would need to unlock the existing password first using the Dockitt Unlock PDF tool, then apply a new password using the Protect PDF tool.",
    },
  ],
  ctaText: "Ready to secure your PDF with a password? Use the free Dockitt tool below.",
  ctaLinks: [
    { name: "Protect PDF", slug: "protect-pdf", description: "Add a password to your PDF online for free" },
  ],
}
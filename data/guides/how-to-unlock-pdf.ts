export const howToUnlockPdf = {
  slug: "how-to-unlock-pdf",
  title: "How to Unlock a Password Protected PDF Online",
  description: "Learn how to remove a password from a PDF file online. Unlock protected PDFs without any software.",
  intro: "A password-protected PDF is useful for security, but the password can become an obstacle when you need to work with the document. You might need to print it, merge it with another file, compress it, or simply open it without being prompted every time. Removing the password from a PDF you have legitimate access to is straightforward, but you do need to know the current password. This tool does not bypass security or crack encryption. It removes the password after you authenticate with the correct one.",
  introList: [
    "Remove a password from a PDF you need to merge, split, or compress",
    "Unlock a PDF before converting it to Word or another format",
    "Stop being prompted for a password every time you open a document you use regularly",
    "Unlock a PDF received from a client or colleague before editing or printing it",
    "Remove permission restrictions that prevent printing or copying text",
  ],
  introOutro: "Dockitt processes the unlocking on a secure server using Ghostscript and returns an unprotected copy of your file within seconds.",
  sections: [
    {
      title: "How to unlock a password protected PDF online - step by step",
      steps: [
        "Open the Dockitt Unlock PDF tool in your browser.",
        "Click 'Choose PDF' or drag and drop your password-protected file into the upload area.",
        "Enter the current password for the document in the password field.",
        "Click 'Unlock PDF' and wait a few seconds while the tool removes the encryption.",
        "Click 'Download' to save the unlocked PDF to your device.",
        "Open the downloaded file to confirm it opens without a password prompt.",
      ],
    },
    {
      title: "Understanding PDF password types",
      intro: "PDF files can have two different types of password protection. Understanding the difference explains some behaviour you might encounter.",
      items: [
        "User password (open password): This type of password is required to open and view the document at all. Without entering the correct password, the file appears as unreadable encrypted data. This is the most common type of PDF protection.",
        "Owner password (permissions password): This type of password does not prevent the document from being opened, but restricts what actions are allowed after opening. Common restrictions include preventing printing, preventing text copying, and preventing editing. You can open the document normally, but certain menu items or features will be greyed out or blocked.",
        "Documents can have both types: Some PDFs have both a user password to control who can open the file and an owner password to control what they can do with it. In practice, most everyday protected PDFs only use a user password.",
        "The Unlock PDF tool removes both: Dockitt's Unlock PDF tool removes both user passwords and owner permission restrictions in a single operation when given the correct password.",
      ],
    },
    {
      title: "What to do if the password is not working",
      intro: "The most common problem when unlocking a PDF is entering the correct password but getting an incorrect password error. Here are the most likely causes and how to fix them.",
      items: [
        "PDF passwords are case-sensitive: Check whether any letters should be capitalised. The password Secret123 is different from secret123 and SECRET123.",
        "Hidden spaces: If you are copying and pasting the password from an email or document, there may be a space at the beginning or end of the copied text. Delete any spaces before and after the password before submitting.",
        "Special characters: Some special characters look similar but are different characters. For example, a regular hyphen and an em dash look similar but are not the same character. If the password contains symbols, try typing them manually rather than pasting.",
        "Different keyboard layouts: If the password was set on a computer with a different keyboard layout, some symbol characters may be in different positions. This is particularly relevant for passwords containing characters like at sign, hash, and brackets.",
        "The password was changed: If someone else set the password and you received it a while ago, check whether it has been updated since then.",
        "The file has no password: Some PDFs appear to be protected but are actually not password-protected. They may have just been opened in a viewer that prompted for a password unnecessarily. Try opening the file in a different PDF viewer first.",
      ],
    },
    {
      title: "When you do not have the password",
      intro: "The Unlock PDF tool requires the correct password to remove protection. It does not crack or bypass encryption. If you do not have the password, here are your options.",
      items: [
        "Ask the sender: If someone sent you the PDF, contact them and ask for the password. This is the simplest solution.",
        "Check your own records: If you set the password yourself, check your password manager, old emails, or notes where you might have recorded it.",
        "Check for an unprotected version: You may have an earlier version of the file that was not password protected. Check your email attachments, cloud storage, or local file history.",
        "Accept that recovery may not be possible: If none of the above work, professional PDF password recovery tools exist but are only practical for short or simple passwords. Strong passwords with 128-bit AES encryption are computationally infeasible to crack with current hardware.",
      ],
      outro: "Dockitt's tool is designed for legitimate use cases where you have the password but want to remove the ongoing friction of entering it. It is not a password cracking tool.",
    },
    {
      title: "What happens to the PDF after unlocking",
      intro: "Unlocking a PDF removes the encryption layer. Here is what changes and what stays the same.",
      items: [
        "What changes: The password requirement is removed. Anyone who opens the unlocked file can view it without entering a password. Permission restrictions such as print blocking and copy blocking are also removed.",
        "What stays the same: All content including text, images, fonts, layout, and formatting is preserved exactly. The visual appearance of the document is unchanged.",
        "File size: The unlocked file may be very slightly smaller than the protected version because the encryption layer is removed, but the difference is negligible.",
        "The original file is unchanged: Unlocking creates a new file. The original protected PDF on your device is not modified.",
      ],
    },
    {
      title: "Re-protecting an unlocked PDF",
      intro: "After unlocking a PDF, you can re-protect it with a new password at any time using the Dockitt Protect PDF tool. This is useful if you want to change the password or share the document with a new password.",
      items: [
        "Change the password: Unlock the PDF, then immediately re-protect it with a new password using the Protect PDF tool.",
        "Share without a password: If you unlocked the PDF to share it with someone who should not need a password, simply send the unlocked file.",
        "Process first, then re-protect: If you need to merge, compress, or otherwise process the PDF, unlock it first, process it, and then re-protect the processed result if needed.",
      ],
    },
  ],
  commonProblems: [
    {
      problem: "I do not know the password. I just received this PDF.",
      solution: "This tool requires the correct password to remove protection. It does not crack or bypass encryption. If you received the PDF from someone else, ask them for the password. If you have forgotten your own password and do not have the original unprotected file, recovery is not possible with standard tools.",
    },
    {
      problem: "The tool says the password is incorrect but I am sure it is right.",
      solution: "PDF passwords are case-sensitive. Check for capital letters, spaces at the beginning or end, and special characters. If you are copying and pasting the password, make sure there are no hidden spaces or look-alike characters being included.",
    },
    {
      problem: "The PDF opens fine but I still cannot print or edit it.",
      solution: "Some PDFs have two separate passwords, one for opening and one for permissions like printing and editing. If the document opens but certain actions are blocked, it has permission restrictions. The Unlock PDF tool removes both types of protection when given the correct password.",
    },
    {
      problem: "After unlocking, the PDF looks different or some content is missing.",
      solution: "Unlocking does not alter the content of the file in any way. If content appears missing, the issue was likely present in the original file. Compare the unlocked file with the original protected version to confirm.",
    },
    {
      problem: "The file is too large to upload.",
      solution: "Files up to 10MB can be processed. If your PDF is larger, try compressing it first with a desktop PDF tool to bring it under the limit, then unlock it.",
    },
  ],
  relatedTools: [
    { name: "Protect PDF", slug: "protect-pdf", description: "Re-protect an unlocked PDF with a new password." },
    { name: "Compress PDF", slug: "compress-pdf", description: "Reduce file size after unlocking." },
    { name: "Merge PDF", slug: "merge-pdf", description: "Combine unlocked PDFs into one document." },
  ],
  relatedTool: "unlock-pdf",
  relatedGuides: ["how-to-protect-pdf", "how-to-repair-pdf"],
  faqs: [
    {
      question: "Do I need the password to unlock a PDF?",
      answer: "Yes. Dockitt's Unlock PDF tool removes protection from files you already have access to. It requires the correct password to proceed. The tool is designed to eliminate the inconvenience of repeated password entry, not to bypass security on files you do not have permission to access.",
    },
    {
      question: "What types of PDF protection can this tool remove?",
      answer: "The tool removes both user passwords required to open the file and owner passwords that restrict printing, copying, and editing. Both are handled in a single operation using Ghostscript.",
    },
    {
      question: "Is it legal to unlock a PDF?",
      answer: "Unlocking a PDF you own or have received with permission is completely legal. Bypassing protection on a document you do not have authorisation to access may violate copyright or terms of use. Always make sure you have the right to access the content before removing protection.",
    },
    {
      question: "Will the unlocked PDF be identical to the original?",
      answer: "Yes. The content, formatting, fonts, images, and page layout are all preserved. The only change is the removal of the encryption layer.",
    },
    {
      question: "Can I re-protect the PDF after unlocking it?",
      answer: "Yes. After downloading the unlocked file, use the Dockitt Protect PDF tool to set a new password whenever needed.",
    },
    {
      question: "Can I unlock a PDF on my phone?",
      answer: "Yes. The Unlock PDF tool works on mobile browsers on both iPhone and Android. Upload the file, enter the password, and download the unlocked PDF directly from your phone.",
    },
    {
      question: "Does unlocking a PDF change its file size?",
      answer: "The unlocked file may be very slightly smaller than the protected version because the encryption layer is removed. The difference is negligible in practice.",
    },
    {
      question: "What should I do if I need to process a protected PDF with another tool?",
      answer: "Unlock the PDF first using this tool, then process it with whichever tool you need. Most PDF tools including merge, split, compress, and convert cannot process password-protected files. After processing, re-protect the result with a new password if needed.",
    },
  ],
  ctaText: "Ready to remove the password from your PDF? Use the free Dockitt tool below.",
  ctaLinks: [
    { name: "Unlock PDF", slug: "unlock-pdf", description: "Remove password protection from a PDF online " },
  ],
}
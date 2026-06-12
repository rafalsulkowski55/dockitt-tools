export type FileTool = {
  slug: string;
  name: string;
  title: string;
  description: string;
  longDescription: string;
  primaryKeyword: string;
  category: "file-tools";
  howTo: string[];
  faqs: { question: string; answer: string }[];
};

export const fileTools: FileTool[] = [
  {
    slug: "create-zip",
    name: "Create ZIP",
    title: "Create ZIP File Online — Free ZIP Archiver",
    description: "Create a ZIP archive from multiple files online. Drag and drop files, then download as a single .zip. Free, browser-based.",
    longDescription: "Bundling multiple files into a single ZIP archive makes them easier to share via email, upload to cloud storage, or attach to a support ticket. This tool lets you drag and drop any number of files, preview the list, remove individual files, and then create a ZIP archive instantly in your browser using JSZip. The total size of all files combined must be under 100MB. Your files are never uploaded to any server — everything happens locally.",
    primaryKeyword: "create zip file online",
    category: "file-tools",
    howTo: [
      "Drag and drop files onto the upload area, or click 'Add Files' to open the file picker. You can add files multiple times to build up your list.",
      "Review the file list. Click the × next to any file to remove it before creating the archive.",
      "Click 'Create ZIP' and the archive downloads automatically to your computer.",
    ],
    faqs: [
      { question: "What file types can I add to the ZIP?", answer: "Any file type is supported — documents, images, videos, executables, archives, and so on. There is no restriction on the type of files you can include in the ZIP archive. The only restriction is the total combined size, which must be under 100MB." },
      { question: "What compression method is used?", answer: "The tool uses DEFLATE compression, which is the standard compression algorithm used in ZIP archives. Text-based files (documents, code, CSV, JSON, XML) compress significantly. Binary files that are already compressed (JPEG images, MP3 audio, existing ZIP archives) will not compress further and may appear at nearly their original size in the archive." },
      { question: "Can I add files from different folders?", answer: "Yes. Each file is added to the root level of the ZIP archive regardless of which folder it came from on your computer. If you add two files with the same name from different folders, the second file will overwrite the first in the archive. Rename files before adding them if you need to include files with identical names." },
      { question: "Is there a limit on the number of files I can include?", answer: "There is no limit on the number of files, only on the total combined size (100MB). You can add hundreds of small files. The browser processes the compression in memory, so very large numbers of files with a large combined size may use significant RAM." },
      { question: "What is the name of the downloaded ZIP file?", answer: "The downloaded file is named 'archive.zip'. There is currently no option to customise the output filename in this tool. If you need a specific name, rename the file after downloading it." },
      { question: "Are my files uploaded to a server?", answer: "No. All compression is done entirely in your browser using the JSZip library. Your files are never sent to any server. This makes the tool suitable for compressing confidential documents, source code, or any sensitive files." },
    ],
  },
  {
    slug: "extract-zip",
    name: "Extract ZIP",
    title: "Extract ZIP File Online — Free ZIP Extractor",
    description: "Extract files from a ZIP archive online. See contents before downloading. Free, browser-based, no upload.",
    longDescription: "Extracting files from a ZIP archive without installing software is useful on shared computers, mobile devices, or any system where you do not have administrator rights to install applications. This tool reads the ZIP file entirely in your browser, displays the list of files inside with their sizes, and lets you download each file individually. Your ZIP file is never uploaded to any server.",
    primaryKeyword: "extract zip file online",
    category: "file-tools",
    howTo: [
      "Drag and drop your .zip file onto the upload area, or click 'Choose ZIP File' to open the file picker.",
      "The list of files inside the archive is displayed with file names and sizes.",
      "Click 'Download All Files' to download each file individually, or click the download icon next to any specific file.",
    ],
    faqs: [
      { question: "What ZIP features are supported?", answer: "The tool supports standard ZIP archives using DEFLATE, STORE, and most other common compression methods. Password-protected (encrypted) ZIP files are not supported — the files will appear in the list but cannot be extracted without the password. Multi-part ZIP archives (split across multiple .zip files) are also not supported; only single-file ZIP archives are handled." },
      { question: "How does 'Download All Files' work?", answer: "Because browsers cannot save multiple files in a single operation without user interaction per file, the 'Download All Files' button sequentially triggers a download for each file in the archive. Your browser will start downloading each file one after another. Depending on your browser settings, you may be prompted to allow multiple downloads — click Allow when asked." },
      { question: "Are folder structures inside the ZIP preserved?", answer: "The file list shows the full path of each file as it appears inside the ZIP archive (e.g., folder/subfolder/file.txt). When downloaded, each file is saved with its full path name. The folder structure is not recreated on your filesystem — each file is saved individually to your Downloads folder with the path as part of the filename." },
      { question: "What is the maximum ZIP file size?", answer: "The maximum ZIP file size is 100MB. The entire file must be held in browser memory during extraction, so very large archives (hundreds of megabytes) may cause the browser tab to use significant RAM or become slow. For large archives, a desktop tool like 7-Zip (Windows/Linux) or The Unarchiver (Mac) is recommended." },
      { question: "Can I extract individual files instead of all at once?", answer: "Yes. Each file in the list has its own download button. Click the download button next to any file to extract and download only that specific file, without downloading the others." },
      { question: "Is my ZIP file uploaded to a server?", answer: "No. The ZIP file is read entirely in your browser using the JSZip library. It is never sent to any server. This makes the tool safe for extracting archives containing private documents, photos, or sensitive data." },
    ],
  },
  {
    slug: "file-hash",
    name: "File Hash Generator",
    title: "File Hash Generator Online — SHA-256, SHA-512, SHA-1",
    description: "Generate cryptographic hash of any file online. Supports SHA-1, SHA-256 and SHA-512. Free, browser-based.",
    longDescription: "A cryptographic hash (also called a checksum or digest) is a fixed-length fingerprint of a file's contents. If the file changes even by one byte, the hash changes completely. Hashes are used to verify file integrity — after downloading a file, you can compare its hash against the one published by the source to confirm the file has not been tampered with or corrupted. This tool uses the browser's built-in Web Crypto API to compute SHA-1, SHA-256, and SHA-512 hashes without uploading the file to any server.",
    primaryKeyword: "file hash generator online",
    category: "file-tools",
    howTo: [
      "Drag and drop any file onto the upload area, or click 'Choose File' to select it.",
      "Select the hash algorithm: SHA-1, SHA-256, or SHA-512.",
      "Click 'Generate Hash' and copy the hex string from the output.",
    ],
    faqs: [
      { question: "What is a file hash used for?", answer: "File hashes are used for integrity verification. Software distributors publish the SHA-256 hash of their installer files. After you download the file, you generate its hash and compare it to the published value. If they match, the file is intact and unmodified. If they differ, the file may have been corrupted during download or tampered with. Hashes are also used in digital forensics, version control systems, deduplication systems, and password storage (for text, not files)." },
      { question: "What is the difference between SHA-1, SHA-256, and SHA-512?", answer: "All three are members of the Secure Hash Algorithm family. SHA-1 produces a 160-bit (40 hex character) hash and is now considered cryptographically weak — it is vulnerable to collision attacks and should not be used for security-critical purposes. SHA-256 produces a 256-bit (64 hex character) hash and is the current standard for file integrity verification. SHA-512 produces a 512-bit (128 hex character) hash and is marginally more secure than SHA-256, though SHA-256 is sufficient for all practical purposes." },
      { question: "Why is MD5 not available?", answer: "MD5 is not available in the Web Crypto API because it is considered cryptographically broken and should not be used for security purposes. The Web Crypto API deliberately omits insecure algorithms. If you need an MD5 hash for compatibility with a legacy system, you would need a third-party JavaScript MD5 library, or use a command-line tool (md5sum on Linux/Mac, certutil on Windows)." },
      { question: "What is the maximum file size for hashing?", answer: "Files up to 500MB can be hashed. The file is read into memory as an ArrayBuffer before being passed to the Web Crypto API, so the available RAM in your browser determines the practical limit. On most modern devices, files up to 500MB are handled comfortably. Very large files (gigabytes) may require a command-line tool." },
      { question: "How long does hashing take?", answer: "The time depends on the file size and your device's processing speed. SHA-256 hashing is very fast — a 100MB file typically hashes in under a second on modern hardware. SHA-512 is slightly slower. The Web Crypto API uses native browser code that is highly optimised for this operation." },
      { question: "Is my file uploaded to a server?", answer: "No. The hashing runs entirely in your browser using the Web Crypto API (window.crypto.subtle). Your file is never sent to any server. The hash is computed locally from the file's bytes. This is important for hashing confidential files — the file content remains private to your device." },
    ],
  },
  {
    slug: "file-metadata",
    name: "File Metadata Viewer",
    title: "File Metadata Viewer Online — View File Properties",
    description: "View file metadata online — name, size, type, last modified date and extension. Free, instant, browser-based.",
    longDescription: "File metadata is the information about a file rather than its content — the name, size, type (MIME), and last modification date. This tool reads these properties from the File API without reading the file contents, making it instant even for very large files. It is useful for quickly checking file details, verifying that a file has the expected MIME type, checking the file size before uploading, or confirming the last modified timestamp.",
    primaryKeyword: "file metadata viewer online",
    category: "file-tools",
    howTo: [
      "Drag and drop any file onto the upload area, or click 'Choose File'.",
      "The file metadata is displayed instantly in a table — no button press required.",
      "View the file name, size (in bytes, KB, and MB), MIME type, extension, and last modified date.",
    ],
    faqs: [
      { question: "What metadata is displayed?", answer: "The tool displays: File Name (the full name including extension), File Size (in bytes, kilobytes, and megabytes), MIME Type (the file's type as reported by the browser, e.g. image/jpeg, application/pdf), File Extension (extracted from the filename), and Last Modified (the date and time the file was last changed on the filesystem, formatted in your local timezone)." },
      { question: "Does the tool read the file contents?", answer: "No. All displayed information comes from the File object's metadata properties (file.name, file.size, file.type, file.lastModified), which the browser provides without reading the file's actual content. This makes the operation instant regardless of file size, and means no file data is ever processed or transmitted." },
      { question: "Why does the MIME type show as empty or generic?", answer: "The MIME type is determined by the browser based on the file extension. If the file has no extension, or if the browser does not recognise the extension, the MIME type may be an empty string or 'application/octet-stream' (the generic binary type). The browser does not read the file header (magic bytes) to determine the true MIME type — it relies on the filename extension only." },
      { question: "What does 'Last Modified' mean?", answer: "The Last Modified date is the date and time the file was last written to on the filesystem where it is currently stored. This is the same date you see in File Explorer (Windows) or Finder (Mac). Note that copying a file may or may not preserve the original modification date, depending on the operating system and copy method. Files downloaded from the internet typically have a modification date equal to the download time." },
      { question: "Can I view metadata for multiple files?", answer: "This tool displays metadata for one file at a time. After viewing a file's metadata, you can drop a new file to replace it. There is no batch mode for viewing metadata of many files simultaneously." },
      { question: "Is the file content read or uploaded?", answer: "No file content is read or uploaded. Only the metadata properties exposed by the browser's File API are accessed. The file bytes themselves are not read. This means the tool is safe for any file, including very large files, and no data leaves your device." },
    ],
  },
];

export function getFileTool(slug: string): FileTool | undefined {
  return fileTools.find((t) => t.slug === slug);
}

export function getAllFileTools(): FileTool[] {
  return fileTools;
}

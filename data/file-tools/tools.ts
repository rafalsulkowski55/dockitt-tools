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
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    title: "Base64 Encoder & Decoder Online — Text and Files",
    description: "Encode and decode Base64 online. Supports plain text and file encoding. Free, browser-based.",
    longDescription: "Base64 is an encoding scheme that converts binary data (or text) to a string of ASCII characters using only 64 characters (A-Z, a-z, 0-9, +, /). It is widely used to embed images in CSS or HTML data URLs, encode email attachments, store binary data in JSON, and transmit data over text-only channels. This tool encodes or decodes both plain text and files, entirely in your browser.",
    primaryKeyword: "base64 encoder decoder online",
    category: "file-tools",
    howTo: [
      "Select the 'Text' tab to encode or decode text, or the 'File' tab to encode a file.",
      "For text: paste your content and click 'Encode' or 'Decode'. For files: drop a file and click 'Encode to Base64'.",
      "Copy the result to clipboard or download the output as a .txt file.",
    ],
    faqs: [
      { question: "What is Base64 encoding used for?", answer: "Base64 encoding is used whenever binary data needs to travel through a medium designed for text. Common use cases include: embedding images directly in HTML or CSS as data URLs (data:image/png;base64,...), encoding binary attachments in email (MIME), storing binary data in JSON (which only supports strings), embedding fonts in CSS, encoding API authentication tokens (HTTP Basic Auth sends username:password as Base64), and encoding binary data for storage in databases that only support text." },
      { question: "Does Base64 compress data?", answer: "No. Base64 increases the size of data by approximately 33%. Every 3 bytes of binary data are encoded as 4 Base64 characters. So a 100KB binary file becomes approximately 133KB when Base64 encoded. Base64 is an encoding, not a compression. If you need to reduce size, compress the data first (e.g., create a ZIP), then Base64 encode the compressed result." },
      { question: "What is the difference between standard Base64 and URL-safe Base64?", answer: "Standard Base64 uses + and / as the 62nd and 63rd characters, and = for padding. URL-safe Base64 (also called Base64url) replaces + with - and / with _ so the encoded string can be safely used in URLs and filenames without percent-encoding. This tool uses standard Base64. If you need URL-safe Base64, replace + with - and / with _ in the output, and remove any trailing = padding characters." },
      { question: "What is the maximum file size for encoding?", answer: "Files up to 10MB can be encoded. Because Base64 increases the output size by 33%, a 10MB file produces approximately 13.3MB of Base64 text. Larger files would produce Base64 strings that are difficult to work with in a textarea. For very large files, consider using the command-line: base64 filename on Linux/Mac, or certutil -encode filename on Windows." },
      { question: "How do I decode a Base64-encoded file back to its original format?", answer: "If you have a Base64 string that represents a file (such as a data URL for an image), switch to the 'File' tab and use the decode functionality. If the Base64 string starts with data:image/png;base64, or similar, the tool strips the data URL prefix and decodes the raw Base64. The resulting file downloads with the detected extension. For text mode, the decoded result is shown in the output textarea." },
      { question: "Is my data uploaded to a server?", answer: "No. All encoding and decoding runs in your browser using the browser's native btoa() and atob() functions, and the FileReader API for files. No data is sent to any server, which is important when encoding confidential files or credentials." },
    ],
  },
  {
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    title: "URL Encoder & Decoder Online — Percent-Encode URLs",
    description: "Encode and decode URLs online. Percent-encodes special characters for safe URL transmission. Free, browser-based.",
    longDescription: "URLs can only contain a limited set of ASCII characters. Characters outside this set — including spaces, Unicode letters, and special characters like &, =, #, and ? — must be percent-encoded (e.g., a space becomes %20, & becomes %26). This tool percent-encodes any text for use in URLs, or decodes percent-encoded strings back to readable text. It uses encodeURIComponent / decodeURIComponent, which encode all characters except A-Z, a-z, 0-9, -, _, ., and ~.",
    primaryKeyword: "url encoder decoder online",
    category: "file-tools",
    howTo: [
      "Paste the text or URL you want to encode or decode into the input textarea.",
      "Click 'Encode' to percent-encode the text, or 'Decode' to convert percent-encoded text back to readable form.",
      "Copy the result from the output textarea. The character counts are shown below.",
    ],
    faqs: [
      { question: "What characters are percent-encoded?", answer: "encodeURIComponent (used by this tool) encodes everything except: A-Z, a-z, 0-9, hyphen (-), underscore (_), dot (.), and tilde (~). All other characters — including spaces, !, @, #, $, &, *, (, ), +, ,, /, :, ;, =, ?, @, [, ], and all non-ASCII Unicode characters — are percent-encoded as their UTF-8 byte values prefixed with %. For example, a space becomes %20, © becomes %C2%A9, and 中 becomes %E4%B8%AD." },
      { question: "What is the difference between encodeURIComponent and encodeURI?", answer: "encodeURIComponent encodes more characters and is intended for encoding individual components of a URL (a query parameter value, a path segment). encodeURI is more lenient and is intended for encoding a complete URL — it does not encode characters that are valid in a URL structure (:, /, ?, #, [, ], @, !, $, &, ', (, ), *, +, ,, ;, =). For most use cases, encodeURIComponent is the correct choice, which is what this tool uses." },
      { question: "Why do I need to URL-encode text?", answer: "URLs must be transmitted as ASCII text with a restricted character set. If you include a URL parameter value that contains & or = (e.g., a search query), these characters would be misinterpreted as URL structure separators. URL-encoding converts them to safe representations: & becomes %26, = becomes %3D. Without encoding, a URL like ?q=foo&bar would be parsed as two parameters (q=foo and bar=), not one parameter with the value 'foo&bar'." },
      { question: "Can I decode a full URL?", answer: "Yes. Paste the entire URL (e.g., https://example.com/search?q=hello%20world&lang=en) and click Decode. The percent-encoded sequences are replaced with their decoded characters, making the URL human-readable. Note that decoding a URL and then re-encoding it may not produce the original URL exactly, because the decoded form may contain characters that get re-encoded differently." },
      { question: "What is the difference between %20 and + for spaces?", answer: "Both %20 and + represent a space in URLs, but in different contexts. %20 is the standard percent-encoding of a space character and is valid in any part of a URL. The + character represents a space only in the query string part of a URL, as per the application/x-www-form-urlencoded format used by HTML forms. encodeURIComponent always uses %20, not +. When decoding, this tool decodes both %20 and + as spaces to handle both conventions." },
      { question: "Is there a length limit on the input?", answer: "There is no hard limit. The encoding and decoding are pure JavaScript string operations that run in under a millisecond for typical inputs. Very long strings (millions of characters) will still be processed quickly, though the textarea may be slow to render at such sizes. Note that web servers and browsers impose limits on URL lengths (typically 2,048 to 8,192 characters), so encoded URLs that exceed these limits may not work in practice." },
    ],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    title: "Password Generator Online — Secure Random Passwords",
    description: "Generate strong, cryptographically random passwords online. Choose length and character sets. Free, browser-based.",
    longDescription: "Weak passwords are one of the most common causes of account compromise. This tool generates cryptographically secure random passwords using the browser's Web Crypto API (crypto.getRandomValues), which produces true random numbers suitable for security purposes. You can configure the password length (8 to 128 characters) and which character sets to include. A password strength indicator shows the estimated strength of the generated password.",
    primaryKeyword: "password generator online",
    category: "file-tools",
    howTo: [
      "Use the slider to set the desired password length (8–128 characters). Enable the character sets you want to include.",
      "Click 'Generate Password' to create a cryptographically random password.",
      "Click 'Copy' to copy the password to clipboard. Generate as many times as you like.",
    ],
    faqs: [
      { question: "Is the password generator truly random?", answer: "Yes. The password is generated using crypto.getRandomValues(), which is the browser's cryptographically secure pseudorandom number generator (CSPRNG). This is the same source of randomness used for cryptographic operations in the browser. It is seeded by the operating system's entropy sources and produces unpredictable, high-quality random numbers suitable for generating security credentials." },
      { question: "What makes a password strong?", answer: "Password strength is determined by the number of possible passwords (the search space). A longer password from a larger character set is exponentially harder to guess. A 16-character password using uppercase, lowercase, numbers, and symbols has a search space of 95^16 ≈ 4×10^31 combinations — at a rate of 10 billion guesses per second, it would take billions of years to crack by brute force. The strength indicator shows Weak, Fair, Strong, or Very Strong based on length and character variety." },
      { question: "How is the password strength calculated?", answer: "Strength is estimated from the password's entropy: the number of bits needed to represent the search space (log2 of the number of possible passwords). Entropy below 40 bits is Weak, 40-59 bits is Fair, 60-79 bits is Strong, and 80+ bits is Very Strong. This is a mathematical estimate of brute-force resistance and does not check against dictionaries of common passwords." },
      { question: "Should I include symbols in my password?", answer: "Yes, if the service supports it. Adding symbols expands the character set from 62 characters (uppercase + lowercase + digits) to 94 characters, multiplying the number of possible passwords by ~1.5 per character. Some systems do not support all symbol characters in passwords, which is why symbols are optional. If a site rejects your generated password, try regenerating without symbols." },
      { question: "What symbols are included?", answer: "The symbols character set includes: ! @ # $ % ^ & * ( ) _ + - = [ ] { } | ; ' : , . / < > ?. This covers the most commonly used symbol characters in passwords. Some special characters like backtick, backslash, double quote, and space are excluded as they may cause issues in certain contexts (shell scripts, config files, copy-paste)." },
      { question: "Is the generated password stored anywhere?", answer: "No. The password exists only in your browser's memory and is displayed on screen. It is never sent to any server, never logged, and never stored. When you navigate away from the page or close the tab, the password is gone. Copy it immediately to a password manager." },
    ],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    title: "UUID Generator Online — Generate Random UUIDs v4",
    description: "Generate cryptographically random UUID v4 strings online. Generate 1 to 100 UUIDs at once. Free, browser-based.",
    longDescription: "A UUID (Universally Unique Identifier) is a 128-bit identifier standardised in RFC 4122, typically represented as 32 hexadecimal digits separated by hyphens in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. Version 4 UUIDs are randomly generated, making them suitable as unique keys in databases, unique filenames, correlation IDs in distributed systems, and anywhere a globally unique identifier is needed without a central issuing authority. This tool uses crypto.randomUUID() for cryptographically secure generation.",
    primaryKeyword: "uuid generator online",
    category: "file-tools",
    howTo: [
      "Choose the number of UUIDs to generate (1 to 100) and the output format.",
      "Click 'Generate' to produce the UUIDs.",
      "Click 'Copy All' to copy all generated UUIDs to clipboard, or select and copy individual ones from the textarea.",
    ],
    faqs: [
      { question: "What is UUID v4 and why is it used?", answer: "UUID version 4 is a randomly generated universally unique identifier. 'Universally unique' means the probability of two independently generated UUIDs being identical is astronomically small — approximately 1 in 2^122 (5.3×10^36). UUIDs are used as primary keys in databases (to avoid sequential IDs that can be guessed or scraped), as correlation IDs in microservice logs, as unique identifiers for files, sessions, transactions, and any entity that needs a stable, unique identity without coordination between systems." },
      { question: "What is the difference between the output formats?", answer: "Standard format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx with lowercase hex and hyphens — this is the canonical UUID format. Uppercase: XXXXXXXX-XXXX-4XXX-YXXX-XXXXXXXXXXXX — same format but with uppercase hex digits, sometimes required by older systems. No hyphens: xxxxxxxx4xxxyxxxxxxxxxxxxxxx — the 32 hex characters without separators, producing a compact 32-character identifier. All three formats represent the same underlying value; the differences are purely cosmetic." },
      { question: "Are generated UUIDs truly unique?", answer: "In practice, yes. UUID v4 uses 122 bits of randomness (the other 6 bits encode the version and variant). The probability of generating two identical UUIDs is so small it is effectively zero — you would need to generate approximately 2.71×10^18 UUIDs before having a 50% chance of a collision (the birthday paradox). At a rate of one million UUIDs per second, that would take 86 years. No real-world application generates UUIDs at that rate." },
      { question: "How does this compare to using Math.random() for unique IDs?", answer: "Math.random() is not suitable for generating unique IDs because it is not cryptographically secure — it uses a predictable algorithm that can be reverse-engineered. crypto.randomUUID() uses the browser's CSPRNG (same as crypto.getRandomValues) which is seeded by true hardware entropy. Additionally, a UUID has 122 bits of entropy while a typical Math.random() value has about 53 bits, making UUID far more resistant to collision and prediction." },
      { question: "Can I use these UUIDs as database primary keys?", answer: "Yes. UUID v4 is a common choice for database primary keys, particularly in distributed systems where multiple services may create records simultaneously without coordination. The downside of random UUIDs as primary keys is that they are not sequential, which can cause index fragmentation in B-tree indexes (notably in MySQL InnoDB). For write-heavy tables in relational databases, UUID v7 (time-ordered) or ULIDs are often preferred, though this tool generates v4 only." },
      { question: "Is there a way to generate time-based (v1 or v7) UUIDs?", answer: "This tool generates version 4 (random) UUIDs only, using the browser's built-in crypto.randomUUID() function. Time-based UUID versions (v1, v6, v7) require access to a clock and optionally a MAC address or node identifier, which are not available through standard browser APIs. For time-ordered UUIDs in a browser context, consider using the ULID specification instead, or generating v7 UUIDs server-side." },
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
  {
    slug: "color-picker",
    name: "Color Picker",
    title: "Color Picker Online — HEX, RGB, HSL and HSV",
    description: "Pick any colour and get its HEX, RGB, HSL and HSV values instantly. Editable inputs for each format. Free, browser-based.",
    longDescription: "This colour picker converts between HEX, RGB, HSL, and HSV colour formats in real time. Click on the colour swatch to open the native colour picker, or type directly into any of the format input fields — changing one updates all others instantly. Use this tool to find the equivalent representation of a colour across different CSS formats, or to explore how colours relate in different colour spaces.",
    primaryKeyword: "color picker online hex rgb hsl",
    category: "file-tools",
    howTo: [
      "Click the colour swatch to open the colour picker, or type a HEX value directly into the HEX input field.",
      "All four formats (HEX, RGB, HSL, HSV) update instantly to show the same colour in each representation.",
      "Click the 'Copy' button next to any format to copy that value to clipboard.",
    ],
    faqs: [
      { question: "What is the difference between HEX, RGB, HSL, and HSV?", answer: "All four formats describe the same colours but in different coordinate systems. HEX (#RRGGBB) is the standard CSS format — three pairs of hex digits for red, green, and blue channels. RGB (red, green, blue) is the same model with decimal values 0-255 per channel. HSL (hue, saturation, lightness) uses an artist-friendly model where hue is the colour angle (0-360°), saturation is the colour intensity (0-100%), and lightness is how light or dark the colour is. HSV (hue, saturation, value) is similar to HSL but with a different definition of the third dimension — value is the brightness of the colour (100% is the purest colour, 0% is black)." },
      { question: "When should I use HSL instead of HEX?", answer: "HSL is often more intuitive for programmatic colour manipulation. To make a colour darker, decrease the lightness. To make it more muted, decrease the saturation. To create colour themes, keep the saturation and lightness constant and rotate the hue. HSL is natively supported in CSS (color: hsl(220, 80%, 50%)) and is ideal for generating colour palettes, theming systems, and animations. HEX is more compact and is the format most designers work with in design tools." },
      { question: "Can I enter a colour value in any format?", answer: "Yes. You can type directly into the HEX field (with or without the # prefix), or into the individual R, G, B, H, S, L, or V fields. Changing any field updates all others in real time. If the value you enter is invalid (out of range or not a valid hex colour), the field reverts to the last valid value." },
      { question: "Does the colour picker support transparency (alpha)?", answer: "This tool works with fully opaque colours only (alpha = 1). Transparent colours (RGBA, HSLA) are not currently supported. The native browser colour picker input also does not support transparency. For colours with alpha channels, use a design tool like Figma or the developer tools colour picker in your browser." },
      { question: "What is the HSV colour space used for?", answer: "HSV (also called HSB — Hue, Saturation, Brightness) is used in many image editors and colour pickers because it is more intuitive for selecting pure colours. At 100% value, colours are at their most saturated. Reducing value darkens the colour towards black. By contrast, HSL's lightness of 50% is the 'pure' colour — going to 100% lightness produces white and going to 0% produces black. HSV is used in Photoshop's colour picker; HSL is used in CSS." },
      { question: "Can I use this to find CSS colour values?", answer: "Yes. The HEX value can be used directly in CSS (color: #2563eb). The RGB value maps to CSS rgb() notation. The HSL value maps to CSS hsl() notation. Simply copy the format you need and paste it into your stylesheet. The HSV format does not have a direct CSS equivalent — convert to HSL or RGB for use in CSS." },
    ],
  },
  {
    slug: "css-minifier",
    name: "CSS Minifier",
    title: "CSS Minifier Online — Free CSS Compressor",
    description: "Minify and compress CSS online. Removes comments and whitespace. Shows size reduction. Free, browser-based.",
    longDescription: "Minifying CSS reduces the file size by removing comments, unnecessary whitespace, newlines, and redundant characters. Smaller CSS files load faster, reducing page load time and improving Core Web Vitals scores. This tool applies a series of pure JavaScript transformations to remove all unnecessary content while preserving the functionality of your styles. The original and minified sizes are displayed so you can see the improvement.",
    primaryKeyword: "css minifier online",
    category: "file-tools",
    howTo: [
      "Paste your CSS code into the input textarea.",
      "Click 'Minify CSS' to remove comments, whitespace, and redundant characters.",
      "Copy the minified CSS or download it as a .css file. The size reduction is shown below.",
    ],
    faqs: [
      { question: "What transformations does the minifier apply?", answer: "The minifier applies the following transformations in order: (1) Removes all CSS comments (/* ... */). (2) Removes leading and trailing whitespace from each line. (3) Collapses multiple consecutive spaces and tabs into a single space. (4) Removes newlines and carriage returns. (5) Removes spaces around the characters : ; { } , > + ~ =. (6) Removes the last semicolon before a closing }. (7) Removes spaces in certain at-rule expressions. These transformations reduce file size without changing the semantics of the CSS." },
      { question: "Is the minified CSS safe to use in production?", answer: "Yes, for standard CSS. The minifier performs simple textual transformations that do not change the meaning of the CSS. All selectors, properties, and values are preserved. The only content removed is whitespace and comments, which have no effect on the browser's rendering. For very complex or non-standard CSS (e.g., template strings or server-side interpolations), review the output before deploying." },
      { question: "Does the minifier handle CSS custom properties (variables)?", answer: "Yes. CSS custom properties (--primary-color: #2563eb) are preserved exactly as-is. The minifier does not modify property names or values — it only removes whitespace around the structural characters (: ; { }). Custom property values that contain spaces (e.g., --font-size: 16px) are preserved correctly." },
      { question: "Can I minify SCSS or Less?", answer: "No. This tool only handles standard CSS. SCSS (Sass) and Less are CSS preprocessors with syntax that extends CSS with variables, nesting, mixins, and other features. The minifier would incorrectly handle the preprocessor-specific syntax. To minify SCSS, compile it to CSS first (using the Sass compiler), then paste the compiled CSS output into this tool." },
      { question: "How much size reduction can I expect?", answer: "Size reduction varies by CSS content. Well-commented, well-formatted CSS with generous whitespace typically reduces by 20-40%. Minified results depend on the ratio of whitespace and comments to actual CSS content. CSS files that are already reasonably compact may only reduce by 10-15%. For comparison, popular CSS frameworks like Bootstrap reduce from approximately 200KB (source) to 150KB (minified) — about 25%." },
      { question: "Is my CSS sent to a server?", answer: "No. All minification runs entirely in your browser using pure JavaScript regular expressions and string operations. No data is sent to any server. This makes the tool safe for minifying proprietary CSS, confidential design tokens, or any other sensitive stylesheets." },
    ],
  },
];

export function getFileTool(slug: string): FileTool | undefined {
  return fileTools.find((t) => t.slug === slug);
}

export function getAllFileTools(): FileTool[] {
  return fileTools;
}

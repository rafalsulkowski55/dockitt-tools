export type DevTool = {
  slug: string;
  name: string;
  title: string;
  description: string;
  longDescription: string;
  primaryKeyword: string;
  category: "dev-tools";
  howTo: string[];
  faqs: { question: string; answer: string }[];
};

export const devTools: DevTool[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    title: "JSON Formatter & Validator — Free Online Tool",
    description: "Format and validate JSON online. Pretty-print with 2 or 4 space indentation. Highlights errors. Free, browser-based.",
    longDescription: "Minified or poorly formatted JSON is hard to read and debug. This tool parses and reformats any valid JSON with proper indentation and line breaks, making the structure immediately clear. It also validates the JSON syntax and reports errors with the line number and description if the input is invalid. Choose between 2-space or 4-space indentation to match your project's code style.",
    primaryKeyword: "json formatter online",
    category: "dev-tools",
    howTo: [
      "Paste your minified or unformatted JSON into the input textarea.",
      "Choose 2 or 4 space indentation, then click 'Format JSON'.",
      "Copy the formatted JSON to clipboard or download it as a .json file.",
    ],
    faqs: [
      { question: "Does this tool validate my JSON?", answer: "Yes. The tool uses JSON.parse() to parse your input, which performs strict JSON validation. If the input is not valid JSON, an error message is displayed describing what went wrong and where. Common issues include: trailing commas (not allowed in JSON, though allowed in JavaScript), unquoted keys, single-quoted strings (JSON requires double quotes), and comments (JSON does not support comments)." },
      { question: "What is the difference between 2-space and 4-space indentation?", answer: "Both produce semantically identical JSON — only the whitespace differs. 2-space indentation is more compact and is the default in many JavaScript projects (Prettier, many ESLint configs). 4-space indentation is traditional in Python-influenced projects and some style guides. Use whichever matches the conventions of your codebase." },
      { question: "Can I use this to minify JSON?", answer: "This tool is designed for formatting (expanding). For minification (removing all whitespace), JSON.stringify(JSON.parse(input)) with no indentation argument produces minified JSON. A dedicated JSON minifier tool would be more appropriate for that use case." },
      { question: "What is the maximum size of JSON I can format?", answer: "There is no hard limit. The tool uses the browser's built-in JSON.parse and JSON.stringify, which can handle very large JSON files. In practice, files up to tens of megabytes format near-instantly. Files in the hundreds of megabytes may slow down the browser tab." },
      { question: "Does the formatter change the data in any way?", answer: "No. The formatter preserves all JSON values exactly. It does not change string content, number precision, key order (keys retain their original order as parsed by the browser's JSON engine), or any other aspect of the data. Only whitespace is modified." },
      { question: "Is my JSON sent to a server?", answer: "No. Formatting runs entirely in your browser using the built-in JSON.parse and JSON.stringify functions. No data is sent anywhere. This makes the tool safe for formatting JSON that contains API keys, access tokens, or other confidential values." },
    ],
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    title: "Base64 Encoder & Decoder Online — Text and Files",
    description: "Encode and decode Base64 online. Supports plain text and file encoding. Free, browser-based.",
    longDescription: "Base64 is an encoding scheme that converts binary data (or text) to a string of ASCII characters using only 64 characters (A-Z, a-z, 0-9, +, /). It is widely used to embed images in CSS or HTML data URLs, encode email attachments, store binary data in JSON, and transmit data over text-only channels. This tool encodes or decodes both plain text and files, entirely in your browser.",
    primaryKeyword: "base64 encoder decoder online",
    category: "dev-tools",
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
    category: "dev-tools",
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
    category: "dev-tools",
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
    category: "dev-tools",
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
    slug: "color-picker",
    name: "Color Picker",
    title: "Color Picker Online — HEX, RGB, HSL and HSV",
    description: "Pick any colour and get its HEX, RGB, HSL and HSV values instantly. Editable inputs for each format. Free, browser-based.",
    longDescription: "This colour picker converts between HEX, RGB, HSL, and HSV colour formats in real time. Click on the colour swatch to open the native colour picker, or type directly into any of the format input fields — changing one updates all others instantly. Use this tool to find the equivalent representation of a colour across different CSS formats, or to explore how colours relate in different colour spaces.",
    primaryKeyword: "color picker online hex rgb hsl",
    category: "dev-tools",
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
    category: "dev-tools",
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

export function getDevTool(slug: string): DevTool | undefined {
  return devTools.find((t) => t.slug === slug);
}

export function getAllDevTools(): DevTool[] {
  return devTools;
}

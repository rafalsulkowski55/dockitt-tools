import { getToolsByCategory } from "@/lib/tools";
import Link from "next/link";
import { notFound } from "next/navigation";

const categoryMeta: Record<string, {
  name: string;
  description: string;
  faqs: { question: string; answer: string }[];
}> = {
  core: {
    name: "Core PDF Tools",
    description: "Essential tools for everyday PDF tasks — merge, split, compress, rotate and more.",
    faqs: [
      {
        question: "What is the best way to reduce a PDF file size for email?",
        answer: "The most effective way to reduce a PDF file size for email is to use a PDF compressor. Dockitt's Compress PDF tool re-optimises the internal structure of your file — removing redundant data and streamlining object streams — without visually altering the content. For text-heavy PDFs such as reports, contracts, and presentations, the size reduction is often significant. If your PDF contains many high-resolution images, the reduction may be smaller since image data is harder to compress without quality loss. Most email clients have a 10MB or 25MB attachment limit, and compressing your PDF before sending is the cleanest way to stay within those limits without splitting the document.",
      },
      {
        question: "How do I combine multiple PDF files into one document?",
        answer: "Use the Merge PDF tool. Upload all the files you want to combine, arrange them in the correct order, and download the merged result. The tool preserves the content, formatting, fonts, and images of each individual file exactly as they are — merging only joins the pages together into a single document without altering anything inside each file. This is useful for combining a cover letter with a CV, assembling a report from multiple chapters, or consolidating scanned pages from different sources. If any of the files are password protected, you will need to unlock them first using the Unlock PDF tool before merging.",
      },
      {
        question: "What is the difference between splitting and extracting pages from a PDF?",
        answer: "Split PDF lets you define a consecutive page range to extract as a new document — for example, pages 1 through 5. Extract PDF Pages lets you specify individual page numbers in any order, which is useful when the pages you need are not consecutive. For example, if you need pages 2, 7, and 14 from a 30-page document, use Extract PDF Pages. If you need the first 10 pages of a document, use Split PDF. Both operations are non-destructive — they create new files without modifying the original.",
      },
      {
        question: "Can I rotate only specific pages in a PDF, not the entire document?",
        answer: "The Rotate PDF tool currently rotates all pages in a document by the same angle. If you need to rotate only specific pages, the workaround is to split the document into sections using the Split PDF tool, rotate the relevant section, then merge everything back together using the Merge PDF tool. This takes a few extra steps but gives you full control over which pages are rotated and by how much.",
      },
      {
        question: "Will compressing a PDF affect the quality of images inside it?",
        answer: "Dockitt's Compress PDF tool works by optimising the PDF's internal structure — removing redundant metadata, streamlining object references, and cleaning up file overhead — rather than re-compressing the images themselves. This means that for most PDFs, image quality is not affected. The approach works best on text-heavy documents. For PDFs where the majority of the file size comes from embedded high-resolution images, the compression gains will be more modest because the images themselves are not touched.",
      },
      {
        question: "Is there a file size limit for these PDF tools?",
        answer: "Files up to 10MB can be processed directly. This limit comes from the Vercel serverless function payload limit for tools that require server-side processing. For tools that run entirely in the browser — such as Merge PDF, Split PDF, Rotate PDF, and Compress PDF — the practical limit is higher and depends on your device's available memory. If your file exceeds the limit for a server-side tool, try compressing it first to bring it under the threshold, or split it into smaller sections.",
      },
    ],
  },
  security: {
    name: "PDF Security Tools",
    description: "Protect, unlock, sign and watermark your PDF files quickly and for free.",
    faqs: [
      {
        question: "How secure is password protection on a PDF?",
        answer: "Dockitt uses 128-bit AES encryption via Ghostscript, which is the standard encryption level for PDF security and is considered strong for most professional and personal use cases. A well-chosen password — at least 12 characters, mixing letters, numbers, and symbols — combined with 128-bit encryption makes the file extremely difficult to access without the correct password. However, no encryption is unconditional. If the password itself is weak or is shared insecurely, the protection can be compromised. Always share the password through a different channel than the document itself — for example, send the PDF by email and the password by SMS.",
      },
      {
        question: "What is the difference between a user password and an owner password in a PDF?",
        answer: "A PDF can have two separate layers of protection. A user password (also called an open password) is required to open and view the document at all. An owner password (also called a permissions password) controls what actions are allowed after the document is opened — such as printing, copying text, or editing. It is possible for a PDF to have only an owner password, meaning anyone can open it but certain actions are restricted. Dockitt's Protect PDF tool sets a user password, and the Unlock PDF tool removes both types of protection when given the correct password.",
      },
      {
        question: "Is a handwritten signature added through a browser legally binding?",
        answer: "A handwritten signature drawn in a browser and embedded in a PDF is a visual signature. In many countries and for many document types, a visual signature is considered valid — particularly for internal documents, agreements between parties who have consented to electronic signing, and informal contracts. However, for high-stakes legal documents such as property transactions, financial agreements, or any document that may be legally disputed, a certified electronic signature with an audit trail and identity verification provides much stronger legal standing. Dockitt's Sign PDF tool is best suited for informal use cases where a visual representation of a signature is sufficient.",
      },
      {
        question: "Can someone remove a watermark I've added to a PDF?",
        answer: "A text watermark embedded directly into a PDF's page content is significantly harder to remove than it might appear. While professional PDF editors like Adobe Acrobat Pro can attempt to remove watermarks, the process is time-consuming and imperfect on complex page backgrounds. For most use cases — marking documents as draft or confidential, deterring casual copying, or asserting ownership — an embedded text watermark is an effective deterrent.",
      },
      {
        question: "What should I do if I forgot the password on a PDF I own?",
        answer: "Unfortunately, if you have forgotten the password on an encrypted PDF and no longer have the original unprotected file, recovery is extremely difficult. The 128-bit encryption used in modern PDFs is designed to be computationally infeasible to brute-force without the correct password. If you have the original source file, the simplest solution is to re-export it as a new PDF and set a new password. Going forward, storing passwords in a dedicated password manager prevents this situation entirely.",
      },
      {
        question: "Can I add both a watermark and a password to the same PDF?",
        answer: "Yes, but you need to do it in two steps. First, add the watermark using the Watermark PDF tool and download the result. Then, upload the watermarked PDF to the Protect PDF tool and set a password. The final file will have both the embedded watermark and password protection.",
      },
    ],
  },
  utility: {
    name: "PDF Utility Tools",
    description: "Advanced PDF utilities — crop, OCR, repair, reorder pages and more.",
    faqs: [
      {
        question: "What kinds of PDF files can OCR make searchable?",
        answer: "OCR works on PDFs that are purely image-based — typically scanned documents, photographed pages, or PDFs exported from image editing tools where the text was flattened into the page image. If you open a PDF and cannot select, highlight, or copy any text, it is image-based and OCR will help. Dockitt uses ocrmypdf with the Tesseract engine, which supports a wide range of document types. OCR accuracy is highest on clean, high-resolution scans of printed text.",
      },
      {
        question: "What causes a PDF to become corrupted and can it always be repaired?",
        answer: "PDF corruption most commonly happens due to interrupted file transfers — a download that was cut off mid-way, a file that was being saved when the application crashed, or storage media errors. Dockitt's Repair PDF tool uses Ghostscript to rebuild the internal structure of the file. This works well for mildly damaged files. However, if the file data itself has been physically overwritten or large portions are missing, the content cannot be recovered.",
      },
      {
        question: "Does cropping a PDF permanently delete the content outside the crop area?",
        answer: "In the PDF format, cropping sets a property called the CropBox, which defines the visible area of each page. Content outside the CropBox is hidden from view but technically remains in the file. This means the file size does not decrease significantly after cropping, and in theory the hidden content could be made visible again by changing the CropBox in a PDF editor.",
      },
      {
        question: "How do I fix a multi-page scanned document where the pages are in the wrong order?",
        answer: "Use the Reorder PDF Pages tool. After uploading your document, you can drag and drop the pages into the correct sequence. This is particularly useful for scanned documents where pages were fed into the scanner in the wrong order, or for documents assembled from multiple scans that need to be arranged chronologically.",
      },
      {
        question: "Can I extract non-consecutive pages from a PDF into a new document?",
        answer: "Yes. The Extract PDF Pages tool lets you specify individual page numbers in any order — for example, pages 3, 8, 12, and 17. The resulting PDF will contain only those pages, in the order you specified. This is useful when working with reports that have relevant sections scattered throughout.",
      },
      {
        question: "What should I do if a repaired PDF still shows blank or missing pages?",
        answer: "If specific pages appear blank after repair, it means the data for those pages was too damaged for Ghostscript to reconstruct. In this situation, check whether you have an earlier version of the file saved elsewhere, whether the sender can resend the original, or whether you have a printed copy that could be scanned.",
      },
    ],
  },
};

const TOOL_ICONS: Record<string, string> = {
  "compress-pdf": "📦",
  "merge-pdf": "🔗",
  "split-pdf": "✂️",
  "rotate-pdf": "🔄",
  "delete-pdf-pages": "🗑️",
  "extract-pdf-pages": "📤",
  "protect-pdf": "🔐",
  "unlock-pdf": "🔓",
  "watermark-pdf": "💧",
  "sign-pdf": "✍️",
  "crop-pdf": "✂️",
  "repair-pdf": "🔧",
  "ocr-pdf": "🔍",
  "reorder-pdf-pages": "🔀",
};

export function generateStaticParams() {
  return Object.keys(categoryMeta).map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = categoryMeta[slug];
  if (!meta) notFound();

  const tools = getToolsByCategory(slug);

  return (
    <main style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Breadcrumbs */}
        <nav style={{ marginBottom: "28px" }}>
          <ol style={{ display: "flex", alignItems: "center", gap: "8px", listStyle: "none", margin: 0, padding: 0, fontSize: "14px" }}>
            <li><Link href="/" style={{ color: "#2563eb", textDecoration: "none" }}>Home</Link></li>
            <li style={{ color: "#d1d5db" }}>›</li>
            <li><Link href="/categories" style={{ color: "#9ca3af", textDecoration: "none" }}>Categories</Link></li>
            <li style={{ color: "#d1d5db" }}>›</li>
            <li style={{ color: "#111" }}>{meta.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "8px" }}>
            Category
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.015em", marginBottom: "8px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
            {meta.name}
          </h1>
          <p style={{ fontSize: "15px", color: "#4b5563", margin: 0 }}>
            {meta.description}
          </p>
        </div>

        {/* Tools grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px", marginBottom: "48px" }}>
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: "12px", padding: "18px 16px",
                display: "flex", flexDirection: "column", gap: "8px",
              }}>
                <span style={{ fontSize: "22px" }}>{TOOL_ICONS[tool.slug] ?? "📄"}</span>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#111", marginBottom: "3px" }}>{tool.name}</p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", lineHeight: 1.4, margin: 0 }}>{tool.shortDescription}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px", color: "#0f0f0f", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {meta.faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < meta.faqs.length - 1 ? "1px solid #f3f4f6" : "none", paddingBottom: i < meta.faqs.length - 1 ? "24px" : "0" }}>
                <p style={{ fontWeight: 600, color: "#111", marginBottom: "8px", fontSize: "15px" }}>{faq.question}</p>
                <p style={{ color: "#4b5563", margin: 0, lineHeight: 1.7, fontSize: "14px" }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
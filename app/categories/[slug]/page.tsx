import { getToolsByCategory } from '@/lib/tools'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const categoryMeta: Record<string, {
  name: string
  description: string
  faqs: { question: string; answer: string }[]
}> = {
  core: {
    name: 'Core PDF Tools',
    description: 'Essential tools for everyday PDF tasks — merge, split, compress, rotate and more.',
    faqs: [
      {
        question: 'What is the best way to reduce a PDF file size for email?',
        answer: 'The most effective way to reduce a PDF file size for email is to use a PDF compressor. Dockitt\'s Compress PDF tool re-optimises the internal structure of your file — removing redundant data and streamlining object streams — without visually altering the content. For text-heavy PDFs such as reports, contracts, and presentations, the size reduction is often significant. If your PDF contains many high-resolution images, the reduction may be smaller since image data is harder to compress without quality loss. Most email clients have a 10MB or 25MB attachment limit, and compressing your PDF before sending is the cleanest way to stay within those limits without splitting the document.',
      },
      {
        question: 'How do I combine multiple PDF files into one document?',
        answer: 'Use the Merge PDF tool. Upload all the files you want to combine, arrange them in the correct order, and download the merged result. The tool preserves the content, formatting, fonts, and images of each individual file exactly as they are — merging only joins the pages together into a single document without altering anything inside each file. This is useful for combining a cover letter with a CV, assembling a report from multiple chapters, or consolidating scanned pages from different sources. If any of the files are password protected, you will need to unlock them first using the Unlock PDF tool before merging.',
      },
      {
        question: 'What is the difference between splitting and extracting pages from a PDF?',
        answer: 'Split PDF lets you define a consecutive page range to extract as a new document — for example, pages 1 through 5. Extract PDF Pages lets you specify individual page numbers in any order, which is useful when the pages you need are not consecutive. For example, if you need pages 2, 7, and 14 from a 30-page document, use Extract PDF Pages. If you need the first 10 pages of a document, use Split PDF. Both operations are non-destructive — they create new files without modifying the original.',
      },
      {
        question: 'Can I rotate only specific pages in a PDF, not the entire document?',
        answer: 'The Rotate PDF tool currently rotates all pages in a document by the same angle. If you need to rotate only specific pages, the workaround is to split the document into sections using the Split PDF tool, rotate the relevant section, then merge everything back together using the Merge PDF tool. This takes a few extra steps but gives you full control over which pages are rotated and by how much.',
      },
      {
        question: 'Will compressing a PDF affect the quality of images inside it?',
        answer: 'Dockitt\'s Compress PDF tool works by optimising the PDF\'s internal structure — removing redundant metadata, streamlining object references, and cleaning up file overhead — rather than re-compressing the images themselves. This means that for most PDFs, image quality is not affected. The approach works best on text-heavy documents. For PDFs where the majority of the file size comes from embedded high-resolution images, the compression gains will be more modest because the images themselves are not touched.',
      },
      {
        question: 'Is there a file size limit for these PDF tools?',
        answer: 'Files up to 4.5MB can be processed directly. This limit comes from the Vercel serverless function payload limit for tools that require server-side processing. For tools that run entirely in the browser — such as Merge PDF, Split PDF, Rotate PDF, and Compress PDF — the practical limit is higher and depends on your device\'s available memory. If your file exceeds the limit for a server-side tool, try compressing it first to bring it under the threshold, or split it into smaller sections.',
      },
    ],
  },
  security: {
    name: 'PDF Security Tools',
    description: 'Protect, unlock, sign and watermark your PDF files quickly and for free.',
    faqs: [
      {
        question: 'How secure is password protection on a PDF?',
        answer: 'Dockitt uses 128-bit AES encryption via Ghostscript, which is the standard encryption level for PDF security and is considered strong for most professional and personal use cases. A well-chosen password — at least 12 characters, mixing letters, numbers, and symbols — combined with 128-bit encryption makes the file extremely difficult to access without the correct password. However, no encryption is unconditional. If the password itself is weak or is shared insecurely, the protection can be compromised. Always share the password through a different channel than the document itself — for example, send the PDF by email and the password by SMS.',
      },
      {
        question: 'What is the difference between a user password and an owner password in a PDF?',
        answer: 'A PDF can have two separate layers of protection. A user password (also called an open password) is required to open and view the document at all. An owner password (also called a permissions password) controls what actions are allowed after the document is opened — such as printing, copying text, or editing. It is possible for a PDF to have only an owner password, meaning anyone can open it but certain actions are restricted. Dockitt\'s Protect PDF tool sets a user password, and the Unlock PDF tool removes both types of protection when given the correct password.',
      },
      {
        question: 'Is a handwritten signature added through a browser legally binding?',
        answer: 'A handwritten signature drawn in a browser and embedded in a PDF is a visual signature. In many countries and for many document types, a visual signature is considered valid — particularly for internal documents, agreements between parties who have consented to electronic signing, and informal contracts. However, for high-stakes legal documents such as property transactions, financial agreements, or any document that may be legally disputed, a certified electronic signature with an audit trail and identity verification provides much stronger legal standing. Services like DocuSign or Adobe Sign are designed specifically for legally binding e-signatures. Dockitt\'s Sign PDF tool is best suited for informal use cases where a visual representation of a signature is sufficient.',
      },
      {
        question: 'Can someone remove a watermark I\'ve added to a PDF?',
        answer: 'A text watermark embedded directly into a PDF\'s page content — as opposed to a simple annotation layer — is significantly harder to remove than it might appear. While professional PDF editors like Adobe Acrobat Pro can attempt to remove watermarks, the process is time-consuming, imperfect on complex page backgrounds, and leaves traces. For most use cases — marking documents as draft or confidential, deterring casual copying, or asserting ownership — an embedded text watermark is an effective deterrent. If your use case requires tamper-proof watermarking with legal guarantees, a document DRM solution would provide stronger protection.',
      },
      {
        question: 'What should I do if I forgot the password on a PDF I own?',
        answer: 'Unfortunately, if you have forgotten the password on an encrypted PDF and no longer have the original unprotected file, recovery is extremely difficult. The 128-bit encryption used in modern PDFs is designed to be computationally infeasible to brute-force without the correct password. If you have the original source file — for example the Word document or design file the PDF was exported from — the simplest solution is to re-export it as a new PDF and set a new password. Going forward, storing passwords in a dedicated password manager (such as 1Password, Bitwarden, or Apple Keychain) prevents this situation entirely.',
      },
      {
        question: 'Can I add both a watermark and a password to the same PDF?',
        answer: 'Yes, but you need to do it in two steps since each operation is a separate tool. First, add the watermark using the Watermark PDF tool and download the result. Then, upload the watermarked PDF to the Protect PDF tool and set a password. The final file will have both the embedded watermark and password protection.',
      },
    ],
  },
  utility: {
    name: 'PDF Utility Tools',
    description: 'Advanced PDF utilities — crop, OCR, repair, reorder pages and more.',
    faqs: [
      {
        question: 'What kinds of PDF files can OCR make searchable?',
        answer: 'OCR works on PDFs that are purely image-based — typically scanned documents, photographed pages, or PDFs exported from image editing tools where the text was flattened into the page image. If you open a PDF and cannot select, highlight, or copy any text, it is image-based and OCR will help. If you can already select text, the PDF already has a text layer and OCR is unnecessary. Dockitt uses ocrmypdf with the Tesseract engine, which is one of the most accurate open-source OCR systems available and supports a wide range of document types. OCR accuracy is highest on clean, high-resolution scans of printed text. Handwriting, unusual fonts, low-contrast pages, or heavily skewed scans will produce less accurate results.',
      },
      {
        question: 'What causes a PDF to become corrupted and can it always be repaired?',
        answer: 'PDF corruption most commonly happens due to interrupted file transfers — a download that was cut off mid-way, a file that was being saved when the application crashed, or storage media errors on a USB drive or hard disk with bad sectors. Cloud sync conflicts can also produce corrupted files. Dockitt\'s Repair PDF tool uses Ghostscript to rebuild the internal structure of the file — reconstructing the cross-reference table and rewriting the object streams. This works well for mildly damaged files. However, if the file data itself has been physically overwritten or large portions are missing due to truncation, the content cannot be recovered. The repair tool will always attempt to produce a valid PDF from whatever data is readable.',
      },
      {
        question: 'Does cropping a PDF permanently delete the content outside the crop area?',
        answer: 'In the PDF format, cropping sets a property called the CropBox, which defines the visible area of each page. Content outside the CropBox is hidden from view but technically remains in the file. This means the file size does not decrease significantly after cropping, and in theory the hidden content could be made visible again by changing the CropBox in a PDF editor. Dockitt\'s Crop PDF tool sets the CropBox on each page as standard PDF practice. If you need to permanently and irreversibly remove content from the edges of pages — for example for privacy reasons — a dedicated PDF redaction tool would provide a stronger guarantee.',
      },
      {
        question: 'How do I fix a multi-page scanned document where the pages are in the wrong order?',
        answer: 'Use the Reorder PDF Pages tool. After uploading your document, the tool displays thumbnail previews of all pages so you can see the content of each one. You can then drag and drop the thumbnails into the correct sequence. This is particularly useful for scanned documents where pages were fed into the scanner in the wrong order, or for documents assembled from multiple scans that need to be arranged chronologically or logically. Once the order looks correct, click to save and download the reordered document.',
      },
      {
        question: 'Can I extract non-consecutive pages from a PDF into a new document?',
        answer: 'Yes. The Extract PDF Pages tool is designed exactly for this. Unlike Split PDF which works with consecutive page ranges, Extract PDF Pages lets you specify individual page numbers in any order — for example, pages 3, 8, 12, and 17. The resulting PDF will contain only those pages, in the order you specified. This is useful when working with reports that have relevant sections scattered throughout, reference documents where you need specific appendices, or any situation where the content you need is not in a continuous block.',
      },
      {
        question: 'What should I do if a repaired PDF still shows blank or missing pages?',
        answer: 'If specific pages appear blank after repair, it means the data for those pages was too damaged for Ghostscript to reconstruct. The repair process recovers what it can — if a page\'s content data was overwritten or missing at the byte level, there is no way to recover it from the file alone. In this situation, check whether you have an earlier version of the file saved elsewhere, whether the sender can resend the original, or whether you have a printed copy that could be scanned. For future documents, keeping backups in at least two locations — a local drive and a cloud service — prevents permanent data loss.',
      },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(categoryMeta).map((slug) => ({ slug }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = categoryMeta[slug]
  if (!meta) notFound()

  const tools = getToolsByCategory(slug)

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{meta.name}</h1>
      <p className="text-gray-600 mb-10">{meta.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
            className="border rounded-lg p-4 hover:shadow-md transition block tool-card"
          >
            <h2 className="font-semibold text-lg text-black">{tool.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{tool.shortDescription}</p>
          </Link>
        ))}
      </div>

      <div style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '32px',
      }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px', color: '#111' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {meta.faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: i < meta.faqs.length - 1 ? '1px solid #f3f4f6' : 'none', paddingBottom: i < meta.faqs.length - 1 ? '24px' : '0' }}>
              <p style={{ fontWeight: 600, color: '#111', marginBottom: '8px', fontSize: '16px' }}>{faq.question}</p>
              <p style={{ color: '#555', margin: 0, lineHeight: 1.7, fontSize: '15px' }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tool-card:hover h2 {
          text-decoration: underline;
        }
      `}</style>
    </main>
  )
}
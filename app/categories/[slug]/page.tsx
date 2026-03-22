import { getToolsByCategory } from '@/lib/tools'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const categoryMeta: Record<string, { name: string; description: string }> = {
  core: {
    name: 'Core PDF Tools',
    description: 'Essential tools for everyday PDF tasks — merge, split, compress, rotate and more.',
  },
  security: {
    name: 'PDF Security Tools',
    description: 'Protect, unlock, sign and watermark your PDF files quickly and for free.',
  },
  utility: {
    name: 'PDF Utility Tools',
    description: 'Advanced PDF utilities — crop, OCR, repair, reorder pages and more.',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      <style>{`
        .tool-card:hover h2 {
          text-decoration: underline;
        }
      `}</style>
    </main>
  )
}
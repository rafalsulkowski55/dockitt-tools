import Link from 'next/link'

const categories = [
  {
    slug: 'core',
    name: 'Core PDF Tools',
    description: 'Essential tools for everyday PDF tasks — merge, split, compress, rotate and more.',
  },
  {
    slug: 'security',
    name: 'PDF Security Tools',
    description: 'Protect, unlock, sign and watermark your PDF files quickly and for free.',
  },
  {
    slug: 'utility',
    name: 'PDF Utility Tools',
    description: 'Advanced PDF utilities — crop, OCR, repair, reorder pages and more.',
  },
]

export default function CategoriesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">PDF Tool Categories</h1>
      <p className="text-gray-600 mb-10">Browse all PDF tools by category.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
            className="border rounded-lg p-6 hover:shadow-md transition block tool-card"
          >
            <h2 className="font-semibold text-lg text-black">{cat.name}</h2>
            <p className="text-sm text-gray-500 mt-2">{cat.description}</p>
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
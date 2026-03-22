import { getAllGuides } from '@/data/guides/index'
import Link from 'next/link'

export default function GuidesPage() {
  const guides = getAllGuides()

  return (
    <main style={{ maxWidth: '720px', margin: '48px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>PDF Guides</h1>
      <p style={{ fontSize: '16px', color: '#555', marginBottom: '32px', lineHeight: 1.6 }}>
        Step-by-step guides for the most common PDF tasks — free and without any software.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            style={{
              display: 'block',
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              padding: '20px 24px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <p style={{ fontWeight: 600, color: '#111', margin: '0 0 4px 0', fontSize: '16px' }}>{guide.title}</p>
            <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>{guide.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
import { getGuideBySlug, getAllGuides } from '@/data/guides/index'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }))
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const card: React.CSSProperties = {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
  }

  return (
    <main style={{ maxWidth: '720px', margin: '48px auto', padding: '0 20px' }}>
      <nav style={{ fontSize: '13px', color: '#999', marginBottom: '24px' }}>
        <Link href="/" style={{ color: '#999' }}>Home</Link>
        {' / '}
        <Link href="/guides" style={{ color: '#999' }}>Guides</Link>
        {' / '}
        <span>{guide.title}</span>
      </nav>

      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>{guide.title}</h1>
      <p style={{ fontSize: '16px', color: '#555', marginBottom: '32px', lineHeight: 1.6 }}>{guide.intro}</p>

      <div style={card}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Step-by-step instructions</h2>
        <ol style={{ paddingLeft: '20px', lineHeight: 1.8 }}>
          {guide.steps.map((step, i) => (
            <li key={i} style={{ color: '#444', marginBottom: '4px' }}>{step}</li>
          ))}
        </ol>
      </div>

      <div style={card}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Common problems</h2>
        {guide.commonProblems.map((item, i) => (
          <div key={i} style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: 600, color: '#111', marginBottom: '4px' }}>{item.problem}</p>
            <p style={{ color: '#555', margin: 0 }}>{item.solution}</p>
          </div>
        ))}
      </div>

      <div style={card}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>FAQ</h2>
        {guide.faqs.map((faq, i) => (
          <div key={i} style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: 600, color: '#111', marginBottom: '4px' }}>{faq.question}</p>
            <p style={{ color: '#555', margin: 0 }}>{faq.answer}</p>
          </div>
        ))}
      </div>

      <div style={card}>
        <p style={{ fontWeight: 600, color: '#111', marginBottom: '12px' }}>Try it now</p>
        <Link
          href={`/tools/${guide.relatedTool}`}
          style={{
            display: 'inline-block',
            background: '#111',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            textDecoration: 'none',
          }}
        >
          Go to tool →
        </Link>
      </div>
    </main>
  )
}
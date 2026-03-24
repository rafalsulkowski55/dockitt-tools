import { getGuideBySlug, getAllGuides } from '@/data/guides/index'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type GuidePageProps = {
  params: Promise<{ slug: string }>
}

type GuideSection = {
  title: string
  intro?: string
  items?: string[]
  steps?: string[]
  outro?: string
}

type GuideWithExtras = {
  sections?: GuideSection[]
  steps?: string[]
  introList?: string[]
  introOutro?: string
  toolLinks?: { name: string; slug: string }[]
  relatedTools?: { name: string; slug: string; description: string }[]
  ctaText?: string
  ctaLinks?: { name: string; slug: string; description: string }[]
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return {}
  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://www.dockitt.com/guides/${slug}`,
      siteName: 'Dockitt',
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: guide.title,
      description: guide.description,
    },
  }
}

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }))
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const g = guide as typeof guide & GuideWithExtras

  const card: React.CSSProperties = {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
  }

  const howToSteps =
    g.sections && g.sections.length > 0
      ? g.sections.flatMap((section, sectionIndex) => {
          const sectionSteps = section.steps ?? []
          if (sectionSteps.length > 0) {
            return sectionSteps.map((step, stepIndex) => ({
              '@type': 'HowToStep',
              position: sectionIndex * 100 + stepIndex + 1,
              text: step,
            }))
          }
          return section.intro
            ? [{ '@type': 'HowToStep', position: sectionIndex + 1, text: section.intro }]
            : []
        })
      : (g.steps ?? []).map((step, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          text: step,
        }))

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.description,
    step: howToSteps,
  }

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <main style={{ maxWidth: '720px', margin: '48px auto', padding: '0 20px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />

      <nav style={{ fontSize: '13px', color: '#666', marginBottom: '24px' }}>
        <Link href="/" style={{ color: '#666' }}>Home</Link>
        {' / '}
        <Link href="/guides" style={{ color: '#666' }}>Guides</Link>
        {' / '}
        <span>{guide.title}</span>
      </nav>

      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>{guide.title}</h1>

      <p style={{ fontSize: '16px', color: '#555', marginBottom: g.introList ? '12px' : '32px', lineHeight: 1.6 }}>
        {guide.intro}
      </p>

      {g.introList && (
        <div style={{ marginBottom: '32px' }}>
          <ul style={{ paddingLeft: '20px', lineHeight: 1.9 }}>
            {g.introList.map((item, i) => (
              <li key={i} style={{ color: '#444', marginBottom: '4px' }}>{item}</li>
            ))}
          </ul>
          {g.introOutro && (
            <p style={{ fontSize: '15px', color: '#2563eb', fontWeight: 500, marginTop: '12px' }}>
              {g.introOutro}
            </p>
          )}
        </div>
      )}

      {g.toolLinks && g.toolLinks.length > 0 && (
        <div style={{ ...card, background: '#eff6ff', border: '1px solid #bfdbfe' }}>
          <p style={{ fontWeight: 600, color: '#111', marginBottom: '12px', marginTop: 0 }}>Quick access — editing tools:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {g.toolLinks.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                style={{
                  display: 'inline-block',
                  background: '#2563eb',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                {tool.name} →
              </Link>
            ))}
          </div>
        </div>
      )}

      {g.sections && g.sections.length > 0 ? (
        g.sections.map((section, i) => (
          <div key={i} style={card}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>{section.title}</h2>
            {section.intro && (
              <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '16px' }}>{section.intro}</p>
            )}
            {section.items && section.items.length > 0 && (
              <ul style={{ paddingLeft: '20px', lineHeight: 1.8, marginBottom: '16px' }}>
                {section.items.map((item, j) => (
                  <li key={j} style={{ color: '#444', marginBottom: '4px' }}>{item}</li>
                ))}
              </ul>
            )}
            {section.steps && section.steps.length > 0 && (
              <ol style={{ paddingLeft: '20px', lineHeight: 1.8, marginBottom: '16px' }}>
                {section.steps.map((step, j) => (
                  <li key={j} style={{ color: '#444', marginBottom: '4px' }}>{step}</li>
                ))}
              </ol>
            )}
            {section.outro && (
              <p style={{ color: '#555', lineHeight: 1.7, margin: 0 }}>{section.outro}</p>
            )}
          </div>
        ))
      ) : (
        <div style={card}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Step-by-step instructions</h2>
          <ol style={{ paddingLeft: '20px', lineHeight: 1.8 }}>
            {(g.steps ?? []).map((step, i) => (
              <li key={i} style={{ color: '#444', marginBottom: '4px' }}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      <div style={card}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Common problems</h2>
        {guide.commonProblems.map((item, i) => (
          <div key={i} style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: 600, color: '#111', marginBottom: '4px' }}>{item.problem}</p>
            <p style={{ color: '#555', margin: 0 }}>{item.solution}</p>
          </div>
        ))}
      </div>

      {g.relatedTools && g.relatedTools.length > 0 && (
        <div style={card}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Related tools</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {g.relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '14px 16px',
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontWeight: 600, color: '#111', fontSize: '15px' }}>{tool.name}</span>
                <span style={{ color: '#555', fontSize: '13px', marginTop: '4px' }}>{tool.description}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

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
        <p style={{ fontWeight: 600, color: '#111', marginBottom: '8px' }}>Try it now</p>
        {g.ctaText && (
          <p style={{ color: '#555', fontSize: '14px', marginBottom: '16px' }}>{g.ctaText}</p>
        )}
        {g.ctaLinks && g.ctaLinks.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {g.ctaLinks.map((link) => (
              <Link
                key={link.slug}
                href={`/tools/${link.slug}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: '#2563eb',
                  color: '#fff',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '14px',
                }}
              >
                <span>{link.name}</span>
                <span style={{ fontSize: '13px', opacity: 0.85 }}>{link.description} →</span>
              </Link>
            ))}
          </div>
        ) : (
          <Link
            href={`/tools/${guide.relatedTool}`}
            style={{
              display: 'inline-block',
              background: '#2563eb',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Go to tool →
          </Link>
        )}
      </div>
    </main>
  )
}
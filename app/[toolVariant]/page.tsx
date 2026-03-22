import { notFound } from 'next/navigation'
import { getAllVariants, getVariantBySlug } from '@/data/variants'
import { getToolBySlug } from '@/lib/tools'
import ToolUpload from '@/app/tools/[slug]/ToolUpload'
import MergeUpload from '@/app/tools/[slug]/MergeUpload'
import SplitUpload from '@/app/tools/[slug]/SplitUpload'
import RotateUpload from '@/app/tools/[slug]/RotateUpload'
import DeletePagesUpload from '@/app/tools/[slug]/DeletePagesUpload'
import ExtractPagesUpload from '@/app/tools/[slug]/ExtractPagesUpload'
import ProtectUpload from '@/app/tools/[slug]/ProtectUpload'
import UnlockUpload from '@/app/tools/[slug]/UnlockUpload'
import WatermarkUpload from '@/app/tools/[slug]/WatermarkUpload'
import SignUpload from '@/app/tools/[slug]/SignUpload'
import CropUpload from '@/app/tools/[slug]/CropUpload'
import ReorderUpload from '@/app/tools/[slug]/ReorderUpload'
import RepairUpload from '@/app/tools/[slug]/RepairUpload'
import OcrUpload from '@/app/tools/[slug]/OcrUpload'
import Link from 'next/link'

type Props = {
  params: Promise<{ toolVariant: string }>
}

export async function generateMetadata({ params }: Props) {
  const { toolVariant } = await params
  const variant = getVariantBySlug(toolVariant)
  if (!variant) return {}
  return {
    title: variant.title,
    description: variant.description,
    alternates: {
      canonical: `https://www.dockitt.com/tools/${variant.toolSlug}`,
    },
  }
}

export async function generateStaticParams() {
  return getAllVariants().map((v) => ({ toolVariant: v.slug }))
}

function ToolComponent({ slug }: { slug: string }) {
  switch (slug) {
    case 'compress-pdf': return <ToolUpload />
    case 'merge-pdf': return <MergeUpload />
    case 'split-pdf': return <SplitUpload />
    case 'rotate-pdf': return <RotateUpload />
    case 'delete-pdf-pages': return <DeletePagesUpload />
    case 'extract-pdf-pages': return <ExtractPagesUpload />
    case 'protect-pdf': return <ProtectUpload />
    case 'unlock-pdf': return <UnlockUpload />
    case 'watermark-pdf': return <WatermarkUpload />
    case 'sign-pdf': return <SignUpload />
    case 'crop-pdf': return <CropUpload />
    case 'reorder-pdf-pages': return <ReorderUpload />
    case 'repair-pdf': return <RepairUpload />
    case 'ocr-pdf': return <OcrUpload />
    default: return <ToolUpload />
  }
}

export default async function ToolVariantPage({ params }: Props) {
  const { toolVariant } = await params
  const variant = getVariantBySlug(toolVariant)
  if (!variant) notFound()

  const tool = getToolBySlug(variant.toolSlug)
  if (!tool) notFound()

  const related = tool.relatedTools ?? []

  return (
    <main style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

        <section>
          <nav style={{ fontSize: '13px', color: '#999', marginBottom: '16px' }}>
            <Link href="/" style={{ color: '#999' }}>Home</Link>
            {' / '}
            <Link href={`/tools/${tool.slug}`} style={{ color: '#999' }}>{tool.name}</Link>
          </nav>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>
            {variant.h1}
          </h1>
          <p style={{ fontSize: '18px', color: '#555', margin: 0 }}>
            {variant.intro}
          </p>
        </section>

        <section style={{
          background: '#ffffff', border: '1px solid #e5e7eb',
          borderRadius: '16px', padding: '24px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            border: '2px dashed #d1d5db', borderRadius: '12px',
            padding: '32px', background: '#fafafa',
          }}>
            <ToolComponent slug={variant.toolSlug} />
          </div>
        </section>

        {tool.longDescription && (
          <section style={{
            background: '#ffffff', border: '1px solid #e5e7eb',
            borderRadius: '16px', padding: '24px',
          }}>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.8', margin: 0 }}>
              {tool.longDescription}
            </p>
          </section>
        )}

        <section style={{
          background: '#ffffff', border: '1px solid #e5e7eb',
          borderRadius: '16px', padding: '24px',
        }}>
          <h2 style={{ marginTop: 0, fontSize: '20px' }}>How to use</h2>
          <ol style={{ paddingLeft: '20px', margin: 0 }}>
            {tool.howTo.map((step) => (
              <li key={step} style={{ marginBottom: '10px', color: '#444' }}>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section style={{
          background: '#ffffff', border: '1px solid #e5e7eb',
          borderRadius: '16px', padding: '24px',
        }}>
          <h2 style={{ marginTop: 0, fontSize: '20px' }}>FAQ</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {tool.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '17px' }}>
                  {faq.question}
                </h3>
                <p style={{ margin: 0, color: '#555' }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          background: '#ffffff', border: '1px solid #e5e7eb',
          borderRadius: '16px', padding: '24px',
        }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#999' }}>
            This is a variant of the main tool:
          </p>
          <Link
            href={`/tools/${tool.slug}`}
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
            Go to {tool.name} →
          </Link>
        </section>

        {related.length > 0 && (
          <section style={{
            background: '#ffffff', border: '1px solid #e5e7eb',
            borderRadius: '16px', padding: '24px',
          }}>
            <h2 style={{ marginTop: 0, fontSize: '20px' }}>Related Tools</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {related.map((relatedSlug) => {
                const relatedTool = getToolBySlug(relatedSlug)
                if (!relatedTool) return null
                return (
                  <Link
                    key={relatedSlug}
                    href={`/tools/${relatedSlug}`}
                    style={{
                      display: 'flex', flexDirection: 'column',
                      padding: '16px', background: '#f9fafb',
                      border: '1px solid #e5e7eb', borderRadius: '12px',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ fontWeight: 600, color: '#111', fontSize: '15px' }}>
                      {relatedTool.name}
                    </span>
                    <span style={{ color: '#666', fontSize: '13px', marginTop: '4px' }}>
                      {relatedTool.shortDescription}
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

      </div>
    </main>
  )
}
import { howToCompressPdf } from './how-to-compress-pdf'

export const guides = [
  howToCompressPdf,
]

export function getAllGuides() {
  return guides
}

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}
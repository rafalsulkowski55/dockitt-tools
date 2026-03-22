import { getAllTools } from '@/lib/tools'
import { getAllConvertVariants } from '@/data/convert/variants'

export default function sitemap() {
  const baseUrl = 'https://www.dockitt.com'

  const tools = getAllTools()
  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const convertVariants = getAllConvertVariants()
  const convertUrls = convertVariants.map((variant) => ({
    url: `${baseUrl}/convert-pdf/${variant.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const staticPages = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/convert-pdf`, priority: 0.9 },
    { url: `${baseUrl}/about`, priority: 0.4 },
    { url: `${baseUrl}/contact`, priority: 0.4 },
    { url: `${baseUrl}/privacy`, priority: 0.3 },
    { url: `${baseUrl}/terms`, priority: 0.3 },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...toolUrls, ...convertUrls]
}
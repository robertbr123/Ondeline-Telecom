import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ondeline.com.br'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/private', '/_next', '/static'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
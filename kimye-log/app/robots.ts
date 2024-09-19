import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = process.env.NEXT_PUBLIC_VERCEL_URL + '/sitemap.xml';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/signin/', '/write/'],
    },
    sitemap: sitemapUrl,
  }
}

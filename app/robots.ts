import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://crystalindex.co.uk'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/users/',
          '/profile/',
          '/collections/',
          '/crystals/add',
          '/locations/add',
          '/crystal-infos/add',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}




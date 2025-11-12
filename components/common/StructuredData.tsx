import { ReactNode } from 'react'

interface StructuredDataProps {
  data: Record<string, any>
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Crystal Index',
    url: 'https://crystalindex.co.uk',
    logo: 'https://crystalindex.co.uk/logo.png',
    description: 'The world\'s most accurate crystal identifier and index.',
    sameAs: [
      // Add social media links when available
    ],
  }

  return <StructuredData data={data} />
}

export function WebSiteSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Crystal Index',
    url: 'https://crystalindex.co.uk',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://crystalindex.co.uk/crystals?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return <StructuredData data={data} />
}

export function ArticleSchema({
  title,
  description,
  image,
  publishedAt,
  updatedAt,
  author,
  tags,
}: {
  title: string
  description?: string
  image?: string
  publishedAt?: Date
  updatedAt?: Date
  author?: string
  tags?: string[]
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image ? [image] : undefined,
    datePublished: publishedAt?.toISOString(),
    dateModified: updatedAt?.toISOString(),
    author: {
      '@type': 'Organization',
      name: author || 'Crystal Index',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Crystal Index',
      logo: {
        '@type': 'ImageObject',
        url: 'https://crystalindex.co.uk/logo.png',
      },
    },
    keywords: tags?.join(', '),
  }

  return <StructuredData data={data} />
}

export function ProductSchema({
  name,
  description,
  image,
  price,
  currency = 'GBP',
}: {
  name: string
  description?: string
  image?: string
  price?: number
  currency?: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image ? [image] : undefined,
    offers: price
      ? {
          '@type': 'Offer',
          price,
          priceCurrency: currency,
          availability: 'https://schema.org/InStock',
        }
      : undefined,
  }

  return <StructuredData data={data} />
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <StructuredData data={data} />
}


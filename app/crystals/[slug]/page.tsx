import { findAndSerializeCrystal, findAndSerializeCrystalBySlug } from '../../../lib/helpers/serializeCrystalDates';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ViewCrystal from '../../../components/ViewCrystal';
import { ProductSchema, BreadcrumbSchema } from '../../../components/common/StructuredData';
import StructuredData from '../../../components/common/StructuredData';
import { enrichCrystalData, getAllEnrichedCrystalNames } from '../../../lib/crystal-data-enrichment';
import { slugify } from '../../../lib/helpers/slugify';

/**
 * Resolve a crystal from either a slug ("rose-quartz") or a legacy numeric ID ("42").
 * Numeric IDs redirect to the canonical slug URL so link equity is consolidated.
 */
async function resolveCrystal(param: string) {
  const numericId = parseInt(param, 10)

  if (!isNaN(numericId) && String(numericId) === param) {
    // Pure numeric string — legacy ID route; redirect to slug
    const crystal = await findAndSerializeCrystal(numericId)
    if (crystal) {
      const slug = crystal.slug || slugify(crystal.name)
      redirect(`/crystals/${slug}`)
    }
    return null
  }

  return findAndSerializeCrystalBySlug(param)
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const serialisableCrystal = await resolveCrystal(params.slug)

  if (!serialisableCrystal) {
    return { title: 'Crystal not found | Crystal Index' }
  }

  const enrichedData = enrichCrystalData(serialisableCrystal.name)
  const crystalName = serialisableCrystal.name
  const description = enrichedData?.description || serialisableCrystal.crystalInfo?.info || `Discover ${crystalName} — its healing properties, chakras, zodiac associations, and how to work with this crystal.`

  const seoKeywords = [
    crystalName,
    `${crystalName} properties`,
    `${crystalName} meaning`,
    `${crystalName} healing`,
    `${crystalName} chakra`,
    'crystal identification',
    'crystal index',
    ...(enrichedData?.chakras || serialisableCrystal.crystalInfo?.chakra || []),
    ...(enrichedData?.zodiacSigns || []),
    ...(enrichedData?.keywords || []),
    ...(enrichedData?.properties?.slice(0, 5) || []),
    ...(serialisableCrystal.crystalInfo?.colour || []),
  ]

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://crystalindex.co.uk'
  const crystalSlug = serialisableCrystal.slug || slugify(crystalName)
  const imageUrl = serialisableCrystal.image?.[0]?.blobUrl ||
    (serialisableCrystal.image?.[0] ? `${baseUrl}/api/image/${typeof serialisableCrystal.image[0] === 'object' ? serialisableCrystal.image[0].id : serialisableCrystal.image[0]}` : undefined)

  return {
    title: `${crystalName} — Properties, Meaning & Healing | Crystal Index`,
    description: `${description} Learn about ${crystalName}'s chakras, zodiac connections, and care instructions.`,
    keywords: seoKeywords,
    openGraph: {
      title: `${crystalName} — Properties, Meaning & Healing`,
      description,
      url: `${baseUrl}/crystals/${crystalSlug}`,
      siteName: 'Crystal Index',
      type: 'article',
      ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630, alt: `${crystalName} crystal` }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${crystalName} — Crystal Index`,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    alternates: {
      canonical: `${baseUrl}/crystals/${crystalSlug}`,
    },
  }
}

export default async function Page({
  params,
}: {
  params: { slug: string }
}) {
  // resolveCrystal may internally call redirect() for numeric IDs — that throws
  // a Next.js redirect which propagates correctly
  const serialisableCrystal = await resolveCrystal(params.slug)

  if (!serialisableCrystal) {
    notFound()
  }

  const enrichedData = enrichCrystalData(serialisableCrystal.name)
  const allCrystalNames = getAllEnrichedCrystalNames()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://crystalindex.co.uk'
  const crystalSlug = serialisableCrystal.slug || slugify(serialisableCrystal.name)
  const imageUrl = serialisableCrystal.image?.[0]?.blobUrl ||
    (serialisableCrystal.image?.[0] ? `${baseUrl}/api/image/${typeof serialisableCrystal.image[0] === 'object' ? serialisableCrystal.image[0].id : serialisableCrystal.image[0]}` : undefined)

  const crystalName = serialisableCrystal.name
  const description = enrichedData?.description || serialisableCrystal.crystalInfo?.info || ''

  // Build FAQ schema from enriched data
  const faqItems: Array<{ question: string; answer: string }> = []

  if (enrichedData?.metaphysicalProperties) {
    faqItems.push({
      question: `What are the metaphysical properties of ${crystalName}?`,
      answer: enrichedData.metaphysicalProperties,
    })
  }

  if (enrichedData?.chakras?.length) {
    faqItems.push({
      question: `What chakras does ${crystalName} align with?`,
      answer: `${crystalName} is associated with the ${enrichedData.chakras.join(', ')} chakra${enrichedData.chakras.length > 1 ? 's' : ''}.`,
    })
  }

  if (enrichedData?.careInstructions?.cleansing?.length) {
    faqItems.push({
      question: `How do you cleanse ${crystalName}?`,
      answer: `${crystalName} can be cleansed using ${enrichedData.careInstructions.cleansing.join(', ')}.`,
    })
  }

  if (enrichedData?.zodiacSigns?.length) {
    faqItems.push({
      question: `What zodiac signs is ${crystalName} best for?`,
      answer: `${crystalName} is particularly beneficial for ${enrichedData.zodiacSigns.join(', ')}.`,
    })
  }

  if (enrichedData?.historicalUse) {
    faqItems.push({
      question: `What is the history of ${crystalName}?`,
      answer: enrichedData.historicalUse,
    })
  }

  // FAQPage schema
  const faqSchema = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null

  // Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${crystalName} — Properties, Meaning & Healing`,
    description,
    image: imageUrl ? [imageUrl] : undefined,
    author: {
      '@type': 'Organization',
      name: 'Crystal Index',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Crystal Index',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    keywords: [
      ...(enrichedData?.keywords || []),
      ...(enrichedData?.properties?.slice(0, 5) || []),
      crystalName,
    ].join(', '),
  }

  return (
    <>
      <ProductSchema
        name={crystalName}
        description={description}
        image={imageUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Crystals', url: `${baseUrl}/crystals` },
          { name: crystalName, url: `${baseUrl}/crystals/${crystalSlug}` },
        ]}
      />
      <StructuredData data={articleSchema} />
      {faqSchema && <StructuredData data={faqSchema} />}
      <ViewCrystal
        crystal={serialisableCrystal}
        enrichedData={enrichedData}
        allCrystalNames={allCrystalNames}
      />
    </>
  )
}

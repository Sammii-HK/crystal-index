import { findAndSerializeCrystal, findAndSerializeCrystalBySlug } from '../../../lib/helpers/serializeCrystalDates';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ViewCrystal from '../../../components/ViewCrystal';
import { ProductSchema, BreadcrumbSchema } from '../../../components/common/StructuredData';
import StructuredData from '../../../components/common/StructuredData';
import CrystalSEOContent from '../../../components/CrystalSEOContent';
import { enrichCrystalData, getAllEnrichedCrystalNames } from '../../../lib/crystal-data-enrichment';
import { slugify } from '../../../lib/helpers/slugify';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://crystalindex.co.uk'

async function resolveCrystal(param: string) {
  const numericId = parseInt(param, 10)
  if (!isNaN(numericId) && String(numericId) === param) {
    const crystal = await findAndSerializeCrystal(numericId)
    if (crystal) {
      redirect(`/crystals/${crystal.slug || slugify(crystal.name)}`)
    }
    return null
  }
  return findAndSerializeCrystalBySlug(param)
}

function getImageUrl(crystal: any): string | undefined {
  return crystal.image?.[0]?.blobUrl ||
    (crystal.image?.[0]
      ? `${BASE_URL}/api/image/${typeof crystal.image[0] === 'object' ? crystal.image[0].id : crystal.image[0]}`
      : undefined)
}

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const crystal = await resolveCrystal(params.id)
  if (!crystal) return { title: 'Crystal not found | Crystal Index' }

  const e = enrichCrystalData(crystal.name)
  const name = crystal.name
  const crystalSlug = crystal.slug || slugify(name)
  const imageUrl = getImageUrl(crystal)

  const description = e?.description || crystal.crystalInfo?.info ||
    `${name} is a crystal known for ${(e?.properties || []).slice(0, 3).join(', ')}. Discover its healing properties, chakra associations, and how to work with it.`

  // Rich meta description with specific facts
  const metaDesc = [
    description.slice(0, 120).replace(/\s+\S+$/, ''),
    e?.chakras?.length ? `Associated with the ${e.chakras.join(' and ')} chakra${e.chakras.length > 1 ? 's' : ''}.` : '',
    e?.zodiacSigns?.length ? `Zodiac: ${e.zodiacSigns.slice(0, 3).join(', ')}.` : '',
    e?.hardness ? `Mohs hardness ${e.hardness}.` : '',
  ].filter(Boolean).join(' ').slice(0, 160)

  const keywords = [
    name,
    ...(e?.alternativeNames || []),
    `${name} meaning`,
    `${name} properties`,
    `${name} healing properties`,
    `${name} chakra`,
    `${name} zodiac`,
    `${name} crystal`,
    `${name} stone`,
    `${name} benefits`,
    `${name} uses`,
    `${name} how to use`,
    `${name} cleansing`,
    ...(e?.chakras || []).map(c => `${c} chakra crystals`),
    ...(e?.zodiacSigns || []).map(z => `${z} crystals`),
    ...(e?.properties || []).slice(0, 6),
    ...(e?.keywords || []),
    ...(crystal.crystalInfo?.colour || []),
    'crystal healing',
    'crystal meanings',
    'crystal properties',
  ]

  return {
    title: `${name} Crystal — Meaning, Properties & Healing | Crystal Index`,
    description: metaDesc,
    keywords,
    openGraph: {
      title: `${name} Crystal — Meaning, Properties & Healing`,
      description: metaDesc,
      url: `${BASE_URL}/crystals/${crystalSlug}`,
      siteName: 'Crystal Index',
      type: 'article',
      ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630, alt: `${name} crystal` }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} Crystal — Crystal Index`,
      description: metaDesc,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    alternates: { canonical: `${BASE_URL}/crystals/${crystalSlug}` },
  }
}

function buildFaqItems(name: string, e: ReturnType<typeof enrichCrystalData>, crystal: any) {
  const items: Array<{ question: string; answer: string }> = []
  const push = (q: string, a: string) => items.push({ question: q, answer: a })

  const desc = e?.description || crystal.crystalInfo?.info
  if (desc) push(`What is ${name}?`, desc)

  if (e?.properties?.length)
    push(`What is ${name} used for?`, `${name} is used for ${e.properties.join(', ')}.`)

  if (e?.metaphysicalProperties)
    push(`What are the healing properties of ${name}?`, e.metaphysicalProperties)

  if (e?.chakras?.length)
    push(
      `What chakra is ${name} associated with?`,
      `${name} is associated with the ${e.chakras.join(' and ')} chakra${e.chakras.length > 1 ? 's' : ''}.`
    )

  if (e?.zodiacSigns?.length)
    push(
      `What zodiac signs is ${name} for?`,
      `${name} is beneficial for ${e.zodiacSigns.join(', ')}.`
    )

  if (e?.elements?.length)
    push(`What element is ${name}?`, `${name} is associated with the ${e.elements.join(' and ')} element${e.elements.length > 1 ? 's' : ''}.`)

  if (e?.planets?.length)
    push(`What planet rules ${name}?`, `${name} is ruled by ${e.planets.join(' and ')}.`)

  if (e?.hardness)
    push(`How hard is ${name}?`, `${name} has a Mohs hardness of ${e.hardness}.`)

  if (e?.colors?.length)
    push(`What colour is ${name}?`, `${name} is typically ${e.colors.join(', ')}.`)

  if (e?.careInstructions?.cleansing?.length)
    push(
      `How do you cleanse ${name}?`,
      `${name} can be cleansed using ${e.careInstructions.cleansing.join(', ')}.`
    )

  if (e?.careInstructions?.charging?.length)
    push(
      `How do you charge ${name}?`,
      `Charge ${name} using ${e.careInstructions.charging.join(', ')}.`
    )

  if (e?.combinations?.enhances?.length)
    push(
      `What crystals pair well with ${name}?`,
      `${name} works well with ${e.combinations.enhances.concat(e.combinations.complements || []).join(', ')}.`
    )

  if (e?.historicalUse)
    push(`What is the history of ${name}?`, e.historicalUse)

  if (e?.workingWith?.meditation)
    push(`How do you meditate with ${name}?`, e.workingWith.meditation)

  if (e?.correspondences?.tarot?.length)
    push(
      `What tarot cards are associated with ${name}?`,
      `${name} corresponds to the following tarot cards: ${e.correspondences.tarot.join(', ')}.`
    )

  if (e?.alternativeNames?.length)
    push(
      `What are other names for ${name}?`,
      `${name} is also known as ${e.alternativeNames.join(', ')}.`
    )

  if (e?.rarity)
    push(`Is ${name} rare?`, `${name} is considered ${e.rarity}.`)

  return items
}

export default async function Page({ params }: { params: { id: string } }) {
  const crystal = await resolveCrystal(params.id)
  if (!crystal) notFound()

  const enrichedData = enrichCrystalData(crystal.name)
  const allCrystalNames = getAllEnrichedCrystalNames()
  const crystalSlug = crystal.slug || slugify(crystal.name)
  const imageUrl = getImageUrl(crystal)
  const name = crystal.name
  const description = enrichedData?.description || crystal.crystalInfo?.info || ''

  const faqItems = buildFaqItems(name, enrichedData, crystal)

  const faqSchema = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${name} Crystal — Meaning, Properties & Healing`,
    description,
    image: imageUrl ? [imageUrl] : undefined,
    author: { '@type': 'Organization', name: 'Crystal Index', url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Crystal Index',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
    },
    about: {
      '@type': 'Thing',
      name,
      description,
      ...(enrichedData?.alternativeNames?.length ? { alternateName: enrichedData.alternativeNames } : {}),
    },
    keywords: [
      ...(enrichedData?.keywords || []),
      ...(enrichedData?.properties?.slice(0, 8) || []),
      name,
    ].join(', '),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article', 'h1', 'h2', 'h3', '[aria-label]'],
    },
  }

  // MineralItem schema for factual data
  const mineralSchema = {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    name,
    description,
    ...(enrichedData?.alternativeNames?.length ? { alternateName: enrichedData.alternativeNames } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    url: `${BASE_URL}/crystals/${crystalSlug}`,
  }

  return (
    <>
      <ProductSchema name={name} description={description} image={imageUrl} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: BASE_URL },
          { name: 'Crystals', url: `${BASE_URL}/crystals` },
          { name, url: `${BASE_URL}/crystals/${crystalSlug}` },
        ]}
      />
      <StructuredData data={articleSchema} />
      <StructuredData data={mineralSchema} />
      {faqSchema && <StructuredData data={faqSchema} />}
      <ViewCrystal
        crystal={crystal}
        enrichedData={enrichedData}
        allCrystalNames={allCrystalNames}
      />
      <CrystalSEOContent crystal={crystal} enrichedData={enrichedData} />
    </>
  )
}

import Link from 'next/link'
import { slugify } from '../../lib/helpers/slugify'

interface FeaturedCrystal {
  id: number
  name: string
  slug?: string | null
  chakra: string[]
  colour: string[]
  crystalInfo: {
    info: string | null
    colour: string[] | null
    chakra: string[] | null
  } | null
  image: Array<{ blobUrl: string | null }>
}

const CHAKRA_COLOURS: Record<string, string> = {
  crown: '#9c4cc5',
  'third eye': '#0066cc',
  throat: '#16c3c3',
  heart: '#95c012',
  'solar plexus': '#daa000',
  sacral: '#eb5e00',
  root: '#c82020',
}

async function getFeaturedCrystals(): Promise<FeaturedCrystal[]> {
  const basePath = process.env.NEXT_PUBLIC_SITE_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  try {
    const res = await fetch(`${basePath}/api/v1/crystals?limit=8`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) return []

    const data = await res.json()
    return data.crystals || []
  } catch {
    return []
  }
}

export default async function FeaturedCrystals() {
  const crystals = await getFeaturedCrystals()

  if (crystals.length === 0) return null

  return (
    <section className="section" style={{
      background: 'radial-gradient(ellipse at 50% 0%, rgba(147, 51, 234, 0.06) 0%, transparent 60%)',
    }}>
      <div className="container">
        <h2 className="title is-2 has-text-centered mb-2">
          Popular crystals
        </h2>
        <p className="has-text-centered mb-6" style={{ opacity: 0.6 }}>
          Start exploring the collection
        </p>

        <div className="columns is-multiline">
          {crystals.map((crystal) => {
            const imageUrl = crystal.image?.[0]?.blobUrl
            const primaryChakra = crystal.chakra?.[0]
            const description = crystal.crystalInfo?.info
            const truncated = description
              ? description.length > 80
                ? description.slice(0, 80).trim() + '...'
                : description
              : null

            return (
              <div key={crystal.id} className="column is-3">
                <Link href={`/crystals/${crystal.slug || slugify(crystal.name)}`} style={{ display: 'block' }}>
                  <div className="box featured-crystal-card" style={{
                    height: '100%',
                    border: '1px solid rgba(147, 51, 234, 0.1)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    padding: 0,
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}>
                    {imageUrl && (
                      <div style={{
                        width: '100%',
                        paddingBottom: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                      }}>
                        <img
                          src={imageUrl}
                          alt={crystal.name}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div style={{ padding: '1rem' }}>
                      <h3 className="title is-6 mb-2" style={{ textTransform: 'capitalize' }}>
                        {crystal.name}
                      </h3>
                      {primaryChakra && (
                        <span className="tag is-small mb-2" style={{
                          backgroundColor: CHAKRA_COLOURS[primaryChakra] || '#9333EA',
                          color: '#fff',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          textTransform: 'capitalize',
                        }}>
                          {primaryChakra}
                        </span>
                      )}
                      {truncated && (
                        <p style={{
                          fontSize: '0.85rem',
                          opacity: 0.65,
                          lineHeight: 1.5,
                          marginTop: '0.5rem',
                        }}>
                          {truncated}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        <div className="has-text-centered mt-5">
          <Link
            href="/crystals"
            className="button is-primary is-outlined"
            style={{ borderRadius: '8px', fontWeight: 600 }}
          >
            View all crystals &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}

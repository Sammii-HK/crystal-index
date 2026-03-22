import Link from 'next/link'
import crystalData from '../../data/crystals.json'

const CHAKRA_COLOURS: Record<string, string> = {
  crown: '#9c4cc5',
  'third eye': '#0066cc',
  throat: '#16c3c3',
  heart: '#95c012',
  'solar plexus': '#daa000',
  sacral: '#eb5e00',
  root: '#c82020',
}

const FEATURED_NAMES = [
  'Rose Quartz', 'Amethyst', 'Black Tourmaline', 'Citrine',
  'Lapis Lazuli', 'Selenite', 'Obsidian', 'Moonstone',
]

export default function FeaturedCrystals() {
  const crystals = FEATURED_NAMES.map(name =>
    (crystalData as any[]).find(c => c.name === name)
  ).filter(Boolean)

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
          {crystals.map((crystal: any) => {
            const slug = crystal.name.toLowerCase().replace(/\s+/g, '-')
            const primaryChakra = crystal.chakras?.[0]?.toLowerCase()
            const description = crystal.description

            return (
              <div key={crystal.id} className="column is-3">
                <Link href={`/crystals/${slug}`} style={{ display: 'block', height: '100%' }}>
                  <div className="box" style={{
                    height: '100%',
                    border: '1px solid rgba(147, 51, 234, 0.1)',
                    borderRadius: '12px',
                  }}>
                    <h3 className="title is-6 mb-2">{crystal.name}</h3>
                    {primaryChakra && (
                      <span className="tag is-small mb-3" style={{
                        backgroundColor: CHAKRA_COLOURS[primaryChakra] || '#9333EA',
                        color: '#fff',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        textTransform: 'capitalize',
                      }}>
                        {primaryChakra} chakra
                      </span>
                    )}
                    {description && (
                      <p style={{ fontSize: '0.85rem', opacity: 0.65, lineHeight: 1.5 }}>
                        {description.length > 100 ? description.slice(0, 100).trim() + '\u2026' : description}
                      </p>
                    )}
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
            View all 215 crystals &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}

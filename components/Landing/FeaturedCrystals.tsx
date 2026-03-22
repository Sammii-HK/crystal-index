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
        <p className="has-text-centered mb-6" style={{ color: 'var(--ci-text-muted)' }}>
          Start exploring the collection
        </p>

        <div className="columns is-multiline">
          {crystals.map((crystal: any) => {
            const slug = crystal.name.toLowerCase().replace(/\s+/g, '-')
            const primaryChakra = crystal.chakras?.[0]?.toLowerCase()

            return (
              <div key={crystal.id} className="column is-3">
                <Link href={`/crystals/${slug}`} style={{ display: 'block', height: '100%' }}>
                  <div style={{
                    height: '100%',
                    background: 'var(--ci-card-bg)',
                    border: '1px solid var(--ci-card-border)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    transition: 'border-color 0.2s ease, transform 0.2s ease',
                  }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ci-text)', marginBottom: '0.5rem' }}>{crystal.name}</h3>
                    {primaryChakra && (
                      <span style={{
                        display: 'inline-block',
                        backgroundColor: CHAKRA_COLOURS[primaryChakra] || '#9333EA',
                        color: '#fff',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                        padding: '0.15rem 0.5rem',
                        marginBottom: '0.6rem',
                      }}>
                        {primaryChakra} chakra
                      </span>
                    )}
                    {crystal.description && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--ci-text-muted)', lineHeight: 1.5 }}>
                        {crystal.description.length > 100
                          ? crystal.description.slice(0, 100).trim() + '\u2026'
                          : crystal.description}
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

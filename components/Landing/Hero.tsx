import Link from 'next/link'
import crystalData from '../../data/crystals.json'

// Background colours for crystal mosaic tiles
const COLOUR_MAP: Record<string, string> = {
  purple:   'rgba(147,51,234,0.88)',
  violet:   'rgba(124,58,237,0.88)',
  lavender: 'rgba(109,40,217,0.88)',   // darkened so white text works in dark; class handles light
  pink:     'rgba(236,72,153,0.88)',
  rose:     'rgba(244,63,94,0.88)',
  red:      'rgba(220,38,38,0.88)',
  orange:   'rgba(234,88,12,0.88)',
  yellow:   'rgba(161,98,7,0.92)',      // amber-gold, dark enough
  gold:     'rgba(133,77,14,0.92)',     // dark amber
  green:    'rgba(21,128,61,0.92)',     // darker green
  teal:     'rgba(15,118,110,0.92)',    // darker teal
  blue:     'rgba(37,99,235,0.88)',
  indigo:   'rgba(67,56,202,0.88)',
  white:    'rgba(71,85,105,0.92)',     // slate — dark enough for white text in dark mode
  grey:     'rgba(51,65,85,0.92)',
  gray:     'rgba(51,65,85,0.92)',
  black:    'rgba(15,23,42,0.95)',
  brown:    'rgba(120,53,15,0.88)',
  silver:   'rgba(71,85,105,0.88)',
  copper:   'rgba(154,52,18,0.88)',
}

// These colours, even darkened, may render light-ish on a light page background.
// The CSS class ci-tile-text--on-light switches text to dark in light mode.
const NEEDS_DARK_TEXT_IN_LIGHT = new Set(['white', 'grey', 'gray', 'silver'])

function getColour(colors: string[]): { bg: string; lightClass: boolean } {
  for (const c of colors) {
    const lower = c.toLowerCase()
    for (const [key, value] of Object.entries(COLOUR_MAP)) {
      if (lower.includes(key)) {
        return { bg: value, lightClass: NEEDS_DARK_TEXT_IN_LIGHT.has(key) }
      }
    }
  }
  return { bg: 'rgba(147,51,234,0.88)', lightClass: false }
}

const FEATURED = [
  'Rose Quartz', 'Amethyst', 'Black Tourmaline', 'Citrine',
  'Lapis Lazuli', 'Selenite', 'Obsidian', 'Moonstone',
  'Malachite', 'Labradorite', 'Carnelian', 'Clear Quartz',
]

export default function Hero() {
  const featured = FEATURED.map(name => {
    const crystal = (crystalData as any[]).find(c => c.name === name)
    return { name, colors: crystal?.colors || [] }
  })

  return (
    <section className="hero" style={{
      background: 'radial-gradient(ellipse at 30% 60%, rgba(147,51,234,0.1) 0%, transparent 60%)',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div className="hero-body" style={{ width: '100%', padding: '4rem 1.5rem 3rem' }}>
        <div className="container">
          <div className="columns is-vcentered">

            {/* Left — copy */}
            <div className="column is-5">
              <p style={{
                color: 'var(--ci-accent)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}>
                Crystal encyclopaedia + iOS app
              </p>

              <h1 className="title" style={{
                fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                color: 'var(--ci-text)',
              }}>
                Every crystal<br />has a story
              </h1>

              <p style={{
                fontSize: '1.15rem',
                color: 'var(--ci-text-muted)',
                lineHeight: 1.75,
                marginBottom: '2.25rem',
                maxWidth: '480px',
              }}>
                215 crystals with detailed properties, chakra associations, zodiac connections, care guides, and AI identification. Browse on the web or start your collection with the iOS app.
              </p>

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem', alignItems: 'center' }}>
                <Link
                  href="https://apps.apple.com/app/crystal-index/id6740543879"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: 'var(--ci-text)',
                    color: 'var(--ci-bg)',
                    borderRadius: '10px',
                    padding: '0.7rem 1.3rem',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Download on App Store
                </Link>
                <Link
                  href="/crystals"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderRadius: '10px',
                    padding: '0.7rem 1.3rem',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    color: 'var(--ci-accent)',
                    border: '1px solid var(--ci-accent)',
                    background: 'var(--ci-icon-bg)',
                  }}
                >
                  Browse crystals
                </Link>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                {[
                  { value: '215+', label: 'Crystals' },
                  { value: 'AI', label: 'Identification' },
                  { value: '7 Days', label: 'Full access' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ci-text)', lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ci-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.25rem' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — crystal mosaic */}
            <div className="column is-6 is-offset-1 is-hidden-mobile">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.65rem',
              }}>
                {featured.map(({ name, colors }) => {
                  const { bg, lightClass } = getColour(colors)
                  return (
                    <Link
                      key={name}
                      href={`/crystals/${name.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{
                        display: 'block',
                        background: bg,
                        borderRadius: '10px',
                        padding: '1.1rem 0.85rem',
                        textDecoration: 'none',
                      }}
                    >
                      <p className={lightClass ? 'ci-tile-text ci-tile-text--on-light' : 'ci-tile-text'}>
                        {name}
                      </p>
                    </Link>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

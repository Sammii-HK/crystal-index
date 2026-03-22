import Link from 'next/link'
import crystalData from '../../data/crystals.json'

const COLOUR_MAP: Record<string, string> = {
  purple: 'rgba(147,51,234,0.75)',
  violet: 'rgba(124,58,237,0.75)',
  lavender: 'rgba(167,139,250,0.65)',
  pink: 'rgba(236,72,153,0.75)',
  rose: 'rgba(244,63,94,0.75)',
  red: 'rgba(220,38,38,0.75)',
  orange: 'rgba(234,88,12,0.75)',
  yellow: 'rgba(202,138,4,0.75)',
  gold: 'rgba(161,98,7,0.75)',
  green: 'rgba(22,163,74,0.75)',
  teal: 'rgba(13,148,136,0.75)',
  blue: 'rgba(37,99,235,0.75)',
  indigo: 'rgba(67,56,202,0.75)',
  white: 'rgba(100,116,139,0.5)',
  grey: 'rgba(71,85,105,0.65)',
  gray: 'rgba(71,85,105,0.65)',
  black: 'rgba(15,23,42,0.9)',
  brown: 'rgba(120,53,15,0.75)',
  silver: 'rgba(100,116,139,0.55)',
  copper: 'rgba(180,83,9,0.75)',
}

function getColour(colors: string[]): string {
  for (const c of colors) {
    const lower = c.toLowerCase()
    for (const [key, value] of Object.entries(COLOUR_MAP)) {
      if (lower.includes(key)) return value
    }
  }
  return 'rgba(147,51,234,0.55)'
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
      background: 'radial-gradient(ellipse at 30% 60%, rgba(147,51,234,0.12) 0%, transparent 60%)',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div className="hero-body" style={{ width: '100%', padding: '4rem 1.5rem 3rem' }}>
        <div className="container">
          <div className="columns is-vcentered">

            {/* Left — copy */}
            <div className="column is-5">
              <p style={{
                color: '#9333EA',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}>
                Crystal encyclopaedia + iOS app
              </p>

              <h1 className="title has-text-white" style={{
                fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}>
                Every crystal<br />has a story
              </h1>

              <p style={{
                fontSize: '1.15rem',
                opacity: 0.72,
                lineHeight: 1.75,
                marginBottom: '2.25rem',
                maxWidth: '480px',
              }}>
                215 crystals with detailed properties, chakra associations, zodiac connections, care guides, and AI identification — free on the web and in your pocket.
              </p>

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem', alignItems: 'center' }}>
                <Link
                  href="https://apps.apple.com/app/crystal-index/id6740543879"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: '#fff',
                    color: '#000',
                    borderRadius: '10px',
                    padding: '0.7rem 1.3rem',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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
                    color: '#fff',
                    border: '1px solid rgba(147,51,234,0.45)',
                    background: 'rgba(147,51,234,0.1)',
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
                  { value: 'Free', label: 'To start' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.25rem' }}>{stat.label}</div>
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
                {featured.map(({ name, colors }, i) => (
                  <Link
                    key={name}
                    href={`/crystals/${name.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{
                      display: 'block',
                      background: getColour(colors),
                      borderRadius: '10px',
                      padding: '1.1rem 0.85rem',
                      textDecoration: 'none',
                      border: '1px solid rgba(255,255,255,0.07)',
                      transform: i % 2 !== 0 ? 'translateY(10px)' : 'none',
                    }}
                  >
                    <p style={{
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      lineHeight: 1.3,
                    }}>
                      {name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

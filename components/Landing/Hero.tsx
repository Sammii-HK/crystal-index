import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero is-medium" style={{
      background: 'radial-gradient(ellipse at 50% 120%, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
    }}>
      <div className="hero-body">
        <div className="container has-text-centered">
          <p className="is-size-6 has-text-weight-semibold mb-4" style={{
            color: '#9333EA',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Crystal encyclopaedia
          </p>
          <h1 className="title is-size-1 has-text-weight-bold mb-5" style={{
            lineHeight: 1.1,
          }}>
            Every crystal has a story
          </h1>
          <p className="subtitle is-size-4 mb-6" style={{
            maxWidth: '640px',
            margin: '0 auto',
            opacity: 0.8,
            lineHeight: 1.6,
          }}>
            Explore 200+ crystals. Properties, chakras, zodiac connections, care guides, and AI identification.
          </p>
          <div className="buttons is-centered">
            <Link
              href="/crystals"
              className="button is-primary is-large"
              style={{
                borderRadius: '8px',
                fontWeight: 600,
              }}
            >
              Explore crystals
            </Link>
            <Link
              href="https://apps.apple.com/app/crystal-index/id6740543879"
              className="button is-large"
              style={{
                borderRadius: '8px',
                fontWeight: 600,
                border: '1px solid rgba(147, 51, 234, 0.4)',
                background: 'transparent',
              }}
            >
              Get the app
            </Link>
          </div>
          <p className="mt-5" style={{ opacity: 0.5, fontSize: '0.9rem' }}>
            No ads. No fluff. Just clear, reliable crystal information.
          </p>
        </div>
      </div>
    </section>
  )
}

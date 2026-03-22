import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="section" aria-label="Get started" style={{
      background: 'radial-gradient(ellipse at 50% 80%, rgba(147, 51, 234, 0.12) 0%, transparent 60%)',
    }}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8 has-text-centered">
            <h2 className="title is-2 mb-5" style={{ color: "#f8f8ff" }}>
              Start exploring
            </h2>
            <p className="subtitle is-5 mb-6" style={{ color: "rgba(248,248,255,0.7)" }}>
              Browse 200+ crystals, identify what you are holding, and build a collection you truly understand.
            </p>
            <div className="buttons is-centered">
              <Link
                href="/crystals"
                className="button is-primary is-large"
                style={{ borderRadius: '8px', fontWeight: 600 }}
              >
                Explore the crystal library
              </Link>
              <Link
                href="https://apps.apple.com/app/crystal-index/id6740543879"
                className="button is-large"
                style={{
                  borderRadius: '8px',
                  fontWeight: 600,
                  border: '1px solid rgba(147, 51, 234, 0.4)',
                  background: 'rgba(147, 51, 234, 0.08)',
                  color: '#f8f8ff',
                }}
              >
                Get the app
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

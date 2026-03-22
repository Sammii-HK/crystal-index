import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="section" aria-label="Get started" style={{
      background: 'radial-gradient(ellipse at 50% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 60%)',
    }}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8 has-text-centered">
            <h2 className="title is-2 mb-5">
              Start exploring
            </h2>
            <p className="subtitle is-5 mb-6" style={{ color: 'var(--ci-text-muted)' }}>
              Browse 200+ crystals on the web, or download the app to identify, collect, and build your personal crystal library.
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
                  border: '1px solid var(--ci-card-border)',
                  background: 'var(--ci-card-bg)',
                  color: 'var(--ci-text)',
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

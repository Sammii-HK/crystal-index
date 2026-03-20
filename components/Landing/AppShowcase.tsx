import Link from 'next/link'

export default function AppShowcase() {
  const features = [
    {
      icon: '\u26A1',
      title: 'Quick add',
      description: 'Add any crystal to your collection in seconds.',
    },
    {
      icon: '\u{1F4F7}',
      title: 'AI identification',
      description: 'Photograph a crystal and let AI identify it for you.',
    },
    {
      icon: '\u2702\uFE0F',
      title: 'Background removal',
      description: 'Clean, professional images of your crystals automatically.',
    },
    {
      icon: '\u{1F4DA}',
      title: 'Personal collection',
      description: 'Catalogue everything you own in one beautiful library.',
    },
  ]

  return (
    <section className="section" style={{
      background: 'radial-gradient(ellipse at 80% 50%, rgba(147, 51, 234, 0.08) 0%, transparent 60%)',
    }}>
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-5">
            <p className="is-size-7 has-text-weight-semibold mb-3" style={{
              color: '#9333EA',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              iOS app
            </p>
            <h2 className="title is-2 mb-4">
              Your crystal companion
            </h2>
            <p className="mb-5" style={{ opacity: 0.75, lineHeight: 1.7, fontSize: '1.1rem' }}>
              Take Crystal Index everywhere. Identify crystals on the go, build your personal collection, and access the full encyclopaedia from your pocket.
            </p>
            <Link
              href="https://apps.apple.com/app/crystal-index/id6740543879"
              className="button is-primary is-medium"
              style={{
                borderRadius: '8px',
                fontWeight: 600,
              }}
            >
              Download on the App Store
            </Link>
          </div>

          <div className="column is-6 is-offset-1">
            <div className="columns is-multiline">
              {features.map((feature, index) => (
                <div key={index} className="column is-6">
                  <div style={{ padding: '1rem 0' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                      {feature.icon}
                    </div>
                    <h3 className="title is-6 mb-2">{feature.title}</h3>
                    <p style={{ opacity: 0.65, fontSize: '0.9rem', lineHeight: 1.5 }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

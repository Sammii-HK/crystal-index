import { BookOpen, Camera, Layers, Search } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: '215+ crystal guides',
    description: 'Detailed properties, chakra associations, zodiac signs, and care instructions for every crystal in the collection.',
  },
  {
    icon: Camera,
    title: 'AI identification',
    description: 'Photograph any crystal and identify it instantly. See likely matches, lookalikes, and key differences.',
  },
  {
    icon: Layers,
    title: 'Personal collection',
    description: 'Catalogue your crystals with the iOS app. Track what you own, where it came from, and build your personal library.',
  },
  {
    icon: Search,
    title: 'Search by chakra',
    description: 'Find the right crystal for any chakra, intention, or zodiac sign. Search by colour, pattern, or purpose.',
  },
]

export default function Features() {
  return (
    <section className="section" aria-label="Features">
      <div className="container">
        <h2 className="title is-2 has-text-centered mb-2">
          Everything you need
        </h2>
        <p className="has-text-centered mb-6" style={{ color: 'rgba(248,248,255,0.6)', maxWidth: '540px', margin: '0 auto 2.5rem' }}>
          One place for crystal identification, meanings, care guides, and collection management.
        </p>
        <div className="columns is-multiline">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="column is-3">
                <div style={{
                  height: '100%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(147,51,234,0.15)',
                  borderRadius: '14px',
                  padding: '1.75rem',
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(147,51,234,0.15)',
                    marginBottom: '1rem',
                  }}>
                    <Icon size={20} color="#a855f7" aria-hidden="true" />
                  </div>
                  <h3 className="title is-5 mb-2" style={{ color: '#f8f8ff' }}>{feature.title}</h3>
                  <p style={{ color: 'rgba(248,248,255,0.65)', lineHeight: 1.65, fontSize: '0.92rem' }}>{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

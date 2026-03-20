export default function Features() {
  const features = [
    {
      icon: '\u{1F48E}',
      title: '200+ crystal guides',
      description: 'Detailed properties, chakra associations, zodiac signs, and care instructions for every crystal in the collection.',
    },
    {
      icon: '\u{1F4F7}',
      title: 'AI identification',
      description: 'Photograph any crystal and identify it instantly. See likely matches, lookalikes, and key differences.',
    },
    {
      icon: '\u2728',
      title: 'Personal collection',
      description: 'Catalogue your crystals with the iOS app. Track what you own, where it came from, and build your personal library.',
    },
    {
      icon: '\u{1F52E}',
      title: 'Search by chakra',
      description: 'Find the right crystal for any chakra, intention, or zodiac sign. Search by colour, pattern, or purpose.',
    },
  ]

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-2 has-text-centered mb-2">
          Everything you need
        </h2>
        <p className="has-text-centered mb-6" style={{ opacity: 0.6, maxWidth: '540px', margin: '0 auto 2rem' }}>
          One place for crystal identification, meanings, care guides, and collection management.
        </p>
        <div className="columns is-multiline">
          {features.map((feature, index) => (
            <div key={index} className="column is-3">
              <div className="box" style={{
                height: '100%',
                border: '1px solid rgba(147, 51, 234, 0.1)',
                borderRadius: '12px',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                  {feature.icon}
                </div>
                <h3 className="title is-5 mb-3">{feature.title}</h3>
                <p style={{ opacity: 0.75, lineHeight: 1.6 }}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

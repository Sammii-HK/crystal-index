export default function Features() {
  const features = [
    {
      title: 'AI visual identification',
      description: 'Upload a photo. Get an answer. Our AI helps you identify crystals from your camera roll, altar, shop counter, or field collection. See likely matches, lookalikes, and detailed information in seconds.',
    },
    {
      title: 'Complete crystal library',
      description: 'A living crystal encyclopedia. Browse crystals, each with detailed appearance notes, structure, metaphysical meanings, chakra and zodiac associations, uses, and care guidelines.',
    },
    {
      title: 'Search by anything',
      description: 'Find crystals by colour, pattern, or purpose. Search by "green banded", "throat chakra", "anxiety support", "Capricorn", "raw cluster", and more. Crystal Index speaks your language, not just mineral jargon.',
    },
    {
      title: 'Collections & favourites',
      description: 'Organise your personal collection. Save crystals you own, create sets for your altar, jewellery line, client work, or rituals, and keep everything in one place.',
    },
    {
      title: 'Care & cleansing guides',
      description: 'No more guessing what\'s water-safe. Every crystal page includes clear care, cleansing, and charging information so you can treat your collection with respect (and avoid dissolving it in salt water).',
    },
  ]

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-2 has-text-centered mb-6">
          Everything you need to understand your crystals
        </h2>
        <div className="columns is-multiline">
          {features.map((feature, index) => (
            <div key={index} className="column is-4">
              <div className="box" style={{ height: '100%' }}>
                <h3 className="title is-4 mb-4">{feature.title}</h3>
                <p className="content">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


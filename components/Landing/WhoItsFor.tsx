export default function WhoItsFor() {
  const audiences = [
    {
      title: 'Curious beginners',
      description: 'who find a random stone and want to know what it is.',
    },
    {
      title: 'Crystal lovers',
      description: 'building a personal collection and wanting deeper understanding.',
    },
    {
      title: 'Healers & practitioners',
      description: 'who need reliable, organised information for client work.',
    },
    {
      title: 'Jewellers & shop owners',
      description: 'who want accurate identification and descriptions.',
    },
    {
      title: 'Students & nerds',
      description: 'who care about both structure and metaphysical meaning.',
    },
  ]

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8">
            <h2 className="title is-2 has-text-centered mb-5">
              Made for beginners, practitioners, and professionals
            </h2>
            <p className="mb-5">
              Crystal Index is for:
            </p>
            <ul className="content">
              {audiences.map((audience, index) => (
                <li key={index} className="mb-3">
                  <strong>{audience.title}</strong> {audience.description}
                </li>
              ))}
            </ul>
            <p className="mt-5">
              If crystals are part of your life or your work, Crystal Index is built for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}



export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Take a photo',
      description: 'Snap a clear picture of your crystal, whether it is raw, tumbled, in jewellery, or sitting on your altar.',
    },
    {
      number: 2,
      title: 'Upload to Crystal Index',
      description: 'Our AI model analyses colour, structure, texture, and common patterns to find the best match.',
    },
    {
      number: 3,
      title: 'See likely matches',
      description: 'Get a ranked list of likely crystals with lookalikes, variations, and key differences.',
    },
    {
      number: 4,
      title: 'Dive into the details',
      description: 'Explore properties, meanings, chakra associations, care guides, and how to work with your crystal.',
    },
  ]

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-2 has-text-centered mb-6">
          How AI crystal identification works
        </h2>
        <div className="columns is-multiline">
          {steps.map((step) => (
            <div key={step.number} className="column is-3">
              <div className="box has-text-centered" style={{
                height: '100%',
                border: '1px solid rgba(147, 51, 234, 0.1)',
                borderRadius: '12px',
              }}>
                <div className="is-size-1 has-text-weight-bold mb-3" style={{
                  color: '#9333EA',
                  opacity: 0.8,
                }}>
                  {step.number}
                </div>
                <h3 className="title is-5 mb-4">{step.title}</h3>
                <p style={{ opacity: 0.75, lineHeight: 1.6 }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="has-text-centered mt-5">
          <p className="is-size-7" style={{ opacity: 0.5 }}>
            We don&apos;t store your images without permission. You stay in control of your data.
          </p>
        </div>
      </div>
    </section>
  )
}

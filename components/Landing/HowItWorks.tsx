export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Take a photo',
      description: 'Snap a clear picture of your crystal, whether it\'s raw, tumbled, in jewellery, or sitting on your altar.',
    },
    {
      number: 2,
      title: 'Upload to Crystal Index',
      description: 'Our visual model analyses colour, structure, texture, and common patterns.',
    },
    {
      number: 3,
      title: 'See likely matches',
      description: 'Get a ranked list of likely crystals, lookalikes, and variations, with photos and key differences.',
    },
    {
      number: 4,
      title: 'Dive into the details',
      description: 'Explore metaphysical meanings, science, uses, cleansing methods, and how to work with your crystal in practice.',
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
              <div className="box has-text-centered" style={{ height: '100%' }}>
                <div className="is-size-1 has-text-primary has-text-weight-bold mb-3">
                  {step.number}
                </div>
                <h3 className="title is-5 mb-4">{step.title}</h3>
                <p className="content">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="has-text-centered mt-5">
          <p className="is-size-7 has-text-grey">
            We don&apos;t store your images without permission. You stay in control of your data.
          </p>
        </div>
      </div>
    </section>
  )
}



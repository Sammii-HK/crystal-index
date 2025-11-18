'use client'

import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8 has-text-centered">
            <h2 className="title is-2 mb-5">
              Ready to actually understand your crystals?
            </h2>
            <p className="subtitle is-5 mb-6">
              Identify what you&apos;re holding, learn how to work with it, and build a collection you truly understand.
            </p>
            <div className="buttons is-centered">
              <Link 
                href="/identify" 
                className="button is-primary is-large"
              >
                Identify a crystal now
              </Link>
              <Link 
                href="/crystals" 
                className="button is-light is-large"
              >
                Explore the crystal library
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


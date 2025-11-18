'use client'

import Link from 'next/link'

export default function Hero() {

  return (
    <section className="hero is-medium">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-size-1 has-text-weight-bold mb-5">
            A crystal identification platform
          </h1>
          <p className="subtitle is-size-4 mb-6">
            Identify any crystal instantly with AI, or explore a crystal reference library online. Built for collectors, healers, jewellers, and the simply curious.
          </p>
          <div className="buttons is-centered">
            <Link 
              href="/identify" 
              className="button is-primary is-large"
            >
              Identify a crystal
            </Link>
            <Link 
              href="/crystals" 
              className="button is-light is-large"
            >
              Browse crystal library
            </Link>
          </div>
          <p className="mt-5 has-text-grey">
            No ads. No fluff. Just clear, reliable crystal information.
          </p>
        </div>
      </div>
    </section>
  )
}


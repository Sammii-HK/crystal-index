'use client'

import Link from 'next/link'

export default function Pricing() {

  const plans = [
    {
      name: 'Free',
      price: '£0',
      period: 'Forever',
      features: [
        'Search the database',
        'Browse all crystal pages',
        'Learn meanings, uses, correspondences',
        'Basic filters',
      ],
      cta: 'Get Started',
      ctaLink: '/crystals',
      isPrimary: false,
    },
    {
      name: 'Premium',
      price: '£4.99',
      period: 'per month',
      features: [
        'Everything in Free, plus:',
        'AI image identification',
        'Unlimited identification results',
        'Save crystals & create collections',
        'Remove watermark from results',
        'Faster inference',
        'Priority support',
      ],
      cta: 'Upgrade to Premium',
      ctaLink: '/pricing',
      isPrimary: true,
    },
    {
      name: 'Yearly',
      price: '£39.99',
      period: 'per year',
      features: [
        'Everything in Premium',
        '2 months free',
        'Best value for regular use',
      ],
      cta: 'Choose Yearly',
      ctaLink: '/pricing',
      isPrimary: false,
    },
  ]

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-2 has-text-centered mb-6">
          Simple, clear pricing
        </h2>
        <div className="columns is-multiline">
          {plans.map((plan) => (
            <div key={plan.name} className="column is-4">
              <div className={`box ${plan.isPrimary ? 'has-background-primary-light' : ''}`} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {plan.isPrimary && (
                  <div className="tag is-primary is-pulled-right mb-3">Popular</div>
                )}
                <h3 className="title is-4">{plan.name}</h3>
                <p className="is-size-2 has-text-weight-bold">{plan.price}</p>
                <p className="is-size-7 has-text-grey mb-4">{plan.period}</p>
                <ul className="content mb-5" style={{ flexGrow: 1 }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} className="mb-2">
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaLink}
                  className={`button is-fullwidth ${plan.isPrimary ? 'is-primary' : 'is-light'}`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="has-text-centered mt-5">
          <p className="is-size-6">
            Start with Free.
          </p>
          <p className="is-size-6">
            Upgrade to Premium whenever you&apos;re ready to go deeper.
          </p>
        </div>
      </div>
    </section>
  )
}


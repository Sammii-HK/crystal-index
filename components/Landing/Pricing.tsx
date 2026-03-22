'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Web access',
    price: '£0',
    period: 'Browse forever',
    features: [
      'Search the full encyclopaedia',
      'Browse all 215+ crystal pages',
      'Learn meanings, uses, correspondences',
      'Filter by chakra, zodiac, or colour',
    ],
    cta: 'Browse crystals',
    ctaLink: '/crystals',
    isPrimary: false,
  },
  {
    name: 'Premium',
    price: '£3.99',
    period: 'per month',
    features: [
      'Everything in Web access, plus:',
      'AI image identification',
      'Unlimited identification results',
      'Save crystals and create collections',
      'Remove watermark from results',
      'Faster inference',
      'Priority support',
    ],
    cta: 'Start your 7-day access',
    ctaLink: '/pricing',
    isPrimary: true,
  },
  {
    name: 'Yearly',
    price: '£39.99',
    period: 'per year — save 17%',
    features: [
      'Everything in Premium',
      'Just £3.33/month billed annually',
      'Best value for collectors',
    ],
    cta: 'Choose yearly',
    ctaLink: '/pricing',
    isPrimary: false,
  },
]

export default function Pricing() {
  return (
    <section className="section" style={{
      background: 'radial-gradient(ellipse at 50% 100%, rgba(147, 51, 234, 0.07) 0%, transparent 60%)',
    }}>
      <div className="container">
        <h2 className="title is-2 has-text-centered mb-2">
          Simple, clear pricing
        </h2>
        <p className="has-text-centered mb-6" style={{ color: 'var(--ci-text-muted)' }}>
          Browse the encyclopaedia on the web, or download the app for full premium access.
        </p>
        <div className="columns is-multiline">
          {plans.map((plan) => (
            <div key={plan.name} className="column is-4">
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: plan.isPrimary ? 'rgba(147, 51, 234, 0.1)' : 'var(--ci-card-bg)',
                border: plan.isPrimary ? '1px solid rgba(147, 51, 234, 0.4)' : '1px solid var(--ci-card-border)',
                borderRadius: '12px',
                padding: '1.75rem',
              }}>
                {plan.isPrimary && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{
                      backgroundColor: 'var(--ci-accent)',
                      color: '#fff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '20px',
                    }}>
                      Popular
                    </span>
                  </div>
                )}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ci-text)', marginBottom: '0.5rem' }}>{plan.name}</h3>
                <p style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--ci-text)', lineHeight: 1 }}>{plan.price}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--ci-text-muted)', marginBottom: '1.25rem', marginTop: '0.25rem' }}>{plan.period}</p>
                <ul style={{ flexGrow: 1, listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.6rem', fontSize: '0.9rem', color: 'var(--ci-text-muted)' }}>
                      <Check size={14} color="var(--ci-accent)" style={{ flexShrink: 0, marginTop: '0.2rem' }} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaLink}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    ...(plan.isPrimary
                      ? { background: 'linear-gradient(135deg, var(--ci-accent), var(--ci-accent-light))', color: '#fff' }
                      : { background: 'var(--ci-icon-bg)', color: 'var(--ci-text)', border: '1px solid var(--ci-card-border)' }),
                  }}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

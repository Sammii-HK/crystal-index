'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'

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
    price: '£3.99',
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
    period: 'per year — 2 months free',
    features: [
      'Everything in Premium',
      'Just £3.33/month billed annually',
      'Best value for collectors',
    ],
    cta: 'Choose Yearly',
    ctaLink: '/pricing',
    isPrimary: false,
  },
]

export default function Pricing() {
  return (
    <section className="section" style={{
      background: 'radial-gradient(ellipse at 50% 100%, rgba(147, 51, 234, 0.08) 0%, transparent 60%)',
    }}>
      <div className="container">
        <h2 className="title is-2 has-text-centered mb-2" style={{ color: '#f8f8ff' }}>
          Simple, clear pricing
        </h2>
        <p className="has-text-centered mb-6" style={{ opacity: 0.6, color: '#f8f8ff' }}>
          Start free. Upgrade when you&apos;re ready.
        </p>
        <div className="columns is-multiline">
          {plans.map((plan) => (
            <div key={plan.name} className="column is-4">
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: plan.isPrimary ? 'rgba(147, 51, 234, 0.12)' : 'rgba(26, 26, 36, 0.8)',
                border: plan.isPrimary ? '1px solid rgba(147, 51, 234, 0.4)' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '1.75rem',
              }}>
                {plan.isPrimary && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{
                      backgroundColor: '#9333EA',
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
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8f8ff', marginBottom: '0.5rem' }}>{plan.name}</h3>
                <p style={{ fontSize: '2.25rem', fontWeight: 800, color: '#f8f8ff', lineHeight: 1 }}>{plan.price}</p>
                <p style={{ fontSize: '0.8rem', opacity: 0.5, color: '#f8f8ff', marginBottom: '1.25rem', marginTop: '0.25rem' }}>{plan.period}</p>
                <ul style={{ flexGrow: 1, listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.6rem', fontSize: '0.9rem', color: 'rgba(248,248,255,0.8)' }}>
                      <Check size={14} style={{ color: '#9333EA', flexShrink: 0, marginTop: '0.2rem' }} />
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
                      ? { background: 'linear-gradient(135deg, #9333EA, #a855f7)', color: '#fff' }
                      : { background: 'rgba(255,255,255,0.06)', color: '#f8f8ff', border: '1px solid rgba(255,255,255,0.1)' }),
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

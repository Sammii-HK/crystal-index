'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface PricingTiersProps {
  currentPlan: string
}

export default function PricingTiers({ currentPlan }: PricingTiersProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (plan: string) => {
    if (!session) {
      router.push('/api/auth/signin')
      return
    }

    setLoading(plan)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const handleCreditBundle = async (bundle: 'SMALL' | 'MEDIUM') => {
    if (!session) {
      router.push('/api/auth/signin')
      return
    }

    setLoading(`bundle-${bundle}`)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creditBundle: bundle }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const tiers = [
    {
      name: 'Free',
      price: '£0',
      period: 'Forever',
      features: [
        '3 identifications per month',
        'Read-only access to index',
        'Watermarked results',
        'Basic crystal information',
      ],
      plan: 'FREE',
      cta: currentPlan === 'FREE' ? 'Current Plan' : 'Get Started',
      disabled: currentPlan === 'FREE',
    },
    {
      name: 'Pro',
      price: '£3.99',
      period: 'per month · or £39.99/year (save 17%)',
      features: [
        'Unlimited identifications',
        'Save full collection',
        'Remove watermark',
        'Faster inference',
        'Priority support',
      ],
      plan: 'PRO',
      cta: currentPlan === 'PRO' ? 'Current Plan' : 'Upgrade to Pro',
      disabled: currentPlan === 'PRO',
      popular: true,
    },
    {
      name: 'Collector',
      price: '£9.99',
      period: 'per month',
      features: [
        'Everything in Pro',
        'Priority inference queue',
        'Export data (CSV/PDF)',
        'Early access to new features',
        'Verified contributor badge',
      ],
      plan: 'COLLECTOR',
      cta: currentPlan === 'COLLECTOR' ? 'Current Plan' : 'Upgrade to Collector',
      disabled: currentPlan === 'COLLECTOR',
    },
    {
      name: 'Retail / API',
      price: '£29.99',
      period: 'per month',
      features: [
        'Everything in Collector',
        'API access',
        'Bulk identification',
        'Commercial license',
        'Dedicated support',
      ],
      plan: 'RETAIL',
      cta: 'Contact Sales',
      disabled: false,
      custom: true,
    },
  ]

  return (
    <div className="pricing-tiers">
      <div className="columns is-multiline">
        {tiers.map((tier) => (
          <div key={tier.plan} className="column is-3">
            <div className={`box ${tier.popular ? 'has-background-primary-light' : ''}`}>
              {tier.popular && (
                <div className="tag is-primary is-pulled-right">Popular</div>
              )}
              <h3 className="title is-4">{tier.name}</h3>
              <p className="is-size-2 has-text-weight-bold">{tier.price}</p>
              <p className="is-size-7 has-text-grey">{tier.period}</p>
              
              <ul className="mt-4" style={{ minHeight: '200px' }}>
                {tier.features.map((feature, i) => (
                  <li key={i} className="mb-2">
                    <span className="icon has-text-success">
                      <i className="fas fa-check"></i>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`button is-fullwidth ${
                  tier.popular ? 'is-primary' : 'is-light'
                }`}
                onClick={() => {
                  if (tier.custom) {
                    // Handle custom contact
                    window.location.href = 'mailto:support@crystalindex.co.uk?subject=Retail/API Inquiry'
                  } else {
                    handleCheckout(tier.plan)
                  }
                }}
                disabled={tier.disabled || loading === tier.plan}
              >
                {loading === tier.plan ? 'Loading...' : tier.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


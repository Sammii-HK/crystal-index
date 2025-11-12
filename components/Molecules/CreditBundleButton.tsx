'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface CreditBundleButtonProps {
  bundle: 'SMALL' | 'MEDIUM'
}

export default function CreditBundleButton({ bundle }: CreditBundleButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (!session) {
      router.push('/api/auth/signin')
      return
    }

    setLoading(true)

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
      setLoading(false)
    }
  }

  return (
    <button
      className="button is-primary mt-3"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Buy Now'}
    </button>
  )
}


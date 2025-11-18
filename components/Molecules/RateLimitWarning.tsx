'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface RateLimitInfo {
  remaining: number
  limit: number
  resetAt: string
}

export default function RateLimitWarning() {
  const { data: session } = useSession()
  const [rateLimit, setRateLimit] = useState<RateLimitInfo | null>(null)

  useEffect(() => {
    if (!session?.userId) return

    const checkRateLimit = async () => {
      try {
        const response = await fetch('/api/user/rate-limit')
        if (response.ok) {
          const data = await response.json()
          setRateLimit(data)
        }
      } catch (error) {
        // Silently fail
      }
    }

    checkRateLimit()
    // Check every minute
    const interval = setInterval(checkRateLimit, 60000)
    return () => clearInterval(interval)
  }, [session])

  if (!rateLimit || rateLimit.remaining > rateLimit.limit * 0.2) {
    return null // Only show warning when < 20% remaining
  }

  const percentage = (rateLimit.remaining / rateLimit.limit) * 100

  return (
    <div className={`notification ${percentage < 10 ? 'is-warning' : 'is-info'} is-light mb-4`}>
      <p className="is-size-7">
        <strong>Rate Limit Warning:</strong> You have {rateLimit.remaining} of {rateLimit.limit} identifications remaining.
        {rateLimit.remaining === 0 && (
          <> Resets at {new Date(rateLimit.resetAt).toLocaleString()}</>
        )}
        {rateLimit.remaining > 0 && rateLimit.remaining < 5 && (
          <>
            {' '}
            <Link href="/pricing" className="has-text-weight-bold">
              Upgrade to Pro for unlimited identifications →
            </Link>
          </>
        )}
      </p>
    </div>
  )
}


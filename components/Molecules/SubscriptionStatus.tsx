'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface UserPlan {
  plan: string
  credits: number
  subscriptionStatus?: string | null
}

export default function SubscriptionStatus() {
  const { data: session } = useSession()
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.userId) {
      setLoading(false)
      return
    }

    fetch('/api/user/plan')
      .then(res => res.json())
      .then(data => {
        setUserPlan(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [session])

  if (!session || loading) {
    return null
  }

  if (!userPlan) {
    return (
      <div className="box">
        <p className="has-text-grey">Loading subscription status...</p>
      </div>
    )
  }

  const planLabels: Record<string, string> = {
    FREE: 'Free',
    PRO: 'Pro',
    COLLECTOR: 'Collector',
    RETAIL: 'Retail',
  }

  return (
    <div className="box">
      <h3 className="title is-5">Your Subscription</h3>
      
      <div className="content">
        <p>
          <strong>Plan:</strong>{' '}
          <span className={`tag ${userPlan.plan === 'FREE' ? 'is-light' : 'is-primary'}`}>
            {planLabels[userPlan.plan] || userPlan.plan}
          </span>
        </p>

        {userPlan.plan === 'FREE' && (
          <p>
            <strong>Credits:</strong> {userPlan.credits}
          </p>
        )}

        {userPlan.subscriptionStatus && (
          <p>
            <strong>Status:</strong>{' '}
            <span className={`tag ${
              userPlan.subscriptionStatus === 'active' ? 'is-success' : 'is-warning'
            }`}>
              {userPlan.subscriptionStatus}
            </span>
          </p>
        )}

        <div className="mt-4">
          {userPlan.plan === 'FREE' ? (
            <Link href="/pricing" className="button is-primary">
              Upgrade Plan
            </Link>
          ) : (
            <Link href="/api/stripe/portal" className="button is-light">
              Manage Subscription
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}


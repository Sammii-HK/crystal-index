'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { initPostHog } from '../../lib/posthog'
import posthog from '../../lib/posthog'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  useEffect(() => {
    initPostHog()
  }, [])

  useEffect(() => {
    if (session?.user && posthog) {
      posthog.identify(session.userId, {
        email: session.user?.email,
        name: session.user?.name,
        plan: (session as any).plan || 'FREE',
      })
    }
  }, [session])

  return <>{children}</>
}




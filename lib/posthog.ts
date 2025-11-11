import posthog from 'posthog-js'

// Client-side PostHog initialization
export function initPostHog() {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog initialized')
        }
      },
    })
  }
}

// Server-side PostHog (for API routes)
let posthogServer: any = null

export function getPostHogServer() {
  if (!posthogServer && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    const { PostHog } = require('posthog-node')
    posthogServer = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    })
  }
  return posthogServer
}

export default posthog




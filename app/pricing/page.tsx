export const dynamic = 'force-dynamic'
import { Metadata } from 'next'
import { getSessionApp } from '../../lib/session-app'
import { prisma } from '../../lib/prisma'
import PricingTiers from '../../components/Organisms/PricingTiers'
import CreditBundleButton from '../../components/Molecules/CreditBundleButton'

export const metadata: Metadata = {
  title: 'Pricing - Crystal Index',
  description: 'Crystal Index is a free iOS app with an optional Premium subscription and a 7-day free trial. Download on the App Store.',
  openGraph: {
    title: 'Pricing - Crystal Index',
    description: 'Choose the perfect plan for your crystal identification needs.',
  },
}

export const revalidate = 3600 // Revalidate every hour

export default async function PricingPage() {
  const session = await getSessionApp()
  let userPlan = 'FREE'

  if (session?.userId) {
    const user = await prisma().user.findUnique({
      where: { id: session.userId },
      select: { plan: true },
    })
    userPlan = user?.plan || 'FREE'
  }

  return (
    <div className="container mt-5">
      <div className="has-text-centered mb-6">
        <h1 className="title is-2">Pricing</h1>
        <p className="subtitle is-5">
          A free iOS app, with optional Premium
        </p>
      </div>

      {/* Pricing is iOS-owned: subscriptions are handled via App Store IAP and shown
          in the app + on the App Store listing. The web pricing/credit table was removed
          to avoid drift (it can't transact anyway on an iOS-only app). */}
      <p className="has-text-centered has-text-grey">
        Crystal Index is a free iOS app: browse the full encyclopaedia, save crystals,
        and try AI identification for free. Premium unlocks unlimited saves, custom
        collections, unlimited identification, background removal and iCloud sync, with a
        7-day free trial. Manage or view current pricing in the app or on the App Store.
      </p>
    </div>
  )
}


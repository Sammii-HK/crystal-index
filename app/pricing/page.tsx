export const dynamic = 'force-dynamic'
import { Metadata } from 'next'
import { getSessionApp } from '../../lib/session-app'
import { prisma } from '../../lib/prisma'
import PricingTiers from '../../components/Organisms/PricingTiers'
import CreditBundleButton from '../../components/Molecules/CreditBundleButton'

export const metadata: Metadata = {
  title: 'Pricing - Crystal Index',
  description: 'Choose the perfect plan for your crystal identification needs. Free tier available, Pro plans starting at £4.99/month.',
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
        <h1 className="title is-2">Choose Your Plan</h1>
        <p className="subtitle is-5">
          The world&apos;s most accurate crystal identifier
        </p>
      </div>

      <PricingTiers currentPlan={userPlan} />

      <div className="box mt-6">
        <h2 className="title is-4 has-text-centered">Credit Bundles</h2>
        <p className="has-text-centered mb-4">
          Need more identifications? Purchase credit bundles for one-time use.
        </p>
        <div className="columns is-centered">
          <div className="column is-4">
            <div className="box has-text-centered">
              <h3 className="title is-5">10 Credits</h3>
              <p className="is-size-3 has-text-primary">£1.99</p>
              <CreditBundleButton bundle="SMALL" />
            </div>
          </div>
          <div className="column is-4">
            <div className="box has-text-centered">
              <h3 className="title is-5">50 Credits</h3>
              <p className="is-size-3 has-text-primary">£6.99</p>
              <p className="is-size-7 has-text-grey">Save £3.96</p>
              <CreditBundleButton bundle="MEDIUM" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


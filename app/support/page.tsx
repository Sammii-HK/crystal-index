import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Support — Crystal Index',
  description: 'Get help with the Crystal Index iOS app and website. FAQs, troubleshooting, and how to reach us.',
  robots: { index: true, follow: true },
}

export default function SupportPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="content">
          <h1 className="title is-2 has-text-white">Support</h1>
          <p className="has-text-grey-light">
            Need help with Crystal Index? Start here.
          </p>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          <h2 className="title is-4 has-text-white">Frequently asked questions</h2>

          <h3 className="title is-5 has-text-white">How does crystal identification work?</h3>
          <p className="has-text-grey-light">
            Take a clear, well-lit photo of your crystal against a plain background. The app sends the photo to our identification service, which uses a vision AI model trained on mineralogy to suggest the most likely match from our 215-crystal encyclopaedia along with alternatives and a confidence score. Results improve with clearer photos and distinctive crystal habits (cubes, points, bladed forms).
          </p>

          <h3 className="title is-5 has-text-white">Why is my identification wrong or uncertain?</h3>
          <p className="has-text-grey-light">
            Photos taken in low light, at odd angles, or with cluttered backgrounds reduce accuracy. Try retaking the photo in daylight on a plain surface. Polished tumbled stones can also be harder to identify than raw specimens because key visual features (crystal habit, lustre) may be obscured.
          </p>

          <h3 className="title is-5 has-text-white">Does my collection sync across devices?</h3>
          <p className="has-text-grey-light">
            Yes — premium subscribers have their collection synced via iCloud (CloudKit). Sign in with the same Apple ID on each device and the collection will appear automatically. Free users can store up to 5 crystals locally on a single device.
          </p>

          <h3 className="title is-5 has-text-white">How do I manage my subscription?</h3>
          <p className="has-text-grey-light">
            Crystal Index subscriptions are managed through Apple. On your iPhone, go to Settings → [Your Name] → Subscriptions → Crystal Index to change plan, pause, or cancel. Cancellations take effect at the end of the current billing period.
          </p>

          <h3 className="title is-5 has-text-white">How do I restore a purchase?</h3>
          <p className="has-text-grey-light">
            In the app, open Settings and tap &ldquo;Restore Purchases.&rdquo; Make sure you&apos;re signed in with the Apple ID used to make the original purchase.
          </p>

          <h3 className="title is-5 has-text-white">Can I export my crystal collection?</h3>
          <p className="has-text-grey-light">
            Export to CSV is on the roadmap. For now, your data is stored locally on your device and synced via iCloud if premium.
          </p>

          <h3 className="title is-5 has-text-white">Does Crystal Index replace professional gemological advice?</h3>
          <p className="has-text-grey-light">
            No. Crystal Index is an educational and personal collection tool. For authentication of valuable specimens, consult a certified gemologist.
          </p>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          <h2 className="title is-4 has-text-white">Still need help?</h2>
          <p className="has-text-grey-light">
            Email us at <a href="mailto:support@crystalindex.co.uk">support@crystalindex.co.uk</a> — we aim to reply within 2 working days.
          </p>
          <p className="has-text-grey-light">
            See also our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}

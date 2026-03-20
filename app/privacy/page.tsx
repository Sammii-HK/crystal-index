import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Crystal Index',
  description: 'Privacy Policy for Crystal Index — how we collect, use, and protect your data.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  const lastUpdated = '20 March 2025'

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="content">
          <h1 className="title is-2 has-text-white">Privacy Policy</h1>
          <p className="has-text-grey-light">Last updated: {lastUpdated}</p>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          <h2 className="title is-4 has-text-white">1. Who we are</h2>
          <p className="has-text-grey-light">
            Crystal Index (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is operated by Monkey Taps Ltd. Our website is{' '}
            <a href="https://crystalindex.co.uk">crystalindex.co.uk</a> and our iOS app is available on the App Store.
          </p>

          <h2 className="title is-4 has-text-white">2. Data we collect</h2>
          <p className="has-text-grey-light">
            <strong className="has-text-white">iOS app (local-first):</strong> Your crystal collection is stored locally on your device using SwiftData. If you have an active premium subscription, your data may sync to your personal iCloud account via CloudKit — this data is controlled entirely by Apple and is not accessible to us.
          </p>
          <p className="has-text-grey-light">
            <strong className="has-text-white">Photos you take:</strong> Photos you add to your crystal collection are stored locally on your device (or in your iCloud if CloudKit sync is enabled). We do not upload your photos to our servers.
          </p>
          <p className="has-text-grey-light">
            <strong className="has-text-white">AI identification:</strong> When you use the AI crystal identification feature, the photo you submit is sent to a third-party AI provider (DeepInfra) for processing. The photo is not stored by us after processing. Please review DeepInfra&apos;s privacy policy for their data handling practices.
          </p>
          <p className="has-text-grey-light">
            <strong className="has-text-white">Purchases:</strong> Subscriptions are managed via RevenueCat and Apple&apos;s App Store. We receive anonymised purchase data (subscription status, product ID) but do not receive your payment details.
          </p>
          <p className="has-text-grey-light">
            <strong className="has-text-white">Analytics:</strong> Our website uses PostHog to collect anonymised usage analytics (page views, feature usage). No personally identifiable information is collected.
          </p>

          <h2 className="title is-4 has-text-white">3. How we use your data</h2>
          <p className="has-text-grey-light">We use the data described above to:</p>
          <ul className="has-text-grey-light">
            <li>Provide and improve the Crystal Index app and website</li>
            <li>Process your subscription and verify your premium entitlement</li>
            <li>Respond to support requests</li>
            <li>Understand how users interact with the app (anonymised analytics only)</li>
          </ul>

          <h2 className="title is-4 has-text-white">4. Data sharing</h2>
          <p className="has-text-grey-light">
            We do not sell your personal data. We share data only with the third-party service providers listed above (Apple iCloud/CloudKit, RevenueCat, DeepInfra, PostHog) as necessary to provide our services.
          </p>

          <h2 className="title is-4 has-text-white">5. Data retention</h2>
          <p className="has-text-grey-light">
            Your crystal collection data is stored on your device and/or your personal iCloud account. You can delete this data at any time by deleting the app or clearing app data through iOS Settings. We do not maintain server-side copies of your collection.
          </p>

          <h2 className="title is-4 has-text-white">6. Your rights</h2>
          <p className="has-text-grey-light">
            Depending on your location, you may have rights under applicable data protection law (including GDPR if you are in the EU/UK) to access, correct, or delete your personal data. To exercise these rights, please contact us at the email address below.
          </p>

          <h2 className="title is-4 has-text-white">7. Children&apos;s privacy</h2>
          <p className="has-text-grey-light">
            Crystal Index is not directed at children under the age of 13. We do not knowingly collect personal data from children under 13.
          </p>

          <h2 className="title is-4 has-text-white">8. Changes to this policy</h2>
          <p className="has-text-grey-light">
            We may update this Privacy Policy from time to time. We will post the revised policy on this page with an updated date. Continued use of Crystal Index after any changes constitutes your acceptance of the new policy.
          </p>

          <h2 className="title is-4 has-text-white">9. Contact us</h2>
          <p className="has-text-grey-light">
            If you have any questions about this Privacy Policy, please contact us at:{' '}
            <a href="mailto:hello@crystalindex.co.uk">hello@crystalindex.co.uk</a>
          </p>
        </div>
      </div>
    </div>
  )
}

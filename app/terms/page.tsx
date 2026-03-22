import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use — Crystal Index',
  description: 'Terms of Use for Crystal Index iOS app and website.',
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  const lastUpdated = '22 March 2026'

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="content">
          <h1 className="title is-2 has-text-white">Terms of Use</h1>
          <p className="has-text-grey-light">Last updated: {lastUpdated}</p>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          <h2 className="title is-4 has-text-white">1. Acceptance of terms</h2>
          <p className="has-text-grey-light">
            By downloading, installing, or using the Crystal Index iOS app or visiting crystalindex.co.uk (collectively, &ldquo;Crystal Index&rdquo;), you agree to be bound by these Terms of Use. If you do not agree, please do not use Crystal Index.
          </p>

          <h2 className="title is-4 has-text-white">2. Use of Crystal Index</h2>
          <p className="has-text-grey-light">Crystal Index is a personal crystal encyclopaedia and collection management tool. You may use Crystal Index for personal, non-commercial purposes only. You agree not to:</p>
          <ul className="has-text-grey-light">
            <li>Reverse engineer, decompile, or disassemble any part of Crystal Index</li>
            <li>Use Crystal Index for any unlawful purpose</li>
            <li>Attempt to gain unauthorised access to any part of Crystal Index or its associated systems</li>
            <li>Reproduce or redistribute Crystal Index content without our prior written consent</li>
          </ul>

          <h2 className="title is-4 has-text-white">3. Subscriptions and billing</h2>
          <p className="has-text-grey-light">
            Crystal Index offers a free tier and a premium subscription. Premium subscriptions are billed through Apple&apos;s App Store. Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period. You can manage or cancel your subscription through your Apple ID account settings.
          </p>
          <p className="has-text-grey-light">
            Prices are displayed in your local currency before purchase. We reserve the right to change subscription prices with reasonable notice.
          </p>

          <h2 className="title is-4 has-text-white">4. AI identification</h2>
          <p className="has-text-grey-light">
            The AI crystal identification feature is provided for reference purposes only. Results are not guaranteed to be accurate. Crystal Index shall not be liable for any decisions made based on AI identification results. Always verify crystal identifications independently before making any important decisions.
          </p>

          <h2 className="title is-4 has-text-white">5. Crystal information</h2>
          <p className="has-text-grey-light">
            The crystal encyclopaedia content — including descriptions, metaphysical properties, chakra associations, and care guides — is provided for informational and entertainment purposes only. Crystal Index makes no medical, therapeutic, or scientific claims. Do not use crystal-related information as a substitute for professional medical advice.
          </p>

          <h2 className="title is-4 has-text-white">6. Intellectual property</h2>
          <p className="has-text-grey-light">
            All content within Crystal Index, including but not limited to the encyclopaedia data, design, code, and imagery, is the property of Monkey Taps Ltd or its licensors and is protected by copyright and other intellectual property laws. Photos you upload remain your property.
          </p>

          <h2 className="title is-4 has-text-white">7. Disclaimer of warranties</h2>
          <p className="has-text-grey-light">
            Crystal Index is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied. We do not warrant that Crystal Index will be uninterrupted, error-free, or free of viruses or other harmful components.
          </p>

          <h2 className="title is-4 has-text-white">8. Limitation of liability</h2>
          <p className="has-text-grey-light">
            To the maximum extent permitted by applicable law, Monkey Taps Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of Crystal Index, even if we have been advised of the possibility of such damages.
          </p>

          <h2 className="title is-4 has-text-white">9. End User Licence Agreement (iOS)</h2>
          <p className="has-text-grey-light">
            The Crystal Index iOS app is licensed to you by Monkey Taps Ltd, not sold. This licence is non-transferable and permits use on any Apple device you own or control, as permitted by the App Store Usage Rules. Monkey Taps Ltd is solely responsible for the app and its content. Apple has no obligation to provide maintenance, support, warranty, or product claims for Crystal Index.
          </p>
          <p className="has-text-grey-light">
            In the event of any third-party claim that the app infringes intellectual property rights, Monkey Taps Ltd — not Apple — is solely responsible for the investigation, defence, settlement, and discharge of such claim. Apple and its subsidiaries are third-party beneficiaries of these Terms and may enforce them against you.
          </p>

          <h2 className="title is-4 has-text-white">10. Governing law</h2>
          <p className="has-text-grey-light">
            These Terms of Use shall be governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>

          <h2 className="title is-4 has-text-white">11. Changes to these terms</h2>
          <p className="has-text-grey-light">
            We may update these Terms of Use from time to time. We will post the revised terms on this page with an updated date. Continued use of Crystal Index after any changes constitutes your acceptance of the new terms.
          </p>

          <h2 className="title is-4 has-text-white">12. Contact us</h2>
          <p className="has-text-grey-light">
            If you have any questions about these Terms of Use, please contact us at:{' '}
            <a href="mailto:hello@crystalindex.co.uk">hello@crystalindex.co.uk</a>
          </p>
        </div>
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact — Crystal Index',
  description: 'Get in touch with the Crystal Index team for support, feedback, or partnership enquiries.',
  robots: { index: true, follow: true },
}

export default function ContactPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="content">
          <h1 className="title is-2 has-text-white">Contact</h1>
          <p className="has-text-grey-light">
            We&apos;d love to hear from you.
          </p>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          <h2 className="title is-4 has-text-white">Support</h2>
          <p className="has-text-grey-light">
            For help with the app or website, email <a href="mailto:support@crystalindex.co.uk">support@crystalindex.co.uk</a>. We aim to reply within 2 working days.
          </p>
          <p className="has-text-grey-light">
            You may also find an answer on the <Link href="/support">support page</Link>.
          </p>

          <h2 className="title is-4 has-text-white">Press &amp; partnerships</h2>
          <p className="has-text-grey-light">
            For press enquiries or partnership opportunities, email <a href="mailto:hello@crystalindex.co.uk">hello@crystalindex.co.uk</a>.
          </p>

          <h2 className="title is-4 has-text-white">Privacy &amp; data</h2>
          <p className="has-text-grey-light">
            For privacy, GDPR, or data-deletion requests, email <a href="mailto:privacy@crystalindex.co.uk">privacy@crystalindex.co.uk</a>. See our <Link href="/privacy">Privacy Policy</Link> for details on the data we collect and how to request deletion.
          </p>

          <h2 className="title is-4 has-text-white">Company</h2>
          <p className="has-text-grey-light">
            Crystal Index is operated by Lunar Computing, Inc.
          </p>
        </div>
      </div>
    </div>
  )
}

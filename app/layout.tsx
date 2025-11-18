import { Metadata } from 'next';
import '../styles/globals.scss'
import Navbar from '../components/common/Navbar'
import { NextAuthProvider } from './sessionProvider';
import { PostHogProvider } from '../components/Providers/PostHogProvider';
import { OrganizationSchema, WebSiteSchema } from '../components/common/StructuredData';

export const metadata: Metadata = {
  title: {
    default: 'The Crystal Index',
    template: '%s | The Crystal Index',
  },
  description: 'A crystal identification and reference platform. Identify crystals with AI or explore the crystal library.',
  keywords: ['crystals', 'identification', 'index', 'meaning', 'identifier', 'crystal' ],
  openGraph: {
    title: 'The Crystal Index',
    description: 'A crystal identification and reference platform.',
    type: 'website',
    siteName: 'Crystal Index',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Crystal Index',
    description: 'A crystal identification and reference platform.',
  },
};

export default function RootLayout({
  children
}: { children: React.ReactNode}
) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <OrganizationSchema />
        <WebSiteSchema />
        <NextAuthProvider>
          <PostHogProvider>
            <Navbar />
            <>{children}</>
          </PostHogProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}


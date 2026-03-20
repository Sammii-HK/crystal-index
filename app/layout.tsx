import { Metadata } from 'next';
import '../styles/globals.scss'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { PostHogProvider } from '../components/Providers/PostHogProvider';
import { OrganizationSchema, WebSiteSchema } from '../components/common/StructuredData';

export const metadata: Metadata = {
  title: {
    default: 'Crystal Index — The Crystal Encyclopaedia & Collection Manager',
    template: '%s | Crystal Index',
  },
  description: 'Explore 200+ crystals with properties, chakras, zodiac connections, and care guides. Identify any crystal with AI. Your personal crystal companion.',
  keywords: [
    'crystals', 'crystal identification', 'crystal index', 'crystal meaning',
    'crystal properties', 'chakra crystals', 'zodiac crystals', 'crystal guide',
    'crystal encyclopaedia', 'healing crystals', 'crystal collection',
    'AI crystal identifier', 'crystal care', 'crystal reference',
  ],
  openGraph: {
    title: 'Crystal Index — The Crystal Encyclopaedia',
    description: 'Explore 200+ crystals with properties, chakras, zodiac connections, and care guides. Identify any crystal with AI.',
    type: 'website',
    siteName: 'Crystal Index',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crystal Index — The Crystal Encyclopaedia',
    description: 'Explore 200+ crystals with properties, chakras, zodiac connections, and care guides. Identify any crystal with AI.',
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
        <PostHogProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  )
}


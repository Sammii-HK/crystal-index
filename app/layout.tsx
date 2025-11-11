import { Metadata } from 'next';
import '../styles/globals.scss'
import Navbar from '../components/common/Navbar'
import { NextAuthProvider } from './sessionProvider';
import { PostHogProvider } from '../components/Providers/PostHogProvider';

export const metadata: Metadata = {
  title: {
    default: 'The Crystal Index',
    template: '%s | The Crystal Index',
  },
  description: 'The most personal, beautiful and informative way to discover crystal meanings, identify crystals and index your crystal collection.',
  keywords: ['crystals', 'identification', 'index', 'meaning', 'identifier', 'crystal' ],
  openGraph: {
    title: 'The Crystal Index',
    description: 'The world\'s most accurate crystal identifier and index.',
    type: 'website',
    siteName: 'Crystal Index',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Crystal Index',
    description: 'The world\'s most accurate crystal identifier and index.',
  },
};

export default function RootLayout({
  children
}: { children: React.ReactNode}
) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
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


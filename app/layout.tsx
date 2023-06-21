// import Head from 'next/head'
import { Metadata } from 'next';
import '../styles/globals.scss'
// import Navbar from '../components/common/Navbar'

export const metadata: Metadata = {
  title: {
    default: 'The Crystal Index',
    template: '%s | The Crystal Index',
  },
  description: 'The most personal, beautiful and informative way to discover crystal meanings and index your crystal collection.',
  keywords: ['crystals', 'identification', 'index', 'meaning', 'identifier', 'crystal' ]
  // icons: {
  //   icon: '/favicon.ico'
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <Navbar /> */}
      <body>{children}</body>
    </html>
  )
}


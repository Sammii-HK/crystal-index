// 'use client'
// import Head from 'next/head'
import { Metadata } from 'next';
import '../styles/globals.scss'
import Navbar from '../components/common/Navbar'
import { AppProps } from "next/app";
import { NextAuthProvider } from './sessionProvider';

export const metadata: Metadata = {
  title: {
    default: 'The Crystal Index',
    template: '%s | The Crystal Index',
  },
  description: 'The most personal, beautiful and informative way to discover crystal meanings, identify crystals and index your crystal collection.',
  keywords: ['crystals', 'identification', 'index', 'meaning', 'identifier', 'crystal' ]
};

export default function RootLayout({
  children
}: { children: React.ReactNode}
) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <NextAuthProvider>
          <Navbar />
          <>{children}</>
        </NextAuthProvider>
      </body>
    </html>
  )
}


import { Metadata } from 'next'
import {
  Hero,
  TrustSignals,
  WhyCrystalIndex,
  Features,
  HowItWorks,
  WhoItsFor,
  Comparison,
  Pricing,
  FAQ,
  SEOSection,
  FinalCTA,
} from '../components/Landing'

export const metadata: Metadata = {
  title: 'Crystal Index - Crystal identification and reference platform',
  description: 'Identify any crystal instantly with AI, or explore a crystal reference library online. Built for collectors, healers, jewellers, and the simply curious.',
  keywords: [
    'crystal identification',
    'crystal meanings',
    'identify crystals',
    'crystal guide',
    'crystal database',
    'crystal library',
    'crystal reference',
    'crystal identifier',
    'crystal meanings',
    'chakra crystals',
    'crystal care',
    'crystal cleansing',
  ],
  openGraph: {
    title: 'Crystal Index - Crystal identification and reference platform',
    description: 'Identify any crystal instantly with AI, or explore a crystal reference library online.',
    type: 'website',
    siteName: 'Crystal Index',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crystal Index - Crystal identification and reference platform',
    description: 'Identify any crystal instantly with AI, or explore a crystal reference library online.',
  },
}

export default function Page() {
  return (
    <div className="main-container">
      <Hero />
      <TrustSignals />
      <WhyCrystalIndex />
      <Features />
      <HowItWorks />
      <WhoItsFor />
      <Comparison />
      <Pricing />
      <FAQ />
      <SEOSection />
      <FinalCTA />
    </div>
  )
}

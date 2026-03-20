import { Metadata } from 'next'
import {
  Hero,
  Features,
  FeaturedCrystals,
  AppShowcase,
  HowItWorks,
  FAQ,
  SEOSection,
  FinalCTA,
} from '../components/Landing'

export const metadata: Metadata = {
  title: 'Crystal Index — Every crystal has a story',
  description: 'Explore 200+ crystals with detailed properties, chakra associations, zodiac connections, care guides, and AI identification. Your complete crystal encyclopaedia.',
  keywords: [
    'crystal identification',
    'crystal meanings',
    'identify crystals',
    'crystal guide',
    'crystal database',
    'crystal library',
    'crystal reference',
    'crystal identifier',
    'crystal encyclopaedia',
    'chakra crystals',
    'crystal care',
    'crystal cleansing',
    'crystal app',
    'crystal collection',
  ],
  openGraph: {
    title: 'Crystal Index — Every crystal has a story',
    description: 'Explore 200+ crystals with detailed properties, chakra associations, zodiac connections, and AI identification.',
    type: 'website',
    siteName: 'Crystal Index',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crystal Index — Every crystal has a story',
    description: 'Explore 200+ crystals with detailed properties, chakra associations, zodiac connections, and AI identification.',
  },
}

export default function Page() {
  return (
    <div className="main-container">
      <Hero />
      <FeaturedCrystals />
      <Features />
      <HowItWorks />
      <AppShowcase />
      <FAQ />
      <SEOSection />
      <FinalCTA />
    </div>
  )
}

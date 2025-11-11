import { Metadata } from 'next'
import IdentifyCrystal from '../../components/Organisms/IdentifyCrystal'

export const metadata: Metadata = {
  title: 'Identify Crystal',
  description: 'Upload a photo to identify your crystal using AI-powered visual recognition.',
  openGraph: {
    title: 'Identify Crystal | Crystal Index',
    description: 'Upload a photo to identify your crystal using AI-powered visual recognition.',
  },
}

export default function IdentifyPage() {
  return (
    <div className="container mt-5">
      <div className="columns is-centered">
        <div className="column is-8">
          <h1 className="title is-2 has-text-centered mb-5">
            Identify Your Crystal
          </h1>
          <IdentifyCrystal />
        </div>
      </div>
    </div>
  )
}




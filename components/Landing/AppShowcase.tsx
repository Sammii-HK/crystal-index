import Link from 'next/link'
import { Zap, Camera, Scissors, Library } from 'lucide-react'

const features = [
  { icon: Zap,      title: 'Quick add',           description: 'Add any crystal to your collection in seconds.' },
  { icon: Camera,   title: 'AI identification',   description: 'Photograph a crystal and let AI identify it for you.' },
  { icon: Scissors, title: 'Background removal',  description: 'Clean, professional images of your crystals automatically.' },
  { icon: Library,  title: 'Personal collection', description: 'Catalogue everything you own in one beautiful library.' },
]

export default function AppShowcase() {
  return (
    <section
      className="section"
      aria-label="iOS app"
      style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(147,51,234,0.08) 0%, transparent 60%)' }}
    >
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-5">
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9333ea', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              iOS app
            </p>
            <h2 className="title is-2 mb-4" style={{ color: '#f8f8ff' }}>
              Your crystal companion
            </h2>
            <p className="mb-5" style={{ color: 'rgba(248,248,255,0.7)', lineHeight: 1.7, fontSize: '1.05rem' }}>
              Take Crystal Index everywhere. Identify crystals on the go, build your personal collection, and access the full encyclopaedia from your pocket.
            </p>
            <Link
              href="https://apps.apple.com/app/crystal-index/id6740543879"
              className="button is-primary is-medium"
              style={{ borderRadius: '10px', fontWeight: 600 }}
            >
              Download on the App Store
            </Link>
          </div>

          <div className="column is-6 is-offset-1">
            <div className="columns is-multiline">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="column is-6">
                    <div style={{ padding: '1.25rem 0' }}>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '40px', height: '40px', borderRadius: '9px',
                        background: 'rgba(147,51,234,0.15)', marginBottom: '0.75rem',
                      }}>
                        <Icon size={18} color="#a855f7" aria-hidden="true" />
                      </div>
                      <h3 className="title is-6 mb-1" style={{ color: '#f8f8ff' }}>{feature.title}</h3>
                      <p style={{ color: 'rgba(248,248,255,0.6)', fontSize: '0.88rem', lineHeight: 1.55 }}>{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Camera, Cpu, List, BookOpen, ShieldCheck } from 'lucide-react'

const steps = [
  {
    icon: Camera,
    number: '01',
    title: 'Take a photo',
    description: 'Snap a clear picture of your crystal — raw, tumbled, in jewellery, or on your altar.',
  },
  {
    icon: Cpu,
    number: '02',
    title: 'AI analyses it',
    description: 'Our model analyses colour, structure, texture, and common patterns to find the best match.',
  },
  {
    icon: List,
    number: '03',
    title: 'See likely matches',
    description: 'Get a ranked list of likely crystals with lookalikes, variations, and key differences.',
  },
  {
    icon: BookOpen,
    number: '04',
    title: 'Dive into the details',
    description: 'Explore properties, meanings, chakra associations, care guides, and how to work with your crystal.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section" aria-label="How it works">
      <div className="container">
        <h2 className="title is-2 has-text-centered mb-2">
          How AI identification works
        </h2>
        <p className="has-text-centered mb-6" style={{ color: 'rgba(248,248,255,0.6)', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
          From photo to full crystal profile in seconds.
        </p>
        <div className="columns is-multiline">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="column is-3">
                <div style={{
                  height: '100%',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(147,51,234,0.12)',
                  borderRadius: '14px',
                  padding: '1.75rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '9px',
                      background: 'rgba(147,51,234,0.15)',
                      flexShrink: 0,
                    }}>
                      <Icon size={18} color="#a855f7" aria-hidden="true" />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(147,51,234,0.7)', letterSpacing: '0.1em' }}>
                      STEP {step.number}
                    </span>
                  </div>
                  <h3 className="title is-5 mb-2" style={{ color: '#f8f8ff' }}>{step.title}</h3>
                  <p style={{ color: 'rgba(248,248,255,0.65)', lineHeight: 1.65, fontSize: '0.92rem' }}>{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="has-text-centered mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: 'rgba(248,248,255,0.4)', fontSize: '0.82rem' }}>
          <ShieldCheck size={14} aria-hidden="true" />
          <span>Your images are not stored without permission. You stay in control of your data.</span>
        </div>
      </div>
    </section>
  )
}

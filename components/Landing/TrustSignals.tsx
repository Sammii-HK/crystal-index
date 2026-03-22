const stats = [
  { value: '215', label: 'Crystals documented' },
  { value: 'AI', label: 'Identification engine' },
  { value: 'iOS', label: 'Native app' },
  { value: 'Free', label: 'To get started' },
]

export default function TrustSignals() {
  return (
    <section className="section py-5" style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div className="container">
        <div className="columns is-mobile is-multiline has-text-centered">
          {stats.map(stat => (
            <div key={stat.label} className="column is-6-mobile is-3-tablet">
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{stat.value}</p>
              <p style={{ fontSize: '0.8rem', opacity: 0.45, marginTop: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

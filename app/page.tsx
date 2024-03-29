import { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Homepage'
// }

export default function Page() {
  return (
    <div className="main-container">
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-size-1">Welcome to the Crystal Index 🌈</h1>
            <p>The most personal, beautiful and informative way to index your crystal collection.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function CrystalDetailLoading() {
  return (
    <div className="section" style={{ animation: 'fade-in 0.4s ease' }}>
      <div className="skeleton--back-link" />
      <div className="container">
        <div className="columns my-5 is-mobile is-centered">
          <div className="column p-0 is-5 is-offset-1 is-6-mobile is-offset-0-mobile">
            <div className="skeleton--title" />
          </div>
        </div>
        <div className="columns pt-2 is-centered is-multiline is-flex">
          <div className="column p-0 is-10-mobile is-5 is-offset-1 is-offset-0-mobile">
            <div className="skeleton--carousel" />
          </div>
          <div className="column is-4 is-offset-1 is-10-mobile">
            <div className="skeleton--text" style={{ width: '80%' }} />
            <div className="skeleton--text" style={{ width: '90%' }} />
            <div className="skeleton--text" style={{ width: '70%' }} />
            <div className="skeleton--text" style={{ width: '85%' }} />
            <div className="skeleton--text-short" />
            <div style={{ marginTop: 24 }}>
              <span className="skeleton--tag" />
              <span className="skeleton--tag" />
              <span className="skeleton--tag" />
            </div>
            <div style={{ marginTop: 16 }}>
              <span className="skeleton--tag" />
              <span className="skeleton--tag" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

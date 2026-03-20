export default function CrystalsLoading() {
  return (
    <div className="section">
      <div className="skeleton--search" />
      <div className="columns is-multiline mt-5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="column is-4">
            <div style={{ borderRadius: 8, overflow: 'hidden' }}>
              <div className="skeleton--square" />
              <div className="skeleton--text" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

export default function CrystalDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-page">
      <div className="error-page__title">Crystal not found</div>
      <div className="error-page__description">
        {error.message || 'Failed to load this crystal.'}
      </div>
      <button className="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}

'use client';

export default function CrystalsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-page">
      <div className="error-page__title">Something went wrong</div>
      <div className="error-page__description">
        {error.message || 'Failed to load the crystal gallery.'}
      </div>
      <button className="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}

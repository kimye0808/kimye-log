"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="error">
        <h2>Error occurred!</h2>
        <button className="btn btn-secondary hover2" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}

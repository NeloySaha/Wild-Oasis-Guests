"use client";

function Error({ error, reset }) {
  return (
    <main className="flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p>{error.message}</p>

      <button
        onClick={reset}
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Try again
      </button>
    </main>
  );
}

export default Error;

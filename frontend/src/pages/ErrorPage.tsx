import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-bold text-primary">404</h1>

      <p className="mt-4 text-xl font-medium text-slate-800">Page not found</p>

      <p className="mt-2 max-w-md text-slate-600">
        The page you’re looking for may have been moved or is unavailable.
      </p>

      <Link
        to="/"
        className="
          mt-8 rounded-md border
          border-primary
          px-6 py-2 text-sm
          text-primary
          transition hover:bg-primary
          hover:text-white
        "
      >
        Return to homepage
      </Link>
    </main>
  );
}

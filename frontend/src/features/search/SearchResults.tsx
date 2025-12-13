import { Link } from 'react-router-dom';
import { highlightText } from '../../utils/highlightText';
import type { SearchResponse } from './search.types';

interface SearchResultsProps {
  results: SearchResponse;
  query: string;
}

export default function SearchResults({ results, query }: SearchResultsProps) {
  const { faculties, publications } = results;

  if (faculties.length === 0 && publications.length === 0) {
    return <p className="mt-6 text-gray-600">No results found.</p>;
  }

  return (
    <div className="mt-8 space-y-12">
      <p className="mb-5 text-sm text-slate-600">
        <span className="font-medium text-slate-800">
          {publications.length}
        </span>{' '}
        results found
      </p>

      {/* Publications */}
      {publications.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold">Publications</h2>

          <ul className="space-y-4">
            {publications.map((pub) => (
              <li
                key={pub._id}
                className="rounded-md border border-gray-200 p-4"
              >
                {/* Publication title → Google Scholar */}
                <a
                  href={`https://scholar.google.com/scholar?q=${encodeURIComponent(
                    pub.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-medium hover:underline"
                >
                  {highlightText(pub.title, query)}
                </a>

                {/* Authors */}
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  {pub.authors.map((author) => (
                    <Link
                      key={author._id}
                      to={`/faculties/${author._id}`}
                      className="text-gray-700 hover:underline"
                    >
                      {author.name}
                    </Link>
                  ))}
                </div>

                <p className="mt-1 text-sm text-gray-600 capitalize">
                  {pub.kind}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Faculties */}
      {/* {faculties.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold">Faculty</h2>

          <ul className="space-y-3">
            {faculties.map((faculty) => (
              <li key={faculty._id}>
                <Link
                  to={`/faculties/${faculty._id}`}
                  className="font-medium hover:underline"
                >
                  {highlightText(faculty.name, query)}
                </Link>

                {faculty.position && (
                  <p className="text-sm text-gray-600">{faculty.position}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )} */}
    </div>
  );
}

import type { PublicationPreview } from './faculty.types';

interface PublicationListProps {
  title: string;
  publications: PublicationPreview[];
}

export default function PublicationList({
  title,
  publications,
}: PublicationListProps) {
  if (publications.length === 0) {
    return (
      <p className="text-slate-600 text-center pt-6">
        No publications are currently available in this category.
      </p>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">{title}</h2>

      <ul className="space-y-3">
        {publications.map((pub) => (
          <li
            key={pub._id}
            className="flex flex-col rounded-lg border border-slate-200 bg-white p-4"
          >
            {/* Publication title */}
            <a
              href={`https://scholar.google.com/scholar?q=${encodeURIComponent(
                pub.title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-900 hover:underline"
            >
              {pub.title}
            </a>

            {/* External link microcopy */}
            <a
              href={`https://scholar.google.com/scholar?q=${encodeURIComponent(
                pub.title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                  mt-1 inline-block text-xs
                  text-slate-500
                  hover:text-primary
                  hover:underline
                "
            >
              View publication via Google Scholar
            </a>

            {/* Publication type */}
            <p className="mt-1 text-sm text-gray-600 capitalize">{pub.kind}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

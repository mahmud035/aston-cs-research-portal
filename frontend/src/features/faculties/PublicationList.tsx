import type { PublicationPreview } from './faculty.types';

interface PublicationListProps {
  title: string;
  publications: PublicationPreview[];
}

export default function PublicationList({
  title,
  publications,
}: PublicationListProps) {
  if (publications.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">{title}</h2>

      <ul className="space-y-3">
        {publications.map((pub) => (
          <li key={pub._id} className="rounded-md border border-gray-200 p-4">
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

            <p className="mt-1 text-sm text-gray-600 capitalize">{pub.kind}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getFacultyById } from '../features/faculties/faculty.api';
import PublicationList from '../features/faculties/PublicationList';
import FacultyPageSkeleton from './FacultyPageSkeleton';

export default function FacultyPage() {
  const { id } = useParams<{ id: string }>();

  const {
    isLoading,
    isError,
    data: faculty,
  } = useQuery({
    queryKey: ['faculties', id],
    queryFn: () => getFacultyById(id!),
  });

  if (isLoading) return <FacultyPageSkeleton />;

  if (isError || !faculty) {
    return (
      <p className="text-center py-10 text-red-600">
        Faculty member not found.
      </p>
    );
  }

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <header className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-slate-900">{faculty.name}</h1>

        {faculty.position && (
          <p className="mt-1 inline-block text-sm font-medium text-primary-light transition hover:text-primary">
            {faculty.position}
          </p>
        )}
      </header>

      {/* Departments */}
      <section className="mb-8">
        <h2 className="mb-2 font-semibold text-gray-900">
          Affiliated Departments
        </h2>

        <ul className="flex flex-wrap gap-2">
          {faculty.departments.map((dept) => (
            <li key={dept._id}>
              <Link
                to={`/departments/${dept.slug}`}
                className="  rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 transition hover:border-primary hover:text-primary"
              >
                {dept.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Research Interest */}
      {faculty.researchInterest && (
        <section className="mb-10">
          <h2 className="mb-2 font-semibold text-gray-900">
            Research Interests
          </h2>
          <p className="max-w-4xl leading-relaxed text-slate-700">
            {faculty.researchInterest}
          </p>
        </section>
      )}

      {/* Publications */}
      <PublicationList
        title="Journal Articles"
        publications={faculty.articles}
      />

      <PublicationList
        title="Conference Papers"
        publications={faculty.conferencePapers}
      />
    </main>
  );
}

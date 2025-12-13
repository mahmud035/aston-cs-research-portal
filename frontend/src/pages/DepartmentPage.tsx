import { useQuery } from '@tanstack/react-query';
import { data, useParams } from 'react-router-dom';
import FacultyList from '../features/departments/FacultyList';
import { getDepartmentBySlug } from '../features/departments/department.api';

export default function DepartmentPage() {
  const { slug } = useParams<{ slug: string }>();

  const {
    isLoading,
    isError,
    data: department,
  } = useQuery({
    queryKey: ['departments', slug],
    queryFn: () => getDepartmentBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading department...</p>;
  }

  if (isError || !department) {
    return (
      <p className="text-center py-10 text-red-600">Department not found.</p>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">{department.name}</h1>

        <p className="mt-2 text-gray-600">
          Faculty members associated with this department
        </p>
      </header>

      <h1>{data.name}</h1>

      <FacultyList faculties={department.faculties} />
    </main>
  );
}

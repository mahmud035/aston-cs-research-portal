import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import FacultyList from '../features/departments/FacultyList';
import { getDepartmentBySlug } from '../features/departments/department.api';
import DepartmentPageSkeleton from './DepartmentPageSkeleton';

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

  if (isLoading) return <DepartmentPageSkeleton />;

  if (isError || !department) {
    return (
      <p className="text-center py-10 text-red-600">Department not found.</p>
    );
  }

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">{department.name}</h1>

        <p className="my-2 text-gray-600">
          Faculty members associated with this department
        </p>
      </header>

      <FacultyList faculties={department.faculties} />
    </main>
  );
}

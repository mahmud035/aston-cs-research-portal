import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import FacultyList from '../features/departments/FacultyList';
import { getDepartmentBySlug } from '../features/departments/department.api';

export default function DepartmentPage() {
  const { slug } = useParams<{ slug: string }>();
  console.log(slug);

  const { isLoading, data } = useQuery({
    queryKey: ['departments', slug],
    queryFn: () => getDepartmentBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Department not found</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <FacultyList faculties={data.faculties} />
    </div>
  );
}

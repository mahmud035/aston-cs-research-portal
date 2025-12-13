import { useQuery } from '@tanstack/react-query';
import { getDepartments } from './department.api';
import DepartmentCard from './DepartmentCard';
import DepartmentGridSkeleton from './DepartmentGridSkeleton';

export default function DepartmentGrid() {
  const {
    isLoading,
    isError,
    data: departments,
  } = useQuery({
    queryKey: ['departments'],
    queryFn: () => getDepartments(),
  });

  if (isLoading) return <DepartmentGridSkeleton />;

  if (isError) {
    return (
      <p className="text-center text-red-600">Failed to load departments.</p>
    );
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {departments?.map((department) => (
        <DepartmentCard key={department._id} department={department} />
      ))}
    </section>
  );
}

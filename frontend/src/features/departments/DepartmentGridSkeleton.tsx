import Skeleton from '../../components/ui/Skeleton';

export default function DepartmentGridSkeleton() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </section>
  );
}

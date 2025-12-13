import Skeleton from '../components/ui/Skeleton';

export default function DepartmentPageSkeleton() {
  return (
    <main className="container mx-auto px-4 py-10">
      <Skeleton className="mb-4 h-8 w-2/3" />
      <Skeleton className="mb-8 h-4 w-1/2" />

      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    </main>
  );
}

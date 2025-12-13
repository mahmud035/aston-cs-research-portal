import Skeleton from '../components/ui/Skeleton';

export default function FacultyPageSkeleton() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <Skeleton className="mb-2 h-8 w-1/2" />
      <Skeleton className="mb-6 h-4 w-1/3" />

      {/* Departments */}
      <Skeleton className="mb-4 h-4 w-1/4" />
      <div className="mb-8 flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-32" />
        ))}
      </div>

      {/* Research Interest */}
      <Skeleton className="mb-2 h-4 w-1/4" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-10 h-4 w-3/4" />

      {/* Publications */}
      <Skeleton className="mb-4 h-6 w-1/3" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    </main>
  );
}

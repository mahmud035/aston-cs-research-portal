import Skeleton from '../../components/ui/Skeleton';

export default function SearchSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}

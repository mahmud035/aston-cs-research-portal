import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { searchAll } from '../features/search/search.api';
import SearchBar from '../features/search/SearchBar';
import SearchResults from '../features/search/SearchResults';
import SearchSkeleton from '../features/search/SearchSkeleton';
import { useDebounce } from '../hooks/useDebounce';

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';

  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchAll({ q: debouncedQuery }),
    enabled: debouncedQuery.length > 1,
  });

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10 mt-10 rounded-2xl bg-white p-8 shadow-sm">
      <h2 className="mb-2 text-2xl font-semibold text-slate-900">
        Search Publications and Academic Staff
      </h2>

      <p className="mb-6 max-w-2xl text-sm text-slate-600">
        Search by keyword, research topic, or staff name to find relevant
        publications and faculty profiles.
      </p>

      <SearchBar
        value={query}
        onChange={(value) => setParams({ q: value })}
        onClear={() => setParams({})}
      />

      {isLoading && <SearchSkeleton />}

      {data && <SearchResults results={data} query={query} />}
    </main>
  );
}

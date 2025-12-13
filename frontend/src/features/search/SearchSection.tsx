import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { searchAll } from './search.api';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SearchSkeleton from './SearchSkeleton';

export default function SearchSection() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';

  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchAll({ q: debouncedQuery }),
    enabled: debouncedQuery.length > 1,
  });

  return (
    <section className="mt-20 rounded-2xl bg-white p-8 shadow-sm">
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
    </section>
  );
}

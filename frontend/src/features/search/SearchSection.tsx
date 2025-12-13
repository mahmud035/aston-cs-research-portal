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
    <section className="mt-16">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">
        Search Research & Faculty
      </h2>

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

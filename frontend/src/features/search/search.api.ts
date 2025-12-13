import type { ApiResponse } from '../../api/api.types';
import api from '../../api/axios';
import type { SearchResponse } from './search.types';

interface SearchParams {
  q: string;
  limit?: number;
  offset?: number;
}

export const searchAll = async ({
  q,
  limit = 10,
  offset = 0,
}: SearchParams) => {
  const res = await api.get<ApiResponse<SearchResponse>>('/search', {
    params: { q, limit, offset },
  });

  return res.data.data;
};

import type { ApiResponse } from '../../api/api.types';
import api from '../../api/axios';
import type { Faculty } from './faculty.types';

export const getFacultyById = async (id: string): Promise<Faculty> => {
  const res = await api.get<ApiResponse<Faculty>>(`/faculties/${id}`);
  return res.data.data;
};

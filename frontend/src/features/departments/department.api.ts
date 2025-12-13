import type { ApiResponse } from '../../api/api.types';
import api from '../../api/axios';
import type { Department, DepartmentWithFaculties } from './department.types';

export const getDepartments = async () => {
  const res = await api.get<ApiResponse<Department[]>>('/departments');
  return res.data.data;
};

export const getDepartmentBySlug = async (slug: string) => {
  const res = await api.get<ApiResponse<DepartmentWithFaculties>>(
    `/departments/${slug}`
  );
  return res.data.data;
};

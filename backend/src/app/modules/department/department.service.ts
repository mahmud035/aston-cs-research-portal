import { Faculty } from '../faculty/faculty.model';
import { Department } from './department.model';

const getAllDepartments = async () => {
  return Department.find({ isComputerScienceRelated: true })
    .select('_id name slug')
    .lean();
};

const getDepartmentBySlug = async (slug: string) => {
  return Department.findOne({ slug, isComputerScienceRelated: true }).lean();
};

const getFacultiesByDepartmentId = (departmentId: string) => {
  return Faculty.find({ departmentIds: departmentId })
    .select('_id name position')
    .lean();
};

export const departmentService = {
  getAllDepartments,
  getDepartmentBySlug,
  getFacultiesByDepartmentId,
};

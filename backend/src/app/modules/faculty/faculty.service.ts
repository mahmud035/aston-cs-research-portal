import { Department } from '../department/department.model';
import { Publication } from '../publication/publication.model';
import { Faculty } from './faculty.model';

const getFacultyById = async (id: string) => {
  return Faculty.findById(id).lean();
};

const getDepartmentsByIds = async (ids: string[]) => {
  return Department.find({ _id: { $in: ids } })
    .select('_id name slug')
    .lean();
};

const getPublicationsByIds = async (ids: string[]) => {
  return Publication.find({ _id: { $in: ids } })
    .select('_id title kind keywords')
    .lean();
};

export const facultyService = {
  getFacultyById,
  getDepartmentsByIds,
  getPublicationsByIds,
};

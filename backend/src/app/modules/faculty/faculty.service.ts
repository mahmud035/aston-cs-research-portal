import { Department } from '../department/department.model';
import { Publication } from '../publication/publication.model';
import { Faculty } from './faculty.model';

export const facultyService = {
  async getFacultyById(id: string) {
    return Faculty.findById(id).lean();
  },

  async getDepartmentsByIds(ids: string[]) {
    return Department.find({ _id: { $in: ids } })
      .select('_id name slug')
      .lean();
  },

  async getPublicationsByIds(ids: string[]) {
    return Publication.find({ _id: { $in: ids } })
      .select('_id title kind keywords')
      .lean();
  },
};

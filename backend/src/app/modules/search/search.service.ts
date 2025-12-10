import { Faculty } from '../faculty/faculty.model';
import { Publication } from '../publication/publication.model';

export const searchService = {
  async searchPublications(regex: RegExp) {
    return Publication.find({
      $or: [{ title: regex }, { keywords: regex }],
    })
      .populate('authors', '_id name position')
      .select('_id title kind keywords authors')
      .lean();
  },

  async searchFaculties(regex: RegExp) {
    return Faculty.find({
      $or: [{ name: regex }, { researchInterest: regex }],
    })
      .select('_id name position researchInterest')
      .lean();
  },
};

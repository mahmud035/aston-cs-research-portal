import { Faculty } from '../faculty/faculty.model';
import { Publication } from '../publication/publication.model';

const searchPublications = async (
  q: string,
  limit?: number,
  offset?: number
) => {
  const regex = new RegExp(q, 'i');

  const publications = await Publication.find({
    $or: [{ title: regex }, { keywords: regex }],
  })
    .populate('authors', '_id name position')
    .sort({ createdAt: -1 })
    .skip(offset ?? 0)
    .limit(limit ?? 50)
    .lean();

  return publications;
};

const searchFaculties = async (q: string, limit?: number, offset?: number) => {
  const regex = new RegExp(q, 'i');

  const faculties = await Faculty.find({
    $or: [{ name: regex }, { researchInterest: regex }],
  })
    .select('_id name position researchInterest')
    .sort({ name: 1 })
    .skip(offset ?? 0)
    .limit(limit ?? 50)
    .lean();

  return faculties;
};

export const searchService = {
  searchPublications,
  searchFaculties,
};

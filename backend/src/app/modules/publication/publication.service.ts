import { Publication } from './publication.model';

const getPublicationById = async (id: string) => {
  return Publication.findById(id)
    .populate('authors', '_id name position')
    .lean();
};

const getAllPublications = async () => {
  return Publication.find({}).populate('authors', '_id name position').lean();
};

const findPublicationsByQuery = async (query: object) => {
  return Publication.find(query)
    .populate('authors', '_id name position')
    .lean();
};

export const publicationService = {
  getPublicationById,
  getAllPublications,
  findPublicationsByQuery,
};

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { searchService } from './search.service';

const search = catchAsync(async (req: Request, res: Response) => {
  const { q } = req.query as { q: string };
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const offset = req.query.offset ? Number(req.query.offset) : undefined;

  // 1. Search publications
  const publications = await searchService.searchPublications(q, limit, offset);

  // 2. Search faculties
  const faculties = await searchService.searchFaculties(q, limit, offset);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Search results retrieved successfully',
    data: {
      publications,
      faculties,
    },
  });
});

export const searchController = {
  search,
};

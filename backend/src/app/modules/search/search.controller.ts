import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { searchService } from './search.service';

const search = catchAsync(async (req: Request, res: Response) => {
  const q = (req.query.q as string).trim();
  const regex = new RegExp(q, 'i');

  const [publications, faculties] = await Promise.all([
    searchService.searchPublications(regex),
    searchService.searchFaculties(regex),
  ]);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: {
      publications,
      faculties,
    },
  });
});

export const searchController = {
  search,
};

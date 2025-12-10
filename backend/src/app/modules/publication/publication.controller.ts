import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { publicationService } from './publication.service';

const getAllPublications = catchAsync(async (_req: Request, res: Response) => {
  const pubs = await publicationService.getAllPublications();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Publications retrieved successfully',
    data: pubs,
  });
});

const getPublicationById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const publication = await publicationService.getPublicationById(id);

  if (!publication) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Publication not found',
      data: null,
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Publication retrieved successfully',
    data: publication,
  });
});

export const publicationController = {
  getAllPublications,
  getPublicationById,
};

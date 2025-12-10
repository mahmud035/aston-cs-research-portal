import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { facultyService } from './faculty.service';

const getFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const faculty = await facultyService.getFacultyById(id);

  if (!faculty) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Faculty not found',
      data: null,
    });
    return;
  }

  const departments = await facultyService.getDepartmentsByIds(
    (faculty.departmentIds || []).map((d) => d.toString())
  );

  const publicationIds = [
    ...(faculty.articleIds || []),
    ...(faculty.conferencePaperIds || []),
  ].map((id) => id.toString());

  const publications = await facultyService.getPublicationsByIds(
    publicationIds
  );

  const articles = publications.filter((p) => p.kind === 'article');
  const conferencePapers = publications.filter((p) => p.kind === 'conference');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: {
      _id: faculty._id,
      name: faculty.name,
      position: faculty.position || null,
      researchInterest: faculty.researchInterest || null,
      departments,
      articles,
      conferencePapers,
    },
  });
});

export const facultyController = {
  getFaculty,
};

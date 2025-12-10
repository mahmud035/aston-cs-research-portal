import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { departmentService } from './department.service';

const getAllDepartments = catchAsync(async (_req: Request, res: Response) => {
  const departments = await departmentService.getAllDepartments();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Departments retrieved successfully',
    data: departments,
  });
});

const getDepartmentBySlug = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const department = await departmentService.getDepartmentBySlug(slug);

  if (!department) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Department not found',
      data: null,
    });
    return;
  }

  const faculties = await departmentService.getFacultiesByDepartmentId(
    department._id.toString()
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department retrieved successfully',
    data: {
      _id: department._id,
      name: department.name,
      slug: department.slug,
      faculties,
    },
  });
});

export const departmentController = {
  getAllDepartments,
  getDepartmentBySlug,
};

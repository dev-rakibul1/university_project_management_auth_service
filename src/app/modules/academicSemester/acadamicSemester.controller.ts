import { Request, Response } from 'express';
import status from 'http-status';
import { paginationFields } from '../../../constants/paginationsFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './acadamicSemester.service';
import { academicSemesterFilterableField } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Semester create successfully!',
      data: result,
    });
  }
);

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: req.query.sortBy,
  //   sortOrder: req.query.sortOrder,
  // };

  const filters = pick(req.query, academicSemesterFilterableField);
  // const filters: IAcademicSemesterFilter = pick(req.query, ['searchTerm']);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemesterService(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester get successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicSemesterService.getSingleSemesterService(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single semester get successfully!',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await AcademicSemesterService.updateSemesterService(
    id,
    updateData
  );

  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester update successfully!',
    data: result,
  });
});

const deleteSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteData = req.body;

  const result = await AcademicSemesterService.deleteSingleSemesterService(
    id,
    deleteData
  );

  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester delete successfully!',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSingleSemester,
};

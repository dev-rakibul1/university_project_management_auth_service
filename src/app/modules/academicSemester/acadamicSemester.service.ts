import status from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelpers';
import { IGenResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import AcademicSemester from './acadamicSemester.model';
import {
  academicSemesterSearchKeys,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from './academicSemester.interface';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    // throw new ApiError(Number(status['400_MESSAGE']), 'Invalid semester code.');
    throw new ApiError(status.BAD_REQUEST, 'Invalid semester code.');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// get all semester

const getAllSemesterService = async (
  filters: IAcademicSemesterFilter,
  pagination: IPaginationOptions
): Promise<IGenResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...searchTermData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchKeys.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(searchTermData).length) {
    andConditions.push({
      $and: Object.entries(searchTermData).map(([fields, value]) => ({
        [fields]: value,
      })),
    });
  }

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         startMonth: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         endMonth: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.paginationCalculation(pagination);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions = andConditions.length ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .limit(limit)
    .skip(skip);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemesterService = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemesterService = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    // throw new ApiError(Number(status['400_MESSAGE']), 'Invalid semester code.');
    throw new ApiError(status.BAD_REQUEST, 'Invalid semester code.');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSingleSemesterService = (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  const finallyDeleteData = AcademicSemester.findOneAndDelete(
    { _id: id },
    payload
  );
  return finallyDeleteData;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesterService,
  getSingleSemesterService,
  updateSemesterService,
  deleteSingleSemesterService,
};

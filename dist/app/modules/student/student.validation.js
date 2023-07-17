'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.studentValidation = void 0;
const zod_1 = require('zod');
const student_constant_1 = require('../student/student.constant');
const updateStudentZodSchema = zod_1.z.object({
  body: zod_1.z
    .object({
      name: zod_1.z
        .object({
          firstName: zod_1.z.string().optional(),
          middleName: zod_1.z.string().optional(),
          lastName: zod_1.z.string().optional(),
        })
        .optional(),
      dateOfBirth: zod_1.z.string().optional(),
      gender: zod_1.z.enum([...student_constant_1.studentGender]).optional(),
      email: zod_1.z.string().email().optional(),
      contactNo: zod_1.z.string().optional(),
      emergencyContactNo: zod_1.z.string().optional(),
      bloodGroup: zod_1.z.enum([...student_constant_1.bloodGroup]).optional(),
      presentAddress: zod_1.z.string().optional(),
      permanentAddress: zod_1.z.string().optional(),
      guardian: zod_1.z
        .object({
          fatherName: zod_1.z.string().optional(),
          fatherOccupation: zod_1.z.string().optional(),
          fatherContactNo: zod_1.z.string().optional(),
          motherName: zod_1.z.string().optional(),
          motherOccupation: zod_1.z.string().optional(),
          motherContactNo: zod_1.z.string().optional(),
          address: zod_1.z.string().optional(),
        })
        .optional(),
      localGuardian: zod_1.z
        .object({
          name: zod_1.z.string().optional(),
          occupation: zod_1.z.string().optional(),
          contactNo: zod_1.z.string().optional(),
          address: zod_1.z.string().optional(),
        })
        .optional(),
      academicFaculty: zod_1.z.string().optional(),
      academicDepartment: zod_1.z.string().optional(),
      academicSemester: zod_1.z.string().optional(),
      profileImage: zod_1.z.string().optional(),
    })
    .optional(),
});
exports.studentValidation = {
  updateStudentZodSchema,
};

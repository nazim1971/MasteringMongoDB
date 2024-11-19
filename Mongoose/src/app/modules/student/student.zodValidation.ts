import { z } from 'zod';

// Validation for UserName
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters long')
    .nonempty('First name is required'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters long')
    .nonempty('Last name is required'),
});

// Validation for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father’s name is required'),
  fatherOccupation: z.string().nonempty('Father’s occupation is required'),
  fatherContactNo: z.string().nonempty('Father’s contact number is required'),
  motherName: z.string().nonempty('Mother’s name is required'),
  motherOccupation: z.string().nonempty('Mother’s occupation is required'),
  motherContactNo: z.string().nonempty('Mother’s contact number is required'),
});

// Validation for LocalGuardian
const localGuardianValidationSchema = z.object({
  Name: z.string().nonempty('Local guardian’s name is required'),
  Occupation: z.string().nonempty('Local guardian’s occupation is required'),
  ContactNo: z.string().nonempty('Local guardian’s contact number is required'),
});

// Validation for Student
const studentValidationSchema = z.object({
  id: z.string().nonempty('ID is required'),
  name: userNameValidationSchema,
  gender: z.enum(['female', 'male'], {
    errorMap: () => ({ message: 'Gender must be either female or male' }),
  }),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Invalid email').nonempty('Email is required'),
  contactNo: z.string().nonempty('Contact number is required'),
  emergencyContactNo: z
    .string()
    .nonempty('Emergency contact number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: () => ({ message: 'Invalid blood group' }),
    })
    .optional(),
  presentAddress: z.string().nonempty('Present address is required'),
  permanentAddress: z.string().nonempty('Permanent address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z
    .enum(['active', 'blocked'], {
      errorMap: () => ({ message: 'Status must be either active or blocked' }),
    })
    .default('active'),
});

export { studentValidationSchema };

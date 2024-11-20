import { z } from 'zod';

// Validation for UserName
const userNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .min(2, 'First name must be at least 2 characters long'),

  middleName: z.string().optional(),

  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .min(2, 'Last name must be at least 2 characters long'),
});

// Validation for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string({
    required_error: 'Father’s name is required',
    invalid_type_error: 'Father’s name must be a string',
  }),

  fatherOccupation: z.string({
    required_error: 'Father’s occupation is required',
    invalid_type_error: 'Father’s occupation must be a string',
  }),

  fatherContactNo: z.string({
    required_error: 'Father’s contact number is required',
    invalid_type_error: 'Father’s contact number must be a string',
  }),

  motherName: z.string({
    required_error: 'Mother’s name is required',
    invalid_type_error: 'Mother’s name must be a string',
  }),

  motherOccupation: z.string({
    required_error: 'Mother’s occupation is required',
    invalid_type_error: 'Mother’s occupation must be a string',
  }),

  motherContactNo: z.string({
    required_error: 'Mother’s contact number is required',
    invalid_type_error: 'Mother’s contact number must be a string',
  }),
});

// Validation for LocalGuardian
const localGuardianValidationSchema = z.object({
  Name: z.string({
    required_error: 'Local guardian’s name is required',
    invalid_type_error: 'Local guardian’s name must be a string',
  }),

  Occupation: z.string({
    required_error: 'Local guardian’s occupation is required',
    invalid_type_error: 'Local guardian’s occupation must be a string',
  }),

  ContactNo: z.string({
    required_error: 'Local guardian’s contact number is required',
    invalid_type_error: 'Local guardian’s contact number must be a string',
  }),
});

// Validation for Student
const studentValidationSchema = z.object({
  id: z.string({
    required_error: 'ID is required',
    invalid_type_error: 'ID must be a string',
  }),
  password: z
    .string({ required_error: 'Password is required' })
    .max(20, { message: 'Password cannot be more than 20 characters' }),
  name: userNameValidationSchema,

  gender: z.enum(['female', 'male'], {
    required_error: 'Gender is required',
    invalid_type_error: 'Gender must be either female or male',
  }),

  dateOfBirth: z.string({
    required_error: 'Date of birth is required',
    invalid_type_error: 'Date of birth must be a string',
  }),

  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('Invalid email format'),

  contactNo: z.string({
    required_error: 'Contact number is required',
    invalid_type_error: 'Contact number must be a string',
  }),

  emergencyContactNo: z.string({
    required_error: 'Emergency contact number is required',
    invalid_type_error: 'Emergency contact number must be a string',
  }),

  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      invalid_type_error: 'Blood group must be a valid type',
    })
    .optional(),

  presentAddress: z.string({
    required_error: 'Present address is required',
    invalid_type_error: 'Present address must be a string',
  }),

  permanentAddress: z.string({
    required_error: 'Permanent address is required',
    invalid_type_error: 'Permanent address must be a string',
  }),

  guardian: guardianValidationSchema,

  localGuardian: localGuardianValidationSchema,

  profileImage: z.string().optional(),

  isActive: z
    .enum(['active', 'blocked'], {
      required_error: 'Status is required',
      invalid_type_error: 'Status must be either active or blocked',
    })
    .default('active'),
  isDeleted: z.boolean().default(false),
});

export { studentValidationSchema };

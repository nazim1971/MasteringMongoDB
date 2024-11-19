import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { z } from 'zod';

const createStudent = async (req: Request, res: Response) => {
  try {
    // Create a schema using zod

    const studnetValidationSchema = z.object({
      id: z.string(),
      name: z.object({
        firstName: z.string().max(20, {
          message: 'First name cannot be more than 20 characters',
        }),
      }),
    });

    const student = req.body;
    const result = await StudentServices.createStudentIntoDB(student);

    res.status(201).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Somwthing went wrong',
      error: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: ' Single Student are retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};

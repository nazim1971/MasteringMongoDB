import { Schema } from 'mongoose';
import { Student } from './student.interface';

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  gender: ['female', 'male'],
  dateOfBirth: String,
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
  },
  localGuardian: {
    Name: { type: String, required: true },
    Occupation: { type: String, required: true },
    ContactNo: { type: String, required: true },
  },
  profileImage: String,
  isActive: ['active', 'inActive'],
});

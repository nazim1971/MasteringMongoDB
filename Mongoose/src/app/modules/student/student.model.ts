import { model, Schema } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2, 'First name must be at least 2 characters long'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    minlength: [2, 'Last name must be at least 2 characters long'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father’s name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father’s occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father’s contact number is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother’s name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother’s occupation is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother’s contact number is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  Name: {
    type: String,
    required: [true, 'Local guardian’s name is required'],
  },
  Occupation: {
    type: String,
    required: [true, 'Local guardian’s occupation is required'],
  },
  ContactNo: {
    type: String,
    required: [true, 'Local guardian’s contact number is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
    maxlength: [20, 'Password can not bem= more then 20 character'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['female', 'male'],
      message: '{VALUE} is not valid ',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Email is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message:
        "Blood group must be one of: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'",
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required'],
  },
  profileImage: {
    type: String,
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: 'Status must be either active or blocked',
    },
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

//Pre save middleware/hook : will work on create() save()
studentSchema.pre('save', async function (next) {
  //Hashing password and save in db
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
  //console.log(this, 'pre hook: we will save the data');
});
//post save middleware / hook
studentSchema.post('save', function (data, next) {
  //console.log(this, 'Post hook : We saved our data');
  data.password = '';
  next();
});

//Query Middleware
studentSchema.pre('find', function (next) {
  // console.log(this, 'Find alll lall');
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  // console.log(this, 'Find alll lall');
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  // console.log(this, 'Find alll lall');
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//Creating a custom static method

studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// // a custom instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);

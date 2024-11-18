import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// will call controller func
router.post('/create-student', StudentControllers.createStudent);
router.get('/getAllStudent', StudentControllers.getAllStudent);

export const StudentRoutes = router;

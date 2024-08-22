import express from 'express';
import { createCourse, updateCourse, deleteCourse } from '../controllers/course.controller.js';

const router = express.Router();

router.post('/create', createCourse);
router.put('/:courseId', updateCourse);
router.delete('/:courseId', deleteCourse);

export default router;

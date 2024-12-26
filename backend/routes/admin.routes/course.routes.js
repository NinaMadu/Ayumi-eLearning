import express from "express";
import { createCourse, deleteCourse,  getAllCourses, editCourse, getCourseById, totalCourses } from "../../controllers/course.controller.js";


const router = express.Router();

router.post('/add', createCourse); 
router.get('/count',totalCourses);
router.delete("/:id", deleteCourse); 
router.get("/", getAllCourses);
router.put("/:id", editCourse);
router.get('/:id', getCourseById);
router.get('/count',totalCourses);



export default router;
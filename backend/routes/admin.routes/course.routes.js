import express from "express";
import { createCourse, deleteCourse,  getAllCourses, editCourse, getCourseById } from "../../controllers/course.controller.js";


const router = express.Router();

router.post('/add', createCourse); 
router.delete("/:id", deleteCourse); 
router.get("/", getAllCourses);
router.put("/:id", editCourse);
router.get('/:id', getCourseById);



export default router;
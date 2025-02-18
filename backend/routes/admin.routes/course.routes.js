import express from "express";
import { createCourse, deleteCourse,  getAllCourses, editCourse, getCourseById, totalCourses, addVideoToPlaylist,getPopularCourses, getRecentlyAddedCourses, getEnrolledStudents } from "../../controllers/course.controller.js";


const router = express.Router();

router.post('/add', createCourse); 
router.get('/count',totalCourses);
router.get("/popular", getPopularCourses);
router.get("/recent", getRecentlyAddedCourses);
router.get('/:id/enrolled-students',getEnrolledStudents);
router.delete("/:id", deleteCourse); 
router.get("/", getAllCourses);
router.put("/:id", editCourse);
router.get('/:id', getCourseById);
router.post("/:id/playlist", addVideoToPlaylist);
router.get("/popular", getPopularCourses);



export default router;
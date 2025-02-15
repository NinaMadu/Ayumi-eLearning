import express from "express";
import { deactivateUser, deleteUser,  getAllUsers, getUserById, totalUsers, activateUser, getOnlineUsers, addFavourite, removeFavourite, getUserFavo, enrollCourse, getUserEnroll, removeEnroll, calculateCourseProgress, getUserProgress, updateUserProgress} from "../../controllers/user.controller.js";
// import { get } from "mongoose";


const router = express.Router();

router.delete("/:id", deleteUser); 
router.get('/online', getOnlineUsers);
router.get("/", getAllUsers);
router.get('/count',totalUsers);
router.get('/:id', getUserById);
router.put('/deactivate/:id',deactivateUser);
router.put('/activate/:id',activateUser);
router.post('/user/:userId/favorites/:courseId',addFavourite);
router.delete('/user/:userId/favorites/:courseId',removeFavourite);
router.get('/user/:userId/favorites',getUserFavo);
router.post('/user/:userId/enroll/:courseId',enrollCourse);
router.get('/user/:userId/enrolled-courses',getUserEnroll);
router.delete('/user/:userId/enroll/:courseId',removeEnroll);
router.get('/user/:userId/course/:courseId/progress',calculateCourseProgress);
router.get('/userProgress/:userId/:courseId/:videoId',getUserProgress);
router.post('/userProgressUpdate',updateUserProgress);




export default router;
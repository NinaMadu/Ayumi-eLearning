import express from "express";
import { deactivateUser, deleteUser,  getAllUsers, getUserById, totalUsers, activateUser, getOnlineUsers, addFavourite, removeFavourite, getUserFavo, enrollCourse, getUserEnroll, removeEnroll,getMonthlyUserSignups} from "../../controllers/user.controller.js";


const router = express.Router();

router.delete("/:id", deleteUser); 
router.get('/online', getOnlineUsers);
router.get("/", getAllUsers);
router.get('/count',totalUsers);
router.get("/monthly-signups", getMonthlyUserSignups);
router.get('/:id', getUserById);
router.put('/deactivate/:id',deactivateUser);
router.put('/activate/:id',activateUser);
router.post('/user/:userId/favorites/:courseId',addFavourite);
router.delete('/user/:userId/favorites/:courseId',removeFavourite);
router.get('/user/:userId/favorites',getUserFavo);
router.post('/user/:userId/enroll/:courseId',enrollCourse);
router.get('/user/:userId/enrolled-courses',getUserEnroll);
router.delete('/user/:userId/enroll/:courseId',removeEnroll);
router.get("/monthly-signups", getMonthlyUserSignups);




export default router;
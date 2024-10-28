import express from "express";
import { updateInstructorProfile, getInstructorProfile } from "../controllers/instructor.controllers.js";




const router = express.Router();

// Route to update instructor profile
router.put('/update', updateInstructorProfile);

// Route to get instructor profile by email
router.get('/:email', getInstructorProfile);

export default router;

import express from "express";
import { updateUserProfile, getUserProfile} from "../controllers/userDetail.controllers.js";

const router = express.Router();

// Route to update user profile
router.put('/update', updateUserProfile);

// Route to get user profile by email
router.get('/:email', getUserProfile);


export default router;

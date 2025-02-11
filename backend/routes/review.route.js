import express from "express";
import { addReview, getCourseReviews } from "../controllers/review.controller.js";


const router = express.Router();

router.post("/", addReview); // Add review
router.get("/:courseId", getCourseReviews); // Get all reviews for a course
// router.put("/:id",  updateReview); // Update a review
// router.delete("/:id",  deleteReview); // Delete a review

export default router;

import express from "express";
import { addReview, getCourseReviewAverage, getCourseReviews } from "../controllers/review.controller.js";
import { get } from "mongoose";


const router = express.Router();

router.post("/", addReview); // Add review
router.get("/:courseId", getCourseReviews); // Get all reviews for a course
router.get("/:courseId/review-avg",getCourseReviewAverage);
// router.put("/:id",  updateReview); // Update a review
// router.delete("/:id",  deleteReview); // Delete a review

export default router;

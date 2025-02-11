import mongoose from "mongoose";
import Review from "../models/review.model.js";
import Course from "../models/course.model.js";

export const addReview = async (req, res) => {
    try {
        const { courseId, rating, comment } = req.body;

        // Validate courseId format
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: "Invalid Course ID" });
        }

        // Validate course existence
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // Validate rating
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        // ✅ Save the review with courseId
        const review = new Review({
            courseId: course._id,  // Ensure it's saved as ObjectId
            rating,
            comment,
        });

        await review.save();

        res.status(201).json({ message: "Review Added", review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


export const getCourseReviews = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Validate courseId format
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: "Invalid Course ID" });
        }

        // Validate course existence
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // ✅ Fetch reviews for this course
        const reviews = await Review.find({ courseId: courseId }).populate("courseId");

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
};

import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import jwt from "jsonwebtoken";

export const addReview = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract JWT token from headers
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // Extract user ID from token

        const { courseId, rating, comment } = req.body;

        // Validate user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Validate course
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // Check if the user already reviewed the course
        const existingReview = await Review.findOne({ courseId, userId });
        if (existingReview) return res.status(400).json({ message: "You have already reviewed this course" });

        const review = new Review({
            courseId,
            userId,
            username: user.username, // Fetch from DB
            rating,
            comment,
        });

        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const getCourseReviews = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Validate course
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const reviews = await Review.find({ courseId });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const updateReview = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { id } = req.params; // Review ID

        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        // Prevent other users from editing the review
        if (review.userId.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Update review
        review.rating = req.body.rating || review.rating;
        review.comment = req.body.comment || review.comment;

        await review.save();
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { id } = req.params; // Review ID

        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        // Prevent other users from deleting the review
        if (review.userId.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await review.deleteOne();
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

import Course from '../models/course.model.js';

export const createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            difficultyLevel,
            prerequisites,
            courseObjectives,
            duration,
            enrollmentOptions,
            Pricing,
            courseVisibility,
            instructor,
            courseImage,
            courseIntro,
            courseMaterials,
            embedMedia,
            references
        } = req.body;

        const newCourse = new Course({
            title,
            description,
            category,
            difficultyLevel,
            prerequisites,
            courseObjectives,
            duration,
            enrollmentOptions,
            Pricing,
            courseVisibility,
            instructor,
            courseImage,
            courseIntro,
            courseMaterials,
            embedMedia,
            references
        });

        const savedCourse = await newCourse.save();

        return res.status(201).json({
            success: true,
            message: 'Course created successfully',
            data: savedCourse
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error creating course',
            error: error.message
        });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const updatedData = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(courseId, updatedData, {
            new: true, 
            runValidators: true
        });

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


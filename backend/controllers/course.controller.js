import Course from "../models/course.model.js";
import asyncHandler from "express-async-handler";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, description, category, difficulty, prerequisites,
      objectives, durationUnit, customDuration, enrollmentOptions,
      customPrice, priceUnit, visibility, introImage, introVideo, reference,
      courseMaterial, playlist, instructor 
    } = req.body;

    // Create a new course
    const newCourse = new Course({
      title, description, category, difficulty, prerequisites,
      objectives, durationUnit, customDuration, enrollmentOptions,
      customPrice, priceUnit, visibility, introImage, introVideo, reference,
      courseMaterial, playlist, instructor 
    });

    console.log(req.body);
    // Save the course to the database
    const savedCourse = await newCourse.save();

    res.status(201).json({ message: "Course created successfully!", course: savedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating course", error });
  }
};

// Get all courses with populated instructor data
export const getAllCourses = async (req, res) => {
  try {
    // Retrieve all courses and populate the 'instructor' field
    const courses = await Course.find().populate('instructor');

    // Check if any courses exist
    if (!courses.length) {
      return res.status(404).json({ message: "No courses found" });
    }

    res.status(200).json({ message: "Courses retrieved successfully", courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving courses", error });
  }
};

// Edit an existing course
export const editCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, difficulty, prerequisites,
      objectives, durationUnit, customDuration, enrollmentOptions,
      customPrice, priceUnit, visibility, introImage, introVideo, reference,
      courseMaterial, playlist, instructor } = req.body;

    // Find the course by ID and update it
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        title, description, category, difficulty, prerequisites,
        objectives, durationUnit, customDuration, enrollmentOptions,
        customPrice, priceUnit, visibility, introImage, introVideo, reference,
        courseMaterial, playlist, instructor
      },
      { new: true } // Option to return the updated document
    );

    // Check if the course was found and updated
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating course", error });
  }
};

// Get a course by ID with populated instructor data
export const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve the course by ID and populate the 'instructor' field
    const course = await Course.findById(id).populate('instructor');

    // Check if the course exists
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course retrieved successfully", course });
  }
// Return the course with populated instructor data

  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving course", error });
  }
};

export const totalCourses =  async(req,res)=>{
  try{
      const courseCount = await Course.countDocuments();
      res.status(200).json({courseCount});
  }catch(error){
      res.status(500).json({message:"Error fetching course count"});
  }
};
  

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
};

export const addVideoToPlaylist = async (req, res) => {
  try {
    const { id } = req.params; // Course ID
    const { videoId } = req.body;

    // Validate the videoId
    if (!videoId) {
      return res.status(400).json({ message: "Video ID is required" });
    }

    // Find the course and update its playlist
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $addToSet: { playlist: videoId } }, // Prevent duplicates in the playlist
      { new: true } // Return the updated course
    );

    // Check if the course exists
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Video added to playlist successfully", course: updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding video to playlist", error });
  }
};

export const getPopularCourses = async (req, res) => {
  try {
    const popularCourses = await Course.find()
      .sort({ enrolledStudents: -1 }) // Sort by enrolledStudents in descending order
      .limit(10); // Limit to top 10 courses

    res.status(200).json(popularCourses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch popular courses", error: err });
  }
}

// Controller to get recently added courses
export const getRecentlyAddedCourses = async (req, res) => {
  try {
    const recentCourses = await Course.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(10); // Limit the results
    res.status(200).json(recentCourses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recently added courses" });
  }
};


export const getEnrolledStudents = async (req, res) => {
  try {
    const { id } = req.params; // Extract course ID from the request parameters

    // Find the course by its ID
    const course = await Course.findById(id);

    // If the course doesn't exist, return a 404 error
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if the course has a students array, if not return empty array
    const enrolledStudents = Array.isArray(course.students) ? course.students.length : 0;

    // Return the number of enrolled students
    res.status(200).json({
      success: true,
      enrolledStudents,
    });
  } catch (error) {
    console.error('Error fetching enrolled students:', error);

    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

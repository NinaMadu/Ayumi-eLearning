import Course from "../models/course.model.js";

// Create a new notice
export const createCourse = async (req, res) => {
    try {
      const { title, description, category, difficultyLevel, prerequisites,
        courseObjectives, duration,  enrollmentOptions,
        pricing, courseVisibility, introImage, introVideo, externalResources,
        courseMaterials, playlist, instructor 
       } = req.body; 
  
      // Create a new course
      const newCourse = new Course({
        title, description, category, difficultyLevel, prerequisites,
        courseObjectives, duration,  enrollmentOptions,
        pricing, courseVisibility, introImage, introVideo, externalResources,
        courseMaterials, playlist, instructor 
      });
  
      // Save the notice to the database
      const savedCourse = await newCourse.save();
  
      res.status(201).json({ message: "Course created successfully!", course: savedCourse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating in course", error });
    }
  };

  export const getAllCourses = async (req, res) => {
    try {
      // Retrieve all notices from the database
      const courses = await Course.find();
  
      // Check if any notices exist
      if (!courses.length) {
        return res.status(404).json({ message: "No courses found" });
      }
  
      res.status(200).json({ message: "Courses retrieved successfully", courses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving courses", error });
    }
  };

  export const editCourse = async (req, res) => {
    try {
      const { id } = req.params; 
      const { title, description, category, difficultyLevel, prerequisites,
        courseObjectives, duration,  enrollmentOptions,
        pricing, courseVisibility, introImage, introVideo, externalResources,
        courseMaterials, playlist, instructor  } = req.body; 
  
      // Find the notice by ID and update it
      const updatedCourse = await Course.findByIdAndUpdate(
        id,
        { title, description, category, difficultyLevel, prerequisites,
            courseObjectives, duration,  enrollmentOptions,
            pricing, courseVisibility, introImage, introVideo, externalResources,
            courseMaterials, playlist, instructor }, // Update the notice with new data
        { new: true } // Option to return the updated document
      );
  
      // Check if the notice was found and updated
      if (!updatedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating Course", error });
    }
  };
  

  export const getCourseById = async (req, res) => {
    const { id } = req.params; // Get the notice ID from the request parameters
  
    try {
      // Retrieve the notice by ID from the database
      const course = await Course.findById(id);
  
      // Check if the notice exists
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      // Return the notice
      res.status(200).json({ message: "Course retrieved successfully", course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving course", error });
    }
  };

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
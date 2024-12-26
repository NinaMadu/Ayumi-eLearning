import Course from "../models/course.model.js";

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


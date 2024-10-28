import Instructor from "../models/instructor.model.js";

// Get instructor profile
export const getInstructorProfile = async (req, res) => {
  try {
    const { email } = req.params; // Get email from request parameters
    const instructor = await Instructor.findOne({ email }); // Find instructor by email
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.json(instructor); // Send back instructor data
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

// Update instructor profile
export const updateInstructorProfile = async (req, res) => {
  try {
    const { email, ...updates } = req.body; // Get email and updates from request body
    const instructor = await Instructor.findOneAndUpdate({ email }, updates, { new: true }); // Update instructor
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.json(instructor); // Send back updated instructor data
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};
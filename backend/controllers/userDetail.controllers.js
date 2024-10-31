import User from "../models/user.model.js";

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const { email } = req.params; // Get the email from the request parameters
    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Send back user data
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { email, ...updates } = req.body; // Get email and updates from request body
    const user = await User.findOneAndUpdate({ email }, updates, { new: true }); // Update user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Send back updated user data
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};


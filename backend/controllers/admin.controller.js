import Instructor from '../models/instructor.model.js';

// Get instructor profile
export const getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.json({ instructor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


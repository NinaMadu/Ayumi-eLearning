import Assignment from "../models/assignment.model.js";

// Create a new assignment
export const createAssignment = async (req, res) => {
  const { title, description, courseId, instructorId, deadline, pdfUrl, imageUrl } = req.body;

  try {
    const newAssignment = new Assignment({
      title,
      description,
      courseId,
      instructorId,
      deadline,
      pdfUrl,
      imageUrl,
    });

    await newAssignment.save();
    res.status(201).json({ assignment: newAssignment });
  } catch (error) {
    res.status(500).json({ message: "Error creating assignment" });
  }
};

// Get all assignments
export const getAssignments = async (req, res) => {
    try {
      const assignments = await Assignment.find()
        .populate('courseId', 'title')  // Only fetch _id and title from Course
        .populate('instructorId', 'name');  // Populating instructorId as usual
  
      res.status(200).json({ assignments });
    } catch (error) {
      res.status(500).json({ message: "Error fetching assignments" });
    }
  };

// Get an assignment by ID
export const getAssignmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const assignment = await Assignment.findById(id)
    .populate('courseId', 'title')  // Only fetch _id and title from Course
    .populate('instructorId', 'name');  // Populating instructorId as usual

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.status(200).json({ assignment });
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignment" });
  }
};

// Update an assignment
export const updateAssignment = async (req, res) => {
  const { id } = req.params;
  const { title, description, courseId, instructorId, deadline, pdfUrl, imageUrl } = req.body;

  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(id, {
      title,
      description,
      courseId,
      instructorId,
      deadline,
      pdfUrl,
      imageUrl,
    }, { new: true });

    if (!updatedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({ assignment: updatedAssignment });
  } catch (error) {
    res.status(500).json({ message: "Error updating assignment" });
  }
};

// Delete an assignment
export const deleteAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(id);
    if (!deletedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting assignment" });
  }
};



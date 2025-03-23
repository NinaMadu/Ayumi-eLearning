import Submission from "../models/submission.model.js";

export const addSubmission = async (req, res) => {
    try {
        const { assignmentId, userId, courseId, fileUrl, status, submittedAt } = req.body;

        // Check for existing submission first
        const existingSubmission = await Submission.findOne({ 
            assignmentId, 
            userId, 
            courseId 
        });

        if (existingSubmission) {
            return res.status(400).json({  // Add return here
                message: "You already have a submission for this assignment" 
            });
        }

        if (!assignmentId || !userId || !courseId || !fileUrl || !status || !submittedAt) {
            return res.status(400).json({ message: "All fields are required" }); // Add return here
        }

        const newSubmission = new Submission({
            assignmentId,
            userId,
            courseId,
            fileUrl,
            status,
            submittedAt
        });

        await newSubmission.save();
        res.status(201).json({ message: "Submission added successfully", submission: newSubmission });
    } catch (error) {
        res.status(500).json({ message: "Error adding submission", error: error.message });
    }
};

export const getSubmissionsByCourseAndAssignmentId = async (req, res) => {
  const { courseId, assignmentId } = req.params;
  try {
    const submissions = await Submission.find({ courseId, assignmentId })
      .populate("assignmentId", "title")
      .populate("userId", "firstName");

    if (!submissions.length) {
      return res
        .status(404)
        .json({
          message: "No submissions found for the given course and assignment.",
        });
    }

    res.status(200).json({ submissions });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching submissions", error: error.message });
  }
};

export const removeSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const removedSubmission = await Submission.findByIdAndDelete(id);
    if (!removedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json({ message: "Submission removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing submission", error });
  }
};

export const getSubmissionOfUserByCourseAndAssignmentId = async (req, res) => {
  const { courseId, assignmentId, userId } = req.params;
  try {
    const submission = await Submission.findOne({
      courseId,
      assignmentId,
      userId,
    })
      .populate("assignmentId", "title")
      .populate("userId", "firstName")
      .where({ courseId, assignmentId, userId });

    if (!submission) {
      return res
        .status(404)
        .json({
          message:
            "No submission found for the given course, assignment, and user.",
        });
    }
    res.status(200).json({ submission });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching submission", error: error.message });
  }
};

export const gradeSubmission = async (req, res) => {
  try {
    const { id } = req.params; // Ensure it matches the route
    const { grade, feedback } = req.body;

    const gradeNum = Number(grade); // Convert to number for validation
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      return res.status(400).json({ message: "Grade must be a valid number between 0 and 100" });
    }

    const updatedSubmission = await Submission.findByIdAndUpdate(
      id,
      { grade: gradeNum, feedback, status: "graded", reviewedAt: new Date() },
      { new: true }
    );

    if (!updatedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json({ message: "Submission graded successfully", submission: updatedSubmission });
  } catch (error) {
    console.error("Error grading submission:", error);
    res.status(500).json({ message: "Error grading submission", error: error.message });
  }
};



import Quiz from "../models/quiz.model.js";

export const createQuiz = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      category, 
      difficultyLevel, 
      duration,
      totalMarks,
      passingScore, 
      questions 
    } = req.body;

    // Validation: Check if all required fields are provided
    if (!title || !description || !category || !difficultyLevel || !duration || !totalMarks || !passingScore || !questions) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Create a new quiz instance
    const newQuiz = new Quiz({
      title,
      description,
      category,
      difficultyLevel,
      duration,
      totalMarks,
      passingScore,
      questions, 
    });

    const savedQuiz = await newQuiz.save();

    res.status(201).json({ message: "Quiz created successfully!", quiz: savedQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating quiz", error });
  }
};

//retrieve all quizzes
export const getAllQuizzes = async (req, res) => {
    try {

      const quizzes = await Quiz.find();
  
      if (!quizzes.length) {
        return res.status(404).json({ message: "No quizzes found" });
      }
  
      res.status(200).json({ message: "Quizzes retrieved successfully", quizzes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving quizzes", error });
    }
  };

  // Delete a quiz
export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuiz = await Quiz.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error });
  }
};

// Get a quiz by ID 
export const getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve the course by ID and populate the 'instructor' field
    const quiz = await Quiz.findById(id);

    // Check if the course exists
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz retrieved successfully", quiz });
  }

  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving quiz", error });
  }
};

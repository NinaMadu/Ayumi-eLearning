import Quiz from "../models/quiz.model.js";

export const createQuiz = async (req, res) => {
  try {
    const { 
      quizTitle, 
      description, 
      category, 
      difficulty, 
      duration,
      totalMarks,
      passingScore, 
      questions 
    } = req.body;

    // Validation: Check if all required fields are provided
    if (!quizTitle || !description || !category || !difficulty || !duration || !totalMarks || !passingScore || !questions) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if questions is an array and not empty
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Questions must be a non-empty array!" });
    }

    // Create a new quiz instance
    const newQuiz = new Quiz({
      quizTitle,
      description,
      category,
      difficulty,
      duration,
      totalMarks,
      passingScore,
      questions, 
    });

    const savedQuiz = await newQuiz.save();

    res.status(201).json({ message: "Quiz created successfully!", quiz: savedQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating quiz", error: error.message });
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

export const editQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const { 
      quizTitle, 
      description, 
      category, 
      difficulty, 
      duration,
      totalMarks,
      passingScore, 
      questions 
    } = req.body;

    const updatedQuiz = await Quiz.findByIdAndUpdate(id, {
      quizTitle,
      description,
      category,
      difficulty,
      duration,
      totalMarks,
      passingScore,
      questions,
    }, { new: true });
    if(!updatedQuiz){
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz updated successfully", quiz: updatedQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating quiz", error });
  }
};
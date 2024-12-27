import Quiz from "../models/quiz.model.js"; 

export const createQuiz = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { 
      title, 
      description, 
      category, 
      difficultyLevel, 
      instructor, 
      duration,
      totalMarks,
      passingScore, 
      //course, 
      questions 
    } = req.body;

    // Validation checks (optional, but good practice)
    if (!title || !description || !category || !difficultyLevel || !instructor || !duration || !totalMarks || !passingScore || !questions) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Create a new quiz instance
    const newQuiz = new Quiz({
      title,
      description,
      category,
      difficultyLevel,
      instructor,
      duration,
      totalMarks,
      passingScore,
      //course,
      questions  // Assumes questions are passed as an array of question objects
    });

    
    const savedQuiz = await newQuiz.save();

    // Respond with success message and saved quiz
    res.status(201).json({ message: "Quiz created successfully!", quiz: savedQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating quiz", error });
  }
};

export const getAllQuizzes = async (req, res) => {
    try {
      // Retrieve all quizzes and populate the 'instructor' field
      const quizzes = await Quiz.find().populate('instructor');
  
      if (!quizzes.length) {
        return res.status(404).json({ message: "No quizzes found" });
      }
  
      res.status(200).json({ message: "Quizzes retrieved successfully", quizzes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving quizzes", error });
    }
  };
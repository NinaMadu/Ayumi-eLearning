import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Language Skills",
        "Cultural Knowledge",
        "Proficiency Levels",
        "Fun and Interactive",
        "History and Literature",
        "Practical Use",
      ],
      required: true,
    },
    difficultyLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    questions: [
      {
        questionText: {
          type: String,
          required: true,
        },
        questionType: {
          type: String,
          enum: ["multipleChoice", "trueFalse", "shortAnswer"],
          required: true,
        },
        answers: [
          {
            type: String,
            // Will only be used for multipleChoice questions
          },
        ],
        correctAnswer: {
          type: String,
          required: function () {
            // For multipleChoice and trueFalse, correct answer is required
            return this.questionType !== "shortAnswer";
          },
        },
        marks: {
          type: Number,
          required: true,  
        },
      },
    ],
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },
    duration: {
      type: Number,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    passingScore: {
      type: Number,
      required: true,
    },
    // course: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Course",
    // },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;

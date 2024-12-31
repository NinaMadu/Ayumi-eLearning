import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    quizTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      
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
    difficulty: {
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
            type: String, // Used for multipleChoice
          },
        
        ],
        correctAnswer: {
          type: String,
          required: function () {
            return this.questionType !== "shortAnswer";
          },
        },
        marks: {
          type: Number,
          required: true,
        },
      },
    ],
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

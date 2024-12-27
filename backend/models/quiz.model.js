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
        "Langugage Skills",
        "Cultural Knowledge ",
        "Proficiency Levels",
        "Fun and Interactive",
        "History and Literature",
        "Practical Use",
      ],
      required: true,
    },
    difficultyLevel: {
        type: String,
        enum:["Beginner", "Intermediate", "Advanced"],
        required: true,
    },

    questions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Question",
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },

    duration: {
      type: Number,
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;

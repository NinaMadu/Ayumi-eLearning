import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    fileUrl: { type: String, required: true },
    grade: { type: Number },
    feedback: { type: String },
    status: { type: String, required: true },
    submittedAt: { type: Date, required: true },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;

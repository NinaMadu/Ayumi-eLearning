import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    CourseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    fileUrl: { type: String, required: true },
    grade: { type: Number, required: false },
    feedback: { type: String, required: false },
    status: { type: String, required: true },
    submittedAt: { type: Date, required: true },
    reviewedAt: { type: Date, required: false },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

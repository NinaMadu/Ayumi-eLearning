import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Assuming you have a Course model
      required: true,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor", // Assuming you have an Instructor model
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    pdfUrl: {
        type: String, // URL to the PDF resource
        required: false, // Optional field
      },
    imageUrl: {
        type: String, // URL to the image resource
        required: false, // Optional field
      },    
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;

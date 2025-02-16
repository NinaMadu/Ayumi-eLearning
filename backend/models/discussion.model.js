import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensure every message has a user
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true, // Ensure every message is linked to a course
    },

    message: {
      type: String,
      required: true, // Fixed typo and added required
    },

    replies: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ], // Store replies as subdocuments

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Renamed to plural 'likes'
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Renamed to plural 'dislikes'

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Discussion = mongoose.model("Discussion", discussionSchema);

export default Discussion;

import express from "express";
import {
  sendMessage,
  getMessagesByUser,
  getMessagesByInstructor,
  getUserInstructorConversation,
  deleteMessage,
  deleteConversation,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", sendMessage); // Send a message
router.get("/user/:userId", getMessagesByUser); // Get messages by user
router.get("/instructor/:instructorId", getMessagesByInstructor);
router.get("/conversation/:userId/:instructorId", getUserInstructorConversation); // Get messages by instructor
router.delete("/:messageId", deleteMessage); // Delete a single message
router.delete("/conversation/:conversationId", deleteConversation); // Delete an entire conversation

export default router;

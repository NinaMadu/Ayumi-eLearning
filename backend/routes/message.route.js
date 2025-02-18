import express from "express";
import {
  sendMessage,
  getMessagesByUser,
  getMessagesByInstructor,
  deleteMessage,
  deleteConversation,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", sendMessage); // Send a message
router.get("/user/:userId", getMessagesByUser); // Get messages by user
router.get("/instructor/:instructorId", getMessagesByInstructor); // Get messages by instructor
router.delete("/:messageId", deleteMessage); // Delete a single message
router.delete("/conversation/:conversationId", deleteConversation); // Delete an entire conversation

export default router;

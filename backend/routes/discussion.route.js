import express from "express";
import { sendMessage, getMessagesByCourse, replyToMessage, toggleLike } from "../controllers/discussion.controller.js";

const router = express.Router();

router.post("/", sendMessage); 
router.get("/:courseId", getMessagesByCourse); 
router.post("/:messageId/reply", replyToMessage); 
router.put("/:messageId/like", toggleLike);


export default router;

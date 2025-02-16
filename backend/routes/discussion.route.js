import express from "express";
import { sendMessage, getMessagesByCourse, replyToMessage, toggleLikeDislike } from "../controllers/discussion.controller.js";

const router = express.Router();

router.post("/", sendMessage); 
router.get("/:courseId", getMessagesByCourse); 
router.post("/:messageId/reply", replyToMessage); 
router.put("/:messageId/like-dislike", toggleLikeDislike);


export default router;

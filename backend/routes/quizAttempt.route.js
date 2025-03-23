import express from "express";
import { submitQuiz, getLeaderboard } from "../controllers/quizAttempt.controller.js";

const router = express.Router();

router.post("/submit", submitQuiz); // Submit quiz attempt
router.get("/leaderboard", getLeaderboard); // Get leaderboard for a quiz

export default router;

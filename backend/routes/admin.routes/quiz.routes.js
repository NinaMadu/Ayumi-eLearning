import express from "express";
import { createQuiz,   getAllQuizzes , deleteQuiz, getQuizById } from "../../controllers/quiz.controller.js";


const router = express.Router();

router.post('/add', createQuiz);  
router.get("/", getAllQuizzes);
router.delete("/:id", deleteQuiz); 
router.get("/:id", getQuizById); 

export default router;
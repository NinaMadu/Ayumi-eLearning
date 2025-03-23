import express from "express";
import { addSubmission, getSubmissionOfUserByCourseAndAssignmentId, getSubmissionsByCourseAndAssignmentId, removeSubmission, gradeSubmission } from "../controllers/submission.controller.js";

const router = express.Router();

router.post("/add", addSubmission);
router.get("/:courseId/:assignmentId", getSubmissionsByCourseAndAssignmentId);
router.get("/:userId/:courseId/:assignmentId", getSubmissionOfUserByCourseAndAssignmentId);
router.delete("/:id", removeSubmission);
router.put("/grade/:id", gradeSubmission);


export default router;

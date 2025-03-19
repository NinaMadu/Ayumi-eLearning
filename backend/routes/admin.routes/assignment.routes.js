import express from "express";
import { createAssignment,
    getAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment, } from "../../controllers/assignment.controller.js";
    
const router = express.Router();



router.post("/create", createAssignment);
router.get("/", getAssignments);
router.get("/:id", getAssignmentById);
router.put("/update/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

export default router;

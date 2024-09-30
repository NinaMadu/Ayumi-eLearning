import express from "express";
import { createNotice, deleteNotice, editNotice } from "../controllers/notice.controller";

const router = express.Router();

router.post("/add", createNotice); 
router.delete("/:id", deleteNotice); 
router.put("/:id", editNotice); 


export default router;
import express from "express";
import { createNotice, deleteNotice,  getAllNotices } from "../../controllers/notice.controller.js";


const router = express.Router();

router.post('/add', createNotice); 
router.delete("/:id", deleteNotice); 
router.get("/", getAllNotices);



export default router;
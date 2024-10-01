import express from "express";
import { createNotice, deleteNotice,  getAllNotices, editNotice, getNoticeById } from "../../controllers/notice.controller.js";


const router = express.Router();

router.post('/add', createNotice); 
router.delete("/:id", deleteNotice); 
router.get("/", getAllNotices);
router.put("/:id", editNotice);
router.get('/:id', getNoticeById);



export default router;
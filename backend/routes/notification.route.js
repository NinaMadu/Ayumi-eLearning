import express from 'express';
import { getUserNotifications } from '../controllers/notifications.controller.js';


const router = express.Router();

router.get("/", getUserNotifications); // Send a message

export default router;
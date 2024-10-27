
import express from 'express';
import { uploadVideo } from '../controllers/video.controller.js';


// const {uploadVideo} = require('../controllers/video.controller');
const router = express.Router();

router.post('/videoUpload', uploadVideo);
// router.delete('/videoDelete/:id',deleteVideo);


export default router;

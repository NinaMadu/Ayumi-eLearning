
import express from 'express';
import { uploadVideo } from '../controllers/video.controller.js';
import { deleteVideo } from '../controllers/video.controller.js';
import { getVideos } from '../controllers/video.controller.js';


// const {uploadVideo} = require('../controllers/video.controller');
const router = express.Router();

router.post('/videoUpload', uploadVideo);
router.delete('/videoDelete/:id',deleteVideo);
router.get('/videos',getVideos);




export default router;

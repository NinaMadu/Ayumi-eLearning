
import express from 'express';
import { deleteCurrentThumbnail, getVideoById, getVideosByCourse, updateVideo, uploadVideo } from '../controllers/video.controller.js';
import { deleteVideo } from '../controllers/video.controller.js';
import { getVideos } from '../controllers/video.controller.js';
import multer from 'multer';

// const {uploadVideo} = require('../controllers/video.controller');
const router = express.Router();
const upload = multer();

router.post('/videoUpload', upload.fields([{ name: 'video' }, { name: 'thumbnail'}]), uploadVideo);
router.put('/videoUpdate/:id',updateVideo);
router.delete('/videoDelete/:id',deleteVideo);
router.get('/videos',getVideos);
router.get('/video/:id',getVideoById);
router.delete('/thumbnailDelete',deleteCurrentThumbnail);
router.get('/courses/:courseId/videos', getVideosByCourse);





export default router;

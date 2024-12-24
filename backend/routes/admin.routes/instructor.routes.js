import express from 'express';
import { getInstructorById } from '../../controllers/admin.controller.js';

const router = express.Router();

router.get('/:id', getInstructorById);

export default router;



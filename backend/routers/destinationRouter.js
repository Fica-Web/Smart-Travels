import express from 'express';
const router = express.Router();
import verifyAdmin from '../middlewares/adminAuth.js';
import upload from '../middlewares/multer.js';
import {
    createDestination,
} from '../controllers/destinationController.js';

router.use(verifyAdmin); // Ensure admin authentication for the following routes

router.post('/', upload.single('coverImage'), createDestination);

export default router;
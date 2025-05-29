import express from 'express';
const router = express.Router();
import {
    createInquiry,
} from '../controllers/inquiryController.js';

router.post('/', createInquiry);

export default router;
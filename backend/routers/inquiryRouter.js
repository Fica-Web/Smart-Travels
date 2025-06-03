import express from 'express';
const router = express.Router();
import {
    createInquiry,
    getAllInquiries,
    getInquiryById,
    updateEnquiryStatus,
} from '../controllers/inquiryController.js';
import verifyAdmin from '../middlewares/adminAuth.js';

router.post('/', createInquiry);

router.use(verifyAdmin); // Apply admin verification middleware to all routes below this line

router.get('/', getAllInquiries);
router.get('/:id', getInquiryById);
router.put('/:id', updateEnquiryStatus);

export default router;
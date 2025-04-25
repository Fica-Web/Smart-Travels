import express from 'express';
const router = express.Router();
import {
    adminLogin,
    adminLogout,
} from '../controllers/admincontroller.js';
import verifyAdmin from '../middlewares/adminAuth.js';

router.post('/login', adminLogin);
router.post('/logout', adminLogout);

// Protected routes
router.use(verifyAdmin); // Apply admin authentication middleware to all routes below this line

export default router;
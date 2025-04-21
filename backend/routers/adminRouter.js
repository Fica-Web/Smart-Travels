import express from 'express';
const router = express.Router();
import {
    adminSignup,
    adminLogin,
    adminLogout,
} from '../controllers/admincontroller.js';

router.post('/signup', adminSignup);
router.post('/login', adminLogin);
router.post('/logout', adminLogout);

export default router;
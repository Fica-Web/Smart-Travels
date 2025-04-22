import express from 'express';
const router = express.Router();
import {
    userSignup,
    userLogin,
} from '../controllers/userController.js';

router.post('/signup', userSignup);
router.post('/login', userLogin);
// router.post('/logout', adminLogout);

export default router;
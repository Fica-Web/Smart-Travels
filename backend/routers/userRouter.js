import express from 'express';
const router = express.Router();
import {
    userSignup,
    userLogin,
    refreshAccessToken,
    logoutUser,
} from '../controllers/userController.js';

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', logoutUser);

export default router;
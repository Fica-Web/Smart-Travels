import express from 'express';
const router = express.Router();
import {
    userSignup,
    userLogin,
    refreshAccessToken,
    logoutUser,
    submitMessage,
} from '../controllers/userController.js';

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/refresh-token', refreshAccessToken);
router.post('/logout', logoutUser);

router.post('/submit-message', submitMessage);

export default router;
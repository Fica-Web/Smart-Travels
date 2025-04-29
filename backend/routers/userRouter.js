import express from 'express';
const router = express.Router();
import {
    userSignup,
    userLogin,
    refreshAccessToken,
    logoutUser,
    submitMessage,
    getUserProfile,
} from '../controllers/userController.js';
import verifyUser from '../middlewares/verifyUser.js';

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/refresh-token', refreshAccessToken);
router.post('/logout', logoutUser);

router.post('/submit-message', submitMessage);

router.use(verifyUser); // Protect all routes below this middleware

router.get('/profile', getUserProfile); // Get user profile

export default router;
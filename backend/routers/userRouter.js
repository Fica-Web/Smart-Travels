import express from 'express';
const router = express.Router();
import {
    userSignup,
    verifyOtp,
    userLogin,
    refreshAccessToken,
    logoutUser,
    submitMessage,
    forgotPassword,
    resetPassword,
    getUserProfile,
} from '../controllers/userController.js';
import verifyUser from '../middlewares/verifyUser.js';

router.post('/signup', userSignup);
router.post('/verify-otp', verifyOtp); // OTP verification route
router.post('/login', userLogin);
router.get('/refresh-token', refreshAccessToken);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword); // Reset password route

router.post('/submit-message', submitMessage);

router.use(verifyUser); // Protect all routes below this middleware

router.get('/profile', getUserProfile); // Get user profile

export default router;
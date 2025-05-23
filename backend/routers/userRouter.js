import express from 'express';
const router = express.Router();
import {
    userSignup,
    verifyOtp,
    resendOtp,
    userLogin,
    refreshAccessToken,
    logoutUser,
    submitMessage,
    forgotPassword,
    resetPassword,
    getUserProfile,
    fetchAllUsers,
} from '../controllers/userController.js';
import verifyAdmin from '../middlewares/adminAuth.js';
import verifyUser from '../middlewares/verifyUser.js';

router.post('/signup', userSignup);
router.post('/verify-otp', verifyOtp); // OTP verification route
router.post('/resend-otp', resendOtp); // Resend OTP route
router.post('/login', userLogin);
router.get('/refresh-token', refreshAccessToken);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword); // Reset password route

router.post('/submit-message', submitMessage);

router.get('/all-users', verifyAdmin, fetchAllUsers); // Fetch all users (admin only)

router.use(verifyUser); // Protect all routes below this middleware

router.get('/profile', getUserProfile); // Get user profile

export default router;
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from "../model/userSchema.js";
import { sendEmail } from '../config/emailService.js';

const userSignup = async (req, res) => {
    try {
        // Extract and sanitize input
        const username = req.body.name?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required.' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser.isVerified) {
            return res.status(409).json({ message: 'User already exists with this email.' });
        }

        // Generate hashed password and OTP
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
        const otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes

        if (existingUser && !existingUser.isVerified) {
            // Update existing unverified user
            existingUser.username = username;
            existingUser.password = hashedPassword;
            existingUser.otpHash = otpHash;
            existingUser.otpExpires = otpExpires;
            await existingUser.save();
        } else {
            // Create new user
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                isVerified: false,
                otpHash,
                otpExpires,
            });

            await newUser.save();
        }

        // Send OTP email
        await sendEmail({
            to: email,
            subject: 'Your OTP Verification Code',
            html: `<p>Your OTP code is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
        });

        res.status(200).json({
            message: 'Signup successful. OTP sent to email.',
            email,
        });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

        const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

        if (user.otpHash !== otpHash || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.isVerified = true;
        user.otpHash = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully' });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if verified
        if (!user.isVerified) {
            return res.status(401).json({ message: "Please verify your email to login." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password." });
        }

        // Create access token (short-lived)
        const accessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        // Create refresh token (long-lived)
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        // Set refreshToken as HttpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Hide password before sending
        user.password = undefined;

        res.status(200).json({
            message: "Login successful",
            accessToken,
            user
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const refreshAccessToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({ message: "No refresh token. Please login again." });
        }

        // Verify refresh token
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Create new access token
        const accessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        res.status(200).json({
            message: "Access token refreshed",
            accessToken
        });

    } catch (error) {
        console.error("Refresh Token Error:", error);
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
};

const submitMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const emailResponse = await sendEmail(name, email, message);

        if (emailResponse.success) {
            res.status(200).json({ success: true, message: "Message sent successfully!" });
        } else {
            res.status(500).json({ error: "Failed to send message." });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Something went wrong. Try again later." });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No account with that email' });
        }

        // Generate a token
        const token = crypto.randomBytes(32).toString('hex');

        // Hash and save to DB (don't save raw token)
        const hash = crypto.createHash('sha256').update(token).digest('hex');
        user.resetPasswordToken = hash;
        user.resetPasswordExpires = Date.now() + 1000 * 60 * 15; // 15 min
        await user.save();

        // Send email
        const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}&email=${email}`;
        await sendEmail({
            to: user.email,
            subject: 'Reset Your Password - SmartTravels',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f4f4f4; padding: 40px; border-radius: 8px;">
                    <div style="text-align: center;">
                        <img src="https://yourdomain.com/logo.png" alt="SmartTravels Logo" style="max-width: 150px; margin-bottom: 20px;" />
                    </div>
                    <h2 style="color: #333;">Reset Your Password</h2>
                    <p style="color: #555;">Hi ${user.name || 'there'},</p>
                    <p style="color: #555;">
                        We received a request to reset your password. Click the button below to choose a new one. This link will expire in 15 minutes.
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" style="background-color: #2e6bbf; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                            Reset Password
                        </a>
                    </div>
                    <p style="color: #999; font-size: 12px; text-align: center;">
                        If you didn’t request this, you can safely ignore this email.
                    </p>
                    <hr style="margin: 30px 0;" />
                    <p style="color: #aaa; font-size: 12px; text-align: center;">
                        &copy; ${new Date().getFullYear()} SmartTravels. All rights reserved.
                    </p>
                </div>
            `,
        });

        res.status(200).json({ message: 'Reset link sent to email' });
    } catch (error) {
        console.error("forgot password error", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, email, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'Invalid request' });

        const hash = crypto.createHash('sha256').update(token).digest('hex');

        if (
            user.resetPasswordToken !== hash ||
            user.resetPasswordExpires < Date.now()
        ) {
            return res.status(400).json({ message: 'Token expired or invalid' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        console.error("Reset password error", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have middleware to set req.user
        const user = await User.findById(userId).select("-password"); // Exclude password from response

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export {
    userSignup,
    verifyOtp,
    userLogin,
    refreshAccessToken,
    logoutUser,
    submitMessage,
    forgotPassword,
    resetPassword,
    getUserProfile,
};
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../model/userSchema.js";
import { sendEmail } from '../config/emailService.js';

const userSignup = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            phone,
            fullName,
            dob,
            nationality,
        } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
            phone,
            fullName,
            dob,
            nationality,
        });

        // Save user
        await newUser.save();

        // Remove password before sending response
        newUser.password = undefined;

        res.status(201).json({
            message: 'Signup successful',
            user: newUser
        });

    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
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
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign({ id: user._id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: "15m" });

        const resetLink = `${process.env.FRONTEND_URL}/user/reset-password/${token}`;

        const emailResponse = await sendEmail({
            to: user.email,
            subject: 'Password Reset Link',
            html: `
              <p>You requested a password reset</p>
              <p><a href="${resetLink}">Click here</a> to reset your password. This link will expire in 15 minutes.</p>
            `
        });

        if (emailResponse.success) {
            res.status(200).json({ message: "Password reset link sent to your email" });
        } else {
            res.status(500).json({ message: "Failed to send email" });
        }
    } catch (error) {
        console.error("forgot password error", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password are required" });
        }

        const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
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
    userLogin,
    refreshAccessToken,
    logoutUser,
    submitMessage,
    forgotPassword,
    resetPassword,
    getUserProfile,
};
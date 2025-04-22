import bcrypt from 'bcryptjs';
import User from "../model/userSchema.js";

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

export {
    userSignup,
};
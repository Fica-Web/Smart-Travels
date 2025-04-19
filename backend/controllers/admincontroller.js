import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../model/AdminSchema.js';

const adminSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validate the input fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new admin
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
        });

        // save the admin to the database
        await newAdmin.save();

        // remove password from the response
        newAdmin.password = undefined;
        
        res.status(201).json({
            message: 'Admin created successfully',
            admin: newAdmin,
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}

export {
    adminSignup,
}
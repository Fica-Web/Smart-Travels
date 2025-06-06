import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../model/AdminSchema.js';
import Inquiry from '../model/inquirySchema.js';
import Destination from '../model/destinationSchema.js';
import Blog from '../model/blogSchema.js';

const adminSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // validate the input fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new admin
        const newAdmin = new Admin({
            username,
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

const adminLogin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // validate the input fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // find the admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (admin.username !== username) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // compare the password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // generate a JWT token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '15d' });

        // Set the JWT token as a secure cookie
        res.cookie('ruknAdminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Prevent CSRF attacks
            maxAge: 15 * 24 * 60 * 60 * 1000 // Set cookie expiration to 15 days in milliseconds
        });

        // remove password from the response
        admin.password = undefined;

        res.status(200).json({
            message: 'Login successful',
            token,
            admin,
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}

const isAdminProtected = (req, res) => {
    res.status(200).json({
        message: 'Authorized admin access',
        admin: req.admin,
    });
};

const adminLogout = async (req, res) => {
    try {
        res.clearCookie('ruknAdminToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}

const fetchAdminDashboardData = async (req, res) => {
    try {
        const { serviceType } = req.query;
        const filter = serviceType ? { serviceType } : {};

        const inquiriesCount = await Inquiry.countDocuments(filter);
        const destinationsCount = await Destination.countDocuments();
        const blogsCount = await Blog.countDocuments();

        const recentInquiries = await Inquiry.find(filter)
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email phone message createdAt serviceType status');

        // 📊 Monthly Inquiry Chart Data
        const monthlyStats = await Inquiry.aggregate([
            { $match: filter }, // filter by serviceType
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const inquiriesChart = monthlyStats.map((d) => ({
            month: months[d._id],
            inquiries: d.count,
        }));

        res.status(200).json({
            success: true,
            dashboardData: {
                stats: {
                    inquiries: inquiriesCount,
                    destinations: destinationsCount,
                    blogs: blogsCount,
                },
                recentInquiries,
                inquiriesChart,
            },
        });
    } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

export {
    adminSignup,
    adminLogin,
    isAdminProtected,
    adminLogout,
    fetchAdminDashboardData,
}
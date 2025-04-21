import jwt from 'jsonwebtoken';
import Admin from '../model/AdminSchema.js';

const verifyAdmin = async (req, res, next) => {
    try {
        // Prefer cookies first, then Bearer token from headers
        let token = req.cookies.jwt;

        if (!token && req.headers.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'No token provided. Unauthorized' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find admin and remove password
        const admin = await Admin.findById(decoded.id).select('-password');
        if (!admin) {
            return res.status(403).json({ message: 'Access denied. Admin not found' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.error('Error verifying admin:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default verifyAdmin;
import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        
        // Check if authorization header is present and starts with "Bearer "
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access token missing or malformed" });
        }

        const token = authHeader.split(" ")[1];

        // Verify access token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Optional: fetch full user if needed
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user to the request object
        req.user = user;

        next(); // continue to the route handler
    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

export default verifyUser;
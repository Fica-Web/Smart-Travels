import Destination from '../models/Destination.js';
import slugify from 'slugify';
import cloudinary from "../config/cloudinary.js";

export const createDestination = async (req, res) => {
    try {
        const {
            title,
            destination,
            duration,
            pricePerPerson,
            days,
            inclusions,
            country,
            isPublished
        } = req.body;

        // Validate required fields
        if (!title || !destination || !duration || !req.file || !days || days.length === 0) {
            return res.status(400).json({ message: 'Title, destination, duration, cover image, and at least one day plan are required.' });
        }

        // Generate slug
        const generatedSlug = slugify(title, { lower: true, strict: true });

        // Check if slug already exists
        const existing = await Destination.findOne({ slug: generatedSlug });
        if (existing) {
            return res.status(409).json({ message: 'A destination with a similar title already exists. Please choose a different title.' });
        }
        
        // Upload image to Cloudinary
        const coverImage = await cloudinary.uploader.upload(req.file.path);

        // Create new destination
        const newDestination = new Destination({
            title,
            destination,
            slug: generatedSlug,
            duration,
            pricePerPerson,
            days,
            inclusions,
            coverImage,
            country,
            isPublished: isPublished ?? false,
        });

        await newDestination.save();

        res.status(201).json({
            message: 'Destination created successfully',
            destination: newDestination
        });

    } catch (error) {
        console.error('Error creating destination:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

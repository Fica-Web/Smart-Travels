import Destination from '../model/destinationSchema.js';
import slugify from 'slugify';
import cloudinary from "../config/cloudinary.js";

export const getAllDestinations = async (req, res) => {
    try {
        const { page = 1, limit = 9 } = req.query; // Default to page 1 and limit 9
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const destinations = await Destination.find() // Fetch all destinations
            .skip(skip) // Skip the first (page - 1) * limit documents
            .limit(limit) // Limit the number of documents to the specified limit
            .sort({ createdAt: -1 }); // Sort by createdAt in descending order

        const totalDestinations = await Destination.countDocuments(); // Get the total number of documents

        res.status(200).json({
            message: 'Destinations fetched successfully', // Success message
            destinations, // Fetched destinations
            totalPages: Math.ceil(totalDestinations / limit), // Calculate total pages
            currentPage: parseInt(page), // Current page number
        });
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

export const getDestinationById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the destination ID from the request parameters

        const destination = await Destination.findById(id); // Find the destination by ID

        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' }); // If not found, return 404
        }

        res.status(200).json({
            message: 'Destination fetched successfully',
            destination
        });
    } catch (error) {
        console.error('Error fetching destination:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

export const createDestination = async (req, res) => {
    try {
        const {
            title,
            destination,
            duration,
            pricePerPerson,
            country,
            isPublished
        } = req.body;

        let days = [];
        let inclusions = [];

        // Parse days and inclusions from the request body
        if (req.body.days) {
            try {
                days = JSON.parse(req.body.days);
            } catch (error) {   
                return res.status(400).json({ message: 'Invalid days format. Please provide a valid JSON array.' });
            }   
        }

        if (req.body.inclusions) {
            try {
                inclusions = JSON.parse(req.body.inclusions);
            } catch (error) {
                return res.status(400).json({ message: 'Invalid inclusions format. Please provide a valid JSON array.' });
            }
        }

        console.log('Request body:', req.body);

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
        if (!coverImage) {
            return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
        }
        console.log('Uploaded image:', coverImage);

        // Create new destination
        const newDestination = new Destination({
            title,
            destination,
            slug: generatedSlug,
            duration,
            pricePerPerson,
            days,
            inclusions,
            coverImage: coverImage.secure_url,
            coverImageId: coverImage.public_id,
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

export const updateDestination = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            destination,
            duration,
            pricePerPerson,
            country,
            isPublished
        } = req.body;

        let days = [];
        let inclusions = [];

        // Parse days and inclusions from the request body
        if (req.body.days) {
            try {
                days = typeof req.body.days === 'string' ? JSON.parse(req.body.days) : req.body.days;
            } catch (error) {
                return res.status(400).json({ message: 'Invalid days format. Please provide a valid JSON array.' });
            }
        }

        if (req.body.inclusions) {
            try {
                inclusions = typeof req.body.inclusions === 'string' ? JSON.parse(req.body.inclusions) : req.body.inclusions;
            } catch (error) {
                return res.status(400).json({ message: 'Invalid inclusions format. Please provide a valid JSON array.' });
            }
        }

        // Validate required fields
        if (!title || !destination || !duration || !Array.isArray(days) || days.length === 0) {
            return res.status(400).json({ message: 'Title, destination, duration, and at least one day plan are required.' });
        }

        // Find the existing destination
        const existingDestination = await Destination.findById(id);
        if (!existingDestination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        // Generate slug
        const generatedSlug = slugify(title, { lower: true, strict: true });

        // If slug changed, check for duplicate
        if (generatedSlug !== existingDestination.slug) {
            const slugExists = await Destination.findOne({ slug: generatedSlug });
            if (slugExists) {
                return res.status(409).json({ message: 'A destination with a similar title already exists. Please choose a different title.' });
            }
        }

        // Handle image upload if a new file is provided
        let coverImageUrl = existingDestination.coverImage;
        let coverImageId = existingDestination.coverImageId;

        if (req.file) {
            const coverImage = await cloudinary.uploader.upload(req.file.path);
            if (!coverImage) {
                return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
            }

            // Remove old image
            if (coverImageId) {
                await cloudinary.uploader.destroy(coverImageId);
            }

            coverImageUrl = coverImage.secure_url;
            coverImageId = coverImage.public_id;
        }

        // Update the destination
        const updatedDestination = await Destination.findByIdAndUpdate(
            id,
            {
                title,
                destination,
                slug: generatedSlug,
                duration,
                pricePerPerson,
                days,
                inclusions,
                coverImage: coverImageUrl,
                coverImageId,
                country,
                isPublished: isPublished ?? existingDestination.isPublished
            },
            { new: true }
        );

        res.status(200).json({
            message: 'Destination updated successfully',
            destination: updatedDestination
        });

    } catch (error) {
        console.error('Error updating destination:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const deleteDestination = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid destination ID format" });
        }

        // Find the destination to get image info
        const destination = await Destination.findById(id);
        if (!destination) {
            return res.status(404).json({ error: "Destination not found" });
        }

        // Delete cover image from Cloudinary
        if (destination.coverImageId) {
            try {
                const result = await cloudinary.uploader.destroy(destination.coverImageId);
                console.log("Cloudinary image deletion result:", result);
            } catch (cloudErr) {
                console.error("Error deleting image from Cloudinary:", cloudErr);
            }
        }

        // Delete the destination from DB
        await Destination.findByIdAndDelete(id);

        res.status(200).json({ message: "Destination and cover image deleted successfully" });
    } catch (error) {
        console.error("Error during destination deletion:", error);
        res.status(500).json({ error: error.message, message: "Internal Server Error" });
    }
};
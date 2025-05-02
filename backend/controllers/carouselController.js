import Carousel from "../model/carouselSchema.js";
import cloudinary from "../config/cloudinary.js";

const getCarousel = async (req, res) => {
    try {
        const carousels = await Carousel.find();

        res.status(200).json({ carousels });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCarouselById = async (req, res) => {
    try {
        const id = req.params.id;

        const carousel = await Carousel.findById(id);

        if (!carousel) {
            return res.status(404).json({ error: 'Carousel not found'})
        }

        res.status(200).json({ carousel });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createCarousel = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "File upload failed" });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "carousels",
        });

        if (!result.secure_url || !result.public_id) {
            return res.status(500).json({ error: "Image upload to Cloudinary failed" });
        }

        console.log("Cloudinary Upload Result:", result);

        // Save image data to MongoDB
        const carousel = new Carousel({
            title,
            imageUrl: result.secure_url,
            imageId: result.public_id,
        });

        await carousel.save();

        res.status(201).json({
            message: "Carousel added successfully!",
            carousel
        });

    } catch (error) {
        console.error("Error creating carousel:", error);
        res.status(500).json({ error: error.message });
    }
};

const updateCarousel = async (req, res) => {
    try {
        const { id } = req.params;

        const carousel = await Carousel.findById(id);
        if (!carousel) {
            return res.status(404).json({ error: "Carousel not found" });
        }

        let updatedData = { ...req.body };

        if (req.file) {
            // Delete old image from Cloudinary
            await cloudinary.uploader.destroy(carousel.imageId);

            // Upload new image
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "carousels",
            });

            updatedData.imageUrl = result.secure_url;
            updatedData.imageId = result.public_id;
        }

        // Update the carousel
        const updatedCarousel = await Carousel.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation is applied
        });

        res.status(200).json({ message: "Carousel updated successfully!", updatedCarousel });

    } catch (error) {
        console.error("Error updating carousel:", error);
        res.status(500).json({ error: error.message });
    }
};

const deleteCarousel = async (req, res) => {
    try {
        const { id } = req.params;

        const carousel = await Carousel.findById(id);
        if (!carousel) {
            return res.status(404).json({ error: "Carousel not found" });
        }

        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(carousel.imageId);

        // Delete the carousel from the database
        await Carousel.findByIdAndDelete(id);

        res.status(200).json({ message: "Carousel deleted successfully!" });

    } catch (error) {
        console.error("Error deleting carousel:", error);
        res.status(500).json({ error: error.message });
    }
};

export {
    getCarousel,
    getCarouselById,
    createCarousel,
    updateCarousel,
    deleteCarousel,
}
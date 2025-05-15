import mongoose from 'mongoose';

const dayPlanSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { _id: false });

const destinationSchema = new mongoose.Schema({
    title: { type: String, required: true }, // e.g., "5 Days in Bali"
    destination: { type: String, required: true }, // e.g., "Bali, Indonesia"
    slug: { type: String, unique: true, required: true }, // For SEO-friendly URLs

    duration: { type: String, required: true }, // e.g., "5 Days / 4 Nights"
    pricePerPerson: { type: Number }, // Optional if shown

    days: [dayPlanSchema], // Array of daily plans

    inclusions: [{ type: String }], // e.g., ["Hotel stay", "Breakfast", "Sightseeing"]

    coverImage: { type: String, required: true }, // Main banner image
    coverImageId: { type: String, unique: true }, // For cloud storage reference

    country: { type: String }, // e.g., "India", "UAE"

    isPublished: { type: Boolean, default: false }, // For draft control
}, { timestamps: true });

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
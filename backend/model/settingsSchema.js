import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    instagramUrl: {
        type: String,
        default: ''
    },
    tiktokUrl: {
        type: String,
        default: ''
    },
    facebookUrl: {
        type: String,
        default: ''
    },
}, {
    timestamps: true
});

export default mongoose.model('Setting', settingSchema);
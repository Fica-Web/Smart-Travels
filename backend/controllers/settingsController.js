import e from "express";
import Settings from "../model/settingsSchema.js";

export const getSettings = async (req, res) => {
    try {
        // Assuming only one document exists
        const settings = await Settings.findOne();

        if (!settings) {
            return res.status(404).json({ success: false, message: 'Settings not found' });
        }

        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const createSettings = async (req, res) => {
    try {
        // Optional: prevent multiple settings documents
        const existing = await Settings.findOne();
        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'Settings already exist. Use update endpoint instead.',
            });
        }

        const {
            contactNumber,
            email,
            location,
            instagramUrl,
            tiktokUrl,
            facebookUrl,
        } = req.body;

        const newSettings = new Settings({
            contactNumber,
            email,
            location,
            instagramUrl,
            tiktokUrl,
            facebookUrl,
        });

        await newSettings.save();

        res.status(201).json({
            success: true,
            message: 'Settings created successfully',
            data: newSettings,
        });
    } catch (error) {
        console.error('Error creating settings:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating settings',
            error: error.message,
        });
    }
};

export const updateSettings = async (req, res) => {
    try {
        const {
            contactNumber,
            email,
            location,
            instagramUrl,
            tiktokUrl,
            facebookUrl,
        } = req.body;

        const updatedSettings = await Settings.findOneAndUpdate(
            {}, // empty filter to match the first (and only) document
            {
                contactNumber,
                email,
                location,
                instagramUrl,
                tiktokUrl,
                facebookUrl,
            },
            { new: true, runValidators: true } // return updated doc
        );

        if (!updatedSettings) {
            return res.status(404).json({
                success: false,
                message: 'Settings not found to update',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Settings updated successfully',
            data: updatedSettings,
        });
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating settings',
            error: error.message,
        });
    }
};
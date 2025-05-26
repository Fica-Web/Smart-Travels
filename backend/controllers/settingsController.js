import Settings from "../model/settingsSchema";

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

        const newSettings = new Setting({
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
        });
    }
};
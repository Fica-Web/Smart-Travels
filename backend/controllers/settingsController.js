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
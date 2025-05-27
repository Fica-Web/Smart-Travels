import settingsInstance from "../axios_instances/settingsInstance";

// 🔍 Get settings (Public access)
export const getSettings = async () => {
 try {
    const response = await settingsInstance.get(''); // ← FIXED
    return response;
  } catch (error) {
    console.log('Error fetching blogs:', error.response?.data || error.message);
    throw error;
  }
};

// 🛠 Update settings (Admin access with cookies)
export const updateSettings = async (data) => {
  try {
    console.log('➡️ Updating settings with:', data);
    const res = await settingsInstance.patch('/settings', data);
    console.log('✅ Settings updated:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ Error updating settings:', error);
    throw error;
  }
};

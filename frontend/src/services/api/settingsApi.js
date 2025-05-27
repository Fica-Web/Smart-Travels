// src/api/settingsApi.js
import settingsInstance from "../axios_instances/settingsInstance";

export const getSettings = async () => {
  try {
    const response = await settingsInstance.get(''); // ← FIXED
    return response;
  } catch (error) {
    console.log('Error fetching settings:', error.response?.data || error.message);
    throw error;
  }
};

export const updateSettings = async (data) => {
  try {
    const response = await settingsInstance.patch('/', data); // ✅ correct path
    console.log('✅ Settings updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error updating settings:', error.response?.data || error.message);
    throw error;
  }
};

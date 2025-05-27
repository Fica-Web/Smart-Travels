import axios from 'axios';

const settingsInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/settings`, // Ensure VITE_API_URL is defined correctly
  withCredentials: true, // ✅ Required for sending cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default settingsInstance;

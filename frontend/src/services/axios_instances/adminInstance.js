// services/axios_instances/adminInstance.js
import axios from 'axios';

const adminInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/admin`, // e.g., https://smart-travels.onrender.com/api/admin
  withCredentials: true, // Needed if backend uses cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default adminInstance;

import axios from 'axios';

const blogsInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/blogs`,// e.g., https://smart-travels.onrender.com/api/admin
  withCredentials: true, // Needed if backend uses cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default blogsInstance;
import axios from 'axios';

const blogsInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/blogs`,
  withCredentials: true, // Ensures cookies are sent
  // ⚠️ DO NOT set global Content-Type; let it be set per request
});

export default blogsInstance;

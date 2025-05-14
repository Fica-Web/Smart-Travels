import axios from 'axios';

const destinationInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/destination`, // e.g., https://smart-travels.onrender.com/api/admin
    withCredentials: true, // Needed if backend uses cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

export default destinationInstance;

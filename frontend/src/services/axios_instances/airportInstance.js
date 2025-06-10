import axios from 'axios';

const airportInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/airports`, // Ensure VITE_API_URL is defined correctly
    withCredentials: true, // ✅ Required for sending cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

export default airportInstance;
import axios from 'axios';

let accessToken = null; // Store accessToken in memory

export const setAccessToken = (token) => {
    accessToken = token;
};

export const clearAccessToken = () => {
    accessToken = null;
};

const userInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/user',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add access token to every request
userInstance.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401 and try refreshing the token
userInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await axios.get(
                    import.meta.env.VITE_API_URL + '/user/refresh-token',
                    { withCredentials: true }
                );
                const newAccessToken = refreshResponse.data.accessToken;
                setAccessToken(newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return userInstance(originalRequest); // Retry original request
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);
                clearAccessToken(); // Clear access token on failure
                // window.location.href = '/login'; // Optional: redirect to login
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default userInstance;
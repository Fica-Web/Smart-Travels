import axios from 'axios';

// Utility function to get token from cookies
const getTokenFromCookies = () => {
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find(row => row.startsWith('token='));
  
  // Log all cookies for debugging
  console.log('Cookies:', cookies);

  if (tokenCookie) {
    const token = tokenCookie.split('=')[1];
    console.log('Token retrieved from cookies:', token); // Log token if found
    return token;
  } else {
    console.log('Token cookie not found'); // Log if token cookie is not found
    return null;
  }
};

const blogsInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/blogs`,
  withCredentials: true, // This sends cookies with requests
});

// Add an interceptor to include token in request headers
blogsInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies(); // Get token from cookies

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to Authorization header
      console.log('Authorization header set:', config.headers['Authorization']); // Log the header for debugging
    } else {
      console.log('No token found in cookies.');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default blogsInstance;

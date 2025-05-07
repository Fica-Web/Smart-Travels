// Inside blogsApi.js

import axios from 'axios'; // If you're using axios for API calls

const API_URL = 'https://your-api-url.com'; // Replace with your API URL

// Define the getBlogById function
export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/blogs/${id}`, {
      withCredentials: true, // if using cookies or session
    });
    return response.data; // return the data from the API response
  } catch (error) {
    throw new Error('Error fetching blog by ID');
  }
};

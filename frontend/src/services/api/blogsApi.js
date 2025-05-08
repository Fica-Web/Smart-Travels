import blogsInstance from '../axios_instances/blogsInstance';

// Fetch all blogs
const getAllBlogs = async () => {
  try {
    const response = await blogsInstance.get('/'); // ← FIXED
    return response;
  } catch (error) {
    console.log('Error fetching blogs:', error.response?.data || error.message);
    throw error;
  }
};




const createBlog = async (data) => {
  console.log('API Key:', import.meta.env.VITE_API_KEY);

  try {
    const response = await blogsInstance.post('/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true, // <-- Add this line to send cookies
    });

    if (response.data) {
      console.log('Blog created successfully:', response.data);
      return response.data;
    } else {
      throw new Error('Received empty response from the server');
    }
  } catch (error) {
    console.log('Error creating blog:', error.response?.data || error.message);
    throw error;
  }
};




// Fetch a single blog by its ID
// Fetch a single blog by its ID
const getBlogById = async (id) => {
  try {
    const response = await blogsInstance.get(`/${id}`);
    console.log("Fetched blog data:", response.data);  // Log the full response for debugging
    return response.data; // Make sure to return response.data directly
  } catch (error) {
    console.log(`Error fetching blog ${id}:`, error.response?.data || error.message);
    throw error;
  }
};





// Function to update a blog
const updateBlog = async (id, data) => {
  try {
    const response = await blogsInstance.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(`Error updating blog ${id}:`, error.response?.data || error.message);
    throw error;  // Re-throw the error after logging
  }
};

const deleteBlog = async (id) => {
  try {
    const response = await blogsInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Error deleting blog ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};

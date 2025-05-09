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

const createBlogApi = async (data) => {
  const formData = new FormData();

  for (const key in data) {
    if (!data.hasOwnProperty(key)) continue;
    
    // Skip preview field
    if (key === 'coverImagePreview') continue;

    if (key === 'content') {
      formData.append('content', JSON.stringify(data.content)); // Properly stringify
    } else if (key !== 'coverImage') {
      formData.append(key, data[key]);
    }
  }

  // Append cover image
  if (data.coverImage) {
    formData.append('coverImage', data.coverImage); // single File
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await blogsInstance.post('/', formData, config);
    return response.data;
  } catch (error) {
    console.log('Error creating blog:', error.response?.data || error.message);
    throw error;
  }
};



// Fetch a single blog by its ID
// Fetch a single blog by its ID
const getSingleBlogApi = async (id) => {
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
const updateBlogApi = async (id, data) => {
  try {
    const response = await blogsInstance.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(`Error updating blog ${id}:`, error.response?.data || error.message);
    throw error;  // Re-throw the error after logging
  }
};

const deleteBlogApi = async (id) => {
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
  createBlogApi,
  getSingleBlogApi,
  updateBlogApi,
  deleteBlogApi,
};

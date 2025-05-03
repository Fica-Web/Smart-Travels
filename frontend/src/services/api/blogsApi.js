import blogsInstance from '../axios_instances/blogsInstance';

// Fetch all blogs
const getAllBlogs = async () => {
  try {
    const response = await blogsInstance.get('/api/admin/blog/');
    return response.data;
  } catch (error) {
    console.log('Error fetching blogs:', error.response?.data || error.message);
    throw error;
  }
};


// Create a blog
const createBlog = async (data) => {
  try {
    const response = await blogsInstance.post('/api/admin/blog/', data);
    return response.data;
  } catch (error) {
    console.log('Error creating blog:', error.response?.data || error.message);
    throw error;
  }
};

// Update a blog by ID
const updateBlog = async (id, data) => {
  try {
    const response = await blogsInstance.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(`Error updating blog ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Delete a blog by ID
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
  updateBlog,
  deleteBlog,
};

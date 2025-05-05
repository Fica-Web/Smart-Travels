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
  try {
    const response = await blogsInstance.post('/', data); // ← FIXED
    return response.data;
  } catch (error) {
    console.log('Error creating blog:', error.response?.data || error.message);
    throw error;
  }
};

const updateBlog = async (id, data) => {
  try {
    const response = await blogsInstance.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(`Error updating blog ${id}:`, error.response?.data || error.message);
    throw error;
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
  updateBlog,
  deleteBlog,
};

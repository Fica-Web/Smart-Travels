import blogsInstance from '../axios_instances/blogsInstance';
import { toast } from 'react-toastify';

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
    toast.success('Blog created successfully!');
    return response.data;
  } catch (error) {
    console.log('Error creating blog:', error.response?.data || error.message);
    toast.error('Error creating blog!');
    throw error;
  }
};



// Fetch a single blog by its ID
// Fetch a single blog by its ID
const getSingleBlogApi = async (id) => {
  try {
    const response = await blogsInstance.get(`/${id}`);
    return response.data; // Make sure to return response.data directly
  } catch (error) {
    console.log(`Error fetching blog ${id}:`, error.response?.data || error.message);
    throw error;
  }
};





// Function to update a blog
const updateBlogApi = async (id, data) => {
  const formData = new FormData();

  // Append text fields
  formData.append("title", formData.title);
  formData.append("description", formData.description);
  formData.append("slug", formData.slug);
  formData.append("author", formData.author);
  formData.append("category", formData.category);
  formData.append("tags", JSON.stringify(formData.tags)); // Convert tags to JSON string
  formData.append("content", JSON.stringify(formData.content)); // Convert content to JSON string

  // Append image file
  formData.append("coverImage", formData.coverImage);

  const config = {
      headers: {
          "Content-Type": "multipart/form-data",
      },
  };

  try {
      const response = await blogsInstance.put(`/${id}`, data, config);
      toast.success(response.data.message)
      return response.data;
  } catch (error) {
      console.log("error updating blogs:", error?.response?.data);
  }
}

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

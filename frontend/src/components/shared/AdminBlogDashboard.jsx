import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../../services/api/blogsApi';
import blogsInstance from '../../services/axios_instances/blogsInstance';
import AdminHero from '../reusable/AdminHero';
import { useNavigate } from 'react-router-dom';

const AdminBlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const loadBlogs = async () => {
    console.log('Axios baseURL:', blogsInstance.defaults.baseURL);
    try {
      const res = await getAllBlogs();
      console.log('Blogs loaded successfully:', res.data);
      const blogData = Array.isArray(res.data) ? res.data : res.data.blogs || [];
      setBlogs(blogData);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setBlogs([]);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleEdit = (blog) => {
    navigate(`/admin/blog/edit/${blog._id}`);
  };

  const handleCreate = () => {
    navigate('/admin/blog/new');
  };

  return (
    <div className="min-h-screen px-4 md:px-10 py-8 bg-gray-100">
      <AdminHero title="Manage Blogs" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">All Blogs</h2>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          + Create New Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="text-gray-600 text-center mt-20">
          <p className="text-lg">No blogs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 overflow-hidden flex flex-col"
            >
              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{blog.title}</h3>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Author:</strong> {blog.author || 'Unknown'}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Category:</strong> {blog.category || 'Uncategorized'}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Date:</strong>{' '}
                  {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'N/A'}
                </p>
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                  {blog.description}
                </p>

                <button
                  onClick={() => handleEdit(blog)}
                  className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                  Edit Blog
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogDashboard;

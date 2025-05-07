import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../../services/api/blogsApi';
import blogsInstance from '../../services/axios_instances/blogsInstance';
import AdminBlogForm from '../shared/AdminBlogForm';
import AdminHero from '../reusable/AdminHero';

const AdminBlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadBlogs = async () => {
    console.log('Axios baseURL:', blogsInstance.defaults.baseURL);

    try {
      const res = await getAllBlogs();
      console.log('Blogs loaded successfully:', res.data);

      // ✅ Ensure blogs is always an array to avoid .map crash
      const blogData = Array.isArray(res.data) ? res.data : res.data.blogs || [];
      setBlogs(blogData);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setBlogs([]); // Prevent .map crash
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelectedBlog(null);
    setShowForm(true);
  };

  return (
    <div className="">
      <AdminHero title='Blogs'  />

      <div className="flex justify-between items-center p-6 mb-6">
        <h2 className="text-2xl font-semibold">All Blogs</h2>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create New Blog
        </button>
      </div>

      {showForm && (
        <AdminBlogForm
          selectedBlog={selectedBlog}
          onBlogSaved={() => {
            loadBlogs();
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="mt-6">
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id} className="border-b py-2 flex justify-between items-center">
              <span>{blog.title}</span>
              <button
                onClick={() => handleEdit(blog)}
                className="text-sm text-blue-500 hover:underline"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminBlogDashboard;

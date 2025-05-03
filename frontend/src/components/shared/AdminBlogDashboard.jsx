// src/pages/admin/AdminBlogDashboard.jsx
import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../../services/api/blogsApi';
import AdminBlogForm from '../shared/AdminBlogForm';

const AdminBlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadBlogs = async () => {
    try {
      const res = await getAllBlogs();
      setBlogs(res.data);
      console.log('Blogs loaded successfully:', res.data); // ✅ Success log
    } catch (err) {
      console.error('Error fetching blogs:', err);
     
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Blog Dashboard</h1>
      
      {/* Add Blog button and "All Blogs" header on the same line */}
      <div className="flex justify-between items-center mb-6">
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

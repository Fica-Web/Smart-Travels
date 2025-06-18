import React, { useEffect, useState } from 'react';
import { getAllBlogs, deleteBlogApi } from '../../../services/api/blogsApi';
import blogsInstance from '../../../services/axios_instances/blogsInstance';
import AdminHero from '../../reusable/AdminHero';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminSingleBlog from './AdminSingleBlog';

const AdminBlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const loadBlogs = async () => {
    try {
      const res = await getAllBlogs();
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

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setLoading(true); // Set loading to true before deleting
      try {
        await deleteBlogApi(blogId);
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
        toast.success('Blog deleted successfully');
      } catch (err) {
        console.error('Error deleting blog:', err);
        toast.error('Failed to delete the blog');
      } finally {
        setLoading(false); // Set loading to false after the operation completes
      }
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-10 py-8 bg-gray-100">
      <AdminHero 
        title="Manage Blogs" 
        link='/admin/blog/new'
        button='Create New Blog'
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">All Blogs</h2>
      </div>

      {blogs.length === 0 ? (
        <div className="text-gray-600 text-center mt-20">
          <p className="text-lg">No blogs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <AdminSingleBlog
              key={blog._id}
              blog={blog}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              loading={loading} // Pass loading state to AdminSingleBlog
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogDashboard;

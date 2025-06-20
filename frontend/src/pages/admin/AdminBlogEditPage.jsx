import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleBlogApi } from '../../services/api/blogsApi'; // Adjust the import path as necessary
import AdminBlogForm from '../../components/AdminSection/AdminBlog/AdminBlogForm'; 

const AdminBlogEditor = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getSingleBlogApi(id);
        setBlog(res.data?.blog || res.blog || res); // ✅ ensure correct structure
      } catch (err) {
        console.error('Error loading blog:', err);
      }
    };

    fetchBlog();
  }, [id]);

  return blog ? (
    <AdminBlogForm
      selectedBlog={blog}
      onBlogSaved={() => navigate('/admin/blog')}
      onCancel={() => navigate('/admin/blog')}
    />
  ) : (
    <p className="p-6">Loading blog...</p>
  );
};

export default AdminBlogEditor;

// src/components/pages/AdminBlogEditor.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById } from '../../services/api/blogsApi';
import AdminBlogForm from '../../components/shared/AdminBlogForm';

const AdminBlogEditor = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        setBlog(res.data.blog);
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

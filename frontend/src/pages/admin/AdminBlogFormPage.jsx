import React from 'react'
import AdminBlogForm from '../../components/AdminSection/AdminBlog/AdminBlogForm';
import { useNavigate } from 'react-router-dom';

const AdminBlogFormPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <AdminBlogForm
        onBlogSaved={() => navigate('/admin/blog')}
        onCancel={() => navigate('/admin/blog')}
      />
    </div>
  )
}

export default AdminBlogFormPage
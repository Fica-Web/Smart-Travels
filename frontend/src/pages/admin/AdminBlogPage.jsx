import { useState } from 'react';
import { createBlogApi } from '../../services/api/blogsApi';
import AdminBlogDashboard from '../../components/AdminSection/AdminBlog/AdminBlogDashboard'

const AdminBlogPage = () => {

   
  return (
    <>
      <AdminBlogDashboard />
    </>
  )
}

export default AdminBlogPage
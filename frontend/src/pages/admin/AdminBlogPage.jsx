import { useState } from 'react';
import { createBlogApi } from '../../services/api/blogsApi';
import AdminBlogDashboard from '../../components/AdminSection/AdminBlog/AdminBlogDashboard'

const AdminBlogPage = () => {
  const [reset, setReset] = useState(false);

    const handleSubmit = async (formData) => {
        const response = await createBlogApi(formData);
        if (response) {
            setReset(true); // Trigger reset
            setTimeout(() => setReset(false), 500); // Reset the flag to allow future resets
        }
    };
  return (
    <>
      <AdminBlogDashboard />
    </>
  )
}

export default AdminBlogPage
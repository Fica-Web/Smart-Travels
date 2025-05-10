import { useNavigate } from 'react-router-dom';
import AdminBlogForm from '../../components/AdminSection/AdminBlog/AdminBlogForm';

const AdminBlogFormPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminBlogForm
        onCancel={() => navigate('/admin/blog')}
      />
    </>
  )
}

export default AdminBlogFormPage
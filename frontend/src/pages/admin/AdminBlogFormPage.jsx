import { useState } from 'react'
import AdminBlogForm from '../../components/AdminSection/AdminBlog/AdminBlogForm';
import { useNavigate } from 'react-router-dom';

const AdminBlogFormPage = () => {
  const [reset, setReset] = useState(false);

    const handleSubmit = async (formData) => {
        const response = await createBlogApi(formData);
        if (response) {
            setReset(true); // Trigger reset
            setTimeout(() => setReset(false), 500); // Reset the flag to allow future resets
        }
    };
  return (
    <div>
      <AdminBlogForm
        reset={reset}
        onSubmit={handleSubmit} // Pass the handleSubmit function as a prop
      />
    </div>
  )
}

export default AdminBlogFormPage
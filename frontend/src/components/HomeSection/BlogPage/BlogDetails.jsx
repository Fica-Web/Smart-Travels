import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleBlogApi } from '../../../services/api/blogsApi';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error('Invalid blog ID');
      return;
    }

    const fetchBlog = async () => {
      try {
        const data = await getSingleBlogApi(id);
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading blog details...</p>;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className="blog-details">
      dcfvgbhnjmk,
      <h1>{blog.title}</h1>
      <img src={blog.coverImage} alt={blog.title} />
      <p>{blog.description}</p>
      {/* Add more blog details as needed */}
    </div>
  );
};

export default BlogDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleBlogApi } from '../../../services/api/blogsApi';
import BlogDetailsHero from '../../reusable/BlogDetailsHero';

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
        console.log('data', data.blog);
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
    <section>
      <BlogDetailsHero blog={blog.blog}/>
      

      <div className="w-full flex flex-col md:flex-row justify-center p-5 md:p-10 md:px-20 ">
        <div className="flex flex-row md:flex-col items-start space-x-6 md:space-x-0 md:space-y-6 mb-6 md:mb-0">
          <div className="w-full max-w-[120px] text-left">
            <p className="text-sm">Date</p>
            <p className="text-md md:text-xl font-medium">
              {new Date(blog.blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div className='hidden md:block'>
            <p className="text-sm">Written By</p>
            <p className="text-md md:text-xl font-medium">{blog.blog.author}</p>
          </div>


          <div className="w-full max-w-[120px] text-left">
            <p className="text-sm">Category</p>
            <p className="text-md md:text-xl font-medium">{blog.blog.category}</p>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Description</h1>
            <p className="text-gray-600 text-md leading-relaxed pt-3">{blog.blog.description}</p>
          </div>

          <div className="pt-6">
            <img
              src={blog.blog.coverImage}
              alt={blog.blog.title}
              className="w-full h-auto max-h-[300px] rounded-2xl object-cover"
            />
          </div>

          <div>
            {blog.blog.content.map((item) => (
              <div key={item._id} className="pt-6 bg-white">
                <h2 className="text-lg md:text-xl font-semibold">{item.contentTitle}</h2>
                <p className="text-gray-700 pt-3">{item.contentDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;

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
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-68">
        <p className="text-secondary-blue text-lg">Loading blog...</p>
      </div>
    );
  }


  if (!blog) {
    return (
      <div className="flex justify-center items-center h-68">
        <p className="text-secondary-blue text-lg">Blog not found.</p>
      </div>
    );
  }


  return (
    <section>
      <BlogDetailsHero blog={blog.blog} />


      <div className="w-full flex flex-col md:flex-row justify-center p-5 md:p-10 md:px-20 ">
        <div className="w-full md:w-3/4  md:pl-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-secondary-blue ">Description</h1>
            <p className="text-secondary-blue text-md leading-relaxed pt-3 text-justify">{blog.blog.description}</p>
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
                <h2 className="text-lg md:text-xl font-semibold text-secondary-blue ">{item.contentTitle}</h2>
                <p className=" pt-3 text-justify text-secondary-blue ">{item.contentDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;

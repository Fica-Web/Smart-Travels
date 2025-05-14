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
        console.log('data', data.blog)
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
    <section className=''>
      <div
        className="w-full md:h-[70vh] h-[60vh] bg-cover bg-center relative rounded-b-[50px]"
        style={{ backgroundImage: `url(${blog.blog.coverImage})` }}
      >
        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent rounded-b-[50px]" />

        <div className="absolute bottom-3 left-10 right-10 z-10 p-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">
              {blog.blog.title}
            </h1>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div className='w-full md:flex justify-center p-10 px-20 gap-30'>
        <div className="w-auto flex flex-col items-start  space-y-8 ">
          <div className="w-full max-w-[120px] text-left">
            <p className="text-sm">Date</p>
            <p className="font-semibold">
              {new Date(blog.blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

           <div className=" ">
            <p className="text-sm">Written By</p>
            <p className=" text-xl md:text-xl font-medium">{blog.blog.author}</p>
          </div>

          <div className="w-full max-w-[120px] text-left">
            <p className="text-sm">Category</p>
            <p className="  text-xl md:text-xl font-medium">{blog.blog.category}</p>
          </div>

        </div>




        <div className='w-3/4 '>
          <div className=''>
            <h1 className='text-2xl font-bold '>Description</h1>
            <p className="text-gray-600 text-md  leading-relaxed pt-3">{blog.blog.description}</p>
          </div>
          <div className="pt-6 ">
            <img
              src={blog.blog.coverImage}
              alt={blog.blog.title}
              className="h-[300px] w-full max-w-4xl rounded-2xl object-cover"
            />
          </div>
          <div className="">
  {blog.blog.content.map((item) => (
    <div key={item._id} className="pt-6   bg-white ">

      <h2 className="text-xl font-semibold">{item.contentTitle}</h2>
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

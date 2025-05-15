// src/components/HomeSection/BlogPage/SingleBlog.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BsDot } from 'react-icons/bs';
import Loading from '../../reusable/Loading';
import BlogCard from './BlogCard';

const SingleBlog = ({ isHomePage, firstBlog, remainingBlogs }) => {
  if (!firstBlog && remainingBlogs.length === 0) {
    return <Loading />;
  }

  return (
    <>
      {/* Featured Blog on Homepage */}
      {isHomePage && firstBlog && (
        <div className="flex flex-col md:flex-row overflow-hidden mt-12 group h-auto md:h-[350px]">
          {/* Image */}
          <div className="w-[280px] h-[400px] sm:w-full sm:h-80 md:w-[790px] md:h-full overflow-hidden sm:p-2 mx-auto">
            <Link to={`/blog/${firstBlog._id}`}>
              <img
                src={firstBlog.coverImage}
                alt={firstBlog.title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </Link>
          </div>

          {/* Text */}
          <div className="w-full md:w-[490px] h-full p-6 md:p-10 space-y-5 flex flex-col justify-center bg-white rounded-xl">
            <div className="flex-col justify-between">
              <Link to={`/blog/${firstBlog._id}`}>
                <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 leading-snug pb-5 break-words max-w-xl hover:text-blue-600 transition">
                  {firstBlog.title}
                </h3>
              </Link>
              {firstBlog.description && (
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                  {firstBlog.description}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 pt-6 border-gray-200">
              <span className="flex items-center space-x-1 text-sm text-gray-500">
                <span>
                  <strong>Date:</strong>{' '}
                  {firstBlog.createdAt ? new Date(firstBlog.createdAt).toLocaleDateString() : 'N/A'}
                </span>
                <BsDot className="text-black text-2xl" />
                <span>{firstBlog.author}</span>
              </span>

              <Link
                to={`/blog/${firstBlog._id}`}
                className="bg-gray-100 hover:bg-gray-200 text-black rounded-full p-2 transition inline-block"
              >
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid gap-12 mt-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {isHomePage
          ? remainingBlogs.slice(0, 3).map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))
          : [firstBlog, ...remainingBlogs].map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
      </div>
    </>
  );
};


export default SingleBlog;

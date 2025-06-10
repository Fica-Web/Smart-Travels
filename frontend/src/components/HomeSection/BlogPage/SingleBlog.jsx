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
        <div className="flex flex-col md:flex-row justify-between overflow-hidden  mt-1 pt-5 group h-auto md:h-[350px] ">
          {/* Image */}
          <div className="w-full h-[400px] sm:w-full sm:h-80 md:w-[790px] md:h-full overflow-hidden mr-0 md:mr-19 mx-auto ">
            <Link to={`/blog/${firstBlog._id}`}>
              <img
                src={firstBlog.coverImage}
                alt={firstBlog.title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </Link>
          </div>

          {/* Text */}
          <div className="w-full md:w-[490px] h-full p-1 pt-4 md:pt-0 space-y-5 mr-0 md:mr-3 flex flex-col justify-center  rounded-3xl ">
            <div className="flex-col justify-between">
              <Link to={`/blog/${firstBlog._id}`}>
                <h3 className="text-xl md:text-4xl font-semibold text-secondary-blue leading-snug pb-5 break-words max-w-xl transition">
                  {firstBlog.title}
                </h3>
              </Link>
              {firstBlog.description && (
                <p className="text-sm sm:text-base text-secondary-blue/80 max-w-2xl text-justify line-clamp-4 mb-4">
                  {firstBlog.description}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center text-sm sm:text-base text-secondary-blue/80 border-gray-200">
              <span className="flex items-center space-x-1 text-sm ">
                <span>
                  <strong className='' >Date:</strong>{' '}
                    {new Date(firstBlog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
                </span>
                <BsDot className="text-2xl text-secondary-blue " />
                <span><strong className='' >{firstBlog.author}</strong></span>
              </span>

              <Link
                to={`/blog/${firstBlog._id}`}
                className="bg-gray-100 hover:bg-gray-200 text-secondary-blue rounded-full p-2 transition inline-block"
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
        <BlogCard key={blog._id} blog={blog} isHomepage={true} />
      ))
    : [firstBlog, ...remainingBlogs].map((blog) => (
        <BlogCard key={blog._id} blog={blog} isHomepage={false} />
      ))}
</div>

    </>
  );
};


export default SingleBlog;

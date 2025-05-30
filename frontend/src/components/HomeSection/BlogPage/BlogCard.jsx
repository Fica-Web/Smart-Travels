import React from 'react';
import { Link } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';
import { ArrowUpRight } from 'lucide-react';
import { FiCalendar, FiUser } from 'react-icons/fi';

const BlogCard = ({ blog, isHomepage }) => {
  return (
    <div className="bg-white shadow rounded-3xl overflow-hidden border border-t-0 border-gray-300 flex flex-col transition duration-300 group relative">
  {/* Top Right Icon Button */}
  <Link
    to={`/blog/${blog._id}`}
    className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-black rounded-full p-2 transition z-10"
  >
    <ArrowUpRight size={18} />
  </Link>

  {/* Image */}
  <Link to={`/blog/${blog._id}`}>
    <div className="overflow-hidden rounded-t-3xl">
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full  object-cover transform transition-transform duration-500 group-hover:scale-110"
      />
    </div>
  </Link>

  {/* Content */}
  <div className="flex flex-col justify-between h-full p-4 border-secondary-blue rounded-b-3xl space-y-1 ">
    <Link to={`/blog/${blog._id}`}>
      <h3 className="text-xl font-semibold text-secondary-blue">
        {blog.title}
      </h3>
    </Link>

    {!isHomepage && (
      <p className="text-sm sm:text-base text-secondary-blue/80 line-clamp-3 leading-relaxed">
        {blog.description}
      </p>
    )}

 <div className="flex items-center text-sm sm:text-base text-secondary-blue/80 pt-2">
  <span className="flex items-center space-x-1">
    <span className="flex items-center gap-x-2">
      <FiCalendar className="text-base " />
      <span >
        {new Date(blog.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </span>
    </span>

    <BsDot className="text-2xl text-secondary-blue" />

    <span className="flex items-center gap-x-2">
      <FiUser className="text-base" />
      <span>{blog.author}</span>
    </span>
  </span>
</div>
  </div>
</div>

  );
};

export default BlogCard;

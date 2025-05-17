import React from 'react';
import { Link } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';
import { ArrowUpRight } from 'lucide-react';

const BlogCard = ({ blog, isHomepage }) => {
  return (
    <div className="transition duration-300 overflow-hidden group relative">
      <Link to={`/blog/${blog._id}`}>
        <div className="overflow-hidden rounded-xl">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="pt-5 space-y-3">
        <Link to={`/blog/${blog._id}`}>
          <h3 className="text-xl font-semibold text-secondary-blue group-hover:text-blue-600 transition">
            {blog.title}
          </h3>
        </Link>

        {/* Conditionally render description */}
        {!isHomepage && (
          <p className="text-gray-600 text-lg line-clamp-3 leading-relaxed">
            {blog.description}
          </p>
        )}

        <div className="flex justify-between items-center text-sm text-gray-500 pt-2 border-gray-200">
          <span className="flex items-center space-x-1 text-sm text-gray-500">
            <span>
              <strong>Date:</strong>{' '}
              {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'N/A'}
            </span>
            <BsDot className="text-black text-2xl" />
            <span>{blog.author}</span>
          </span>

          <Link
            to={`/blog/${blog._id}`}
            className="bg-gray-100 hover:bg-gray-200 text-black rounded-full p-2 transition inline-block"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};


export default BlogCard;

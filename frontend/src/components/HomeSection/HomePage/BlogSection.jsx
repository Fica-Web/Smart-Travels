import React from 'react'
import SectionHeading from '../../reusable/SectionHeading'
import { blogData } from '../../../data/HomeSection/blogData'
import { ArrowUpRight } from 'lucide-react'
import { BsDot } from "react-icons/bs";

const BlogSection = ({ isHomePage = false }) => {
  const blogsToDisplay = isHomePage ? blogData.slice(0, 4) : blogData;
  const [firstBlog, ...remainingBlogs] = blogsToDisplay;


  return (
    <div className="px-20 sm:px-6 lg:px-20 py-16 bg-gray-50">
      <SectionHeading
        backgroundText="TRAVEL BLOG"
        heading="Explore Travel Tips And Latest Trends"
        subtext="Explore travel tips, hidden gems, and expert guides to make your next adventure unforgettable!"
      />

      {/* First Blog - Horizontal Feature */}
      <div className="flex flex-col md:flex-row overflow-hidden mt-12 group h-auto md:h-[350px]">
        {/* Left Side Image */}
        <div className="w-full md:w-[790px] h-80 sm:h-90 md:h-full sm: overflow-hidden pr-4">
          <img
            src={firstBlog.coverImage}
            alt={firstBlog.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Right Side Text Content */}
        <div className="w-full md:w-[490px] h-full p-6 md:p-10 space-y-5 flex flex-col justify-center bg-white rounded-xl">
          <div className="flex-col justify-between">
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 leading-snug pb-5 break-words max-w-xl">
              {firstBlog.title}
            </h3>

            <p className="text-gray-600 font-normal leading-relaxed">
              {firstBlog.shortDescription}
            </p>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500 pt-6  border-gray-200">
            <span className="flex items-center gap-1 text-gray-500 text-sm">
              <span>{firstBlog.date}</span>
              <BsDot className="text-black text-2xl" />
              <span>{firstBlog.author}</span>
            </span>

            <button className="bg-gray-100 hover:bg-gray-200 text-black rounded-full p-2 transition">
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>


      {/* Remaining Blogs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {remainingBlogs.map((blog) => (
          <div
            key={blog.id}
            className="transition duration-300 overflow-hidden group relative"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-5 space-y-3">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                {blog.title}
              </h3>

              <div className="flex justify-between items-center text-sm text-gray-500 pt-2  border-gray-200">
                <span className="flex items-center space-x-1">
                  <span>{blog.date}</span>
                  <BsDot className="text-black text-2xl" />
                  <span>{blog.author}</span>
                </span>
                <button className="bg-gray-100 hover:bg-gray-200 text-black rounded-full p-2 transition">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default BlogSection

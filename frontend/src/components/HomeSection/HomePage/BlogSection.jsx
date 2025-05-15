// src/components/BlogSection/BlogSection.js
import React, { useEffect, useState } from 'react';
import SectionHeading from '../../reusable/SectionHeading';
import { getAllBlogs } from '../../../services/api/blogsApi'; // Assuming this function fetches the blogs
import SingleBlog from '../../../components/HomeSection/BlogPage/SingleBlog';  // Import BlogGrid component

const BlogSection = ({ isHomePage = false }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const res = await getAllBlogs();
        const blogData = Array.isArray(res.data) ? res.data : res.data.blogs || [];
        setBlogs(blogData);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const [firstBlog, ...remainingBlogs] = blogs;

  return (
    <div className="sm:px-6 md:px-20 py-16 ">
      {isHomePage && (
        <SectionHeading
          backgroundText="TRAVEL BLOG"
          heading="Explore Travel Tips And Latest Trends"
          subtext="Explore travel tips, hidden gems, and expert guides to make your next adventure unforgettable!"
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-gray-500 text-lg">Loading blogs...</p>
        </div>
      ) : (
        <SingleBlog isHomePage={isHomePage} firstBlog={firstBlog} remainingBlogs={remainingBlogs} />
      )}
    </div>
  );
};


export default BlogSection;

// src/components/BlogSection/BlogSection.js
import React, { useEffect, useState } from 'react';
import SectionHeading from '../../reusable/SectionHeading';
import { getAllBlogs } from '../../../services/api/blogsApi'; // Assuming this function fetches the blogs
import BlogGrid from '../../../components/HomeSection/BlogPage/SingleBlog';  // Import BlogGrid component

const BlogSection = ({ isHomePage = false }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to load all blogs
  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await getAllBlogs();
      const blogData = Array.isArray(res.data) ? res.data : res.data.blogs || [];
      console.log('blogdata',blogData)
      setBlogs(blogData); // Set blogs data
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    loadBlogs(); // Fetch blogs when component mounts

  }, []);

  // Split blogs into firstBlog (featured) and remainingBlogs
  const [firstBlog, ...remainingBlogs] = blogs;

  return (
  <div className="sm:px-6 md:px-20 py-16 bg-gray-50">
    {/* Section Heading - Only on Home Page */}
    {isHomePage && (
      <SectionHeading
        backgroundText="TRAVEL BLOG"
        heading="Explore Travel Tips And Latest Trends"
        subtext="Explore travel tips, hidden gems, and expert guides to make your next adventure unforgettable!"
      />
    )}

    {/* Show loading indicator if blogs are still loading */}
    {loading ? (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500 text-lg">Loading blogs...</p>
      </div>
    ) : (
      <BlogGrid isHomePage={isHomePage} firstBlog={firstBlog} remainingBlogs={remainingBlogs} />
    )}
  </div>

  );
};

export default BlogSection;

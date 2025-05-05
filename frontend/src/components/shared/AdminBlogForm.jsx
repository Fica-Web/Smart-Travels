import React, { useEffect, useState } from 'react';
import { createBlog, updateBlog, deleteBlog } from '../../services/api/blogsApi';

const AdminBlogForm = ({ selectedBlog, onBlogSaved, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    if (selectedBlog) {
      setTitle(selectedBlog.title || '');
      setContent(selectedBlog.content || '');
    } else {
      setTitle('');
      setContent('');
      setCoverImage(null);
    }
  }, [selectedBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      if (selectedBlog) {
        await updateBlog(selectedBlog._id, formData);
      } else {
        await createBlog(formData);
      }
      onBlogSaved();
    } catch (err) {
      alert('Error saving blog.');
    }
  };

  const handleDelete = async () => {
    if (selectedBlog && window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(selectedBlog._id);
        onBlogSaved();
      } catch (err) {
        alert('Error deleting blog.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        {selectedBlog ? 'Edit Blog' : 'Create New Blog'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Blog Title */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Blog Content */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            placeholder="Write the blog content..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          ></textarea>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-blue-100 file:text-blue-700
              hover:file:bg-blue-200 transition"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-md transition"
          >
            {selectedBlog ? 'Update Blog' : 'Create Blog'}
          </button>

          {selectedBlog && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-md transition"
            >
              Delete Blog
            </button>
          )}

          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-2.5 rounded-lg shadow-md transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogForm;

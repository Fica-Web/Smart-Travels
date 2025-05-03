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
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8 space-y-6 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        {selectedBlog ? 'Edit Blog' : 'Create New Blog'}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition"
        >
          {selectedBlog ? 'Update' : 'Create'}
        </button>

        {selectedBlog && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg transition"
          >
            Delete
          </button>
        )}

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-2 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AdminBlogForm;

import React, { useEffect, useState } from 'react';
import { createBlog, updateBlog, deleteBlog } from '../../services/api/blogsApi';
import CoverImageUpload from '../reusable/CoverImageUpload';

const AdminBlogForm = ({ selectedBlog, onBlogSaved, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: null,
    coverImagePreviewUrl: null,
    author: '',
    category: '',
    description: '',
    contentSections: [{ contentTitle: '', contentDescription: '' }]
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedBlog) {
      setFormData({
        title: selectedBlog.title || '',
        coverImage: selectedBlog.coverImage || null,
        coverImagePreviewUrl: selectedBlog.coverImage || null,
        author: selectedBlog.author || '',
        category: selectedBlog.category || '',
        description: selectedBlog.description || '',
        contentSections: selectedBlog.contentSections || [{ contentTitle: '', contentDescription: '' }]
      });
    } else {
      setFormData({
        title: '',
        coverImage: null,
        coverImagePreviewUrl: null,
        author: '',
        category: '',
        description: '',
        contentSections: [{ contentTitle: '', contentDescription: '' }]
      });
    }
  }, [selectedBlog]);

  useEffect(() => {
    let previewUrl;

    if (formData.coverImage && typeof formData.coverImage !== 'string') {
      previewUrl = URL.createObjectURL(formData.coverImage);
      setFormData(prevData => ({ ...prevData, coverImagePreviewUrl: previewUrl }));
    } else if (typeof formData.coverImage === 'string') {
      setFormData(prevData => ({ ...prevData, coverImagePreviewUrl: formData.coverImage }));
    } else {
      setFormData(prevData => ({ ...prevData, coverImagePreviewUrl: null }));
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [formData.coverImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation (same as before)
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Short description is required';
    if (!formData.coverImage) newErrors.coverImage = 'Cover image is required';

    formData.contentSections.forEach((section, index) => {
        if (!section.contentTitle.trim()) {
            newErrors[`contentTitle_${index}`] = 'Content Title is required';
        }
        if (!section.contentDescription.trim()) {
            newErrors[`contentDescription_${index}`] = 'Content Description is required';
        }
    });

    setErrors(newErrors);

    // If there are validation errors, return without submitting the form
    if (Object.keys(newErrors).length > 0) return;

    // Log the formData before sending it to the API
    console.log("Form Data being submitted:", formData);

    const jsonData = {
        title: formData.title,
        author: formData.author,
        category: formData.category,
        description: formData.description,
        content: formData.contentSections,
        coverImage: formData.coverImage // It's a URL or File object
    };

    try {
        // Send the request to the backend (either create or update based on selectedBlog)
        if (selectedBlog) {
            await updateBlog(selectedBlog._id, jsonData); // Pass JSON data
        } else {
            await createBlog(jsonData); // Pass JSON data
        }
        onBlogSaved();
    } catch (err) {
        console.error('Error saving blog:', err.response?.data?.message || err.message);
        alert(`Error saving blog: ${err.response?.data?.message || err.message}`);
    }
};

  

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...formData.contentSections];
    updatedContent[index][field] = value;
    setFormData(prevData => ({ ...prevData, contentSections: updatedContent }));
  };

  const addContentSection = () => {
    setFormData(prevData => ({
      ...prevData,
      contentSections: [...prevData.contentSections, { contentTitle: '', contentDescription: '' }]
    }));
  };

  const removeContentSection = (index) => {
    const updatedContent = formData.contentSections.filter((_, idx) => idx !== index);
    setFormData(prevData => ({ ...prevData, contentSections: updatedContent }));
  };


  const handleDelete = async () => {
    if (selectedBlog) {
      const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
      if (confirmDelete) {
        try {
          await deleteBlog(selectedBlog._id);
          alert('Blog deleted successfully');
          onBlogSaved(); // Trigger the parent callback to update the list
        } catch (err) {
          console.error('Error deleting blog:', err.response?.data?.message || err.message);
          alert(`Error deleting blog: ${err.response?.data?.message || err.message}`);
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {selectedBlog ? 'Edit Blog' : 'Create New Blog'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Blog Title */}
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-500 p-2 rounded-md mt-1"
            required
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Author */}
        <div>
          <label className="block text-gray-700 font-medium">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full border border-gray-500 p-2 rounded-md mt-1"
          />
          {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border border-gray-500 p-2 rounded-md mt-1"
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-gray-700 font-medium">Short Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            className="w-full border border-gray-500 p-2 rounded-md mt-1"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Cover Image */}
        <CoverImageUpload
          onImageChange={(file) => setFormData({ ...formData, coverImage: file })}
          coverImagePreview={formData.coverImagePreviewUrl}
          error={errors.coverImage}
        />

        {/* Content Sections */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Content Sections</h3>
          {formData.contentSections.map((section, index) => (
            <div key={index} className="border border-gray-500 p-4 rounded-lg bg-gray-100">
              <div>
                <label className="block text-gray-700 font-medium">Content Title</label>
                <input
                  type="text"
                  value={section.contentTitle}
                  onChange={(e) => handleContentChange(index, 'contentTitle', e.target.value)}
                  className="w-full border border-gray-500 p-2 rounded-md mt-1"
                />
                {errors[`contentTitle_${index}`] && <p className="text-red-500 text-sm">{errors[`contentTitle_${index}`]}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Content Description</label>
                <textarea
                  value={section.contentDescription}
                  onChange={(e) => handleContentChange(index, 'contentDescription', e.target.value)}
                  rows="3"
                  className="w-full border border-gray-500 p-2 rounded-md mt-1"
                />
                {errors[`contentDescription_${index}`] && <p className="text-red-500 text-sm">{errors[`contentDescription_${index}`]}</p>}
              </div>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeContentSection(index)}
                  className="text-red-500 font-semibold mt-2 hover:text-red-700 cursor-pointer"
                >
                  Remove Section
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addContentSection}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
          >
            + Add Section
          </button>
        </div>


        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            {selectedBlog ? 'Update Blog' : 'Submit Blog'}
          </button>

          {selectedBlog && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              Delete Blog
            </button>
          )}

          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogForm;

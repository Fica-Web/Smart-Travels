import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog, updateBlog } from '../../../services/api/blogsApi';
import CoverImageUpload from '../../reusable/CoverImageUpload';

const AdminBlogForm = ({ selectedBlog, onBlogSaved, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    coverImage: null,
    coverImagePreviewUrl: null,
    author: '',
    category: '',
    description: '',
    contentSections: [{ contentTitle: '', contentDescription: '' }]
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedBlog && typeof selectedBlog === 'object') {
      console.log('Populating form with:', selectedBlog);
      setFormData(prevData => ({
        ...prevData,
        title: selectedBlog.title || '',
        coverImage: selectedBlog.coverImage || null,
        coverImagePreviewUrl: selectedBlog.coverImage || null,
        author: selectedBlog.author || '',
        category: selectedBlog.category || '',
        description: selectedBlog.description || '',
        contentSections: Array.isArray(selectedBlog.content)
          ? selectedBlog.content.map(section => ({
            contentTitle: section.contentTitle || '',
            contentDescription: section.contentDescription || ''
          }))
          : [{ contentTitle: '', contentDescription: '' }]
      }));
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

    if (Object.keys(newErrors).length > 0) return;

    // Process coverImage
    let coverImageData = formData.coverImage;

    if (formData.coverImage && typeof formData.coverImage !== 'string') {
      // Convert File object to base64 string
      coverImageData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(formData.coverImage);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }

    const jsonData = {
      title: formData.title,
      author: formData.author,
      category: formData.category,
      description: formData.description,
      content: formData.contentSections,
      coverImage: coverImageData
    };

    try {
      if (selectedBlog) {
        await updateBlog(selectedBlog._id, jsonData);
      } else {
        await createBlog(jsonData);
      }

      onBlogSaved();
      navigate('/admin/blog');
    } catch (err) {
      console.error('Error saving blog:', err.response?.data?.message || err);
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

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {selectedBlog ? 'Edit Blog' : 'Create New Blog'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
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

        <CoverImageUpload
          onImageChange={(file) => setFormData({ ...formData, coverImage: file })}
          coverImagePreview={formData.coverImagePreviewUrl}
          error={errors.coverImage}
        />

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
                {errors[`contentTitle_${index}`] && (
                  <p className="text-red-500 text-sm">{errors[`contentTitle_${index}`]}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Content Description</label>
                <textarea
                  value={section.contentDescription}
                  onChange={(e) => handleContentChange(index, 'contentDescription', e.target.value)}
                  rows="3"
                  className="w-full border border-gray-500 p-2 rounded-md mt-1"
                />
                {errors[`contentDescription_${index}`] && (
                  <p className="text-red-500 text-sm">{errors[`contentDescription_${index}`]}</p>
                )}
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
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 cursor-pointer"
          >
            + Add Section
          </button>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            {selectedBlog ? 'Update Blog' : 'Submit Blog'}
          </button>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              Cancel
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default AdminBlogForm;

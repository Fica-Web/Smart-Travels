import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createBlogApi, updateBlogApi, deleteBlogApi, getSingleBlogApi } from '../../../services/api/blogsApi';
import CoverImageUpload from '../../reusable/CoverImageUpload';

const AdminBlogForm = ({ onCancel }) => {
    const { id } = useParams(); // Get blog ID from URL
    
    const initialState = {
        title: "",
        description: "",
        slug: "",
        author: "",
        category: "",
        tags: "",
        coverImage: "",
        coverImagePreview: "",
        content: [{ contentTitle: "", contentDescription: "" }],
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); 

    // Fetch blog details if editing
    useEffect(() => {
        if (id) {
            const fetchBlog = async () => {
                try {
                    const response = await getSingleBlogApi(id);
                    setFormData({
                        ...response.blog,
                        coverImagePreview: response.blog.coverImage, // Set preview
                    });
                } catch (err) {
                    console.error("Error fetching blog:", err);
                }
            };
            fetchBlog();
        }
    }, [id]);

    const validateForm = () => {
        let newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.author.trim()) newErrors.author = "Author is required";
        if (!formData.category.trim()) newErrors.category = "Category is required";

        formData.content.forEach((item, index) => {
            if (!item.contentTitle.trim()) newErrors[`contentTitle${index}`] = "Content title is required";
            if (!item.contentDescription.trim()) newErrors[`contentDescription${index}`] = "Content description is required";
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                setErrors({ ...errors, coverImage: "Only image files are allowed" });
                return;
            }

            // Validate file size (2MB limit)
            if (file.size > 2 * 1024 * 1024) {
                setErrors({ ...errors, coverImage: "File size must be less than 2MB" });
                return;
            }

            // Store the file for submission
            setFormData((prevState) => ({
                ...prevState,
                coverImage: file, // This is needed for the API request
                coverImagePreview: URL.createObjectURL(file), // Preview
            }));

            setErrors({ ...errors, coverImage: null }); // Clear errors if valid
        }
    };

    const handleCroppedImage = (croppedImageBlob) => {
        const previewURL = URL.createObjectURL(croppedImageBlob);
        
        setFormData((prevState) => ({
            ...prevState,
            coverImage: croppedImageBlob, // For API upload
            coverImagePreview: previewURL, // For preview
        }));
    };
    
    const handleContentChange = (index, field, value) => {
        const updatedContent = [...formData.content];
        updatedContent[index][field] = value;
        setFormData({ ...formData, content: updatedContent });
    };

    const addContentSection = () => {
        setFormData({ ...formData, content: [...formData.content, { contentTitle: "", contentDescription: "" }] });
    };

    const removeContentSection = (index) => {
        const updatedContent = [...formData.content];
        updatedContent.splice(index, 1);
        setFormData({ ...formData, content: updatedContent });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true); // 🔹 Show loading state when submitting
        try {
            if (id) {
                await updateBlogApi(id, {
                    ...formData,
                });
            } else {
                await createBlogApi({
                    ...formData,
                });
            }

            setFormData(initialState); // Reset form after submission
        } finally {
            setLoading(false); // 🔹 Hide loading state after response
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {id ? 'Edit Blog' : 'Create New Blog'}
            </h2>
    
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-gray-700 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full border border-gray-500 p-2 rounded-md mt-1"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
    
                <div>
                    <label className="block text-gray-700 font-medium">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="w-full border border-gray-500 p-2 rounded-md mt-1"
                    />
                    {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
                </div>
    
                <div>
                    <label className="block text-gray-700 font-medium">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full border border-gray-500 p-2 rounded-md mt-1"
                    />
                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                </div>
    
                <div>
                    <label className="block text-gray-700 font-medium">Short Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full border border-gray-500 p-2 rounded-md mt-1"
                    />
                </div>
    
                <CoverImageUpload
                    onImageChange={handleImageChange}
                    onCroppedImage={handleCroppedImage}
                    coverImagePreview={formData.coverImagePreview}
                    error={errors.coverImage}
                />
    
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Content Sections</h3>
                    {formData.content.map((section, index) => (
                        <div key={index} className="border border-gray-500 p-4 rounded-lg bg-gray-100">
                            <div>
                                <label className="block text-gray-700 font-medium">Content Title</label>
                                <input
                                    type="text"
                                    value={section.contentTitle}
                                    onChange={(e) => handleContentChange(index, 'contentTitle', e.target.value)}
                                    className="w-full border border-gray-500 p-2 rounded-md mt-1"
                                />
                                {errors[`contentTitle${index}`] && (
                                    <p className="text-red-500 text-sm">{errors[`contentTitle${index}`]}</p>
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
                                {errors[`contentDescription${index}`] && (
                                    <p className="text-red-500 text-sm">{errors[`contentDescription${index}`]}</p>
                                )}
                            </div>
    
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeContentSection(index)}
                                    className="text-red-500 font-semibold mt-2 hover:text-red-700"
                                >
                                    Remove Section
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addContentSection}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        + Add Section
                    </button>
                </div>
    
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : id ? "Update Blog" : "Submit Blog"}
                    </button>
    
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
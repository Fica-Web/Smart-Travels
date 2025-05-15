import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createBlogApi, updateBlogApi, getSingleBlogApi } from '../../../services/api/blogsApi';
import CoverImageUpload from '../../reusable/CoverImageUpload';
import DynamicContentSections from '../../reusable/DynamicContentSection';
import ReusableSubmitButton from '../../reusable/ReusableSubmitButton';

const AdminBlogForm = ({ onCancel }) => {
    const { id } = useParams(); // Get blog ID from URL
    const navigate = useNavigate(); // For navigation after submission

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
                navigate(`/admin/blog`); // Redirect to the blog details page after update   
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
                        className="w-full border border-gray-300 p-2 rounded-md mt-1"
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
                        className="w-full border border-gray-300 p-2 rounded-md mt-1"
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
                        className="w-full border border-gray-300 p-2 rounded-md mt-1"
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
                        className="w-full border border-gray-300 p-2 rounded-md mt-1"
                    />
                </div>

                <CoverImageUpload
                    onImageChange={handleImageChange}
                    onCroppedImage={handleCroppedImage}
                    coverImagePreview={formData.coverImagePreview}
                    error={errors.coverImage}
                />

                <DynamicContentSections
                    title="Content Sections"
                    sections={formData.content}
                    onChange={handleContentChange}
                    onAdd={addContentSection}
                    onRemove={removeContentSection}
                    errors={errors}
                />

                <div className="flex gap-4 pt-4">
                    <ReusableSubmitButton
                        loading={loading}
                        text={id ? 'Update Blog' : 'Create Blog'}
                        loadingText={id ? 'Updating...' : 'Submitting...'}
                    />

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
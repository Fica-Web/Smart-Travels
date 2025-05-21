import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
    createDestinationApi,
    updateDestinationApi,
    getDestinationByIdApi,
} from '../../../services/api/destinationApi';
import CoverImageUpload from '../../reusable/CoverImageUpload';
import CountrySelect from '../../reusable/CountrySelect';
import DynamicContentSections from '../../reusable/DynamicContentSection';
import ReusableSubmitButton from '../../reusable/ReusableSubmitButton';

const AdminDestinationForm = ({ destinationId }) => {
    const isEditMode = Boolean(destinationId);
    const navigate = useNavigate()

    const initialState = {
        title: '',
        destination: '',
        overview: '',
        duration: '',
        pricePerPerson: '',
        coverImage: '',
        coverImagePreview: null,
        country: '',
        isPublished: false,
        inclusions: [''],
        days: [{ title: '', description: '' }],
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            (async () => {
                setLoading(true);
                const res = await getDestinationByIdApi(destinationId);
                console.log('res:', res)
                if (res.success) {
                    const destination = res.data.destination;
                    setFormData({
                        ...destination,
                        pricePerPerson: destination.pricePerPerson || '',
                        coverImage: '',
                        coverImagePreview: destination.coverImage,
                    });
                } else {
                    toast.error('Failed to load destination');
                }
                setLoading(false);
            })();
        }
    }, [destinationId]);

    const handleDayChange = (index, field, value) => {
        const updatedDays = [...formData.days];
        updatedDays[index][field] = value;
        setFormData({ ...formData, days: updatedDays });
    };

    const handleInclusionChange = (index, value) => {
        const updated = [...formData.inclusions];
        updated[index] = value;
        setFormData({ ...formData, inclusions: updated });
    };

    const addDay = () => {
        setFormData(prev => ({
            ...prev,
            days: [...prev.days, { contentTitle: '', contentDescription: '' }]
        }))
    };

    const addInclusion = () => {
        setFormData({ ...formData, inclusions: [...formData.inclusions, ''] });
    };

    const removeInclusion = (index) => {
        const updated = [...formData.inclusions];
        updated.splice(index, 1);
        setFormData({ ...formData, inclusions: updated });
    };

    const removeDay = (index) => {
        const updated = [...formData.days];
        updated.splice(index, 1);
        setFormData({ ...formData, days: updated });
    };

    const handleImageChange = (file) => {
        if (!file) {
            setFormData(prev => ({
                ...prev,
                coverImage: '',
                coverImagePreview: null
            }));
            setErrors(prev => ({ ...prev, coverImage: 'Invalid image file' }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            coverImage: file,
            coverImagePreview: URL.createObjectURL(file),
        }));

        setErrors(prev => ({ ...prev, coverImage: null }));
    };


    const handleCroppedImage = (croppedImageBlob) => {
        const previewURL = URL.createObjectURL(croppedImageBlob);
        setFormData((prevState) => ({
            ...prevState,
            coverImage: croppedImageBlob,
            coverImagePreview: previewURL,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.destination) newErrors.destination = 'Destination is required';
        if (!formData.overview) newErrors.overview = 'Overview is required';
        if (!formData.duration) newErrors.duration = 'Duration is required';
        if (!formData.coverImage && !isEditMode) newErrors.coverImage = 'Cover image is required';
        if (formData.days.length === 0) newErrors.days = 'At least one day plan is required';

        formData.days.forEach((item, index) => {
            if (!item.title.trim()) newErrors[`title${index}`] = "Day title is required";
            if (!item.description.trim()) newErrors[`description${index}`] = "Day plan description is required";
        });
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({}); // Reset errors

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Please fill in all required fields');
            setLoading(false);
            return;
        }

        if (isEditMode) {
            console.log('Updating destination with ID:', destinationId);
            const response = await updateDestinationApi(formData, destinationId);
            if (response.success) {
                toast.success(response.message || "Destination updated successfully");
                setFormData(initialState);
                navigate('/admin/destination')
            } else {
                toast.error(response.message || "Failed to update destination");
                setErrors(prev => ({ ...prev, server: response.message }));
            }
        } else {
            console.log('Creating new destination');
            const response = await createDestinationApi(formData);
            if (response.success) {
                toast.success("Destination created successfully");
                setFormData(initialState);
            } else {
                toast.error("Failed to create destination");
                setErrors(prev => ({ ...prev, server: response.message }));
            }
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
        >
            <h2 className="text-2xl font-bold text-center">
                {isEditMode ? 'Edit Destination' : 'Create Destination'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        placeholder="Title (e.g., 5 Days in Bali)"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Destination (e.g., Bali, Indonesia)"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    />
                    {errors.destination && <p className="text-red-500 text-sm">{errors.destination}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Overview (short descritption about the package)"
                        value={formData.overview}
                        onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    />
                    {errors.overview && <p className="text-red-500 text-sm">{errors.overview}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Duration (e.g., 5 Days / 4 Nights)"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    />
                    {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start'>
                <CoverImageUpload
                    onImageChange={handleImageChange}
                    onCroppedImage={handleCroppedImage}
                    coverImagePreview={formData.coverImagePreview}
                    error={errors.coverImage}
                />
                <CountrySelect
                    value={formData.country}
                    onChange={(val) => setFormData({ ...formData, country: val })}
                />
            </div>

            <div>
                <label className="font-medium">Inclusions</label>
                {formData?.inclusions?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 mt-2">
                        <input
                            type="text"
                            placeholder={`Inclusion ${index + 1}`}
                            value={item}
                            onChange={(e) => handleInclusionChange(index, e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeInclusion(index)}
                                className="text-red-500 font-bold text-lg hover:scale-105 cursor-pointer"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addInclusion}
                    className="text-blue-600 mt-2 cursor-pointer"
                >
                    + Add Inclusion
                </button>
            </div>

            <DynamicContentSections
                title="Day-wise Plans"
                addButtonLabel="+ Add Day"
                sections={formData.days}
                onChange={handleDayChange}
                onAdd={addDay}
                onRemove={removeDay}
                errors={errors}
                fieldConfig={[
                    { name: "title", label: "Day Title" },
                    { name: "description", label: "Day Description", type: "textarea" }
                ]}
            />

            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="mr-2"
                />
                <label>Publish this destination</label>
            </div>

            <ReusableSubmitButton
                loading={loading}
                text={isEditMode ? 'Update Destination' : 'Create Destination'}
                loadingText={isEditMode ? 'Updating...' : 'Creating...'}
            />
        </form>
    );
};

export default AdminDestinationForm;
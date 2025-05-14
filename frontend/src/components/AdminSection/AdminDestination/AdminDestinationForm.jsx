import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createDestinationApi } from '../../../services/api/destinationApi';
import CoverImageUpload from '../../reusable/CoverImageUpload';

const AdminDestinationForm = ({ destinationId }) => {
    const isEditMode = Boolean(destinationId);

    const initialState = {
        title: '',
        destination: '',
        duration: '',
        pricePerPerson: '',
        coverImage: '',
        coverImagePreview: null,
        country: '',
        isPublished: false,
        inclusions: [''],
        days: [{ title: '', description: '' }]
    }

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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
        setFormData({ ...formData, days: [...formData.days, { title: '', description: '' }] });
    };

    const addInclusion = () => {
        setFormData({ ...formData, inclusions: [...formData.inclusions, ''] });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const response = createDestinationApi(formData, destinationId);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
            <h2 className="text-2xl font-bold text-center">Create Destination</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Title (e.g., 5 Days in Bali)"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Destination (e.g., Bali, Indonesia)"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Duration (e.g., 5 Days / 4 Nights)"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    required
                />
                {/* <input
                    type="number"
                    placeholder="Price per person"
                    value={formData.pricePerPerson}
                    onChange={(e) => setFormData({ ...formData, pricePerPerson: e.target.value })}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                /> */}
                <input
                    type="text"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
            </div>
                
            <CoverImageUpload
                onImageChange={handleImageChange}
                onCroppedImage={handleCroppedImage}
                coverImagePreview={formData.coverImagePreview}
                error={errors.coverImage}
            />

            <div>
                <label className="font-medium">Inclusions</label>
                {formData.inclusions.map((item, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Inclusion ${index + 1}`}
                        value={item}
                        onChange={(e) => handleInclusionChange(index, e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full mt-2"
                    />
                ))}
                <button
                    type="button"
                    onClick={addInclusion}
                    className="text-blue-600 mt-2"
                >+ Add Inclusion</button>
            </div>

            <div>
                <label className="font-medium">Day-wise Plan</label>
                {formData.days.map((day, index) => (
                    <div key={index} className="mt-2">
                        <input
                            type="text"
                            placeholder={`Day ${index + 1} Title`}
                            value={day.title}
                            onChange={(e) => handleDayChange(index, 'title', e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
                        />
                        <textarea
                            placeholder="Description"
                            value={day.description}
                            onChange={(e) => handleDayChange(index, 'description', e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addDay}
                    className="text-blue-600 mt-2"
                >+ Add Day</button>
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="mr-2"
                />
                <label>Publish this destination</label>
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
                Submit
            </button>
        </form>
    );
};

export default AdminDestinationForm;
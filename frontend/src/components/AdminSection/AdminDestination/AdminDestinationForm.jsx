import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AdminDestinationForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        destination: '',
        duration: '',
        pricePerPerson: '',
        coverImage: '',
        country: '',
        isPublished: false,
        inclusions: [''],
        days: [{ title: '', description: '' }],
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
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
                <input
                    type="number"
                    placeholder="Price per person"
                    value={formData.pricePerPerson}
                    onChange={(e) => setFormData({ ...formData, pricePerPerson: e.target.value })}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
                <input
                    type="url"
                    placeholder="Cover Image URL"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    required
                />
            </div>

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
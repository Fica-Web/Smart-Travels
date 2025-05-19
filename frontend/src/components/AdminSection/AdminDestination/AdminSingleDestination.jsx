import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteDestinationApi } from "../../../services/api/destinationApi";

const SingleDestination = ({ destination, setDestinations }) => {
    const [loading, setLoading] = useState(false);

    if (!destination) return null;

    const {
        _id,
        title,
        country,
        duration,
        pricePerPerson,
        coverImage,
        isPublished,
    } = destination;

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this destination?");
        if (!confirmDelete) return;

        setLoading(true);
        const response = await deleteDestinationApi(_id);

        if (response.success) {
            setDestinations(prev => prev.filter(dest => dest._id !== _id));
            toast.success(response.message || 'Destination deleted successfully');
        } else {
            toast.error(response.message || "Failed to delete destination. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 border border-gray-200 overflow-hidden">
            {/* Image Section */}
            {coverImage && (
                <div className="relative group">
                    <img
                        src={coverImage}
                        alt={title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-3 bg-white bg-opacity-80 px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-sm">
                        {country}
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${isPublished ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {isPublished ? 'Published' : 'Unpublished'}
                    </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Duration:</span> {duration}</p>
                    {pricePerPerson && (
                        <p><span className="font-medium">Price:</span> ₹{pricePerPerson.toLocaleString()}</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                    <Link
                        to={`edit/${_id}`}
                        className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition"
                    >
                        ✏️ Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className={`inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Deleting..." : "🗑 Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleDestination;
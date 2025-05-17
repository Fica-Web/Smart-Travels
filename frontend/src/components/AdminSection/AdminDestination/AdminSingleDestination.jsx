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
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-gray-100">
            {/* Image */}
            {coverImage && (
                <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
            )}

            {/* Content */}
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{title}</h2>
                <p className="text-sm text-gray-500 mb-3">{country}</p>

                <div className="text-sm text-gray-700 space-y-1">
                    <p><span className="font-semibold">Duration:</span> {duration}</p>
                    {pricePerPerson && (
                        <p><span className="font-semibold">Price:</span> ₹{pricePerPerson}</p>
                    )}
                    <p>
                        <span className="font-semibold">Status:</span>{' '}
                        <span className={isPublished ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                            {isPublished ? 'Published' : 'Unpublished'}
                        </span>
                    </p>
                </div>

                <div className="flex justify-between items-center gap-2 mt-6">
                    <Link
                        to={`edit/${_id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-md transition"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className={`bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded-md transition ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleDestination;
import { Link } from "react-router-dom";

const SingleDestination = ({ destination }) => {
    if (!destination) return null;

    const {
        title,
        country,
        duration,
        pricePerPerson,
        coverImage,
        isPublished,
    } = destination;

    return (
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden">
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
                <h2 className="text-xl font-bold mb-1">{title}</h2>
                <p className="text-sm text-gray-500 mb-2">{country}</p>

                <div className="text-sm text-gray-700 space-y-1">
                    <p><span className="font-semibold">Duration:</span> {duration}</p>
                    {pricePerPerson && (
                        <p><span className="font-semibold">Price:</span> ₹{pricePerPerson}</p>
                    )}
                    <p>
                        <span className="font-semibold">Status:</span>{' '}
                        <span className={isPublished ? "text-green-600" : "text-red-600"}>
                            {isPublished ? 'Published' : 'Not Published'}
                        </span>
                    </p>
                </div>

                <div className="flex justify-between my-5">
                    <Link to={`edit/${destination._id}`} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition cursor-pointer" >
                        Edit
                    </Link>

                    <button className={`bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition cursor-pointer `}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleDestination;
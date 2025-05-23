
import { FaWhatsapp } from 'react-icons/fa';

const SingleDestination = ({ dest }) => {
    return (
        <div
            className="bg-white shadow rounded-3xl overflow-hidden border border-t-0 border-gray-300 flex flex-col"
        >
            {/* Image */}
            {dest.coverImage && (
                <img
                    src={dest.coverImage}
                    alt={dest.title || dest.country || 'Destination'}
                    className="w-full h-auto object-cover"
                />
            )}

            {/* Bottom content */}
            <div className="flex justify-between items-center p-4 border border-t-0 border-secondary-blue rounded-b-3xl">

                {/* Left */}
                <div>
                    <p className="text-lg font-semibold">
                        {dest.country || dest.name || dest.title}
                    </p>
                    <p className="text-sm text-gray-500">
                        {dest.duration || 'Duration not specified'}
                    </p>
                </div>

                {/* Right */}
                <div className="flex items-center space-x-2">
                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600"
                        title="Chat on WhatsApp"
                    >
                        <FaWhatsapp size={22} className="text-secondary-blue" />
                    </a>
                    <button className="w-[119px] h-[30px] rounded-[8px] px-[20px] py-[10px] text-sm bg-[#4A94D0] text-white hover:bg-blue-700 transition flex items-center justify-center">
                        Send Query
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SingleDestination

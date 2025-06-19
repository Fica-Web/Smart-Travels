import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ReusableModal from '../../reusable/ReusableModal';
import ContactForm from '../../reusable/ContactForm';

const SingleDestination = ({ dest }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false)

    const handleFormSuccess = () => {
        setOpen(false);
    };

    const destination = {
        serviceType: 'destination',
        destination: dest,
    };

    const handleCardClick = () => {
        if (!open) {
            navigate(`/bookings/trips/${dest.slug}`);
        }
    };



    return (
        <div
            onClick={handleCardClick}
            className="bg-white  rounded-3xl overflow-hidden border border-t-0 border-gray-300 flex flex-col relative cursor-pointer"
        >
            <Link
                to={`/bookings/trips/${dest.slug}`}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-secondary-blue rounded-full p-2 transition z-10"
            >
                <ArrowUpRight size={18}  />
            </Link>
            {/* Image */}
            {dest.coverImage && (
                <img
                    src={dest.coverImage}
                    alt={dest.title || dest.country || 'Destination'}
                    className="w-full h-auto object-cover"
                />
            )}

            {/* Bottom content */}
            <div className="flex justify-between items-center p-4 border border-t-0 border-secondary-blue/70 rounded-b-3xl ">

                {/* Left */}
                <div>
                    <p className="text-lg font-semibold text-secondary-blue">
                        {dest.country || dest.name || dest.title}
                    </p>
                    <p className="text-sm text-secondary-blue">
                        {dest.duration || 'Duration not specified'}
                    </p>
                </div>

                {/* Right */}
                <div className="flex items-center space-x-2">
                    <a
                        href="https://wa.me/+971526070722"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600"
                        title="Chat on WhatsApp"
                    >
                        <FaWhatsapp size={30} className=" text-secondary-blue" />
                    </a>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevents triggering the card click
                            openModal();         // Opens the modal
                        }}
                        className="w-[119px] h-[30px] rounded-[8px] px-[20px] py-[10px] text-sm bg-[#4A94D0] text-white hover:bg-blue-600 transition flex items-center justify-center cursor-pointer"
                    >
                        Send Query
                    </button>

                    {/* Modal for sending query */}
                    <ReusableModal open={open} onClose={closeModal} title="Send Your Query">
                        <div >
                            <ContactForm
                                title="Send a Query"
                                buttonText="Send Query"
                                messageFieldName="location"
                                messageLabel="Location"
                                messagePlaceholder="Enter your location"
                                destination={destination}
                                onSuccess={handleFormSuccess}

                            />
                        </div>

                    </ReusableModal>
                </div>
            </div>
        </div>
    )
}

export default SingleDestination

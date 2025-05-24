import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDestinationByIdApi } from '../../../services/api/destinationApi';
import { IoFlagSharp } from "react-icons/io5";
import TripDetails from './TripDetails';
import ContactSection from './ContactSection';

const DestinationDetails = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestination = async () => {
            console.log('Fetching destination with ID:', id);

            const response = await getDestinationByIdApi(id);

            console.log('API response:', response);

            if (response.success) {
                setDestination(response.data.destination);
                console.log('Destination data set:', response.data); // ✅ log extracted data
            } else {
                console.error('Failed to load destination:', response.message); // ❌ handle failure
            }

            setLoading(false);
        };

        fetchDestination();
    }, [id]);

    if (loading) return <p>Loading destination...</p>;
    if (!destination) return <p>Destination not found.</p>;

    return (
        <div className='  '>
            <div className="pt-3 md:pt-6 text-secondary-blue">
                <img
                    src={destination.coverImage}
                    alt={destination.title}
                    className="w-full h-auto md:max-h-[575px] rounded-3xl object-cover"
                />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-secondary-blue gap-3 mt-8">
                    {/* Title */}
                    <h1 className="text-2xl font-bold">{destination.title}</h1>

                    {/* Duration and Country */}
                    <div className="flex items-center  text-sm md:text-base ">
                        <span>{destination.duration}</span>
                        <span className="flex items-center gap-1">
                            ,<IoFlagSharp size={16} />
                            {destination.country}
                        </span>
                    </div>
                </div>
                <p className='text-sm sm:text-base text-secondary-blue/80 mt-4 md:mt-6 text-justify '>{destination.overview}</p>
            </div>
            <div className='w-full flex flex-col lg:flex-row gap-25 items-stretch'>
                <div className='w-full md:w-1/2 flex flex-col '>
                    <TripDetails destination={destination} />
                </div>
                <div className='w-full md:w-[500px] flex flex-col '>
                    <ContactSection />
                </div>
            </div>


        </div>
    );
};

export default DestinationDetails;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDestinationBySlugApi } from '../../../services/api/destinationApi';
import { IoFlagSharp } from "react-icons/io5";
import TripDetails from './Tripdetails';
import ContactSection from './ContactSection';
import Loading from '../../reusable/Loading';

const DestinationDetails = () => {
    const { slug } = useParams();
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestination = async () => {
            console.log('Fetching destination with Slug:',slug);

            const response = await getDestinationBySlugApi(slug);

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
    }, [slug]);

    if (loading) return <Loading text="Loading...." />;
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
                    <h1 className="text-2xl font-bold text-secondary-blue">{destination.title}</h1>

                    {/* Duration and Country */}
                    <div className="flex items-center  text-sm md:text-base text-secondary-blue">
                        <span>{destination.duration}</span>
                        <span className="flex items-center gap-1 text-secondary-blue">
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
                    <ContactSection  destination={destination}/>
                </div>
            </div>


        </div>
    );
};

export default DestinationDetails;

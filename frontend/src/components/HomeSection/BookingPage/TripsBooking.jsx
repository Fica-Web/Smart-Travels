import React, { useEffect, useState } from 'react';
import { getPublishedDestinationsApi } from '../../../services/api/destinationApi';
import SingleDestination from './SingleDestination';
import Loading from '../../reusable/Loading';

const TripsBooking = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchDestinations = async () => {
    setLoading(true);
    const response = await getPublishedDestinationsApi();
    console.log('Destinations:', response.data);
    if (response.success) {
      const sortedDestinations = [...response.data.destinations].sort((a, b) => {
        const nameA = (a.country || a.name || a.title || '').toLowerCase();
        const nameB = (b.country || b.name || b.title || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });
      setDestinations(sortedDestinations);
    } else {
      console.error('Error fetching destinations:', response.message);
    }
    setLoading(false);
  };

  fetchDestinations();
}, []);


  return (
    <div className="mt-2 md:mt-9 md:pb-6">
      
      {loading ? (
        <Loading text="Loading destinations..." />
      ) : destinations?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <SingleDestination key={dest._id} dest={dest} />
          ))}
        </div>
      ) : (
        <p>No destinations found.</p>
      )}
    </div>
  );
};

export default TripsBooking;
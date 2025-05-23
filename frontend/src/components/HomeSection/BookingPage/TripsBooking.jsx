import React, { useEffect, useState } from 'react';
import { getPublishedDestinationsApi } from '../../../services/api/destinationApi';
import SingleDestination from './SingleDestination';

const TripsBooking = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      const response = await getPublishedDestinationsApi();
      console.log('Destinations:', response.data);
      if (response.success) {
        setDestinations(response.data.destinations);
      } else {
        console.error('Error fetching destinations:', response.message);
      }
      setLoading(false);
    };

    fetchDestinations();
  }, []);

  return (
    <div className="p-6 md:px-20">
      
      {loading ? (
        <p>Loading destinations...</p>
      ) : destinations.length > 0 ? (
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

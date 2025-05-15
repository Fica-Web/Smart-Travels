import { useEffect, useState } from "react";
import AdminSingleDestination from "./AdminSingleDestination";
import { getAllDestinationsApi } from "../../../services/api/destinationApi";
import Loading from "../../reusable/Loading";

const AdminDestinationListing = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDestinations = async () => {
            setLoading(true);
                const response = await getAllDestinationsApi();

                if (response.success) {
                    setDestinations(response.data.destinations)
                } else {
                    console.error('Error fetching destinations:', response.message)
                }
            setLoading(false)
        };

        fetchDestinations();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Destinations</h1>

            {loading ? (
                <Loading />
            ) : destinations.length === 0 ? (
                <p>No destinations found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {destinations.map((destination) => (
                        <AdminSingleDestination key={destination._id} destination={destination} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDestinationListing;

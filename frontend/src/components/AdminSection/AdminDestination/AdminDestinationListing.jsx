import { useEffect, useState } from "react";
import AdminSingleDestination from "./AdminSingleDestination";
import { getAllDestinationsApi } from "../../../services/api/destinationApi";
import Loading from "../../reusable/Loading";
import PaginationControls from "../../reusable/PaginationControls";

const AdminDestinationListing = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        const fetchDestinations = async () => {
            setLoading(true);
            const response = await getAllDestinationsApi(page);

            if (response.success) {
                setDestinations(response.data.destinations);
                setTotalPages(response.data.totalPages);
            } else {
                console.error('Error fetching destinations:', response.message)
            }
            setLoading(false)
        };

        fetchDestinations();
    }, [page]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Destinations</h2>

            {loading ? (
                <Loading />
            ) : destinations.length === 0 ? (
                <p className="flex justify-center mt-32">No destinations found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {destinations.map((destination) => (
                        <AdminSingleDestination
                            key={destination._id}
                            destination={destination}
                            setDestinations={setDestinations}
                        />
                    ))}
                </div>
            )}

            <PaginationControls
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
            />

        </div>
    );
};

export default AdminDestinationListing;

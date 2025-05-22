import { useEffect, useState } from "react";
import AdminSingleDestination from "./AdminSingleDestination";
import { getAllDestinationsApi } from "../../../services/api/destinationApi";
import Loading from "../../reusable/Loading";

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
                console.log(response.data.totalPages);
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

            {/* pagination */}
            <div className="flex justify-center mt-8 gap-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="text-lg font-semibold">
                    Page {page} of {totalPages}
                </span>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default AdminDestinationListing;

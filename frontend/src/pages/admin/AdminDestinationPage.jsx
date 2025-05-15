import AdminHero from "../../components/reusable/AdminHero";
import AdminDestinationListing from "../../components/AdminSection/AdminDestination/AdminDestinationListing";

const AdminDestinationPage = () => {
    return (
        <>
            <AdminHero 
                title="Manage Destinations" 
                link="/admin/destination/new"
                button="Add New Destination"
            />
            <AdminDestinationListing />
        </>
    )
}

export default AdminDestinationPage;

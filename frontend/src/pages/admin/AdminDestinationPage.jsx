import AdminHero from "../../components/reusable/AdminHero";

const AdminDestinationPage = () => {
    return (
        <>
            <AdminHero 
                title="Manage Destinations" 
                link="/admin/destination/new"
                button="Add New Destination"
            />
        </>
    )
}

export default AdminDestinationPage;

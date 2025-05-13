import { useParams } from "react-router-dom";
import AdminDestinationForm from "../../components/AdminSection/AdminDestination/AdminDestinationForm";

const AdminDestinationFormPage = () => {
    const { id } = useParams();

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">
                {id ? 'Edit Destination' : 'Create Destination'}
            </h2>
            <AdminDestinationForm destinationId={id} />
        </div>
    )
}

export default AdminDestinationFormPage

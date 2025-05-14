import { useParams } from "react-router-dom";
import AdminDestinationForm from "../../components/AdminSection/AdminDestination/AdminDestinationForm";

const AdminDestinationFormPage = () => {
    const { id } = useParams();

    return (
        <div className="p-4">
            <AdminDestinationForm destinationId={id} />
        </div>
    )
}

export default AdminDestinationFormPage

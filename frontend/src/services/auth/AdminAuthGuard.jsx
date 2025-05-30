import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { isAdminProtectedApi } from "../api/adminApi";
import Loading from "../../components/reusable/Loading";

const AdminAuthGuard = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await isAdminProtectedApi();
                setIsAuthorized(true);
            } catch {
                navigate('/admin/login');
            }
        };
        checkAuth();
    }, []);

    return isAuthorized ? <Outlet /> : <Loading />;
}

export default AdminAuthGuard;
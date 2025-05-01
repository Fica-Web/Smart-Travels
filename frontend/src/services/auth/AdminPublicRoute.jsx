import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdminProtectedApi } from '../api/adminApi';
import Loading from '../../components/reusable/Loading';

const AdminPublicRoute = ({ children }) => {
    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await isAdminProtectedApi(); // If authenticated
                navigate('/admin'); // Redirect to dashboard
            } catch {
                setChecking(false); // Not authenticated, allow access to login
            }
        };
        checkAuth();
    }, []);

    return checking ? <Loading /> : children;
};

export default AdminPublicRoute;
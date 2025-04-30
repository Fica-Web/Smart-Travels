import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../../components/reusable/Loading';

const GuestGuard = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <Loading />; 

    // If user is logged in, redirect to homepage (or dashboard)
    if (user) {
        return <Navigate to="/" replace />;
    }

    return children; // else show the login/signup page
};

export default GuestGuard
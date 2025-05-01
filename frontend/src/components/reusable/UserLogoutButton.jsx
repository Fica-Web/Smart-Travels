import { useNavigate } from 'react-router-dom';
import { CiPower } from "react-icons/ci";
import { useAuth } from "../../contexts/AuthContext";

const UserLogoutButton = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();         // Clears tokens, user info, etc.
        navigate('/login');     // Redirect to login page
    };

    return (
        <>
            {user && (
                <button
                    onClick={handleLogout}
                    className='flex items-center gap-2 text-red-600 hover:text-red-800 transition duration-200 cursor-pointer'
                >
                    <CiPower className="text-xl" />
                    Logout
                </button>
            )}
        </>
    );
};

export default UserLogoutButton;
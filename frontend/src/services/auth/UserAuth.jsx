import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../components/reusable/Loading";

const UserAuth = ({ children }) => {
    const { user, loading } = useAuth();
    console.log("UserAuth component: ", user, loading); // Log user and loading state
    const location = useLocation();
  
    if (loading) {
      return <Loading />;
    }
  
    if (!user) {
      // Redirect to login and preserve current location
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  };
  
  export default UserAuth;
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const [isChecking, setIsChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        setIsChecking(false); // done checking
    }, []);

    if (isChecking) {
        return null; // or loading spinner if needed
    }
    console.log('AuthGuard: token =', localStorage.getItem('token'));

    return isLoggedIn ? children : <Navigate to="/admin/login" replace />;
};

export default AuthGuard;

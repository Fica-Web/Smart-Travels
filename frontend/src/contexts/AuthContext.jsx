import { createContext, useContext, useEffect, useState } from 'react';
import {
    userLoginApi,
    userLogoutApi,
    getUserProfile,
} from '../services/api/userApi';
import { setAccessToken, clearAccessToken } from '../services/axios_instances/userInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // for auto-login

    // Auto-login on refresh (via refresh token cookie)
    useEffect(() => {
        const loadUser = async () => {
            try {
                const profile = await getUserProfile(); // This will refresh token if needed
                setUser(profile.user || profile);
            } catch (err) {
                console.log('User not logged in');
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const login = async (credentials) => {
        const data = await userLoginApi(credentials);
        setAccessToken(data.accessToken);
        setUser(data.user);
        return data;
    };

    const logout = async () => {
        await userLogoutApi();
        clearAccessToken();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
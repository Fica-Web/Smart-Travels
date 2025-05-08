import userInstance, { setAccessToken } from "../axios_instances/userInstance";

// Login and store token
export const userLoginApi = async (credentials) => {
    try {
        const response = await userInstance.post('/login', credentials);
        setAccessToken(response.data.accessToken);
        console.log('Login API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Login API Error:', error.response?.data);
        throw error;
    }
};

export const userSignupApi = async (data) => {
    try {
        const response = await userInstance.post('/signup', data);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Signup failed' };
    }
};

export const getUserProfile = async () => {
    try {
        const response = await userInstance.get('/profile');
        return response.data;
    } catch (error) {
        console.error('Get User Profile Error:', error);
        throw error;
    }
};

export const forgotPasswordApi = async (email) => {
    try {
        const response = await userInstance.post('/forgot-password', { email });
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Forgot Password API Error:', error.response?.data);
        return { success: false, error: error.response?.data?.message || 'Forgot password failed' };
    }
}

export const resetPasswordApi = async (data) => {
    try {
        const response = await userInstance.post('/reset-password', data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Reset Password API Error:', error.response?.data);
        return { success: false, error: error.response?.data?.message || 'Reset password failed' };
    }
};

export const userLogoutApi = async () => {
    try {
        const response = await userInstance.post('/logout');
        return response.data;
    } catch (error) {
        console.error('Logout API Error:', error);
        throw error;
    }
};
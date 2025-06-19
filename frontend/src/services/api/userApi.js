import userInstance, { setAccessToken } from "../axios_instances/userInstance";

// Login and store token
export const userLoginApi = async (credentials) => {
    try {
        const response = await userInstance.post('/login', credentials);
        setAccessToken(response.data.accessToken);
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
        console.error('Signup API Error:', error.response?.data || error);
        return { success: false, error: error.response?.data?.message || 'Signup failed' };
    }
};

export const verifyOtpApi = async (data) => {
    try {
        const response = await userInstance.post('/verify-otp', data);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'OTP verification failed' };
    }
}

export const resendOtpApi = async (email) => {
    try {
        const response = await userInstance.post('/resend-otp', { email });
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Resend OTP API Error:', error.response?.data);
        return { success: false, error: error.response?.data?.message || 'Resend OTP failed' };
    }
}

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

export const submitMessageApi = async (data) => {
    try {
        const response = await userInstance.post('/submit-message', data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Submit Message API Error:', error.response?.data);
        return { success: false, error: error.response?.data?.message || 'Message submission failed' };
    }
}

export const userLogoutApi = async () => {
    try {
        const response = await userInstance.post('/logout');
        return response.data;
    } catch (error) {
        console.error('Logout API Error:', error);
        throw error;
    }
};

export const getAllUsersApi = async (params) => {
    try {
        const response = await userInstance.get('/all-users', { params });
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Fetch all Users API Error:', error.response?.data);
        return { success: false, error: error.response?.data?.message || 'Fetching Users Failed' };
    }
}
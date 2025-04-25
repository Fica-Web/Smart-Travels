import userInstance, { setAccessToken } from "../axios_instances/userInstance";

// Login and store token
export const userLoginApi = async (credentials) => {
    const response = await userInstance.post('/login', credentials);
    setAccessToken(response.data.accessToken); // Store in memory
    return response.data;
};

export const userSignupApi = async (data) => {
    const response = await userInstance.post('/signup', data);
    return response.data;
};

export const getUserProfile = async () => {
    const response = await userInstance.get('/profile');
    return response.data;
};

export const userLogoutApi = async () => {
    const response = await userInstance.post('/logout');
    return response.data;
};
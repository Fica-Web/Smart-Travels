import adminInstance from "../axios_instances/adminInstance";

const adminLoginApi = async (data) => {
    try {
        const response = await adminInstance.post('/login', data);
        return response.data;
    } catch (error) {
        console.log("error during login:", error.response.data);
    }
}

const isAdminProtectedApi = async () => {
    try {
        const response = await adminInstance.get('/isAdminProtected');
        return response.data;
    } catch (error) {
        console.log("error during isAdminProtected:", error.response.data);
    }
}

const adminLogoutApi = async () => {
    try {
        const response = await adminInstance.post('/logout');
        return response.data;
    } catch (error) {
        console.log("error during logout:", error.response.data);
    }
}


export {
    adminLoginApi,
    isAdminProtectedApi,
    adminLogoutApi,
}
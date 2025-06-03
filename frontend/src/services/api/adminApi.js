import adminInstance from "../axios_instances/adminInstance";
import { toast } from "react-toastify";

const adminLoginApi = async (data) => {
    try {
        const response = await adminInstance.post('/login', data);
        return response.data;
    } catch (error) {
        console.log("error during login:",  error.response?.data || error.message);
        toast.error(error.response?.data?.message || error.message || "Login failed. Please try again.");
    }
}

const isAdminProtectedApi = async () => {
    try {
        const response = await adminInstance.get('/isAdminProtected');
        return response.data;
    } catch (error) {
        console.log("error during isAdminProtected:", error);
        throw error; // Rethrow the error to be handled by the calling function
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

const fetchDashboardDataApi = async () => {
    try {
        const response = await adminInstance.get('/dashboard');
        return { success: true, data: response.data.dashboardData };
    } catch (error) {
        console.error("Error fetching dashboard Data:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
        };
    }
}

export {
    adminLoginApi,
    isAdminProtectedApi,
    adminLogoutApi,
    fetchDashboardDataApi,
}
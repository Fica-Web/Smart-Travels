import adminInstance from "../axios_instances/adminInstance";

const adminLoginApi = async (data) => {
    try {
        const response = await adminInstance.post('/login', data);
        return response.data;
    } catch (error) {
        console.log("error during login:", error.response.data);
        return toast.error(error.response.data.error);
    }
}

export {
    adminLoginApi,
}
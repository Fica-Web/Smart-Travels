import inquiryInstance from "../axios_instances/inquiryInstance";

export const fetchInquiriesApi = async ({
    page = 0,
    limit = 10,
    search = "",
    sortBy = "createdAt",
    order = "desc",
} = {}) => {
    try {
        const response = await inquiryInstance.get("/", {
            params: { page, limit, search, sortBy, order },
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
        };
    }
};

export const createInquiryApi = async (inquiryData) => {
    try {
        const response = await inquiryInstance.post("/", inquiryData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error creating inquiry:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
        };
    }
}
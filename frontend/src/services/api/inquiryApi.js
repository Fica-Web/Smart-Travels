import inquiryInstance from "../axios_instances/inquiryInstance";

export const fetchInquiriesApi = async () => {
    try {
        const response = await inquiryInstance.get("/");
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
        };
    }
}
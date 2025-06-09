import airportInstance from "../axios_instances/airportInstance";

export const searchAirportsApi = async (query) => {
    try {
        const response = await airportInstance.get(`/search?q=${query}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error searching airports:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
        };
    }
}
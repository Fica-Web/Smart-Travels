import destinationInstance from "../axios_instances/destinationInstance";

export const createDestinationApi = async (data) => {
    try {
        const response = await destinationInstance.post("/", data);
        return response.data;
    } catch (error) {
        console.error("Error creating destination:", error);
        throw error;
    }
}
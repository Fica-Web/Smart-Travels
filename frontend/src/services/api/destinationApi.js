import destinationInstance from "../axios_instances/destinationInstance";

export const getAllDestinationsApi = async (page = 1, limit = 9) => {
    try {
        const response = await destinationInstance.get("/", {
            params: {
                page,
                limit,
            },
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error fetching destinations:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
        };
    }
}

export const getDestinationByIdApi = async (id) => {
    try {
        const response = await destinationInstance.get(`/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error fetching destination:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
        };
    }
}

export const createDestinationApi = async (data) => {
    const formData = new FormData();

    for (const key in data) {
        if (key === 'inclusions' || key === 'days') {
            formData.append(key, JSON.stringify(data[key]));
        } else {
            formData.append(key, data[key]);
        }
    }

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    try {
        const response = await destinationInstance.post("/", formData, config);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error creating destination:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
        };
    }
}

export const updateDestinationApi = async (data, id) => {
    const formData = new FormData();

    for (const key in data) {
        if (key === 'inclusions' || key === 'days') {
            formData.append(key, JSON.stringify(data[key]));
        } else {
            formData.append(key, data[key]);
        }
    }

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    try {
        const response = await destinationInstance.put(`/${id}`, formData, config);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error updating destination:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
        };
    }
}

export const deleteDestinationApi = async (id) => {
    try {
        const response = await destinationInstance.delete(`/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error deleting destination:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
        };
    }
}
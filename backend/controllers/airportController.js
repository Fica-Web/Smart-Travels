import Airport from "../model/flightSchema.js";

export const createAirports = async (req, res) => {
    try {
        const airports = req.body; // Expecting an array of airport objects

        if (!Array.isArray(airports) || airports.length === 0) {
            return res.status(400).json({ message: "Request body must be a non-empty array of airports." });
        }

        const insertedAirports = await Airport.insertMany(airports);
        res.status(201).json({ message: "Airports inserted successfully", data: insertedAirports });

    } catch (error) {
        console.error("Error inserting airports:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getAirports = async (req, res) => {
    try {
        const airports = await Airport.find({});
        res.status(200).json({ message: "Airports retrieved successfully", data: airports });
    } catch (error) {
        console.error("Error retrieving airports:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const searchAirports = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.length < 1) {
            return res.status(400).json({ message: "Query 'q' is required" });
        }

        const regex = new RegExp(q, 'i'); // case-insensitive

        const results = await Airport.find({
            $or: [
                { name: regex },
                { city: regex },
                { state: regex },
                { country: regex },
                { code: regex }
            ]
        })
            .limit(10)
            .select("code name city state country -_id"); // project only needed fields

        res.status(200).json(results);

    } catch (error) {
        console.error("❌ Autocomplete error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
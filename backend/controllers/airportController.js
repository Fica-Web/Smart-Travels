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

    let results;

    // If no query, return first 10 airports (e.g. for default suggestions)
    if (!q || q.trim().length === 0) {
      results = await Airport.find()
        .limit(10)
        .select("code name city state country -_id");
    } else {
      const regex = new RegExp(q, 'i'); // case-insensitive partial match

      results = await Airport.find({
        $or: [
          { code: new RegExp(`^${q}$`, 'i') }, // ✅ prioritize exact code match
          { name: regex },
          { city: regex },
          { state: regex },
          { country: regex }
        ]
      })
        .limit(10)
        .select("code name city state country -_id");
    }

    res.status(200).json(results);

  } catch (error) {
    console.error("❌ Autocomplete error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
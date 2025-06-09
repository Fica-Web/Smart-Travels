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
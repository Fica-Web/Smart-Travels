import Inquiry from "../model/inquirySchema.js";

export const createInquiry = async (req, res) => {
    try {
        const {
            name,
            phone,
            email,
            serviceType,
            flightDetails,
            hotelDetails,
            visaDetails,
            destinationDetails,
            insuranceDetails,
            location,
            message,
        } = req.body;

        if (!name || !phone || !serviceType) {
            return res.status(400).json({ success: false, message: "Name, phone, and service type are required." });
        }

        // Create base object
        const inquiryData = {
            name,
            phone,
            email,
            serviceType,
            location,
            message,
        };

        // Add only relevant details based on serviceType
        switch (serviceType) {
            case "flight":
                if (flightDetails && Object.keys(flightDetails).length > 0) {
                    inquiryData.flightDetails = flightDetails;
                }
                break;

            case "hotel":
                if (hotelDetails && Object.keys(hotelDetails).length > 0) {
                    inquiryData.hotelDetails = hotelDetails;
                }
                break;

            case "visa":
                if (visaDetails && Object.keys(visaDetails).length > 0) {
                    inquiryData.visaDetails = visaDetails;
                }
                break;

            case "destination":
                if (destinationDetails && Object.keys(destinationDetails).length > 0) {
                    inquiryData.destinationDetails = destinationDetails;
                }
                break;

            case "insurance":
                if (insuranceDetails && Object.keys(insuranceDetails).length > 0) {
                    inquiryData.insuranceDetails = insuranceDetails;
                }
                break;

            default:
                // Optionally: return error if unknown serviceType
                return res.status(400).json({ success: false, message: "Invalid service type." });
        }

        const newInquiry = new Inquiry(inquiryData);
        const saved = await newInquiry.save();

        res.status(201).json({ success: true, message: "Inquiry submitted successfully", data: saved });
    } catch (error) {
        console.error("Error creating inquiry:", error);
        res.status(500).json({ success: false, message: "Server error while creating inquiry", error: error.message });
    }
};

export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({ success: false, message: "Server error while fetching inquiries", error: error.message });
  }
};

export const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }
    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    console.error("Error fetching inquiry:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

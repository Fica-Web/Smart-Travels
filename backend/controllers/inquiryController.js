import Inquiry from "../model/inquirySchema.js";
import { sendEmail } from "../config/emailService.js";

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
            nationality,
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
            nationality,
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

        // Also send email notification to admin
        const to = process.env.RECEIVER_EMAIL;
        const subject = `New Inquiry from ${name}`;
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <h2 style="color: #f7501f;">📝 New Inquiry Received</h2>

                <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; font-weight: bold;">Name:</td>
                    <td style="padding: 8px;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; font-weight: bold;">Phone:</td>
                    <td style="padding: 8px;">${phone}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; font-weight: bold;">Email:</td>
                    <td style="padding: 8px;">${email || "Not provided"}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; font-weight: bold;">Service Type:</td>
                    <td style="padding: 8px; text-transform: capitalize;">${serviceType}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; font-weight: bold;">Nationality:</td>
                    <td style="padding: 8px;">${nationality || "Not provided"}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; font-weight: bold;">Message:</td>
                    <td style="padding: 8px;">${message || "No message provided"}</td>
                </tr>
                </table>

                ${serviceType === "flight"
                            ? `<h3 style="margin-top: 24px; color: #fea034;">✈️ Flight Details</h3><pre style="background: #f9f9f9; padding: 10px; border-radius: 4px;">${JSON.stringify(flightDetails, null, 2)}</pre>`
                            : serviceType === "hotel"
                                ? `<h3 style="margin-top: 24px; color: #fea034;">🏨 Hotel Details</h3><pre style="background: #f9f9f9; padding: 10px; border-radius: 4px;">${JSON.stringify(hotelDetails, null, 2)}</pre>`
                                : serviceType === "visa"
                                    ? `<h3 style="margin-top: 24px; color: #fea034;">🛂 Visa Details</h3><pre style="background: #f9f9f9; padding: 10px; border-radius: 4px;">${JSON.stringify(visaDetails, null, 2)}</pre>`
                                    : serviceType === "destination"
                                        ? `<h3 style="margin-top: 24px; color: #fea034;">🌍 Destination Details</h3><pre style="background: #f9f9f9; padding: 10px; border-radius: 4px;">${JSON.stringify(destinationDetails, null, 2)}</pre>`
                                        : serviceType === "insurance"
                                            ? `<h3 style="margin-top: 24px; color: #fea034;">🛡️ Insurance Details</h3><pre style="background: #f9f9f9; padding: 10px; border-radius: 4px;">${JSON.stringify(insuranceDetails, null, 2)}</pre>`
                                            : ""
                        }

                <p style="margin-top: 24px; color: #888;">Smart Travels Admin Panel</p>
            </div>
        `;


        try {
            await sendEmail({ to, subject, html });
        } catch (emailErr) {
            console.error("Failed to send email:", emailErr);
        }

        res.status(201).json({ success: true, message: "Inquiry submitted successfully", data: saved });
    } catch (error) {
        console.error("Error creating inquiry:", error);
        res.status(500).json({ success: false, message: "Server error while creating inquiry", error: error.message });
    }
};

export const getAllInquiries = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const sortBy = req.query.sortBy || "createdAt";
        const order = req.query.order === "asc" ? 1 : -1;

        const query = {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { serviceType: { $regex: search, $options: "i" } },
            ],
        };

        const totalCount = await Inquiry.countDocuments(query);

        const inquiries = await Inquiry.find(query)
            .sort({ [sortBy]: order })
            .skip(page * limit)
            .limit(limit);

        res.status(200).json({
            success: true,
            inquiries,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
        });
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching inquiries",
            error: error.message,
        });
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

export const updateEnquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required" });
        }

        const updatedInquiry = await Inquiry.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedInquiry) {
            return res.status(404).json({ success: false, message: "Inquiry not found" });
        }

        res.status(200).json({ success: true, data: updatedInquiry, message: "Inquiry status updated successfully" });
    } catch (error) {
        console.error("Error updating inquiry status:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}
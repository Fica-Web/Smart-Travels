import {
    DialogContent,
    Typography,
    Divider,
    Box,
    Grid,
    Chip,
    Paper,
} from "@mui/material";
import {
    FaUser,
    FaPhone,
    FaEnvelope,
    FaGlobe,
    FaComment,
    FaTag,
    FaCalendarAlt,
} from "react-icons/fa";
import ReusableModal from "../../reusable/ReusableModal";

// Define unified icon color
const iconColor = "#4A94D0";

// Service color map
const serviceColorMap = {
    flight: "#E3F2FD",
    hotel: "#FFF3E0",
    visa: "#E8F5E9",
    destination: "#F3E5F5",
    insurance: "#FCE4EC",
};

function InquiryDetailsDialog({ open, onClose, inquiry }) {
    if (!inquiry) return null;
    // console.log("Inquiry Details:", inquiry);

    const {
        name,
        email,
        phone,
        serviceType,
        message,
        flightDetails,
        hotelDetails,
        visaDetails,
        destinationDetails,
        insuranceDetails,
        nationality,
        status,
        createdAt,
    } = inquiry;

    const serviceTypeToDetailsMap = {
        flight: flightDetails,
        hotel: hotelDetails,
        visa: visaDetails,
        destination: destinationDetails,
        insurance: insuranceDetails,
    };

    const details = serviceTypeToDetailsMap[serviceType];
    const sectionBg = serviceColorMap[serviceType] || "#f9f9f9";

    return (
        <ReusableModal open={open} onClose={onClose} title="Inquiry Details">
            <DialogContent dividers>
                {/* Top Info */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <InfoRow icon={<FaUser color={iconColor} />} label="Name" value={name} />
                        <InfoRow icon={<FaPhone color={iconColor} />} label="Phone" value={phone} />
                        <InfoRow icon={<FaEnvelope color={iconColor} />} label="Email" value={email || "-"} />
                        <InfoRow icon={<FaGlobe color={iconColor} />} label="Nationality" value={nationality || "-"} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoRow icon={<FaTag color={iconColor} />} label="Service Type" value={capitalize(serviceType)} />
                        <InfoRow icon={<FaCalendarAlt color={iconColor} />} label="Submitted" value={formatDate(createdAt)} />
                        <Box mt={1}>
                            <div className="flex gap-3 items-center">
                                <Typography variant="body2" fontWeight="bold" mb={0.5} mt={0.5}>
                                    Status:
                                </Typography>
                                <Typography sx={{ color: getStatusColor(status) }}>
                                    {capitalize(status)}
                                </Typography>
                            </div>
                        </Box>
                        {message && (
                            <Box mt={2}>
                                <Typography variant="body2" fontWeight="bold" mb={0.5}>
                                    <FaComment style={{ marginRight: 4, color: iconColor }} /> Message:
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#555" }}>{message}</Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>

                {/* Service-specific section */}
                {details && (
                    <>
                        <Divider sx={{ my: 4 }} />
                        <Typography variant="h6" gutterBottom color="primary">
                            {capitalize(serviceType)} Details
                        </Typography>
                        <Paper
                            elevation={1}
                            sx={{
                                backgroundColor: sectionBg,
                                p: 2,
                                borderRadius: 2,
                            }}
                        >
                            {Object.entries(details).map(([key, value]) => (
                                <Typography key={key} variant="body2" sx={{ mb: 1 }}>
                                    <strong>{formatKey(key)}:</strong> {String(value)}
                                </Typography>
                            ))}
                        </Paper>
                    </>
                )}
            </DialogContent>
        </ReusableModal>
    );
}

function InfoRow({ icon, label, value }) {
    return (
        <Box display="flex" alignItems="center" mb={1.5}>
            <Box mr={1} fontSize={18}>{icon}</Box>
            <Typography variant="body2" fontWeight="bold" mr={0.5} color="text.secondary">
                {label}:
            </Typography>
            <Typography variant="body2" sx={{ color: "#333" }}>{value}</Typography>
        </Box>
    );
}

function formatKey(key) {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
}

function capitalize(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
}

function formatDate(date) {
    return new Date(date).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

const statusColors = {
    new: "#0288d1",         // Blue
    contacted: "#ff9800",   // Orange
    converted: "#4caf50",   // Green
    ignored: "#f44336",     // Red
};

function getStatusColor(status) {
    return statusColors[status] || "#9e9e9e"; // Default gray for unknown
}

export default InquiryDetailsDialog;
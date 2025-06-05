import { DialogContent, Typography, Divider, Box, Grid, Chip, Paper } from "@mui/material";
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

function InquiryDetailsDialog({ open, onClose, inquiry }) {
    if (!inquiry) return null;

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

    return (
        <ReusableModal open={open} onClose={onClose} title="Inquiry Details">
            <DialogContent dividers>
                {/* Top Info */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <InfoRow icon={<FaUser color="#1976d2" />} label="Name" value={name} />
                        <InfoRow icon={<FaPhone color="#2e7d32" />} label="Phone" value={phone} />
                        <InfoRow icon={<FaEnvelope color="#d32f2f" />} label="Email" value={email || "-"} />
                        <InfoRow icon={<FaGlobe color="#0288d1" />} label="Nationality" value={nationality || "-"} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoRow icon={<FaTag color="#f57c00" />} label="Service Type" value={capitalize(serviceType)} />
                        <InfoRow icon={<FaCalendarAlt color="#6a1b9a" />} label="Submitted" value={formatDate(createdAt)} />
                        <Box mt={1}>
                            <Typography variant="body2" fontWeight="bold" mb={0.5}>
                                Status:
                            </Typography>
                            <Chip label={capitalize(status)} color={getStatusColor(status)} />
                        </Box>
                        {message && (
                            <Box mt={2}>
                                <Typography variant="body2" fontWeight="bold" mb={0.5}>
                                    <FaComment style={{ marginRight: 4 }} /> Message:
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
                        <Paper elevation={0} sx={{ backgroundColor: "#f9f9f9", p: 2, borderRadius: 2 }}>
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
            {icon && <Box mr={1} fontSize={18}>{icon}</Box>}
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

function getStatusColor(status) {
    switch (status) {
        case "new":
            return "primary";
        case "contacted":
            return "info";
        case "converted":
            return "success";
        case "ignored":
            return "default";
        default:
            return "secondary";
    }
}

export default InquiryDetailsDialog;
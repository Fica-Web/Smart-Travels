import { DialogContent } from "@mui/material";
import ReusableModal from "../../reusable/ReusableModal";

function InquiryDetailsDialog({ open, onClose, inquiry }) {
    if (!inquiry) return null;

    return (
        <ReusableModal open={open} onClose={onClose} title="Inquiry Details">
            <DialogContent dividers>
                <p><strong>Name:</strong> {inquiry.name}</p>
                <p><strong>Email:</strong> {inquiry.email || "-"}</p>
                <p><strong>Phone:</strong> {inquiry.phone}</p>
                <p><strong>Service Type:</strong> {inquiry.serviceType}</p>
                {inquiry.message && <p><strong>Message:</strong> {inquiry.message}</p>}

                {inquiry.flightBookingDetails && (
                    <Section title="Flight Details" data={inquiry.flightBookingDetails} />
                )}
                {inquiry.hotelBookingDetails && (
                    <Section title="Hotel Details" data={inquiry.hotelBookingDetails} />
                )}
                {inquiry.destinationDetails && (
                    <Section title="Destination" data={inquiry.destinationDetails} />
                )}
                {inquiry.visaDetails && (
                    <Section title="Visa Details" data={inquiry.visaDetails} />
                )}
                {inquiry.insuranceDetails && (
                    <Section title="Insurance Details" data={inquiry.insuranceDetails} />
                )}
            </DialogContent>
        </ReusableModal>
    );
}

function Section({ title, data }) {
    return (
        <div style={{ marginTop: 16 }}>
            <h4>{title}</h4>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default InquiryDetailsDialog;
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Chip,
} from "@mui/material";
import axios from "axios";

function InquiriesPage() {
    const [inquiries, setInquiries] = useState([]);
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/inquiries");
            setInquiries(res.data);
        } catch (err) {
            console.error("Failed to fetch inquiries", err);
        }
    };

    const filtered = inquiries.filter(
        (inq) =>
            inq.name.toLowerCase().includes(search.toLowerCase()) ||
            inq.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: 24 }}>
            <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Inquiries</h1>

            <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                <TextField
                    label="Search by name or email"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: 300 }}
                />
            </div>

            <Card>
                <CardContent style={{ padding: 0 }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Service</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filtered.map((inq) => (
                                    <TableRow key={inq._id}>
                                        <TableCell>{inq.name}</TableCell>
                                        <TableCell>{inq.email || "-"}</TableCell>
                                        <TableCell>{inq.phone}</TableCell>
                                        <TableCell>
                                            <Chip label={inq.serviceType} />
                                        </TableCell>
                                        <TableCell>{new Date(inq.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => {
                                                    setSelected(inq);
                                                    setDialogOpen(true);
                                                }}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Inquiry Details</DialogTitle>
                <DialogContent dividers>
                    {selected && (
                        <div>
                            <p><strong>Name:</strong> {selected.name}</p>
                            <p><strong>Email:</strong> {selected.email || "-"}</p>
                            <p><strong>Phone:</strong> {selected.phone}</p>
                            <p><strong>Service Type:</strong> {selected.serviceType}</p>
                            {selected.message && <p><strong>Message:</strong> {selected.message}</p>}

                            {selected.flightBookingDetails && (
                                <div>
                                    <h4>Flight Details</h4>
                                    <pre>{JSON.stringify(selected.flightBookingDetails, null, 2)}</pre>
                                </div>
                            )}
                            {selected.hotelBookingDetails && (
                                <div>
                                    <h4>Hotel Details</h4>
                                    <pre>{JSON.stringify(selected.hotelBookingDetails, null, 2)}</pre>
                                </div>
                            )}
                            {selected.destinationDetails && (
                                <div>
                                    <h4>Destination</h4>
                                    <pre>{JSON.stringify(selected.destinationDetails, null, 2)}</pre>
                                </div>
                            )}
                            {selected.visaDetails && (
                                <div>
                                    <h4>Visa Details</h4>
                                    <pre>{JSON.stringify(selected.visaDetails, null, 2)}</pre>
                                </div>
                            )}
                            {selected.insuranceDetails && (
                                <div>
                                    <h4>Insurance Details</h4>
                                    <pre>{JSON.stringify(selected.insuranceDetails, null, 2)}</pre>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}


const AdminInquiryPage = () => {
    return (
        <div>
            <InquiriesPage />
        </div>
    )
}

export default AdminInquiryPage
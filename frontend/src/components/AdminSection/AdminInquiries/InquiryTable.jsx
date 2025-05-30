import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Chip,
} from "@mui/material";

function InquiryTable({ inquiries, onSelect }) {
    return (
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
                            {inquiries.map((inq) => (
                                <TableRow key={inq._id}>
                                    <TableCell>{inq.name}</TableCell>
                                    <TableCell>{inq.email || "-"}</TableCell>
                                    <TableCell>{inq.phone}</TableCell>
                                    <TableCell><Chip label={inq.serviceType} /></TableCell>
                                    <TableCell>{new Date(inq.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => onSelect(inq)}
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
    );
}

export default InquiryTable;

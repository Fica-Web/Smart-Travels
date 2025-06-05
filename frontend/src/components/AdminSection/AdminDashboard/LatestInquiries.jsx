import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
} from '@mui/material';
import ActionButton from '../../reusable/ActionButton';
import ReusableTag from '../../reusable/ReusableTag';

const statusColors = {
    new: "#0288d1",         // Blue
    contacted: "#ff9800",   // Orange
    converted: "#4caf50",   // Green
    ignored: "#f44336",     // Red
};

const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
    });
};

const LatestInquiries = ({ inquiries = [] }) => (
    <Box mb={8}>
        <Typography variant="h6" gutterBottom color="secondary">Recent Inquiries</Typography>
        <Paper elevation={2}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell><strong>Email</strong></TableCell>
                        <TableCell><strong>Phone</strong></TableCell>
                        <TableCell><strong>Date</strong></TableCell>
                        <TableCell><strong>Service</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inquiries.length > 0 ? (
                        inquiries.map((inq, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{inq.name || '—'}</TableCell>
                                <TableCell>{inq.email || '—'}</TableCell>
                                <TableCell>{inq.phone || '—'}</TableCell>
                                <TableCell>{formatDate(inq.createdAt)}</TableCell>
                                <TableCell><ReusableTag label={inq.serviceType || '—'} /> </TableCell>
                                <TableCell>
                                    <Chip
                                        label={inq.status || 'new'}
                                        size="small"
                                        sx={{
                                            backgroundColor: statusColors[inq.status] || statusColors.new,
                                            color: "#fff",
                                            fontWeight: 500,
                                            textTransform: "capitalize",
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                No recent inquiries available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Paper>
    </Box>
);

export default LatestInquiries;
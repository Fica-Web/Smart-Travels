import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

const LatestInquiries = ({ inquiries }) => (
    <Box mb={4}>
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inquiries.map((inq, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{inq.name || 'Not provided'}</TableCell>
                            <TableCell>{inq.email || 'Not provided'}</TableCell>
                            <TableCell>{inq.phone || 'Not provided'}</TableCell>
                            <TableCell>{inq.date || 'Not provided'}</TableCell>
                            <TableCell>{inq.message || 'Not provided'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    </Box>
);

export default LatestInquiries;
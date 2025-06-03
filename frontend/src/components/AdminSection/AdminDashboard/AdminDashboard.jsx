import {
    Box,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Divider,
} from '@mui/material';
import { MdBarChart, MdMap, MdArticle, MdAdd } from "react-icons/md";

const AdminDashboard = () => {
    const stats = {
        inquiries: 112,
        destinations: 24,
        blogs: 18,
    };

    const recentInquiries = [
        { name: 'John Doe', email: 'john@example.com', date: '2025-05-30', message: 'Interested in Bali tour' },
        { name: 'Jane Smith', email: 'jane@example.com', date: '2025-05-29', message: 'Need visa assistance' },
        { name: 'Ali Khan', email: 'ali@example.com', date: '2025-05-28', message: 'Looking for honeymoon package' },
    ];

    return (
        <Box p={4}>
            <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
                Dashboard Overview
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} mb={4}>
                <StatCard icon={<MdBarChart fontSize="large" color="primary" />} title="Inquiries" count={stats.inquiries} />
                <StatCard icon={<MdMap fontSize="large" color="primary" />} title="Destinations" count={stats.destinations} />
                <StatCard icon={<MdArticle fontSize="large" color="primary" />} title="Blog Posts" count={stats.blogs} />
            </Grid>

            {/* Recent Inquiries */}
            <Box mb={4}>
                <Typography variant="h6" gutterBottom color="secondary">Recent Inquiries</Typography>
                <Paper elevation={2}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Date</strong></TableCell>
                                <TableCell><strong>Message</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentInquiries.map((inq, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{inq.name}</TableCell>
                                    <TableCell>{inq.email}</TableCell>
                                    <TableCell>{inq.date}</TableCell>
                                    <TableCell>{inq.message}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>

            {/* Chart Placeholder */}
            <Box mb={4}>
                <Typography variant="h6" gutterBottom color="secondary">Inquiries Over Time</Typography>
                <Paper
                    variant="outlined"
                    sx={{
                        height: 250,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderStyle: 'dashed',
                        color: 'gray',
                    }}
                >
                    Chart goes here (e.g., Recharts / MUI Chart)
                </Paper>
            </Box>

            {/* Quick Actions */}
            <Box>
                <Typography variant="h6" gutterBottom color="secondary">Quick Actions</Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                    <Button variant="contained" startIcon={<MdAdd />}>Add New Blog</Button>
                    <Button variant="outlined" startIcon={<MdAdd />}>Add New Destination</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminDashboard;

// StatCard component
const StatCard = ({ title, count, icon }) => (
    <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
                <Typography variant="h5" fontWeight="bold">{count}</Typography>
            </Box>
            {icon}
        </Paper>
    </Grid>
);

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
} from '@mui/material';
import { MdBarChart, MdMap, MdArticle } from "react-icons/md";
import StatCard from '../../components/AdminSection/AdminDashboard/StatCard';
import ChartPlaceholder from '../../components/AdminSection/AdminDashboard/ChartPlaceholder';
import QuickActions from '../../components/AdminSection/AdminDashboard/QuickActions';

const AdminDashboardPage = () => {
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
        <StatCard icon={<MdBarChart />} title="Total Inquiries" count={stats.inquiries} />
        <StatCard icon={<MdMap />} title="Total Destinations" count={stats.destinations} />
        <StatCard icon={<MdArticle  />} title="Blog Posts" count={stats.blogs} />
      </Grid>

      {/* Recent Inquiries */}
      {/* <Box mb={4}>
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
      </Box> */}

      {/* Chart Placeholder */}
      <ChartPlaceholder />

      {/* Quick Actions */}
      <QuickActions />
    </Box>
  );
}

export default AdminDashboardPage
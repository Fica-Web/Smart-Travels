import { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { MdBarChart, MdMap, MdArticle } from "react-icons/md";
import { fetchDashboardDataApi } from '../../services/api/adminApi';
import StatCard from '../../components/AdminSection/AdminDashboard/StatCard';
import InquiriesTable from '../../components/AdminSection/AdminDashboard/LatestInquiries';
import ChartPlaceholder from '../../components/AdminSection/AdminDashboard/ChartPlaceholder';
import QuickActions from '../../components/AdminSection/AdminDashboard/QuickActions';

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const recentInquiries = [
    { name: 'John Doe', email: 'john@example.com', date: '2025-05-30', message: 'Interested in Bali tour' },
    { name: 'Jane Smith', email: 'jane@example.com', date: '2025-05-29', message: 'Need visa assistance' },
    { name: 'Ali Khan', email: 'ali@example.com', date: '2025-05-28', message: 'Looking for honeymoon package' },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      const response = await fetchDashboardDataApi();
      
      if (response.success) {
        setDashboardData(response.data);
      } else {
        console.error("Error fetching dashboard data:", response.message);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <StatCard icon={<MdBarChart />} title="Total Inquiries" count={dashboardData?.stats?.inquiries} />
        <StatCard icon={<MdMap />} title="Total Destinations" count={dashboardData?.stats?.destinations} />
        <StatCard icon={<MdArticle  />} title="Blog Posts" count={dashboardData?.stats?.blogs} />
      </Grid>

      {/* Recent Inquiries */}
      <InquiriesTable inquiries={dashboardData?.recentInquiries || [] } />

      {/* Chart Placeholder */}
      <ChartPlaceholder chartData={dashboardData?.inquiriesChart || [] } />

      {/* Quick Actions */}
      <QuickActions />
    </Box>
  );
}

export default AdminDashboardPage
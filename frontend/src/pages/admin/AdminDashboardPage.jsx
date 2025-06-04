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

  useEffect(() => {
    const fetchDashboardData = async () => {
      const response = await fetchDashboardDataApi(); // full dashboard data
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

      <Grid container spacing={3} mb={4}>
        <StatCard icon={<MdBarChart />} title="Total Inquiries" count={dashboardData?.stats?.inquiries} />
        <StatCard icon={<MdMap />} title="Total Destinations" count={dashboardData?.stats?.destinations} />
        <StatCard icon={<MdArticle />} title="Blog Posts" count={dashboardData?.stats?.blogs} />
      </Grid>

      <InquiriesTable inquiries={dashboardData?.recentInquiries || []} />

      <ChartPlaceholder
        initialData={dashboardData?.inquiriesChart || []}
        fetchFilteredChartData={fetchDashboardDataApi}
      />

      <QuickActions />
    </Box>
  );
};

export default AdminDashboardPage;
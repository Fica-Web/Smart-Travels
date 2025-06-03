import { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { MdBarChart, MdMap, MdArticle } from "react-icons/md";
import StatCard from '../../components/AdminSection/AdminDashboard/StatCard';
import InquiriesTable from '../../components/AdminSection/AdminDashboard/LatestInquiries';
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
      <InquiriesTable inquiries={recentInquiries} />

      {/* Chart Placeholder */}
      <ChartPlaceholder />

      {/* Quick Actions */}
      <QuickActions />
    </Box>
  );
}

export default AdminDashboardPage
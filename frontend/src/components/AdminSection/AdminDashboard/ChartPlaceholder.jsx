import { useState } from 'react';
import {
  Box, Typography, Paper, ToggleButton, ToggleButtonGroup
} from '@mui/material';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';

const ChartPlaceholder = ({ chartData }) => {
  const [chartType, setChartType] = useState('bar');

  const handleChartTypeChange = (event, newType) => {
    if (newType !== null) {
      setChartType(newType);
    }
  };

  return (
    <Box mb={8}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" color="secondary">Inquiries Over Time</Typography>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={handleChartTypeChange}
          size="small"
          color="primary"
        >
          <ToggleButton value="bar">Bar</ToggleButton>
          <ToggleButton value="line">Line</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Paper elevation={2} sx={{ height: 350, p: 3 }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="inquiries" fill="#1976d2" />
            </BarChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="inquiries" stroke="#1976d2" strokeWidth={2} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default ChartPlaceholder;
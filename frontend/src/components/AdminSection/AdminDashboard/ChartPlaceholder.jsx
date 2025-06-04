import { Box, Typography, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const ChartPlaceholder = ({ chartData }) => (
    <Box mb={8}>
        <Typography variant="h6" gutterBottom color="secondary">Inquiries Over Time</Typography>
        <Paper elevation={2} sx={{ height: 350, p: 3 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="inquiries" fill="#1976d2" />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    </Box>
);

export default ChartPlaceholder;
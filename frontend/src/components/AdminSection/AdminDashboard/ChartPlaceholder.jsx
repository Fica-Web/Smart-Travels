import { useEffect, useState } from 'react';
import {
    Box, Typography, Paper, ToggleButton, ToggleButtonGroup,
    FormControl, InputLabel, Select, MenuItem, CircularProgress
} from '@mui/material';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid
} from 'recharts';

const ChartPlaceholder = ({ initialData = [], fetchFilteredChartData }) => {
    const [chartType, setChartType] = useState('bar');
    const [chartData, setChartData] = useState([]);
    const [serviceType, setServiceType] = useState('');
    const [loading, setLoading] = useState(true);

    // Always set loading to false when initialData changes, even if empty
    useEffect(() => {
        setChartData(initialData);
        setLoading(false);
    }, [initialData]);

    const handleChartTypeChange = (_, newType) => {
        if (newType) setChartType(newType);
    };

    const handleServiceTypeChange = async (e) => {
        const selected = e.target.value;
        setServiceType(selected);

        if (!selected) {
            setChartData(initialData);
            return;
        }

        setLoading(true);
        try {
            const response = await fetchFilteredChartData(selected);
            if (response.success) {
                setChartData(response.data.inquiriesChart || []);
            } else {
                setChartData([]);
            }
        } catch (err) {
            console.error(err);
            setChartData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box mb={8}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" color="secondary">Inquiries Over Time</Typography>
                <Box display="flex" gap={2}>
                    <FormControl size="small">
                        <InputLabel>Service Type</InputLabel>
                        <Select
                            value={serviceType}
                            onChange={handleServiceTypeChange}
                            label="Service Type"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="flight">Flight</MenuItem>
                            <MenuItem value="hotel">Hotel</MenuItem>
                            <MenuItem value="visa">Visa</MenuItem>
                            <MenuItem value="destination">Destination</MenuItem>
                            <MenuItem value="insurance">Insurance</MenuItem>
                        </Select>
                    </FormControl>

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
            </Box>

            <Paper elevation={2} sx={{ height: 350, p: 3 }}>
                {loading ? (
                    <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                        <CircularProgress />
                    </Box>
                ) : chartData.length === 0 ? (
                    <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                        <Typography variant="subtitle1" color="textSecondary">
                            No inquiries available.
                        </Typography>
                    </Box>
                ) : (
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
                )}
            </Paper>
        </Box>
    );
};

export default ChartPlaceholder;
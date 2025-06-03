// components/Dashboard/ChartPlaceholder.jsx
import { Box, Typography, Paper } from '@mui/material';

const ChartPlaceholder = () => (
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
);

export default ChartPlaceholder;

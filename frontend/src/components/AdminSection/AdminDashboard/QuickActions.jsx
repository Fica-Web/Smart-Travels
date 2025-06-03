// components/Dashboard/QuickActions.jsx
import { Box, Typography, Button } from '@mui/material';
import { MdAdd } from "react-icons/md";

const QuickActions = () => (
    <Box>
        <Typography variant="h6" gutterBottom color="secondary">Quick Actions</Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
            <Button variant="contained" startIcon={<MdAdd />}>Add New Blog</Button>
            <Button variant="outlined" startIcon={<MdAdd />}>Add New Destination</Button>
        </Box>
    </Box>
);

export default QuickActions;
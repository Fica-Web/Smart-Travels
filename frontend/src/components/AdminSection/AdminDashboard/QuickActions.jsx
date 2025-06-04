import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { MdAdd } from "react-icons/md";

const QuickActions = () => (
    <Box>
        <Typography variant="h6" gutterBottom color="secondary">Quick Actions</Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
            <Link to={'/admin/blog/new'}>
                <Button variant="contained" startIcon={<MdAdd />}>Add New Blog</Button>
            </Link>
            <Link to={'/admin/destination/new'}>
                <Button variant="outlined" startIcon={<MdAdd />}>Add New Destination</Button>
            </Link>
        </Box>
    </Box>
);

export default QuickActions;
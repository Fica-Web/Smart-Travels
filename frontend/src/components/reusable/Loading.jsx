import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const Loading = ({ text = "Loading..." }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="60vh"
            gap={2}
        >
            <CircularProgress size={48} thickness={4} color="primary" />
            <Typography variant="h6" color="text.secondary">
                {text}
            </Typography>
        </Box>
    );
};

export default Loading;
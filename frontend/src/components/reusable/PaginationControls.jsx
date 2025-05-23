import { Pagination, Stack, Typography } from '@mui/material';

const PaginationControls = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null; // No pagination needed

    return (
        <Stack spacing={2} alignItems="center" mt={5}>
            <Typography variant="subtitle1" color="text.secondary">
                Page {page} of {totalPages}
            </Typography>
            <Pagination
                count={totalPages}
                page={page}
                onChange={(event, value) => onPageChange(value)}
                color="primary"
                variant="outlined"
                shape="rounded"
            />
        </Stack>
    );
};

export default PaginationControls;
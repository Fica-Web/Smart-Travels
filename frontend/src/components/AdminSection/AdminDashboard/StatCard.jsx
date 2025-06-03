import { Grid, Paper, Typography, Box } from '@mui/material';

const StatCard = ({ title, count, icon }) => (
    <Grid item xs={12} sm={4}>
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
                {title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                    {count}
                </Typography>
                <Box sx={{ fontSize: 32, color: 'primary.main' }}>
                    {icon}
                </Box>
            </Box>
        </Paper>
    </Grid>
);

export default StatCard;
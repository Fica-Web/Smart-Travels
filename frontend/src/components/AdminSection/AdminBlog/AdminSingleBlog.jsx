import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Box,
    Chip,
    Divider
} from '@mui/material';

const AdminSingleBlog = ({ blog, handleEdit, handleDelete, loading }) => {
    const {
        coverImage,
        title,
        author,
        category,
        description,
        createdAt,
        _id
    } = blog;

    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: '0.3s',
                '&:hover': {
                    boxShadow: 6,
                },
            }}
        >
            {coverImage && (
                <CardMedia
                    component="img"
                    height="200"
                    image={coverImage}
                    alt={title}
                    sx={{ objectFit: 'cover' }}
                />
            )}

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom noWrap>
                    {title}
                </Typography>

                <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
                    <Chip
                        label={`Author: ${author || 'Unknown'}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                    />
                    <Chip
                        label={`Category: ${category || 'Uncategorized'}`}
                        size="small"
                        color="secondary"
                        variant="outlined"
                    />
                    <Chip
                        label={`Date: ${createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}`}
                        size="small"
                        variant="outlined"
                    />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {description.length > 180
                        ? `${description.substring(0, 180)}...`
                        : description}
                </Typography>
            </CardContent>

            <Divider />

            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(blog)}
                >
                    ✏️ Edit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(_id)}
                    disabled={loading}
                >
                    {loading ? 'Deleting...' : '🗑 Delete'}
                </Button>
            </CardActions>
        </Card>
    );
};

export default AdminSingleBlog;
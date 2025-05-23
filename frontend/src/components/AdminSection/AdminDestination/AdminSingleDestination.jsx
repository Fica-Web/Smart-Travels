import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    Chip,
    Divider,
} from "@mui/material";
import { toast } from "react-toastify";
import { deleteDestinationApi } from "../../../services/api/destinationApi";

const SingleDestination = ({ destination, setDestinations }) => {
    const [loading, setLoading] = useState(false);

    if (!destination) return null;

    const {
        _id,
        title,
        country,
        duration,
        pricePerPerson,
        coverImage,
        isPublished,
    } = destination;

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this destination?");
        if (!confirmDelete) return;

        setLoading(true);
        const response = await deleteDestinationApi(_id);

        if (response.success) {
            setDestinations(prev => prev.filter(dest => dest._id !== _id));
            toast.success(response.message || 'Destination deleted successfully');
        } else {
            toast.error(response.message || "Failed to delete destination. Please try again.");
        }
        setLoading(false);
    };

    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": {
                    boxShadow: 6,
                },
            }}
        >
            {coverImage && (
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={coverImage}
                        alt={title}
                        sx={{
                            objectFit: "cover",
                            transition: "transform 0.3s",
                            "&:hover": { transform: "scale(1.03)" },
                        }}
                    />
                    <Chip
                        label={country}
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            bgcolor: "rgba(255, 255, 255, 0.9)",
                            fontWeight: 500,
                        }}
                    />
                </Box>
            )}

            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" noWrap fontWeight={600}>
                        {title}
                    </Typography>
                    <Chip
                        label={isPublished ? "Published" : "Unpublished"}
                        color={isPublished ? "success" : "error"}
                        size="small"
                        variant="outlined"
                    />
                </Box>

                <Typography variant="body2" color="text.secondary" mt={1}>
                    <strong>Duration:</strong> {duration}
                </Typography>
                {pricePerPerson && (
                    <Typography variant="body2" color="text.secondary">
                        <strong>Price:</strong> ₹{pricePerPerson.toLocaleString()}
                    </Typography>
                )}
            </CardContent>

            <Divider />

            <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    component={Link}
                    to={`edit/${_id}`}
                >
                    ✏️ Edit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    {loading ? "Deleting..." : "🗑 Delete"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default SingleDestination;
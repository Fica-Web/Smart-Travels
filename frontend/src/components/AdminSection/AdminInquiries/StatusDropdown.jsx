import { MenuItem, Select, Chip } from "@mui/material";

const statusColors = {
    new: "#0288d1",         // Blue
    contacted: "#ff9800",   // Orange
    converted: "#4caf50",   // Green
    ignored: "#f44336",     // Red
};

const StatusDropdown = ({ value, onChange }) => {
    return (
        <Select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            size="small"
            sx={{
                fontWeight: 600,
                backgroundColor: statusColors[value] + "20", // light tint
                color: statusColors[value],
                borderRadius: 2,
                fontSize: 14,
            }}
        >
            {Object.entries(statusColors).map(([status, color]) => (
                <MenuItem key={status} value={status}>
                    <Chip
                        label={status.charAt(0).toUpperCase() + status.slice(1)}
                        size="small"
                        style={{
                            backgroundColor: color,
                            color: "white",
                            fontWeight: 500,
                            height: 22,
                        }}
                    />
                </MenuItem>
            ))}
        </Select>
    );
};

export default StatusDropdown;
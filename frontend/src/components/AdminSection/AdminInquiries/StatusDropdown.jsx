import { MenuItem, Select } from "@mui/material";

const statusOptions = ['new', 'contacted', 'converted', 'ignored'];

const StatusDropdown = ({ value, onChange }) => {
    

    return (
        <Select
            size="small"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-white rounded-md border border-gray-300 text-sm"
        >
            {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
            ))}
        </Select>
    );
};

export default StatusDropdown;
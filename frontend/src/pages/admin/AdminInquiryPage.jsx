import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { fetchInquiriesApi } from "../../services/api/inquiryApi";
import InquiryTable from "../../components/AdminSection/AdminInquiries/InquiryTable";
import InquiryDetailsDialog from "../../components/AdminSection/AdminInquiries/InquiryDetailsDialog";

const AdminInquiryPage = () => {
    const [inquiries, setInquiries] = useState([]);
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        const response = await fetchInquiriesApi();
        console.log("Fetched inquiries:", response);
        if (response.success) {
            setInquiries(response.data.inquiries);
        } else {
            console.error("Error fetching inquiries:", response.message);
        }
    };

    const filtered = inquiries.filter(
        (inq) =>
            inq.name.toLowerCase().includes(search.toLowerCase()) ||
            inq.email?.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div style={{ padding: 24 }}>
            <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Inquiries</h1>
            <TextField
                label="Search by name or email"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: 300, marginBottom: 24 }}
            />
            <InquiryTable
                inquiries={filtered}
                onSelect={(inq) => {
                    setSelected(inq);
                    setDialogOpen(true);
                }}
            />
            <InquiryDetailsDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                inquiry={selected}
            />
        </div>
    )
}

export default AdminInquiryPage
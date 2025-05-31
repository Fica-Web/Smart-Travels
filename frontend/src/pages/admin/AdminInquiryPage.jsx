import { useState } from "react";
import InquiryTable from "../../components/AdminSection/AdminInquiries/InquiryTable";
import InquiryDetailsDialog from "../../components/AdminSection/AdminInquiries/InquiryDetailsDialog";

const AdminInquiryPage = () => {
    const [selected, setSelected] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div style={{ padding: 24 }}>
            <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Inquiries</h1>
            <InquiryTable
                onSelect={(inquiry) => {
                    setSelected(inquiry);
                    setDialogOpen(true);
                }}
            />
            <InquiryDetailsDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                inquiry={selected}
            />
        </div>
    );
};

export default AdminInquiryPage;
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchInquiriesApi, updateInquiryStatusApi } from "../../../services/api/inquiryApi";
import ReusableTag from "../../reusable/ReusableTag";
import StatusDropdown from "./StatusDropdown";
import ActionButton from "../../reusable/ActionButton";

const InquiryTable = ({ onSelect }) => {
    const [inquiries, setInquiries] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortModel, setSortModel] = useState([]);
    const [search, setSearch] = useState("");
    const [searchDebounce, setSearchDebounce] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchDebounce(search);
        }, 400);
        return () => clearTimeout(timeout);
    }, [search]);

    useEffect(() => {
        const fetchInquiries = async () => {
            const sort = sortModel[0] || {};

            const params = {
                page,
                limit: pageSize,
                search: searchDebounce,
                sortBy: sort.field || "createdAt",
                order: sort.sort || "desc",
            };

            const response = await fetchInquiriesApi(params);
            if (response.success) {
                setInquiries(response.data.inquiries);
                setRowCount(response.data.totalCount);
            } else {
                console.error("Error fetching inquiries:", response.message);
            }
        };

        fetchInquiries();
    }, [page, pageSize, sortModel, searchDebounce]);

    const onStatusChange = async (inquiryId, newStatus) => {
        try {
            const response = await updateInquiryStatusApi(inquiryId, newStatus);
            if (response.success) {
                // Update the local state to reflect new status
                setInquiries((prev) =>
                    prev.map((item) =>
                        item._id === inquiryId ? { ...item, status: newStatus } : item
                    )
                );
            } else {
                console.error("Error updating status:", response.message);
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const columns = [
        { field: "name", headerName: "Name", flex: 0.9 },
        { field: "email", headerName: "Email", flex: 1.3 },
        { field: "phone", headerName: "Phone", flex: 0.8 },
        {
            field: "serviceType",
            headerName: "Service",
            width: 140,
            renderCell: (params) => <ReusableTag label={params.value} />,
        },
        {
            field: "createdAt",
            headerName: "Date",
            width: 160,
            valueGetter: (params) => {
                return new Date(params).toLocaleDateString("en-IN");
            }
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            // sortable: false,
            // filterable: false,
            renderCell: (params) => (
                <StatusDropdown
                    value={params.row.status}
                    onChange={(newStatus) => onStatusChange(params.row._id, newStatus)}
                />
            ),
        },
        {
            field: "action",
            headerName: "Action",
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <ActionButton onClick={() => onSelect(params.row)} />
            ),
        },
    ];

    return (
        <div style={{ height: 600, width: "100%" }}>
            <input
                type="text"
                placeholder="Search by name, email, service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    marginBottom: 10,
                    padding: 8,
                    width: 300,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                }}
            />
            <DataGrid
                rows={inquiries}
                columns={columns}
                rowCount={rowCount}
                paginationMode="server"
                sortingMode="server"
                paginationModel={{ page, pageSize }}
                onPaginationModelChange={({ page, pageSize }) => {
                    setPage(page);
                    setPageSize(pageSize);
                }}
                onSortModelChange={(model) => setSortModel(model)}
                getRowId={(row) => row._id}
                pageSizeOptions={[10, 25, 50, 100]}
            />
        </div>
    );
};

export default InquiryTable;
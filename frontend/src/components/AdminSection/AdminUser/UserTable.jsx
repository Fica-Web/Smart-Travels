import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllUsersApi } from "../../../services/api/userApi";

const columns = [
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "phone", headerName: "Phone", width: 130 },
    {
        field: "isVerified",
        headerName: "Verified",
        width: 120,
        renderCell: (params) => (params.value ? "✅" : "❌"),
    },
    { field: "nationality", headerName: "Nationality", width: 120 },
    {
        field: "createdAt",
        headerName: "Created At",
        width: 160,
        valueGetter: (params) =>
            new Date(params.value).toLocaleDateString("en-IN"),
    },
];

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortModel, setSortModel] = useState([]);
    const [search, setSearch] = useState("");
    const [searchDebounce, setSearchDebounce] = useState("");

    // Debounce search input
    useEffect(() => {
        const delay = setTimeout(() => setSearchDebounce(search), 400);
        return () => clearTimeout(delay);
    }, [search]);

    const fetchUsers = async () => {
        const sort = sortModel[0] || {};

        const params = {
            page,
            limit: pageSize,
            search: searchDebounce,
            sortBy: sort.field || "createdAt",
            order: sort.sort || "desc", 
        };

        console.log("Sending params to API:", params);

        const response = await getAllUsersApi(params);
        if (response.success) {
            setUsers(response.data.users);
            setRowCount(response.data.totalCount);
        } else {
            console.error("Error fetching users:", response.error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, pageSize, sortModel, searchDebounce]);

    return (
        <div style={{ height: 600, width: "100%" }}>
            <input
                type="text"
                placeholder="Search by name, email, username..."
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
                rows={users}
                columns={columns}
                rowCount={rowCount}
                page={page}
                pageSize={pageSize}
                paginationMode="server"
                sortingMode="server"
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newSize) => setPageSize(newSize)}
                onSortModelChange={(model) => setSortModel(model)}
                getRowId={(row) => row._id}
            />
        </div>
    );
};

export default UserTable;
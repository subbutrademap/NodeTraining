import { GridActionsCellItem } from '@mui/x-data-grid';

// DataGrid column configuration
export const userColumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 80,
        type: 'number',
        sortable: true,
        filterable: true
    },
    {
        field: 'firstName',
        headerName: 'First Name',
        width: 150,
        sortable: true,
        filterable: true,
        editable: false
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 150,
        sortable: true,
        filterable: true,
        editable: false
    },
    {
        field: 'userName',
        headerName: 'Username',
        width: 130,
        sortable: true,
        filterable: true,
        editable: false
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        width: 150,
        sortable: true,
        filterable: true,
        editable: false
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        sortable: true,
        filterable: true,
        editable: false
    },
    {
        field: 'userRole',
        headerName: 'Role',
        width: 120,
        sortable: true,
        filterable: true,
        editable: false,
        renderCell: (params) => (
            <span style={{
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                backgroundColor: params.value === 'admin' ? '#e3f2fd' : '#f3e5f5',
                color: params.value === 'admin' ? '#1976d2' : '#7b1fa2'
            }}>
                {params.value}
            </span>
        )
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 120,
        getActions: (params) => [
            <GridActionsCellItem
                icon={<span style={{ color: '#1976d2' }}>✏️</span>}
                label="Edit"
                onClick={() => handleEdit(params.id)}
                color="primary"
            />,
            <GridActionsCellItem
                icon={<span style={{ color: '#d32f2f' }}>🗑️</span>}
                label="Delete"
                onClick={() => handleDelete(params.id)}
                color="error"
            />
        ]
    }
];

// Handle edit action
const handleEdit = (id) => {
    console.log('Edit user with ID:', id);
    // TODO: Implement edit functionality
};

// Handle delete action
const handleDelete = (id) => {
    console.log('Delete user with ID:', id);
    // TODO: Implement delete functionality
};

// DataGrid configuration options
export const dataGridConfig = {
    // Pagination
    pagination: true,
    paginationModel: {
        page: 0,
        pageSize: 10
    },
    pageSizeOptions: [5, 10, 25, 50],
    
    // Sorting
    sortingOrder: ['asc', 'desc'],
    
    // Filtering
    filterModel: {
        items: []
    },
    
    // Other options
    disableRowSelectionOnClick: true,
    checkboxSelection: false,
    disableColumnMenu: false,
    disableColumnFilter: false,
    disableColumnSelector: false,
    disableColumnResize: false,
    disableColumnReorder: false,
    
    // Styling
    sx: {
        '& .MuiDataGrid-root': {
            border: 'none',
        },
        '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f0f0f0',
        },
        '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            borderBottom: '2px solid #e0e0e0',
        },
        '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f8f9fa',
        },
        '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: '#e3f2fd',
        },
        '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#f5f5f5',
            borderTop: '1px solid #e0e0e0',
        }
    }
};

// API configuration
export const apiConfig = {
    baseUrl: 'http://localhost:3000/api',
    endpoints: {
        getUsers: '/getUsers',
        createUser: '/createUser',
        updateUser: '/updateUser',
        deleteUser: '/deleteUser'
    }
};

import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Alert,
    CircularProgress,
    IconButton,
    Tooltip
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useAppState } from "../Store/AppContextProvider";
import CookieUtility from "../CookieUtility";
import { userColumns, dataGridConfig, apiConfig } from './UserManagementConfig';

const UserManagement = () => {
    const { session } = useAppState();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10
    });

    // Fetch users from API
    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const token = CookieUtility.getToken();
            
            const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.getUsers}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || ''}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.error) {
                throw new Error(result.error);
            }

            setUsers(result.data || []);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    // Load users on component mount
    useEffect(() => {
        let isMounted = true;
        
        const loadUsers = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const token = CookieUtility.getToken();
                
                const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.getUsers}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token || ''}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                
                if (result.error) {
                    throw new Error(result.error);
                }

                // Only update state if component is still mounted
                if (isMounted) {
                    setUsers(result.data || []);
                }
            } catch (err) {
                console.error('Error fetching users:', err);
                if (isMounted) {
                    setError(err.message || 'Failed to fetch users');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadUsers();

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, []);

    // Handle refresh
    const handleRefresh = () => {
        fetchUsers();
    };

    return (
        <Box sx={{ p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header Section */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 'bold' }}>
                            Users Management
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
                            Manage and monitor all system users
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Tooltip title="Refresh Data">
                            <IconButton 
                                onClick={handleRefresh} 
                                sx={{ 
                                    color: 'white',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                                }}
                            >
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            {/* Data Grid Section */}
            <Paper elevation={1} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="h6" color="text.secondary">
                        User List ({users.length} users)
                    </Typography>
                </Box>
                
                <Box sx={{ flex: 1, p: 2 }}>
                    {loading ? (
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            height: '400px' 
                        }}>
                            <CircularProgress size={60} />
                            <Typography variant="body1" sx={{ ml: 2 }}>
                                Loading users...
                            </Typography>
                        </Box>
                    ) : (
                        <DataGrid
                            rows={users}
                            columns={userColumns}
                            {...dataGridConfig}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            loading={loading}
                            disableRowSelectionOnClick
                            sx={{
                                ...dataGridConfig.sx,
                                height: '100%',
                                '& .MuiDataGrid-main': {
                                    overflow: 'hidden'
                                }
                            }}
                        />
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default UserManagement;

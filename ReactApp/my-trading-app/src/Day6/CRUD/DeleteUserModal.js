import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Box
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import CookieUtility from '../CookieUtility';

const DeleteUserModal = ({ open, onClose, userDetails, onUserDeleted }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle delete confirmation
    const handleDeleteConfirm = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = CookieUtility.getToken();

            const response = await fetch('http://localhost:3000/api/deleteUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || ''}`
                },
                body: JSON.stringify({
                    id: userDetails.id
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || `HTTP error! status: ${response.status}`);
            }

            if (result.error) {
                throw new Error(result.error);
            }

            // Success - close modal and refresh user list
            onUserDeleted && onUserDeleted();
            onClose();

        } catch (err) {
            console.error('Error deleting user:', err);
            setError(err.message || 'Failed to delete user');
        } finally {
            setLoading(false);
        }
    };

    // Handle modal close
    const handleClose = () => {
        if (!loading) {
            setError(null);
            onClose();
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                }
            }}
        >
            <DialogTitle sx={{ 
                background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                <WarningIcon />
                Delete User
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <WarningIcon sx={{ color: 'warning.main', fontSize: '2rem' }} />
                    <Box>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Are you sure you want to delete this user?
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            This action cannot be undone.
                        </Typography>
                    </Box>
                </Box>

                {userDetails && (
                    <Box sx={{ 
                        backgroundColor: 'grey.50', 
                        p: 2, 
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'grey.200'
                    }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            User Details:
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            <strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            <strong>Username:</strong> {userDetails.userName}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            <strong>Email:</strong> {userDetails.email}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            <strong>Role:</strong> {userDetails.userRole}
                        </Typography>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button 
                    onClick={handleClose} 
                    disabled={loading}
                    sx={{ mr: 1 }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    disabled={loading}
                    onClick={handleDeleteConfirm}
                    sx={{
                        background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #c62828 0%, #a01515 100%)',
                        }
                    }}
                >
                    {loading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={16} color="inherit" />
                            Deleting...
                        </Box>
                    ) : (
                        'Delete User'
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteUserModal;

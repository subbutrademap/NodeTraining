import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    CircularProgress
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CookieUtility from '../CookieUtility';

// Validation schema using Yup
const validationSchema = Yup.object({
    userName: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(50, 'Username must be less than 50 characters')
        .required('Username is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    firstName: Yup.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .required('First name is required'),
    lastName: Yup.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters')
        .required('Last name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits')
        .required('Phone number is required'),
    userRole: Yup.string()
        .oneOf(['admin', 'user', 'Coordinator'], 'Invalid user role')
        .required('User role is required')
});

// Initial form values
const initialValues = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userRole: ''
};

const AddUserComponent = ({ open, onClose, onUserAdded }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setLoading(true);
            setError(null);

            const token = CookieUtility.getToken();

            const response = await fetch('http://localhost:3000/api/adduser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || ''}`
                },
                body: JSON.stringify(values)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || `HTTP error! status: ${response.status}`);
            }

            if (result.error) {
                throw new Error(result.error);
            }

            // Success - reset form and close modal
            resetForm();
            onUserAdded && onUserAdded();
            onClose();

        } catch (err) {
            console.error('Error adding user:', err);
            setError(err.message || 'Failed to add user');
        } finally {
            setLoading(false);
            setSubmitting(false);
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
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                }
            }}
        >
            <DialogTitle sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.5rem'
            }}>
                Add New User
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                        <Form>
                            <Box sx={{ mt: 2 }}>
                                <Grid container spacing={3}>
                                    {/* First Name */}
                                    <Grid item xs={12} sm={6}>
                                        <Field name="firstName">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="First Name"
                                                    variant="outlined"
                                                    error={touched.firstName && Boolean(errors.firstName)}
                                                    helperText={touched.firstName && errors.firstName}
                                                    disabled={loading}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    {/* Last Name */}
                                    <Grid item xs={12} sm={6}>
                                        <Field name="lastName">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Last Name"
                                                    variant="outlined"
                                                    error={touched.lastName && Boolean(errors.lastName)}
                                                    helperText={touched.lastName && errors.lastName}
                                                    disabled={loading}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    {/* Username */}
                                    <Grid item xs={12} sm={6}>
                                        <Field name="userName">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Username"
                                                    variant="outlined"
                                                    error={touched.userName && Boolean(errors.userName)}
                                                    helperText={touched.userName && errors.userName}
                                                    disabled={loading}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    {/* Password */}
                                    <Grid item xs={12} sm={6}>
                                        <Field name="password">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Password"
                                                    type="password"
                                                    variant="outlined"
                                                    error={touched.password && Boolean(errors.password)}
                                                    helperText={touched.password && errors.password}
                                                    disabled={loading}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    {/* Email */}
                                    <Grid item xs={12} sm={6}>
                                        <Field name="email">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Email"
                                                    type="email"
                                                    variant="outlined"
                                                    error={touched.email && Boolean(errors.email)}
                                                    helperText={touched.email && errors.email}
                                                    disabled={loading}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    {/* Phone Number */}
                                    <Grid item xs={12} sm={6}>
                                        <Field name="phoneNumber">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Phone Number"
                                                    variant="outlined"
                                                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                                    helperText={touched.phoneNumber && errors.phoneNumber}
                                                    disabled={loading}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    {/* User Role */}
                                    <Grid item xs={12}>
                                        <Field name="userRole">
                                            {({ field }) => (
                                                <FormControl fullWidth error={touched.userRole && Boolean(errors.userRole)}>
                                                    <InputLabel>User Role</InputLabel>
                                                    <Select
                                                        {...field}
                                                        label="User Role"
                                                        disabled={loading}
                                                    >
                                                        <MenuItem value="admin">Admin</MenuItem>
                                                        <MenuItem value="user">User</MenuItem>
                                                        <MenuItem value="Coordinator">Coordinator</MenuItem>
                                                    </Select>
                                                    {touched.userRole && errors.userRole && (
                                                        <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}>
                                                            {errors.userRole}
                                                        </Box>
                                                    )}
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Form>
                    )}
                </Formik>
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
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    onClick={() => {
                        // Trigger form submission
                        const form = document.querySelector('form');
                        if (form) {
                            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                            form.dispatchEvent(submitEvent);
                        }
                    }}
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                        }
                    }}
                >
                    {loading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={16} color="inherit" />
                            Adding...
                        </Box>
                    ) : (
                        'Add User'
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUserComponent;

import { Paper, Typography, Box } from "@mui/material";

const UserManagement = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to User Management!
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    Manage your users here
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    This is the User Management section. You can add, edit, and manage users from this page.
                </Typography>
            </Paper>
        </Box>
    );
};

export default UserManagement;

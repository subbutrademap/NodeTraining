import { Paper, Typography, Box } from "@mui/material";

const ContactUs = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to Contact Us!
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    Get in touch with us
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    This is the Contact Us section. You can reach out to our support team from this page.
                </Typography>
            </Paper>
        </Box>
    );
};

export default ContactUs;

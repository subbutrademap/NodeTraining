import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Box,
    IconButton
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import CookieUtility from "./CookieUtility";

const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        // Clear token from cookie
        CookieUtility.removeToken();
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
            {/* NavBar */}
            <AppBar position="static" elevation={2}>
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ flexGrow: 1, cursor: "pointer" }}
                        onClick={() => navigate('/home')}
                    >
                        TradeMap4You
                    </Typography>
                    
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button 
                            color="inherit"
                            onClick={() => navigate('/home/user-management')}
                            sx={{ 
                                backgroundColor: isActive('/home/user-management') ? 'rgba(255,255,255,0.1)' : 'transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            User Management
                        </Button>
                        
                        <Button 
                            color="inherit"
                            onClick={() => navigate('/home/contact-us')}
                            sx={{ 
                                backgroundColor: isActive('/home/contact-us') ? 'rgba(255,255,255,0.1)' : 'transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            Contact Us
                        </Button>
                    </Box>
                    
                    <IconButton 
                        color="inherit" 
                        onClick={handleLogout}
                        sx={{ ml: 2 }}
                        title="Logout"
                    >
                        <Logout />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Outlet for child components */}
            <Outlet />
        </Box>
    );
};

export default HomePage;

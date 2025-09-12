import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Day6/LoginPage";
import HomePage from "./Day6/HomePage";
import UserManagement from "./Day6/CRUD/UserManagement";
import ContactUs from "./Day6/ContactUs";
import AppInit from "./Day6/AppInit";

const AppRoutes = () => {
    return (
        <AppInit>
            <Routes>
                {/* Default route redirects to login */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                
                {/* Login page route */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Home page with nested routes */}
                <Route path="/home" element={<HomePage />}>
                    {/* Default child route - redirect to user-management */}
                    <Route index element={<Navigate to="/home/user-management" replace />} />
                    
                    {/* User Management route */}
                    <Route path="user-management" element={<UserManagement />} />
                    
                    {/* Contact Us route */}
                    <Route path="contact-us" element={<ContactUs />} />
                </Route>
                
                {/* Catch all route - redirect to login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </AppInit>
    );
};

export default AppRoutes;

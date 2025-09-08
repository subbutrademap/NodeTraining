import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CookieUtility from "./CookieUtility";

const AppInit = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            const token = CookieUtility.getToken();
            
            if (!token) {
                // No token exists, navigate to login
                navigate('/login');
                return;
            }

            // Token exists, call validateSession API
            try {
                const response = await fetch('http://localhost:3000/api/validateSession', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();

                if (response.ok && result.data && result.data.valid === true) {
                    // Token is valid, stay on current route (don't navigate)
                    // Only navigate to home if currently on login page
                    if (location.pathname === '/login') {
                        navigate('/home');
                    }
                } else {
                    // Token is invalid, navigate to login
                    navigate('/login');
                }
            } catch (error) {
                console.error('Session validation error:', error);
                // On error, navigate to login
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate, location.pathname]);

    return children;
};

export default AppInit;

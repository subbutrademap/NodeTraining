import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CookieUtility from "./CookieUtility";
import { useAppState } from "./Store/AppContextProvider";
const LoginPageConfig = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const {upddateStore} = useAppState();



    const loginForm = useFormik({
        initialValues : {
            userName : "",
            password : ""
        },
        validationSchema : yup.object({
            userName : yup.string().required("Username required"),
            password : yup.string().required("Password Required").min(3, "password must be 3 or more characters")
        }),
        onSubmit : async (values)=> {
            const loginUrl = "http://localhost:3000/api/login";
            
            try {
                const response = await fetch(loginUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values)
                });
                const result = await response.json();
                
                if (response.ok) {
                    setErrorMessage(""); // Clear error message on success
                    console.log('Login successful:', result.data);

                    // Store token in cookie if available
                    if (result.data && result.data.token) {
                        CookieUtility.setToken(result.data.token);
                    }
                    upddateStore({type : "AddSession", payload : result.data.userDetails});
                        
                    navigate('/home'); // Navigate to home page on successful login
                } else {
                    setErrorMessage(result.message || "Login failed");
                    console.error('Login failed:', response.status, result.message);
                }
            } catch (error) {
                setErrorMessage("Network error occurred");
                console.error('Error during login:', error);
            }
        }
    });

    return {
        loginForm,
        errorMessage
    }
}

export default LoginPageConfig;